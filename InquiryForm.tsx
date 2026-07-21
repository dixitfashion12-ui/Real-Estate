import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "./toaster";
import { Send } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { addInquiry } from "./lib/storage";
import { saveInquiryToAirtable } from "./lib/airtable";
import { useAuth } from "./context/AuthContext";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});

type InquiryValues = z.infer<typeof schema>;

export function InquiryForm({
  propertyId,
  propertyTitle,
  agentSlug,
  defaultMessage,
  compact,
}: {
  propertyId?: string;
  propertyTitle?: string;
  agentSlug?: string;
  defaultMessage?: string;
  compact?: boolean;
}) {
  const { user } = useAuth();
  const form = useForm<InquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: "",
      message:
        defaultMessage ??
        (propertyTitle ? `Hi, I'm interested in ${propertyTitle}. Please get in touch.` : ""),
    },
  });

  const onSubmit = (values: InquiryValues) => {
    addInquiry({ ...values, propertyId, propertyTitle, agentSlug });
    toast.success("Inquiry sent! An agent will reach out shortly.");
    form.reset({ name: values.name, email: values.email, phone: "", message: "" });

    // Save to Airtable in the background, don't block the user experience
    saveInquiryToAirtable({
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
      propertyId,
      propertyTitle,
      agentSlug,
    }).catch((error) => {
      console.error("Failed to save inquiry to Airtable:", error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jane@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="I'd like to schedule a viewing..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full rounded-full bg-gradient-accent text-white">
          <Send className="h-4 w-4" /> Send inquiry
        </Button>
      </form>
    </Form>
  );
}
