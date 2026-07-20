import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bot, Sparkles, RotateCcw, ArrowRight, Search } from "lucide-react";
import { Button } from "./button";
import { PropertyCard } from "./PropertyCard";
import { filterProperties } from "./lib/queries";
import { priceRanges, bedroomOptions } from "./data/filters";
import type { PropertyType } from "./data/properties";

type Choice = { label: string; value: string };

type Bracket = { label: string; value: string; min: number; max: number };

type Answers = {
  type?: PropertyType;
  location?: string;
  price?: Bracket;
  beds?: string; // bedroomOptions value
};

const MAX = Number.MAX_SAFE_INTEGER;

// Sale prices are absolute; rent/commercial priceValue is a MONTHLY figure, so each
// listing type needs its own budget brackets or every high bracket returns 0 matches.
const saleBrackets: Bracket[] = priceRanges
  .filter((r) => r.value !== "any")
  .map((r) => ({ label: r.label, value: r.value, min: r.min, max: r.max }));

const rentBrackets: Bracket[] = [
  { label: "Up to $3K/mo", value: "r0", min: 0, max: 3000 },
  { label: "$3K – $6K/mo", value: "r1", min: 3000, max: 6000 },
  { label: "$6K – $10K/mo", value: "r2", min: 6000, max: 10000 },
  { label: "$10K+/mo", value: "r3", min: 10000, max: MAX },
];

const commercialBrackets: Bracket[] = [
  { label: "Up to $10K/mo", value: "c0", min: 0, max: 10000 },
  { label: "$10K – $20K/mo", value: "c1", min: 10000, max: 20000 },
  { label: "$20K+/mo", value: "c2", min: 20000, max: MAX },
];

function bracketsFor(type: PropertyType | undefined): Bracket[] {
  if (type === "rent") return rentBrackets;
  if (type === "commercial") return commercialBrackets;
  return saleBrackets;
}

const typeChoices: { label: string; value: PropertyType }[] = [
  { label: "🏡 Buy", value: "sale" },
  { label: "🔑 Rent", value: "rent" },
  { label: "🏢 Commercial", value: "commercial" },
];

