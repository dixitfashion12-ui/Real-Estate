import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PropertiesPage } from "../../PropertiesPage";

const searchSchema = z.object({
  type: z.enum(["all", "sale", "rent", "commercial"]).optional(),
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  beds: z.number().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "newest", "area-desc"]).optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/properties/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Browse Properties — Homzy" },
      {
        name: "description",
        content: "Search verified homes for sale and rent. Filter by location, price, bedrooms and more.",
      },
    ],
  }),
  component: PropertiesPage,
});
