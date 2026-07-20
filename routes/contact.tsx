import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ContactPage } from "../ContactPage";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ agent: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Contact — Homzy" },
      { name: "description", content: "Get in touch with the Homzy team for buying, renting, or listing help." },
    ],
  }),
  component: ContactPage,
});
