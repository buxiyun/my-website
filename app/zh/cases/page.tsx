import type { Metadata } from "next";
import CasesClient from "@/app/cases/CasesClient";

export const metadata: Metadata = {
  title: "成功案例 — 宠物食品、饮料与零食品牌增长实战",
  description:
    "真实成果：助力宠物食品品牌实现 GMV 200% 增长，为国际饮料巨头制定全渠道数字化路线图，协助全球零食品牌成功完成从0到1的市场突破。",
  alternates: {
    canonical: "/zh/cases",
    languages: {
      "en": "https://www.theleapunion.com/cases",
      "zh-CN": "https://www.theleapunion.com/zh/cases",
    },
  },
  openGraph: {
    title: "成功案例 — 品牌增长实战",
    description:
      "以消费者洞察为驱动，TLU 助力品牌实现跨品类闭环增长。查看真实客户成果。",
    url: "/zh/cases",
  },
};

export default function CasesZh() {
  return <CasesClient />;
}
