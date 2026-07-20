import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "./button";
import { PropertyCard } from "./PropertyCard";
import { getFeaturedProperties } from "./lib/queries";

const featured = getFeaturedProperties(6);

export function FeaturedProperties() {
  return (
    <section id="properties" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="h-3 w-3" /> Featured
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Handpicked homes, ready to move in
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every listing is verified, priced fairly, and photographed to broker standard.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/properties">View all properties</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
