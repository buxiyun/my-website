import type { Metadata } from "next";
import ChinaMarketClient from "@/app/china-market/ChinaMarketClient";

export const metadata: Metadata = {
  title: "中国市场进入指南 — 国际品牌的战略、品牌与落地执行",
  description:
    "面向国际品牌的中国市场实战指南——从决策框架、常见陷阱到从命名到平台落地的全流程，帮你做对每一个关键决策。",
  alternates: {
    canonical: "/zh/china-market",
    languages: {
      "en": "https://www.theleapunion.com/china-market",
      "zh-CN": "https://www.theleapunion.com/zh/china-market",
      "x-default": "https://www.theleapunion.com/china-market",
    },
  },
  openGraph: {
    title: "中国市场进入指南 — 战略、品牌与落地执行",
    description:
      "进入中国之前，先读懂这个市场。面向国际品牌的分步决策指南：市场全景、品牌 vs. 销售策略、命名、定位与平台执行。",
    url: "/zh/china-market",
  },
};

export default function ChinaMarketZh() {
  return <ChinaMarketClient />;
}
