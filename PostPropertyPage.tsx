import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "./toaster";
import { Building2, Upload, Lock } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "./form";
import { useAuth } from "./context/AuthContext";
import { addListing } from "./lib/storage";

const schema = z.object({
  title: z.string().min(4, "Give your listing a title"),
  type: z.enum(["sale", "rent", "commercial"]),
  price: z.string().min(1, "Add a price"),
  city: z.string().min(2, "Add a city"),
  beds: z.coerce.number().min(0).max(20),
  baths: z.coerce.number().min(0).max(20),
  description: z.string().min(20, "Describe the property (20+ characters)"),
});
type ListingValues = z.infer<typeof schema>;

export function PostPropertyPage() {
  const navigate = useNavigate();
  const { user, hydrated } = useAuth();

  const form = useForm<ListingValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", type: "sale", price: "", city: "", beds: 3, baths: 2, description: "" },
  });

  // Auth gate (client-guarded).
  if (hydrated && !user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gradient-soft px-4">
        <div className="max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-elevated">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent/10">
            <Lock className="h-6 w-6 text-accent" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-primary">Sign in to post a property</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a free account or log in to list your home to millions of buyers.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild className="rounded-full bg-gradient-accent text-white"><Link to="/login">Log in</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/register">Register</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = (values: ListingValues) => {
    addListing(values);
    toast.success("Listing submitted! It will be verified within 24 hours.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="bg-gradient-soft">
      <div className="bg-primary/95 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="flex items-center gap-2 font-display text-3xl font-bold sm:text-4xl">
            <Building2 className="h-8 w-8" /> Post your property
          </h1>
          <p className="mt-2 text-white/75">List in minutes. Our team verifies within 24 hours.</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing title</FormLabel>
                  <FormControl><Input placeholder="Modern 3-bed with garden" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input placeholder="$750,000 or $3,200 / mo" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="Austin, TX" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="beds" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl><Input type="number" min={0} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="baths" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl><Input type="number" min={0} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea rows={5} placeholder="Describe the property, highlights, and neighborhood..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Decorative upload dropzone (demo) */}
              <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
                <Upload className="mx-auto h-7 w-7 text-muted-foreground/60" />
                <p className="mt-2 text-sm text-muted-foreground">Drag photos here (demo — upload coming soon)</p>
              </div>

              <Button type="submit" className="w-full rounded-full bg-gradient-accent text-white">
                Submit listing
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
