import { createFileRoute } from "@tanstack/react-router";
import { PropertyDetailPage } from "../../PropertyDetailPage";
import { getPropertyBySlug } from "../../lib/queries";

export const Route = createFileRoute("/properties/$id")({
  head: ({ params }) => {
    const property = getPropertyBySlug(params.id);
    return {
      meta: [
        { title: property ? `${property.title} — Homzy` : "Property — Homzy" },
        {
          name: "description",
          content: property
            ? `${property.title} in ${property.location.city}, ${property.location.state}. ${property.priceLabel}.`
            : "View this property on Homzy.",
        },
      ],
    };
  },
  component: PropertyDetailPage,
});
