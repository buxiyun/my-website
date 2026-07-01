import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact — Global Brand Strategy Consulting",
  description:
    "Ready to drive closed-loop growth? Contact TLU across Greater China, APAC, North America and Europe. Email marketing@theleapunion.com to start a conversation.",
  alternates: {
    canonical: "/contact",
    languages: {
      "en": "https://www.theleapunion.com/contact",
      "zh-CN": "https://www.theleapunion.com/zh/contact",
      "x-default": "https://www.theleapunion.com/contact",
    },
  },
  openGraph: {
    title: "Contact — Global Brand Strategy Consulting",
    description:
      "Tell us about your growth challenge — from strategy to omni-channel execution, we're ready to help.",
    url: "/contact",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theleapunion.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.theleapunion.com/contact" },
  ],
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "Organization",
    name: "The Leap Union",
    email: "marketing@theleapunion.com",
    url: "https://www.theleapunion.com",
    areaServed: ["Greater China", "APAC", "North America", "Europe"],
  },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactSchema} />
      <ContactClient />
    </>
  );
}