const cityChoices: Choice[] = [
  { label: "Miami", value: "Miami" },
  { label: "Austin", value: "Austin" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Manhattan", value: "Manhattan" },
  { label: "Boston", value: "Boston" },
  { label: "San Francisco", value: "San Francisco" },
  { label: "🌎 Anywhere", value: "any" },
];

const bedChoices: Choice[] = bedroomOptions
  .filter((b) => b.value !== "any")
  .map((b) => ({ label: `${b.label} beds`, value: b.value }));

type Turn = { from: "bot" | "user"; text: string };

const typeWord: Record<PropertyType, string> = {
  sale: "Homes for Sale",
  rent: "Rentals",
  commercial: "Commercial Spaces",
};

// Tier prefix only applies to sale prices (absolute). Rent/commercial use monthly figures.
function tierLabel(priceValue: string | undefined): string {
  switch (priceValue) {
    case "0-500k": return "Starter";
    case "500k-1m": return "Mid-Market";
    case "1m-3m": return "Premium";
    case "3m-6m":
    case "6m+": return "Luxury";
    default: return "";
  }
}

export function PropertyMatchChat() {
  // step: 0=type, 1=city, 2=price, 3=beds, 4=result
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [transcript, setTranscript] = useState<Turn[]>([
    { from: "bot", text: "Hi! I'm Homzy's match assistant. Answer a few quick questions and I'll find your ideal category. First — what are you looking to do?" },
  ]);

  const pushTurns = (...turns: Turn[]) => setTranscript((t) => [...t, ...turns]);

  const answerType = (c: { label: string; value: PropertyType }) => {
    setAnswers((a) => ({ ...a, type: c.value }));
    pushTurns(
      { from: "user", text: c.label.replace(/^\S+\s/, "") },
      { from: "bot", text: "Great choice. Which area are you interested in?" },
    );
    setStep(1);
  };

  const answerCity = (c: Choice) => {
    setAnswers((a) => ({ ...a, location: c.value === "any" ? undefined : c.value }));
    pushTurns(
      { from: "user", text: c.label.replace(/^\S+\s/, "") },
      { from: "bot", text: "Perfect. What's your budget?" },
    );
    setStep(2);
  };

  const answerPrice = (b: Bracket) => {
    setAnswers((a) => ({ ...a, price: b }));
    // Commercial listings have no bedrooms → skip to result.
    if (answers.type === "commercial") {
      pushTurns({ from: "user", text: b.label });
      setStep(4);
      return;
    }
    pushTurns(
      { from: "user", text: b.label },
      { from: "bot", text: "Last one — how many bedrooms do you need?" },
    );
    setStep(3);
  };

  const answerBeds = (c: Choice) => {
    setAnswers((a) => ({ ...a, beds: c.value }));
    pushTurns({ from: "user", text: c.label });
    setStep(4);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setTranscript([
      { from: "bot", text: "Let's try again! What are you looking to do?" },
    ]);
  };

  // Build filter params from answers (used both for preview + the listings link).
  const price = answers.price;
  const filters = {
    type: answers.type,
    location: answers.location,
    minPrice: price && price.min > 0 ? price.min : undefined,
    maxPrice: price && price.max !== MAX ? price.max : undefined,
    beds: answers.beds ? Number(answers.beds) : undefined,
  };

  const result = step === 4 ? filterProperties({ ...filters, sort: "featured" }) : null;
  // Tier prefix only for sale; rent/commercial read as "Rentals"/"Commercial Spaces".
  const tier = answers.type === "sale" ? tierLabel(price?.value) : "";
  const category = answers.type
    ? [tier, typeWord[answers.type]].filter(Boolean).join(" ") +
      (answers.location ? ` in ${answers.location}` : "")
    : "";

  const searchParams: Record<string, unknown> = {};
  if (filters.type) searchParams.type = filters.type;
  if (filters.location) searchParams.location = filters.location;
  if (filters.minPrice != null) searchParams.minPrice = filters.minPrice;
  if (filters.maxPrice != null) searchParams.maxPrice = filters.maxPrice;
  if (filters.beds != null) searchParams.beds = filters.beds;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="h-3 w-3" /> Find your match
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Tell us what you want. We'll match the category.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Answer a few quick questions and get an instant, tailored recommendation.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elevated">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-primary px-5 py-4 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">Homzy Match Assistant</p>
              <p className="text-xs text-white/70">Typically replies instantly</p>
            </div>
          </div>

          {/* Transcript */}
          <div className="space-y-4 px-5 py-6 sm:px-8">
            {transcript.map((turn, i) => (
              <Bubble key={i} turn={turn} />
            ))}

            {/* Current question's choices */}
            <div className="pt-1">
              {step === 0 && <Choices choices={typeChoices} onPick={answerType} />}
              {step === 1 && <Choices choices={cityChoices} onPick={answerCity} />}
              {step === 2 && <Choices choices={bracketsFor(answers.type)} onPick={answerPrice} />}
              {step === 3 && <Choices choices={bedChoices} onPick={answerBeds} />}
            </div>

            {/* Result */}
            {step === 4 && result && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <Bubble
                  turn={{
                    from: "bot",
                    text:
                      result.total > 0
                        ? `Based on your answers, your match is 👇`
                        : `I couldn't find an exact match, but here's the closest category and some options 👇`,
                  }}
                />
                <div className="ml-11 mt-3 rounded-2xl border border-accent/30 bg-accent/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Recommended category
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-primary">{category || "Recommended properties"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {result.total} matching {result.total === 1 ? "property" : "properties"} available now.
                  </p>

                  {result.items.length > 0 && (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {result.items.slice(0, 3).map((p) => (
                        <PropertyCard key={p.id} p={p} />
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild className="rounded-full bg-gradient-accent text-white">
                      <Link
                        to="/properties"
                        search={(result.total > 0 ? searchParams : { type: filters.type }) as never}
                      >
                        <Search className="h-4 w-4" /> View all matches
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="rounded-full" onClick={restart}>
                      <RotateCcw className="h-4 w-4" /> Start over
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ turn }: { turn: Turn }) {
  if (turn.from === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-accent px-4 py-2.5 text-sm font-medium text-white shadow-soft">
          {turn.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Bot className="h-4 w-4" />
      </span>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm text-foreground/90">
        {turn.text}
      </div>
    </div>
  );
}

function Choices<T extends { label: string; value: string }>({
  choices,
  onPick,
}: {
  choices: T[];
  onPick: (c: T) => void;
}) {
  return (
    <div className="ml-11 flex flex-wrap gap-2">
      {choices.map((c) => (
        <button
          key={c.value}
          onClick={() => onPick(c)}
          className="rounded-full border border-accent/40 bg-accent/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent hover:text-white"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
