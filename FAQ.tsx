import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { faqs } from "./data/faqs";

export function FAQ() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Answers to what our buyers and sellers ask most.
          </p>
        </div>

        <Accordion type="single" collapsible className="rounded-3xl border border-border/60 bg-card p-2 shadow-soft">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60 last:border-0 px-4">
              <AccordionTrigger className="text-left font-display text-base font-semibold text-primary hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
