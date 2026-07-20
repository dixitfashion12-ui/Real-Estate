import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "../AuthPage";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Homzy" }] }),
  component: () => <AuthPage mode="register" />,
});
