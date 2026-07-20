import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "./toaster";
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube, Send } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

type FooterLink = { label: string; to: string; search?: Record<string, unknown> };

const cols: { title: string; items: FooterLink[] }[] = [
  {
    title: "Properties",
    items: [
      { label: "Buy", to: "/properties", search: { type: "sale" } },
      { label: "Rent", to: "/properties", search: { type: "rent" } },
      { label: "Commercial", to: "/properties", search: { type: "commercial" } },
      { label: "New Projects", to: "/properties" },
      { label: "Luxury Homes", to: "/properties", search: { sort: "price-desc" } },
      { label: "All Listings", to: "/properties" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Agents", to: "/agents" },
      { label: "Contact", to: "/contact" },
      { label: "Post Property", to: "/post-property" },
      { label: "Login", to: "/login" },
      { label: "Register", to: "/register" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", to: "/contact" },
      { label: "Contact Us", to: "/contact" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Privacy Policy", to: "/about" },
      { label: "Terms of Service", to: "/about" },
      { label: "Cookie Policy", to: "/about" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! Weekly market insights are on the way.");
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-primary text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-accent shadow-glow">
                <Home className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-bold text-white">Homzy</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              The premium real estate platform trusted by 5 million+ buyers across 25 countries.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a href="tel:+17754749842" className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-accent" /> +1 (775) 474-9842
              </a>
              <a href="mailto:hello@homzy.com" className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-accent" /> hello@homzy.com
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>200 Market Street, Suite 400 · San Francisco, CA 94105</span>
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-white">Get weekly market insights</p>
              <form className="flex gap-2" onSubmit={onSubscribe}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full"
                />
                <Button type="submit" size="icon" className="rounded-full bg-gradient-accent shrink-0" aria-label="Subscribe">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-display text-sm font-semibold text-white">{col.title}</p>
              <ul className="space-y-2 text-sm">
                {col.items.map((i) => (
                  <li key={i.label}>
                    <Link
                      to={i.to}
                      search={i.search as never}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Homzy Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
