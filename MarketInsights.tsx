import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
} from "recharts";
import { TrendingUp, MapPin, ArrowUpRight } from "lucide-react";

const priceTrend = [
  { m: "Jan", v: 412 }, { m: "Feb", v: 425 }, { m: "Mar", v: 438 },
  { m: "Apr", v: 455 }, { m: "May", v: 468 }, { m: "Jun", v: 482 },
  { m: "Jul", v: 495 }, { m: "Aug", v: 510 }, { m: "Sep", v: 528 },
  { m: "Oct", v: 542 }, { m: "Nov", v: 558 }, { m: "Dec", v: 574 },
];

const appreciation = [
  { area: "Austin", v: 12.4 },
  { area: "Miami", v: 10.8 },
  { area: "Denver", v: 9.2 },
  { area: "Nashville", v: 8.6 },
  { area: "Raleigh", v: 7.9 },
];

const hotspots = [
  { name: "Downtown Miami", yield: "6.8%", change: "+12.4%" },
  { name: "Austin Tech Corridor", yield: "5.9%", change: "+10.8%" },
  { name: "Brooklyn Heights", yield: "4.7%", change: "+8.2%" },
  { name: "Silver Lake, LA", yield: "5.2%", change: "+7.4%" },
];

export function MarketInsights() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <TrendingUp className="h-3 w-3" /> Market Insights
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Data that moves before the market does
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Price trend */}
          <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Median Price
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-primary">$574K</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                <ArrowUpRight className="h-3 w-3" /> +14.2% YoY
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrend}>
                  <defs>
                    <linearGradient id="pt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.22 262)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="oklch(0.55 0.22 262)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" vertical={false} />
                  <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 255)", boxShadow: "var(--shadow-elevated)" }} />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="oklch(0.55 0.22 262)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Appreciation */}
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Top appreciating cities
            </p>
            <p className="mt-1 font-display text-lg font-bold text-primary">Year over year %</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appreciation} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="area" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "oklch(0.207 0.03 264)" }} width={70} />
                  <Bar dataKey="v" fill="oklch(0.55 0.22 262)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Investment hotspots */}
          <div className="lg:col-span-3 rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-primary">
                Investment hotspots
              </h3>
              <span className="text-xs text-muted-foreground">Rental yield · YoY change</span>
            </div>
            <ul className="divide-y divide-border/60">
              {hotspots.map((h) => (
                <li key={h.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-accent">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-foreground">{h.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-primary">{h.yield}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                      <ArrowUpRight className="h-3 w-3" /> {h.change}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
