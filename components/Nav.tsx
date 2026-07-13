"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useLang, t } from "./LanguageProvider";

const enLinks = [
  { href: "/", en: "Home", zh: "首页" },
  { href: "/solutions", en: "Solutions", zh: "解决方案" },
  { href: "/china-market", en: "China Market", zh: "中国市场" },
  { href: "/team", en: "Team", zh: "团队" },
  { href: "/cases", en: "Cases", zh: "成功案例" },
  { href: "/insights", en: "Insights", zh: "观点" },
  { href: "/contact", en: "Contact", zh: "联系我们" },
];

export default function Nav() {
  const { lang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isZh = pathname.startsWith("/zh");

  // Build links: on /zh pages, prepend /zh
  const links = enLinks.map((l) => ({
    ...l,
    href: isZh ? `/zh${l.href === "/" ? "" : l.href}` : l.href,
  }));

  // Language switch: navigate between EN ↔ /zh
  const handleToggle = () => {
    if (isZh) {
      // Switching to English: go to the EN equivalent
      const enPath = pathname.replace(/^\/zh/, "") || "/";
      router.push(enPath);
    } else {
      // Switching to Chinese: go to /zh equivalent
      const zhPath = pathname === "/" ? "/zh" : `/zh${pathname}`;
      router.push(zhPath);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur shadow-[0_8px_30px_-18px_rgba(15,30,70,0.4)]"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <nav className="container-tlp flex items-center justify-between h-[72px]">
        <Logo zh={isZh} href={isZh ? "/zh" : "/"} />

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  pathname === l.href
                    ? "text-brand bg-sky-50"
                    : "text-ink/80 hover:text-brand hover:bg-sky-50"
                }`}
              >
                {t(lang, l.en, l.zh)}
              </Link>
          ))}
          <button
            onClick={handleToggle}
            className="ml-2 px-3.5 py-2 rounded-full text-sm font-bold text-brand border border-brand/30 hover:bg-brand hover:text-white transition-colors"
            aria-label="Switch language"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleToggle}
            className="px-3 py-1.5 rounded-full text-sm font-bold text-brand border border-brand/30"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="p-2 text-navy"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="container-tlp py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2 py-3 rounded-lg text-base font-semibold ${
                  l.href === pathname ? "text-brand" : "text-ink/85"
                }`}
              >
                {t(lang, l.en, l.zh)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
