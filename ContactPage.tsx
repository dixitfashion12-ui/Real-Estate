import { getRouteApi } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { InquiryForm } from "./InquiryForm";
import { getAgentBySlug } from "./lib/queries";

const routeApi = getRouteApi("/contact");

export function ContactPage() {
  const { agent: agentSlug } = routeApi.useSearch() as { agent?: string };
  const agent = agentSlug ? getAgentBySlug(agentSlug) : undefined;

  return (
    <div className="bg-gradient-soft">
      {/* Header */}
      <div className="bg-primary/95 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Get in touch</h1>
          <p className="mt-2 max-w-2xl text-white/75">
            Questions about buying, renting, or listing? Our team replies within one business day.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Info */}
          <div className="space-y-4">
            <InfoCard icon={Phone} title="Call us" lines={["+1 (775) 474-9842", "Mon–Fri, 8am–8pm"]} href="tel:+17754749842" />
            <InfoCard icon={Mail} title="Email" lines={["hello@homzy.com", "Support & sales"]} href="mailto:hello@homzy.com" />
            <InfoCard icon={MapPin} title="Head office" lines={["200 Market Street, Suite 400", "San Francisco, CA 94105"]} />
            <InfoCard icon={Clock} title="Hours" lines={["Weekdays 8am–8pm", "Weekends 9am–5pm"]} />
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
            <h2 className="mb-1 flex items-center gap-2 font-display text-xl font-semibold text-primary">
              <MessageSquare className="h-5 w-5 text-accent" />
              {agent ? `Message ${agent.name}` : "Send us a message"}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {agent
                ? `${agent.name} specializes in ${agent.role.toLowerCase()} and will get back to you personally.`
                : "Fill out the form and the right specialist will reach out."}
            </p>
            <InquiryForm
              agentSlug={agent?.slug}
              defaultMessage={agent ? `Hi ${agent.name.split(" ")[0]}, I'd like your help with a property.` : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-colors hover:border-accent/40">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold text-primary">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">{l}</p>
        ))}
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{content}</a> : content;
}
