import type { Metadata } from "next";
import ChinaMarketClient from "./ChinaMarketClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Understand the China Market — A Guide for Global Brands",
  description:
    "How China's digital ecosystem really works: the platforms, the models, and the misconceptions that cost foreign brands time and budget. A practical guide by The Leap Union.",
  alternates: {
    canonical: "/china-market",
    languages: {
      "en": "https://www.theleapunion.com/china-market",
      "zh-CN": "https://www.theleapunion.com/zh/china-market",
      "x-default": "https://www.theleapunion.com/china-market",
    },
  },
  openGraph: {
    title: "Understand the China Market — A Guide for Global Brands",
    description:
      "How China's digital ecosystem really works — the platforms, the models, and the misconceptions that cost foreign brands time and budget.",
    url: "/china-market",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theleapunion.com" },
    { "@type": "ListItem", position: 2, name: "China Market", item: "https://www.theleapunion.com/china-market" },
  ],
};

export default function ChinaMarket() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ChinaMarketClient />
    </>
  );
}
