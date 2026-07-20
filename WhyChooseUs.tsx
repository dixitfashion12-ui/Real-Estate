import {
  BadgeCheck, Users, Tags, Zap, BrainCircuit, Headphones,
  Wallet, Scale, LineChart, PiggyBank,
} from "lucide-react";

const items = [
  { icon: BadgeCheck, title: "Verified Listings", desc: "Every property checked by our team" },
  { icon: Users, title: "Trusted Agents", desc: "Vetted, licensed, top-rated" },
  { icon: Tags, title: "Transparent Pricing", desc: "No hidden fees. Ever." },
  { icon: Zap, title: "Fast Search", desc: "Results in under 200ms" },
  { icon: BrainCircuit, title: "AI Matching", desc: "Homes tailored to your life" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here whenever you are" },
  { icon: Wallet, title: "Mortgage Assistance", desc: "Compare 40+ lenders" },
  { icon: Scale, title: "Legal Assistance", desc: "Contract review included" },
  { icon: LineChart, title: "Property Valuation", desc: "Data-backed estimates" },
  { icon: PiggyBank, title: "Investment Advice", desc: "ROI-focused guidance" },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            Why Homzy
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            A better way to buy, rent, and invest
          </h2>
          <p className="mt-3 text-muted-foreground">
            Premium service isn't a luxury. It's the standard.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:shadow-elevated"
            >
              <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-gradient-accent group-hover:text-white">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-semibold text-primary">{it.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
