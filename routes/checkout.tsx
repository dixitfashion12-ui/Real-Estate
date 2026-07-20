import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CheckoutPage } from "../CheckoutPage";

export const Route = createFileRoute("/checkout")({
  validateSearch: z.object({
    property: z.string().optional(),
    kind: z.enum(["deposit", "viewing"]).optional(),
  }),
  head: () => ({ meta: [{ title: "Checkout — Homzy" }] }),
  component: CheckoutPage,
});
