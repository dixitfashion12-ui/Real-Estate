import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../Hero";
import { TrustBar } from "../TrustBar";
import { FeaturedProperties } from "../FeaturedProperties";
import { SearchFeatures } from "../SearchFeatures";
import { WhyChooseUs } from "../WhyChooseUs";
import { HowItWorks } from "../HowItWorks";
import { PropertyMatchChat } from "../PropertyMatchChat";
import { MarketInsights } from "../MarketInsights";
import { Agents } from "../Agents";
import { Testimonials } from "../Testimonials";
import { MobileApp } from "../MobileApp";
import { FAQ, faqJsonLd } from "../FAQ";
import { FinalCTA } from "../FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Homzy — Find Your Dream Home with Confidence" },
      {
        name: "description",
        content:
          "Discover 50,000+ verified properties, 5,000+ expert agents, live market insights, mortgage help and 3D tours — the premium way to buy, rent, or invest.",
      },
      { property: "og:title", content: "Homzy — Find Your Dream Home with Confidence" },
      {
        property: "og:description",
        content:
          "Verified listings, top agents, market data and mortgage help — the premium real estate platform trusted by 5M+ buyers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Homzy — Find Your Dream Home with Confidence" },
      {
        name: "twitter:description",
        content: "Premium real estate. Verified listings. Trusted agents. Live market insights.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <FeaturedProperties />
      <SearchFeatures />
      <WhyChooseUs />
      <HowItWorks />
      <PropertyMatchChat />
      <MarketInsights />
      <Agents />
      <Testimonials />
      <MobileApp />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
