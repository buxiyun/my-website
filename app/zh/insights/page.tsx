import type { Metadata } from "next";
import InsightsClient from "@/app/insights/InsightsClient";

export const metadata: Metadata = {
  title: "观点 — 品牌增长、AI 与消费趋势",
  description:
    "来自 TLU 团队的深度洞察：品牌增长策略、AI 在商业中的应用、中国品牌出海以及宠物经济等前沿话题。",
  alternates: {
    canonical: "/zh/insights",
    languages: {
      "en": "https://www.theleapunion.com/insights",
      "zh-CN": "https://www.theleapunion.com/zh/insights",
    },
  },
  openGraph: {
    title: "观点 — 品牌增长、AI 与消费趋势",
    description:
      "TLU 团队关于增长、品牌与市场的观点与思考。",
    url: "/zh/insights",
  },
};

export default function InsightsZh() {
  return <InsightsClient />;
}
