import { createFileRoute } from "@tanstack/react-router";
import { AgentsPage } from "../../AgentsPage";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "Our Agents — Homzy" },
      { name: "description", content: "Meet Homzy's top-rated real estate agents across luxury, urban, investment, and family homes." },
    ],
  }),
  component: AgentsPage,
});
