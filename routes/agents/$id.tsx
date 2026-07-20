import { createFileRoute } from "@tanstack/react-router";
import { AgentDetailPage } from "../../AgentDetailPage";
import { getAgentBySlug } from "../../lib/queries";

export const Route = createFileRoute("/agents/$id")({
  head: ({ params }) => {
    const agent = getAgentBySlug(params.id);
    return {
      meta: [
        { title: agent ? `${agent.name} — Homzy` : "Agent — Homzy" },
        { name: "description", content: agent ? `${agent.name}, ${agent.role} at Homzy.` : "Homzy agent profile." },
      ],
    };
  },
  component: AgentDetailPage,
});
