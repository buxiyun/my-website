import type { Metadata } from "next";
import SolutionsClient from "@/app/solutions/SolutionsClient";

export const metadata: Metadata = {
  title: "品牌战略、消费者洞察与数据驱动解决方案",
  description:
    "以消费者洞察为驱动，打造从品牌战略、数据分析到全渠道执行的闭环解决方案，助力消费品牌实现规模化增长。",
  alternates: {
    canonical: "/zh/solutions",
    languages: {
      "en": "https://www.theleapunion.com/solutions",
      "zh-CN": "https://www.theleapunion.com/zh/solutions",
      "x-default": "https://www.theleapunion.com/solutions",
    },
  },
  openGraph: {
    title: "品牌战略、消费者洞察与数据驱动解决方案",
    description:
      "探索 TLU 的整合解决方案：消费者洞察分析、品牌识别战略、数据驱动增长框架与全渠道执行。",
    url: "/zh/solutions",
  },
};

export default function SolutionsZh() {
  return <SolutionsClient />;
}
