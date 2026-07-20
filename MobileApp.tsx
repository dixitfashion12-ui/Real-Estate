import { Bell, Heart, Sparkles, Bookmark, Apple, Play } from "lucide-react";

const features = [
  { icon: Bell, title: "Instant Alerts", desc: "Be first to know when your match hits the market" },
  { icon: Bookmark, title: "Saved Searches", desc: "Pick up exactly where you left off" },
  { icon: Heart, title: "Favorites", desc: "Compare and organize the ones you love" },
  { icon: Sparkles, title: "AI Suggestions", desc: "Homes tailored to your taste and budget" },
];

export function MobileApp() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Phone mockup */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="absolute inset-0 -z-10 bg-gradient-glow" />
            <div className="relative animate-float">
              <div className="relative overflow-hidden rounded-[3rem] border-8 border-primary bg-primary shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=300&h=600&fit=crop"
                  alt="Homzy mobile app"
                  loading="lazy"
                  width={300}
                  height={600}
                  className="block h-auto w-[280px] object-cover sm:w-[320px]"
                />
              </div>
              {/* floating cards */}
              <div className="absolute -left-8 top-16 hidden rounded-2xl bg-white p-3 shadow-elevated md:block">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-success/10">
                    <Bell className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary">New match!</p>
                    <p className="text-[10px] text-muted-foreground">3 beds · $825K</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-20 hidden rounded-2xl bg-white p-3 shadow-elevated md:block">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary">AI picked 12 homes</p>
                    <p className="text-[10px] text-muted-foreground">Just for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Mobile app
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Your dream home,<br /> in your pocket
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Search, save, tour and negotiate — anywhere. Notifications the moment your dream listing appears.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.title} className="flex gap-3 rounded-2xl border border-border/60 bg-card p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-accent text-white">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-primary">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-2xl bg-primary px-5 py-3 text-white transition-transform hover:scale-[1.02]"
              >
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider opacity-70">Download on</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-2xl bg-primary px-5 py-3 text-white transition-transform hover:scale-[1.02]"
              >
                <Play className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider opacity-70">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </a>
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-white p-2">
                <QRPlaceholder />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QRPlaceholder() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full text-primary" fill="currentColor" aria-hidden>
      <rect x="0" y="0" width="12" height="12" />
      <rect x="28" y="0" width="12" height="12" />
      <rect x="0" y="28" width="12" height="12" />
      <rect x="4" y="4" width="4" height="4" fill="white" />
      <rect x="32" y="4" width="4" height="4" fill="white" />
      <rect x="4" y="32" width="4" height="4" fill="white" />
      <rect x="16" y="4" width="4" height="4" />
      <rect x="20" y="12" width="4" height="4" />
      <rect x="16" y="20" width="4" height="4" />
      <rect x="24" y="20" width="4" height="4" />
      <rect x="16" y="28" width="4" height="4" />
      <rect x="24" y="32" width="4" height="4" />
      <rect x="32" y="24" width="4" height="4" />
    </svg>
  );
}

