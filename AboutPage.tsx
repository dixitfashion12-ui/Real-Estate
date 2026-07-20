import { Link } from "@tanstack/react-router";
import { Building2, Users, Globe2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { WhyChooseUs } from "./WhyChooseUs";
import { HowItWorks } from "./HowItWorks";
import { MarketInsights } from "./MarketInsights";

const stats = [
  { icon: Users, value: "5M+", label: "Buyers served" },
  { icon: Building2, value: "50K+", label: "Verified listings" },
  { icon: Globe2, value: "25", label: "Countries" },
  { icon: ShieldCheck, value: "4.9/5", label: "Customer rating" },
];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-gradient-glow opacity-60" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/90">
            About Homzy
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Real estate, reimagined around trust
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            Homzy started with a simple belief: buying or renting a home should feel calm, transparent,
            and premium. Today we bring verified listings, expert agents, live market data, and
            end-to-end support together in one place — trusted by millions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/95">
              <Link to="/properties">Explore properties <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/60 bg-card py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto h-7 w-7 text-accent" />
              <div className="mt-3 font-display text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <HowItWorks />
      <MarketInsights />
    </div>
  );
}
