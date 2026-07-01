import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "曦奕智方 (TLU) — AI赋能的商业解决方案",
    template: "%s | TLU",
  },
  description:
    "曦奕智方 (TLU) — AI赋能的下一代商业解决方案提供商，从战略顶层设计到全渠道实战落地，以懂生意的技术驱动增长",
  alternates: {
    languages: {
      "en": "https://www.theleapunion.com/",
      "zh-CN": "https://www.theleapunion.com/zh",
      "x-default": "https://www.theleapunion.com/",
    },
  },
  openGraph: {
    siteName: "The Leap Union",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/world-map.png", width: 1200, height: 630, alt: "TLU 全球覆盖" }],
  },
};

export default function ChineseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
