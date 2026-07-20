import { getRouteApi, Link } from "@tanstack/react-router";
import {
  BedDouble, Bath, Car, Ruler, MapPin, BadgeCheck, CalendarDays, CheckCircle2,
  Building2, Star, Phone, Mail, Heart, CreditCard, CalendarCheck,
} from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "./carousel";
import { PropertyCard } from "./PropertyCard";
import { InquiryForm } from "./InquiryForm";
import { getPropertyBySlug, getAgentById, getListingsByAgent } from "./lib/queries";
import { useFavorites } from "./context/FavoritesContext";

const routeApi = getRouteApi("/properties/$id");

export function PropertyDetailPage() {
  const { id } = routeApi.useParams();
  const property = getPropertyBySlug(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!property) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Property not found</h1>
        <p className="mt-3 text-muted-foreground">This listing may have been sold or removed.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/properties">Back to listings</Link>
        </Button>
      </div>
    );
  }

  const agent = getAgentById(property.agentId);
  const saved = isFavorite(property.id);
  const moreFromAgent = agent
    ? getListingsByAgent(agent.id).filter((p) => p.id !== property.id).slice(0, 3)
    : [];
  const depositAmount = property.type === "rent"
    ? property.priceValue
    : Math.round(property.priceValue * 0.01);
  const depositKind = property.type === "rent" ? "Booking fee" : "Reservation deposit";

  return (
    <div className="bg-gradient-soft pb-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/properties" className="hover:text-foreground">Properties</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{property.title}</span>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <Carousel opts={{ loop: true }} className="overflow-hidden rounded-3xl shadow-elevated">
          <CarouselContent>
            {property.images.map((src, i) => (
              <CarouselItem key={i}>
                <div className="relative aspect-[16/9] w-full">
                  <img src={src} alt={`${property.title} ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Main */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge className="rounded-full bg-primary/90 text-white">{property.status}</Badge>
                  {property.isNew && <Badge className="rounded-full bg-success text-white">New</Badge>}
                  {property.verified && (
                    <Badge variant="outline" className="rounded-full">
                      <BadgeCheck className="mr-1 h-3.5 w-3.5 text-accent" /> Verified
                    </Badge>
                  )}
                </div>
                <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">{property.title}</h1>
                <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {property.location.address}, {property.location.city}, {property.location.state}
                </p>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-primary">{property.priceLabel}</div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  <Heart className={`h-3.5 w-3.5 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                  {saved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Key specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {property.beds > 0 && <SpecTile icon={BedDouble} label="Bedrooms" value={String(property.beds)} />}
              <SpecTile icon={Bath} label="Bathrooms" value={String(property.baths)} />
              {property.garage > 0 && <SpecTile icon={Car} label="Garage" value={String(property.garage)} />}
              <SpecTile icon={Ruler} label="Area" value={`${property.areaSqft.toLocaleString()} sqft`} />
            </div>

            {/* Description */}
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-primary">About this property</h2>
              <p className="mt-3 leading-relaxed text-foreground/80">{property.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-accent" /> Built {property.yearBuilt}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> {property.location.city}, {property.location.state}</span>
              </div>
            </section>

            {/* Features */}
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-primary">Features & amenities</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Map panel (static) */}
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-primary">Location</h2>
              <div className="mt-4 overflow-hidden rounded-3xl border border-border/60">
                <div
                  className="relative flex h-64 items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                >
                  <div className="text-center">
                    <MapPin className="mx-auto h-10 w-10 text-accent" />
                    <p className="mt-2 font-medium text-primary">{property.location.address}</p>
                    <p className="text-sm text-muted-foreground">{property.location.city}, {property.location.state}</p>
                    <Button asChild variant="outline" size="sm" className="mt-3 rounded-full">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${property.location.lat},${property.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <p className="text-sm text-muted-foreground">{depositKind}</p>
              <p className="font-display text-2xl font-bold text-primary">
                ${depositAmount.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {property.type === "rent"
                  ? "Refundable booking fee to reserve this rental."
                  : "1% good-faith deposit to reserve. Fully credited at closing."}
              </p>
              <Button asChild className="mt-4 w-full rounded-full bg-gradient-accent text-white">
                <Link to="/checkout" search={{ property: property.slug, kind: "deposit" }}>
                  <CreditCard className="h-4 w-4" /> Reserve with deposit
                </Link>
              </Button>
              <Button asChild variant="outline" className="mt-2 w-full rounded-full">
                <Link to="/checkout" search={{ property: property.slug, kind: "viewing" }}>
                  <CalendarCheck className="h-4 w-4" /> Book a viewing
                </Link>
              </Button>
            </div>

            {/* Agent card */}
            {agent && (
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <img src={agent.photo} alt={agent.name} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <Link to="/agents/$id" params={{ id: agent.slug }} className="font-display font-semibold text-primary hover:text-accent">
                      {agent.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {agent.rating} · {agent.years}y exp
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                    <a href={`tel:${agent.phone}`}><Phone className="h-3.5 w-3.5" /> Call</a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                    <a href={`mailto:${agent.email}`}><Mail className="h-3.5 w-3.5" /> Email</a>
                  </Button>
                </div>
              </div>
            )}

            {/* Inquiry */}
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <h3 className="mb-1 flex items-center gap-2 font-display font-semibold text-primary">
                <CalendarDays className="h-4 w-4 text-accent" /> Request info
              </h3>
              <p className="mb-4 text-xs text-muted-foreground">Get details or schedule a tour.</p>
              <InquiryForm
                propertyId={property.id}
                propertyTitle={property.title}
                agentSlug={agent?.slug}
                compact
              />
            </div>
          </aside>
        </div>

        {/* More from agent */}
        {moreFromAgent.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-primary">
              More from {agent?.name}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {moreFromAgent.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SpecTile({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 text-center shadow-soft">
      <Icon className="mx-auto h-5 w-5 text-accent" />
      <div className="mt-2 font-display font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
