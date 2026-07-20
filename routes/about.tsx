import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Homzy" },
      { name: "description", content: "Homzy brings verified listings, expert agents, and live market data together — trusted by 5 million buyers." },
    ],
  }),
  component: AboutPage,
});
