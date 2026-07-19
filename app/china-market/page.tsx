import type { Metadata } from "next";
import ChinaMarketClient from "./ChinaMarketClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "China Market Entry Guide — Strategy, Branding & Execution for International Brands",
  description:
    "A practical guide for international brands entering China — the decision framework, common pitfalls, and what you need to get right, from naming to platform execution.",
  alternates: {
    canonical: "/china-market",
    languages: {
      "en": "https://www.theleapunion.com/china-market",
      "zh-CN": "https://www.theleapunion.com/zh/china-market",
      "x-default": "https://www.theleapunion.com/china-market",
    },
  },
  openGraph: {
    title: "China Market Entry Guide — Strategy, Branding & Execution",
    description:
      "Understand the market before you enter it. A step-by-step decision guide for international brands: market landscape, brand vs. sales strategy, naming, positioning, and platform execution.",
    url: "/china-market",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theleapunion.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "China Market Guide",
      item: "https://www.theleapunion.com/china-market",
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "China Market Entry Guide — Strategy, Branding & Execution for International Brands",
  description:
    "A practical guide for international brands entering China — the decision framework, common pitfalls, and execution roadmap.",
  publisher: {
    "@type": "Organization",
    name: "The Leap Union",
    url: "https://www.theleapunion.com",
  },
  about: [
    { "@type": "Thing", name: "China Market Entry" },
    { "@type": "Thing", name: "Brand Localization" },
    { "@type": "Thing", name: "Cross-border E-commerce" },
  ],
};

export default function ChinaMarket() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <ChinaMarketClient />
    </>
  );
}
