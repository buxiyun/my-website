import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Team — Senior Brand & Strategy Experts",
  description:
    "Senior leaders from top consulting, research and operations firms. 70%+ at Partner or Director level, all with 20+ years of experience across China, EU, US and Japan.",
  alternates: {
    canonical: "/team",
    languages: {
      "en": "https://www.theleapunion.com/team",
      "zh-CN": "https://www.theleapunion.com/zh/team",
    },
  },
  openGraph: {
    title: "Our Team — Senior Brand & Strategy Experts",
    description:
      "Meet the TLU core team — experts from Nielsen, IMD, Labbrand and more, with complementary strategy-to-execution experience.",
    url: "/team",
  },
};

export default function Team() {
  return <TeamClient />;
}
