import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "en": "https://www.theleapunion.com/",
      "zh-CN": "https://www.theleapunion.com/zh",
      "x-default": "https://www.theleapunion.com/",
    },
  },
  openGraph: {
    title: "The Leap Union (TLU) — AI-Empowered Business Solutions",
    description:
      "AI-empowered, next-gen business solution provider — from strategic design to omni-channel execution, driving growth through technology that understands business.",
    url: "/",
    locale: "en_US",
    images: [{ url: "/world-map.png", width: 1200, height: 630, alt: "TLU global coverage" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Leap Union",
  alternateName: "TLU",
  url: "https://www.theleapunion.com",
  logo: "https://www.theleapunion.com/world-map.png",
  description:
    "AI-empowered, next-gen business solution provider — from strategic design to omni-channel execution",
  email: "marketing@theleapunion.com",
  areaServed: [
    { "@type": "Place", name: "Greater China" },
    { "@type": "Place", name: "APAC" },
    { "@type": "Place", name: "North America" },
    { "@type": "Place", name: "Europe" },
    { "@type": "Place", name: "Japan" },
  ],
  knowsAbout: [
    "Brand Strategy",
    "Consumer Insights",
    "Data Analytics",
    "Omni-channel Operations",
    "AI Business Solutions",
  ],
  sameAs: [],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Leap Union",
  alternateName: "TLU",
  url: "https://www.theleapunion.com",
  inLanguage: ["en", "zh-CN"],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <HomeClient />
    </>
  );
}
