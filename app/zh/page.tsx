import type { Metadata } from "next";
import HomeClient from "@/app/HomeClient";

export const metadata: Metadata = {
  title: "曦奕智方 — AI赋能的商业解决方案",
  description:
    "曦奕智方 (TLU) — AI赋能的下一代商业解决方案提供商，从战略顶层设计到全渠道实战落地，基于深度消费者洞察，以懂生意的技术驱动增长",
  alternates: {
    canonical: "/zh",
    languages: {
      "en": "https://www.theleapunion.com/",
      "zh-CN": "https://www.theleapunion.com/zh",
      "x-default": "https://www.theleapunion.com/",
    },
  },
  openGraph: {
    title: "曦奕智方 (TLU) — AI赋能的商业解决方案",
    description:
      "从数据到决策，再到增长——基于深度消费者洞察，通过\u201C懂生意的技术\u201D对准商业增长结果",
    url: "/zh",
    locale: "zh_CN",
    images: [{ url: "/world-map.png", width: 1200, height: 630, alt: "TLU 全球覆盖" }],
  },
};

export default function HomePageZh() {
  return <HomeClient />;
}
