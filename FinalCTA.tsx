import { Link } from "@tanstack/react-router";
import { Search, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "./button";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 sm:p-16 text-center shadow-elevated">
          <div className="absolute inset-0 bg-gradient-glow opacity-70" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to find your dream home?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Join 5 million buyers who trust Homzy. Start your search today — it takes 30 seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/95 shadow-glow"
              >
                <Link to="/properties">
                  <Search className="h-4 w-4" /> Search Properties
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                <Link to="/contact">
                  <MessageSquare className="h-4 w-4" /> Contact an expert
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

