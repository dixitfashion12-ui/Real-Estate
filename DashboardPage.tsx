import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, MessageSquare, Receipt, Building2, LogOut } from "lucide-react";
import { Button } from "./button";
import { PropertyCard } from "./PropertyCard";
import { useAuth } from "./context/AuthContext";
import { useFavorites } from "./context/FavoritesContext";
import { getPropertyBySlug, getAllProperties } from "./lib/queries";
import { getInquiries, getOrders, getListings, type Inquiry, type Order, type PostedListing } from "./lib/storage";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, hydrated, logout } = useAuth();
  const { favorites } = useFavorites();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [listings, setListings] = useState<PostedListing[]>([]);

  // Client-only redirect once auth state has hydrated from storage.
  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  useEffect(() => {
    setInquiries(getInquiries());
    setOrders(getOrders());
    setListings(getListings());
  }, []);

  if (!hydrated || !user) {
    return <div className="min-h-[60vh] px-4 py-24 text-center text-muted-foreground">Loading…</div>;
  }

  const savedProps = favorites.map((id) => getAllProperties().find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="bg-gradient-soft">
      {/* Header */}
      <div className="bg-primary/95 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Hi, {user.name.split(" ")[0]} 👋</h1>
            <p className="mt-1 text-white/75">{user.email}</p>
          </div>
          <Button variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white" onClick={logout}>
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8 py-12">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile icon={Heart} label="Saved homes" value={savedProps.length} />
          <StatTile icon={MessageSquare} label="Inquiries" value={inquiries.length} />
          <StatTile icon={Receipt} label="Transactions" value={orders.length} />
          <StatTile icon={Building2} label="My listings" value={listings.length} />
        </div>

        {/* Saved */}
        <Section title="Saved properties" icon={Heart}>
          {savedProps.length === 0 ? (
            <Empty text="You haven't saved any homes yet.">
              <Button asChild className="rounded-full"><Link to="/properties">Browse properties</Link></Button>
            </Empty>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedProps.map((p) => p && <PropertyCard key={p.id} p={p} />)}
            </div>
          )}
        </Section>

        {/* Transactions */}
        <Section title="Transactions" icon={Receipt}>
          {orders.length === 0 ? (
            <Empty text="No transactions yet." />
          ) : (
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
              {orders.map((o) => (
                <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 p-4 last:border-0">
                  <div>
                    <Link to="/properties/$id" params={{ id: o.propertySlug }} className="font-medium text-primary hover:text-accent">
                      {o.propertyTitle}
                    </Link>
                    <p className="text-xs text-muted-foreground">{o.kind} · •••• {o.last4} · {new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="font-display font-bold text-primary">${o.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Inquiries */}
        <Section title="My inquiries" icon={MessageSquare}>
          {inquiries.length === 0 ? (
            <Empty text="No inquiries sent yet." />
          ) : (
            <div className="space-y-3">
              {inquiries.map((i) => (
                <div key={i.id} className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-primary">{i.propertyTitle ?? "General inquiry"}</p>
                    <span className="text-xs text-muted-foreground">{new Date(i.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{i.message}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* My listings */}
        <Section title="My posted listings" icon={Building2}>
          {listings.length === 0 ? (
            <Empty text="You haven't posted a property yet.">
              <Button asChild className="rounded-full"><Link to="/post-property">Post a property</Link></Button>
            </Empty>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <div key={l.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
                  <p className="font-display font-semibold text-primary">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.city} · {l.type}</p>
                  <p className="mt-2 font-display font-bold text-primary">{l.price}</p>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{l.description}</p>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-soft">
      <Icon className="h-6 w-6 text-accent" />
      <div className="mt-3 font-display text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-bold text-primary">
        <Icon className="h-5 w-5 text-accent" /> {title}
      </h2>
      {children}
    </section>
  );
}

function Empty({ text, children }: { text: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
