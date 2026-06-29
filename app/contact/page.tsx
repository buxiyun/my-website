import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Global Brand Strategy Consulting",
  description:
    "Ready to drive closed-loop growth? Contact TLU across Greater China, APAC, North America and Europe. Email marketing@theleapunion.com to start a conversation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Global Brand Strategy Consulting",
    description:
      "Tell us about your growth challenge — from strategy to omni-channel execution, we're ready to help.",
    url: "/contact",
  },
};

export default function Contact() {
  return <ContactClient />;
}
