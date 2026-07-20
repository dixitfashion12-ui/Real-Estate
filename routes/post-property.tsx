import { createFileRoute } from "@tanstack/react-router";
import { PostPropertyPage } from "../PostPropertyPage";

export const Route = createFileRoute("/post-property")({
  head: () => ({ meta: [{ title: "Post a Property — Homzy" }] }),
  component: PostPropertyPage,
});
