import type { Metadata } from "next";
import CasesClient from "./CasesClient";

export const metadata: Metadata = {
  title: "Client Success Stories — Pet Food, Beverage & Snack Brand Growth",
  description:
    "Real results: 200% GMV growth for a pet food brand, omni-channel digital roadmap for an international beverage giant, and successful 0-to-1 launches for a global snack brand.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Client Success Stories — Brand Growth Cases",
    description:
      "Driven by consumer insight, TLU helps brands achieve closed-loop growth across categories. See real client results.",
    url: "/cases",
  },
};

export default function Cases() {
  return <CasesClient />;
}
