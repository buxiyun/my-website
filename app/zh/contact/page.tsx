import type { Metadata } from "next";
import ContactClient from "@/app/contact/ContactClient";

export const metadata: Metadata = {
  title: "联系我们 — 全球品牌战略咨询",
  description:
    "准备好实现闭环增长了吗？联系 TLU 团队，覆盖大中华、亚太、北美与欧洲地区。发送邮件至 marketing@theleapunion.com 开启合作。",
  alternates: {
    canonical: "/zh/contact",
    languages: {
      "en": "https://www.theleapunion.com/contact",
      "zh-CN": "https://www.theleapunion.com/zh/contact",
    },
  },
  openGraph: {
    title: "联系我们 — 全球品牌战略咨询",
    description:
      "告诉我们您的增长挑战——从战略到全渠道执行，我们随时准备提供帮助。",
    url: "/zh/contact",
  },
};

export default function ContactZh() {
  return <ContactClient />;
}
