import { Star, BadgeCheck, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { testimonials } from "./data/testimonials";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Loved by 5 million buyers
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real stories from people who found their home with Homzy.
          </p>
        </div>

        <Carousel opts={{ loop: true, align: "start" }} className="w-full">
          <CarouselContent>
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-5 w-5 text-accent/40" />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                    <img
                      src={t.img}
                      alt={t.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="truncate text-sm font-semibold text-primary">{t.name}</p>
                        <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-accent" />
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}



