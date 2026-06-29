import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "en": "https://www.theleapunion.com",
      "zh-CN": "https://www.theleapunion.com/zh",
    },
  },
};

export default function HomePage() {
  return <HomeClient />;
}
