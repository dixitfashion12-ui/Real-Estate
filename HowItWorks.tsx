import { Search, CalendarCheck, KeyRound, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search your property",
    desc: "Filter, save favorites, and compare listings side by side.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule a visit",
    desc: "Book in-person tours or 3D virtual walkthroughs in one tap.",
  },
  {
    icon: KeyRound,
    title: "Own your dream home",
    desc: "Close with confidence — legal, mortgage, and paperwork handled.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Three steps to keys in hand
          </h2>
          <p className="mt-3 text-muted-foreground">
            The whole journey, in a rhythm that respects your time.
          </p>
        </div>

        <div className="relative">
          {/* connecting line */}
          <div className="absolute left-1/2 top-8 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-card shadow-elevated ring-1 ring-border/60">
                    <s.icon className="h-6 w-6 text-accent" strokeWidth={2} />
                  </div>
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-accent text-xs font-bold text-white shadow-glow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
