import { getRouteApi, Link } from "@tanstack/react-router";
import { Star, Phone, Mail, Award, Home, TrendingUp } from "lucide-react";
import { Button } from "./button";
import { PropertyCard } from "./PropertyCard";
import { InquiryForm } from "./InquiryForm";
import { getAgentBySlug, getListingsByAgent } from "./lib/queries";

const routeApi = getRouteApi("/agents/$id");

export function AgentDetailPage() {
  const { id } = routeApi.useParams();
  const agent = getAgentBySlug(id);

  if (!agent) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Agent not found</h1>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/agents">Back to agents</Link>
        </Button>
      </div>
    );
  }

  const listings = getListingsByAgent(agent.id);

  return (
    <div className="bg-gradient-soft pb-20">
      {/* Header */}
      <div className="bg-primary/95 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <img src={agent.photo} alt={agent.name} className="h-28 w-28 rounded-3xl object-cover ring-4 ring-white/10" />
            <div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">{agent.name}</h1>
              <p className="mt-1 text-white/80">{agent.role}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {agent.rating} rating</span>
                <span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4 text-accent" /> {agent.years} years</span>
                <span className="inline-flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-accent" /> {agent.salesVolume} sold</span>
                <span className="inline-flex items-center gap-1.5"><Home className="h-4 w-4 text-accent" /> {listings.length} active listings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">About {agent.name.split(" ")[0]}</h2>
            <p className="mt-3 leading-relaxed text-foreground/80">{agent.bio}</p>

            {listings.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-6 font-display text-xl font-semibold text-primary">
                  Listings by {agent.name.split(" ")[0]}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {listings.map((p) => (
                    <PropertyCard key={p.id} p={p} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1 rounded-full">
                  <a href={`tel:${agent.phone}`}><Phone className="h-4 w-4" /> Call</a>
                </Button>
                <Button asChild variant="outline" className="flex-1 rounded-full">
                  <a href={`mailto:${agent.email}`}><Mail className="h-4 w-4" /> Email</a>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
              <h3 className="mb-4 font-display font-semibold text-primary">Contact {agent.name.split(" ")[0]}</h3>
              <InquiryForm agentSlug={agent.slug} compact defaultMessage={`Hi ${agent.name.split(" ")[0]}, I'd like your help finding a property.`} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
