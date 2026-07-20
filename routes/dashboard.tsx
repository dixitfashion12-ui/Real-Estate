import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "../DashboardPage";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Homzy" }] }),
  component: DashboardPage,
});
