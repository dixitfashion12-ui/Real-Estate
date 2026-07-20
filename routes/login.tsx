import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "../AuthPage";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Homzy" }] }),
  component: () => <AuthPage mode="login" />,
});
