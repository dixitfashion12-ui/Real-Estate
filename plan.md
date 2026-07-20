# Premium Real Estate Landing Page

A single-route landing page at `/` combining the polish of Apple/Airbnb/Stripe/Linear with Zillow-grade property search UX. Built as pure frontend presentation — no backend, forms are visual-only.

## Design foundation

- **Palette** (installed as OKLCH tokens in `src/styles.css`, mapped through `@theme inline`):
  - `--primary` #0F172A (deep navy), `--secondary` #1E40AF, `--accent` #2563EB
  - `--success` #22C55E, `--background` #F8FAFC, `--card` #FFFFFF
  - `--foreground` #111827, `--muted-foreground` #6B7280
  - Custom tokens: `--gradient-hero`, `--gradient-accent`, `--gradient-glass`, `--shadow-soft`, `--shadow-elevated`, `--shadow-glass`
- **Typography**: Plus Jakarta Sans (headings) + Inter (body) loaded via `<link>` in `__root.tsx` head.
- **Radii**: generous (rounded-2xl / rounded-3xl standard).
- **Motion**: fade-in, scale-in, floating cards, animated counters, hover elevate, image zoom on card hover, smooth scroll, ripple on primary buttons. Uses existing Tailwind animate utilities + `tw-animate-css`.

## Page sections (in order)

1. **Sticky glass nav** — logo left; Home / Properties / Buy / Rent / Commercial / Agents / About / Contact; right: Login (ghost), Register (outline), "Post Property" (primary gradient). Blurred glass background on scroll.
2. **Hero** — full-viewport luxury home photograph (generated), gradient overlay, H1 "Find Your Dream Home with Confidence", subheadline, floating glass search card centered with tabs (Buy / Rent / Commercial / Projects) and inputs: Location (with autosuggest chips), Price Range, Bedrooms, Property Type, big Search CTA. Below: pill row of Popular cities, Trending, Recently searched.
3. **Trust bar** — 5★ line + 4 animated counters (5M+ buyers, 50K+ properties, 5K+ agents, 25+ countries).
4. **Featured Properties** — 6 luxury cards in responsive grid: large image (zoom on hover), Verified + New badges, price, name, location, beds/baths/garage/area icons, Save (heart) + Compare toggles.
5. **Search Features** — bento-style grid of 12 feature tiles (Advanced Search, AI Recs, Map, Neighborhood, Mortgage Calc, Price Trends, Schools, Hospitals, Metro, Crime, Walkability, Virtual/3D Tour).
6. **Why Choose Us** — 10 icon cards in 5×2 grid (Verified Listings, Trusted Agents, Transparent Pricing, Fast Search, AI Matching, 24/7 Support, Mortgage, Legal, Valuation, Investment Advice).
7. **How It Works** — 3-step horizontal timeline with numbered illustrated nodes (Search → Schedule Visit → Own Your Home).
8. **Market Insights** — 3 chart cards using Recharts: price-trend line, area appreciation bar, popular-locations horizontal bar; side stats for rental yield and recent transactions.
9. **Top Agents** — 4 premium agent cards: portrait, name, experience, sales count, star rating, Contact + Schedule Call buttons.
10. **Testimonials** — glass carousel of 6 client testimonials with photo, name, verified-buyer badge, rating, quote.
11. **Mobile App** — split layout: phone mockup (SVG frame + generated app screenshot) left, feature list + QR + App Store + Google Play badges right.
12. **FAQ** — shadcn Accordion with 8 questions across Buying/Selling/Renting/Mortgage/Legal/Registration.
13. **Final CTA** — full-width gradient band, "Ready to Find Your Dream Home?", two buttons (Search Properties primary, Contact Expert outline).
14. **Footer** — 5-column informative footer (Properties, Resources, Company, Support, Contact) + newsletter signup + social row + phone/email/address block + legal bar.

**Floating utilities** — sticky WhatsApp bubble (bottom-right) and Call button (stacked), fading in after hero.

## Files to create/modify

- `src/routes/index.tsx` — assemble page, set head() with real title/description/og.
- `src/routes/__root.tsx` — add Plus Jakarta Sans + Inter `<link>` tags; update fallback meta.
- `src/styles.css` — add color tokens, gradients, shadows, custom utilities (`.glass`, `.text-gradient`, `.shadow-elevated`).
- `src/components/landing/` — one file per section: `Navbar.tsx`, `Hero.tsx`, `SearchCard.tsx`, `TrustBar.tsx`, `FeaturedProperties.tsx`, `PropertyCard.tsx`, `SearchFeatures.tsx`, `WhyChooseUs.tsx`, `HowItWorks.tsx`, `MarketInsights.tsx`, `Agents.tsx`, `Testimonials.tsx`, `MobileApp.tsx`, `FAQ.tsx`, `FinalCTA.tsx`, `Footer.tsx`, `FloatingContact.tsx`, `Counter.tsx` (animated number).
- `src/assets/` — generated images: hero (luxury villa dusk), 6 property photos, 4 agent portraits, 6 testimonial avatars, app-screenshot. All uploaded via `lovable-assets` CLI and referenced from `.asset.json` pointers.

## Technical details

- shadcn components used: Button, Input, Select, Tabs, Card, Badge, Accordion, Carousel, Avatar, Separator, Tooltip.
- Recharts for market insights (already fine for edge runtime — pure JS).
- Counters use IntersectionObserver + rAF (client-only via `useEffect`).
- All images lazy (`loading="lazy"`) except hero (eager + `fetchpriority="high"`).
- Semantic landmarks: `<header>`, single `<main>` wrapping sections, `<section aria-labelledby>` per block, `<footer>`. One H1 (hero); H2 per section.
- FAQ emits JSON-LD `FAQPage` schema via head() scripts.
- Head meta: title "Homzy — Find Your Dream Home with Confidence" (placeholder brand — will name in build), matching description, og:title/description/type=website, twitter:card=summary_large_image. No og:image (deferred to hosting default).
- Fully responsive: mobile-first, grids collapse to 1-col, sticky nav becomes drawer via shadcn Sheet on `<md`. Tap targets ≥44px.
- Accessibility: `aria-label` on all icon-only buttons, focus-visible rings using `--ring`, color contrast ≥AA against `--background`.

## Out of scope (visual-only)

Forms, search, chat, calculator, maps, virtual tours are non-functional UI shells — buttons are styled but no backend wiring. No auth, no database. If the user wants any of these live later, we'll add them in a follow-up.