import { Link } from "@tanstack/react-router";
import { MapPin, TrendingUp } from "lucide-react";
import { SearchCard } from "./SearchCard";

const chips = [
  { label: "Miami", icon: MapPin },
  { label: "Los Angeles", icon: MapPin },
  { label: "Austin", icon: TrendingUp },
  { label: "Manhattan", icon: MapPin },
  { label: "Seattle", icon: TrendingUp },
  { label: "Boston", icon: MapPin },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pb-20 pt-8 sm:pb-28"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1280&fit=crop"
          alt=""
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/50 to-background" />
        <div className="absolute inset-0 bg-gradient-glow" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl pt-16 text-center sm:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            5M+ buyers found their home this year
          </div>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Find Your Dream Home <br className="hidden sm:block" />
            <span className="text-gradient bg-gradient-to-r from-white via-white to-white/70 bg-clip-text">
              with Confidence
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-white/85 sm:text-lg">
            Discover verified properties, expert agents, market insights, and mortgage assistance —
            all in one premium place.
          </p>
        </div>

        <div className="mt-10 sm:mt-14">
          <SearchCard />
        </div>

        {/* Popular locations */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-medium text-white/70">Trending:</span>
          {chips.map((c) => (
            <Link
              key={c.label}
              to="/properties"
              search={{ location: c.label }}
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-white transition-transform hover:scale-105"
            >
              <c.icon className="h-3 w-3" />
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


