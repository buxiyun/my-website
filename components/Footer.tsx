"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useLang, t } from "./LanguageProvider";
import { IconMail } from "./Icons";

const enLinks = [
  { href: "/solutions", en: "Solutions", zh: "解决方案" },
  { href: "/china-market", en: "China Market", zh: "中国市场" },
  { href: "/team", en: "Team", zh: "团队" },
  { href: "/cases", en: "Cases", zh: "成功案例" },
  { href: "/insights", en: "Insights", zh: "观点" },
  { href: "/contact", en: "Contact", zh: "联系我们" },
];

export default function Footer() {
  const { lang } = useLang();
  const pathname = usePathname();
  const isZh = pathname.startsWith("/zh");

  const links = enLinks.map((l) => ({
    ...l,
    href: isZh ? `/zh${l.href === "/" ? "" : l.href}` : l.href,
  }));

  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="container-tlp py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <Logo variant="light" zh={isZh} href={isZh ? "/zh" : "/"} />
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              {t(
                lang,
                "AI-empowered, next-gen business solution provider — from strategic design to omni-channel execution",
                "AI 赋能的下一代商业解决方案提供商，从战略顶层设计到全渠道实战落地"
              )}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              {t(lang, "Navigate", "导航")}
            </span>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {t(lang, l.en, l.zh)}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              {t(lang, "Get in touch", "联系方式")}
            </span>
            <a
              href="mailto:marketing@theleapunion.com"
              className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors"
            >
              <IconMail width={18} height={18} />
              marketing@theleapunion.com
            </a>
            <span className="text-sm text-white/60">
              {t(
                lang,
                "Greater China · APAC · North America · EU",
                "大中华 · 亚太 · 北美 · 欧洲"
              )}
            </span>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-white/50">
          <span>© {new Date().getFullYear()} The Leap Union (TLU) · {t(lang, "All rights reserved", "保留所有权利")}</span>
          <span>{t(lang, "Tech-enabled Business Solution, Your Global Growth Partner", "懂生意的技术，你的全球增长伙伴")}</span>
        </div>
        <div className="mt-2 text-xs text-white/40">
          {t(
            lang,
            "The Leap Union (TLU) is a brand of 曦奕智方",
            "The Leap Union (TLU) 是曦奕智方旗下品牌"
          )}
        </div>
      </div>
    </footer>
  );
}
