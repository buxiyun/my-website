import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Brand Strategy, Consumer Insights & Data-Driven Solutions",
  description:
    "Consumer insight-driven, closed-loop solutions — from brand strategy and data analytics to omni-channel execution. See how TLU helps consumer brands scale globally.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Brand Strategy, Consumer Insights & Data-Driven Solutions",
    description:
      "Explore TLU's integrated solutions: consumer insight analytics, brand identity strategy, data-driven growth frameworks, and omni-channel execution.",
    url: "/solutions",
  },
};

export default function Solutions() {
  return <SolutionsClient />;
}
