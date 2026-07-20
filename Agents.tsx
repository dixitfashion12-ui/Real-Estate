import { Link } from "@tanstack/react-router";
import { Star, Phone, Calendar } from "lucide-react";
import { Button } from "./button";
import { getAllAgents } from "./lib/queries";

const agents = getAllAgents().slice(0, 4);

export function Agents() {
  return (
    <section id="agents" className="py-20 sm:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Meet your top-rated agents
          </h2>
          <p className="mt-3 text-muted-foreground">
            Handpicked experts in their neighborhoods. Available today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a) => (
            <div
              key={a.id}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              <Link to="/agents/$id" params={{ id: a.slug }} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={a.photo}
                    alt={a.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {a.rating}
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <Link to="/agents/$id" params={{ id: a.slug }}>
                  <h3 className="font-display text-lg font-semibold text-primary hover:text-accent">{a.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground">{a.role}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-muted p-2 text-center">
                    <div className="font-display font-bold text-primary">{a.years}y</div>
                    <div className="text-muted-foreground">Experience</div>
                  </div>
                  <div className="rounded-xl bg-muted p-2 text-center">
                    <div className="font-display font-bold text-primary">{a.salesVolume}</div>
                    <div className="text-muted-foreground">Sold</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1 rounded-full text-xs">
                    <Link to="/agents/$id" params={{ id: a.slug }}>
                      <Phone className="h-3 w-3" /> Contact
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1 rounded-full bg-gradient-accent text-white text-xs">
                    <Link to="/agents/$id" params={{ id: a.slug }}>
                      <Calendar className="h-3 w-3" /> Schedule
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/agents">View all agents</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
