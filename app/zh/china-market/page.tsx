import type { Metadata } from "next";
import ChinaMarketClient from "@/app/china-market/ChinaMarketClient";

export const metadata: Metadata = {
  title: "读懂中国市场 —— 写给全球品牌的一指南",
  description:
    "中国数字生态到底怎么运转：平台、模型，以及那些让外国品牌白花时间与预算的误区。曦奕智方（TLU）出品实战指南。",
  alternates: {
    canonical: "/zh/china-market",
    languages: {
      "en": "https://www.theleapunion.com/china-market",
      "zh-CN": "https://www.theleapunion.com/zh/china-market",
      "x-default": "https://www.theleapunion.com/china-market",
    },
  },
  openGraph: {
    title: "读懂中国市场 —— 写给全球品牌的一指南",
    description:
      "中国数字生态到底怎么运转——平台、模型，以及那些让外国品牌白花时间与预算的误区。",
    url: "/zh/china-market",
  },
};

export default function ChinaMarketZh() {
  return <ChinaMarketClient />;
}
