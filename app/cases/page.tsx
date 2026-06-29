import type { Metadata } from "next";
import CasesClient from "./CasesClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Client Success Stories — Pet Food, Beverage & Snack Brand Growth",
  description:
    "Real results: 200% GMV growth for a pet food brand, omni-channel digital roadmap for an international beverage giant, and successful 0-to-1 launches for a global snack brand.",
  alternates: {
    canonical: "/cases",
    languages: {
      "en": "https://www.theleapunion.com/cases",
      "zh-CN": "https://www.theleapunion.com/zh/cases",
    },
  },
  openGraph: {
    title: "Client Success Stories — Brand Growth Cases",
    description:
      "Driven by consumer insight, TLU helps brands achieve closed-loop growth across categories. See real client results.",
    url: "/cases",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theleapunion.com" },
    { "@type": "ListItem", position: 2, name: "Cases", item: "https://www.theleapunion.com/cases" },
  ],
};

export default function Cases() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CasesClient />
    </>
  );
}
