import { Star } from "lucide-react";
import { Counter } from "./Counter";

const stats = [
  { value: 5_000_000, suffix: "+", label: "Trusted buyers" },
  { value: 50_000, suffix: "+", label: "Verified properties" },
  { value: 5_000, suffix: "+", label: "Expert agents" },
  { value: 25, suffix: "+", label: "Countries" },
];

export function TrustBar() {
  return (
    <section aria-label="Trust indicators" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-card shadow-soft border border-border/50 p-8 sm:p-10">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm font-semibold text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">/ 5 from 120,000+ reviews</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ranked #1 real estate platform by leading industry publications
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
