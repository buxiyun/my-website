import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Brand Strategy, Consumer Insights & Data-Driven Solutions",
  description:
    "Consumer insight-driven, closed-loop solutions — from brand strategy and data analytics to omni-channel execution. See how TLU helps consumer brands scale globally.",
  alternates: {
    canonical: "/solutions",
    languages: {
      "en": "https://www.theleapunion.com/solutions",
      "zh-CN": "https://www.theleapunion.com/zh/solutions",
    },
  },
  openGraph: {
    title: "Brand Strategy, Consumer Insights & Data-Driven Solutions",
    description:
      "Explore TLU's integrated solutions: consumer insight analytics, brand identity strategy, data-driven growth frameworks, and omni-channel execution.",
    url: "/solutions",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theleapunion.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.theleapunion.com/solutions" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Brand Strategy & Data-Driven Business Solutions",
  provider: {
    "@type": "Organization",
    name: "The Leap Union",
    url: "https://www.theleapunion.com",
  },
  areaServed: ["Greater China", "APAC", "North America", "Europe", "Japan"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "TLU Solutions",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Strategy & Identity" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consumer Insight & Data Analytics" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Omni-channel Operations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content & Creative" } },
    ],
  },
};

export default function Solutions() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <SolutionsClient />
    </>
  );
}
