import { useEffect, useState } from "react";
import { getRouteApi, Link } from "@tanstack/react-router";
import { CheckCircle2, Home, LayoutDashboard, Download } from "lucide-react";
import { Button } from "./button";
import { getOrders, type Order } from "./lib/storage";

const routeApi = getRouteApi("/checkout-success");

export function CheckoutSuccessPage() {
  const { order: orderId } = routeApi.useSearch() as { order?: string };
  const [order, setOrder] = useState<Order | null>(null);

  // Orders live in localStorage → read on client only.
  useEffect(() => {
    if (!orderId) return;
    setOrder(getOrders().find((o) => o.id === orderId) ?? null);
  }, [orderId]);

  return (
    <div className="bg-gradient-soft min-h-[70vh]">
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-card p-8 text-center shadow-elevated">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10">
            <CheckCircle2 className="h-9 w-9 text-success" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-primary">Payment confirmed</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you{order ? `, ${order.name.split(" ")[0]}` : ""}! Your transaction was successful.
            A receipt has been emailed{order ? ` to ${order.email}` : ""}.
          </p>

          {order && (
            <div className="mt-6 rounded-2xl border border-border/60 bg-muted/40 p-5 text-left text-sm">
              <Row label="Reference" value={order.id} mono />
              <Row label="Property" value={order.propertyTitle} />
              <Row label="Type" value={order.kind} />
              <Row label="Card" value={`•••• ${order.last4}`} mono />
              <div className="mt-2 flex justify-between border-t border-border/60 pt-2 font-display text-base font-bold text-primary">
                <span>Amount paid</span>
                <span>${order.amount.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full bg-gradient-accent text-white">
              <Link to="/dashboard"><LayoutDashboard className="h-4 w-4" /> View in dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/properties"><Home className="h-4 w-4" /> Keep browsing</Link>
            </Button>
          </div>
          <button
            onClick={() => window.print()}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" /> Print / save receipt
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right text-foreground ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
    </div>
  );
}
