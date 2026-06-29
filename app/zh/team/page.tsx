import type { Metadata } from "next";
import TeamClient from "@/app/team/TeamClient";

export const metadata: Metadata = {
  title: "我们的团队 — 资深品牌与战略专家",
  description:
    "核心团队成员均来自顶级咨询、研究与运营公司，70%以上为合伙人或总监级别，拥有20年以上横跨中国、欧洲、美国与日本的实战经验。",
  alternates: {
    canonical: "/zh/team",
    languages: {
      "en": "https://www.theleapunion.com/team",
      "zh-CN": "https://www.theleapunion.com/zh/team",
    },
  },
  openGraph: {
    title: "我们的团队 — 资深品牌与战略专家",
    description:
      "认识 TLU 核心团队——来自尼尔森、IMD、朗涛等知名机构的专家，具备从战略到执行的复合能力。",
    url: "/zh/team",
  },
};

export default function TeamZh() {
  return <TeamClient />;
}
