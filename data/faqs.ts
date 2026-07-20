export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How do I buy a property through Homzy?",
    a: "Search verified listings, save your favorites, book a tour, and one of our agents will guide you from offer to close. All paperwork, mortgage, and legal support is included.",
  },
  {
    q: "How do I list my property for sale or rent?",
    a: "Click 'Post Property' at the top. Add photos, price, and details. Our team verifies the listing within 24 hours and it goes live to millions of buyers.",
  },
  {
    q: "Can I rent long-term or short-term?",
    a: "Yes. Filter by lease length in the search — Homzy supports monthly, annual, and vacation rentals with the same verified quality.",
  },
  {
    q: "Do you help with mortgages?",
    a: "We compare offers from 40+ lenders, pre-qualify you in minutes, and support you through underwriting — all inside the app.",
  },
  {
    q: "Is legal support included?",
    a: "Every closing includes contract review by a licensed attorney at no extra cost. Additional services are available on request.",
  },
  {
    q: "How do I register an account?",
    a: "Tap 'Register' — you can sign up with email, Google, or Apple. Verified profiles unlock saved searches, favorites, and instant tour booking.",
  },
  {
    q: "Are all listings verified?",
    a: "Yes. Each listing is fact-checked by our verification team before going live. Fraudulent or duplicate listings are removed automatically.",
  },
  {
    q: "How does the AI recommendation work?",
    a: "Homzy learns your preferences from the homes you save and skip, then surfaces new listings that match your budget, lifestyle, and commute.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
