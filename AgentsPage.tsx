import { Link } from "@tanstack/react-router";
import { Star, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { getAllAgents, getListingsByAgent } from "./lib/queries";

export function AgentsPage() {
  const agents = getAllAgents();

  return (
    <div className="bg-gradient-soft">
      <div className="bg-primary/95 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Our agents</h1>
          <p className="mt-2 max-w-2xl text-white/75">
            Handpicked, top-rated specialists across luxury, urban, investment, and family homes.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => {
            const count = getListingsByAgent(a.id).length;
            return (
              <div
                key={a.id}
                className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="flex items-center gap-4 p-6">
                  <img src={a.photo} alt={a.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <Link to="/agents/$id" params={{ id: a.slug }} className="font-display text-lg font-semibold text-primary hover:text-accent">
                      {a.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{a.role}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {a.rating} · {a.years}y · {count} listings
                    </p>
                  </div>
                </div>
                <p className="px-6 text-sm text-foreground/75 line-clamp-3">{a.bio}</p>
                <div className="flex gap-2 p-6 pt-4">
                  <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                    <a href={`tel:${a.phone}`}><Phone className="h-3.5 w-3.5" /> Call</a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                    <a href={`mailto:${a.email}`}><Mail className="h-3.5 w-3.5" /> Email</a>
                  </Button>
                  <Button asChild size="sm" className="flex-1 rounded-full bg-gradient-accent text-white">
                    <Link to="/agents/$id" params={{ id: a.slug }}>
                      View <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
