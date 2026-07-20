import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CheckoutSuccessPage } from "../CheckoutSuccessPage";

export const Route = createFileRoute("/checkout-success")({
  validateSearch: z.object({ order: z.string().optional() }),
  head: () => ({ meta: [{ title: "Payment Confirmed — Homzy" }] }),
  component: CheckoutSuccessPage,
});
