import { Link } from "@tanstack/react-router";
import { Heart, GitCompareArrows, BedDouble, Bath, Car, Ruler, MapPin, BadgeCheck } from "lucide-react";
import { Badge } from "./badge";
import type { Property } from "./data/properties";
import { useFavorites } from "./context/FavoritesContext";

export function PropertyCard({ p }: { p: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(p.id);

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-card shadow-soft border border-border/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
      <Link to="/properties/$id" params={{ id: p.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={p.images[0]}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full bg-primary/90 text-white backdrop-blur">{p.status}</Badge>
              {p.isNew && <Badge className="rounded-full bg-success text-white">New</Badge>}
            </div>
          </div>
          {p.verified && (
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[11px] font-semibold text-white">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </div>
          )}
        </div>
      </Link>

      {/* Save / Compare (outside the Link so they don't navigate) */}
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          aria-label={saved ? "Remove from saved" : "Save"}
          aria-pressed={saved}
          onClick={() => toggleFavorite(p.id)}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : "text-primary"}`} />
        </button>
        <button
          aria-label="Compare"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white"
        >
          <GitCompareArrows className="h-4 w-4 text-primary" />
        </button>
      </div>

      <div className="p-5">
        <Link to="/properties/$id" params={{ id: p.slug }} className="mb-1 flex items-center justify-between gap-3">
          <h3 className="truncate font-display text-lg font-semibold text-primary hover:text-accent">{p.title}</h3>
          <span className="shrink-0 font-display font-bold text-primary">{p.priceLabel}</span>
        </Link>
        <p className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {p.location.city}, {p.location.state}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          {p.beds > 0 && <Spec icon={BedDouble} v={`${p.beds} Beds`} />}
          <Spec icon={Bath} v={`${p.baths} Baths`} />
          {p.garage > 0 && <Spec icon={Car} v={`${p.garage} Garage`} />}
          <Spec icon={Ruler} v={`${p.areaSqft.toLocaleString()} sqft`} />
        </div>
      </div>
    </article>
  );
}

function Spec({ icon: Icon, v }: { icon: React.ComponentType<{ className?: string }>; v: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-accent" />
      <span className="font-medium text-foreground/80">{v}</span>
    </span>
  );
}
