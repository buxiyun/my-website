import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights — Brand Growth, AI & Consumer Trends",
  description:
    "Perspectives from the TLU team on brand growth, AI in business, China brands going global, and the pet economy. Actionable insights for consumer brand leaders.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — Brand Growth, AI & Consumer Trends",
    description:
      "Viewpoints and notes from the TLU team on growth, brands and markets.",
    url: "/insights",
  },
};

export default function Insights() {
  return <InsightsClient />;
}
