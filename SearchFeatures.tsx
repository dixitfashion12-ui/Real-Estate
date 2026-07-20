import {
  Search, Sparkles, Map, Landmark, Calculator, TrendingUp,
  GraduationCap, Hospital, Train, Shield, Footprints, Camera,
} from "lucide-react";

const features = [
  { icon: Search, title: "Advanced Search", desc: "Filter by 40+ criteria" },
  { icon: Sparkles, title: "AI Recommendations", desc: "Homes matched to you" },
  { icon: Map, title: "Map Search", desc: "Explore by draw & radius" },
  { icon: Landmark, title: "Neighborhood Insights", desc: "Livability at a glance" },
  { icon: Calculator, title: "Mortgage Calculator", desc: "Estimate monthly costs" },
  { icon: TrendingUp, title: "Price Trends", desc: "12-month history" },
  { icon: GraduationCap, title: "School Ratings", desc: "GreatSchools scores" },
  { icon: Hospital, title: "Nearby Hospitals", desc: "Distance & rating" },
  { icon: Train, title: "Metro & Transit", desc: "Commute score" },
  { icon: Shield, title: "Crime Score", desc: "Real-time safety data" },
  { icon: Footprints, title: "Walkability", desc: "Walk / Bike / Transit" },
  { icon: Camera, title: "Virtual & 3D Tours", desc: "Tour before you visit" },
];

export function SearchFeatures() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Everything you need to decide
          </h2>
          <p className="mt-3 text-muted-foreground">
            Twelve integrated tools help you evaluate any property, in any city, on one screen.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated hover:border-accent/30"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-accent text-white shadow-glow">
                <f.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-display font-semibold text-primary">{f.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
