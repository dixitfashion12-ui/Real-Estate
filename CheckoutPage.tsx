import { useState } from "react";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "./toaster";
import { Lock, CreditCard, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "./form";
import { getPropertyBySlug } from "./lib/queries";
import { addOrder } from "./lib/storage";

const routeApi = getRouteApi("/checkout");

const schema = z.object({
  name: z.string().min(2, "Name on card is required"),
  email: z.string().email("Valid email required"),
  card: z.string().regex(/^[\d ]{16,19}$/, "Enter a 16-digit card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "3–4 digits"),
});
type CheckoutValues = z.infer<typeof schema>;

// Stripe official test card. In simulated mode we accept it (and its spaced form).
const TEST_CARD = "4242424242424242";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { property: slug, kind } = routeApi.useSearch() as { property?: string; kind?: string };
  const property = slug ? getPropertyBySlug(slug) : undefined;
  const [processing, setProcessing] = useState(false);

  const isViewing = kind === "viewing";
  const amount = !property
    ? 0
    : isViewing
      ? 99
      : property.type === "rent"
        ? property.priceValue
        : Math.round(property.priceValue * 0.01);
  const kindLabel = isViewing
    ? "Viewing reservation fee"
    : property?.type === "rent"
      ? "Booking fee"
      : "Reservation deposit";

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", card: "", expiry: "", cvc: "" },
  });

  if (!property) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-primary">Nothing to check out</h1>
        <p className="mt-2 text-muted-foreground">Choose a property first.</p>
        <Button asChild className="mt-6 rounded-full"><Link to="/properties">Browse properties</Link></Button>
      </div>
    );
  }

  const onSubmit = async (values: CheckoutValues) => {
    setProcessing(true);
    // --- DEMO PAYMENT (simulated) ---
    // The upgrade seam: a createCheckoutSession server function would run here when
    // STRIPE_SECRET_KEY is configured, redirecting to Stripe's hosted test checkout.
    // Until then we validate the official Stripe test card and simulate success.
    await new Promise((r) => setTimeout(r, 1200));
    const normalized = values.card.replace(/\s/g, "");
    if (normalized !== TEST_CARD) {
      setProcessing(false);
      toast.error("Use the Stripe test card 4242 4242 4242 4242 for this demo.");
      return;
    }
    const order = addOrder({
      propertySlug: property.slug,
      propertyTitle: property.title,
      amount,
      kind: kindLabel,
      name: values.name,
      email: values.email,
      last4: normalized.slice(-4),
    });
    toast.success("Payment successful!");
    navigate({ to: "/checkout-success", search: { order: order.id } });
  };

  return (
    <div className="bg-gradient-soft min-h-[70vh]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/properties/$id" params={{ id: property.slug }} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to property
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Payment form */}
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
            <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-primary">
              <CreditCard className="h-6 w-6 text-accent" /> Secure checkout
            </h1>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <ShieldCheck className="h-3.5 w-3.5" /> Demo / test mode — no real charge
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on card</FormLabel>
                      <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (receipt)</FormLabel>
                      <FormControl><Input type="email" placeholder="jane@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="card" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card number</FormLabel>
                    <FormControl><Input inputMode="numeric" placeholder="4242 4242 4242 4242" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="expiry" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry</FormLabel>
                      <FormControl><Input placeholder="12/28" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="cvc" render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl><Input inputMode="numeric" placeholder="123" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <Button type="submit" disabled={processing} className="w-full rounded-full bg-gradient-accent text-white">
                  <Lock className="h-4 w-4" />
                  {processing ? "Processing…" : `Pay $${amount.toLocaleString()}`}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Test card: <span className="font-mono">4242 4242 4242 4242</span> · any future expiry · any CVC
                </p>
              </form>
            </Form>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold text-primary">Order summary</h2>
            <div className="mt-4 flex gap-3">
              <img src={property.images[0]} alt={property.title} className="h-16 w-20 rounded-xl object-cover" />
              <div>
                <p className="font-medium text-primary">{property.title}</p>
                <p className="text-xs text-muted-foreground">{property.location.city}, {property.location.state}</p>
                <p className="text-xs text-muted-foreground">{property.priceLabel}</p>
              </div>
            </div>
            <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
              <Row label={kindLabel} value={`$${amount.toLocaleString()}`} />
              <Row label="Processing fee" value="$0" />
              <div className="flex justify-between border-t border-border/60 pt-3 font-display text-base font-bold text-primary">
                <span>Total</span>
                <span>${amount.toLocaleString()}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {isViewing
                ? "Reserves a private viewing slot; fully refundable."
                : property.type === "rent"
                  ? "Refundable booking fee to hold this rental."
                  : "Good-faith deposit, credited toward your purchase at closing."}
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
