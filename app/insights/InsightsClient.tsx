"use client";

import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";
import { posts } from "@/lib/insights";

function fmtDate(d: string, lang: "en" | "zh") {
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsClient() {
  const { lang, prefixPath } = useLang();

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#000a56,#004fb0)" }} />
        <span className="deco-circle" style={{ width: 420, height: 420, right: -120, top: -160, background: "rgba(79,134,214,0.22)" }} />
        <div className="container-tlp relative py-24 md:py-28">
          <span className="eyebrow text-brand-400">{t(lang, "Insights", "观点")}</span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold max-w-3xl">
            {t(lang, "Our perspectives", "我们的观点")}
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl">
            {t(
              lang,
              "Our thinking on growth, brands and markets — viewpoints and notes from the TLU team",
              "我们关于增长、品牌与市场的思考——来自 TLU 团队的观点与随笔"
            )}
          </p>
        </div>
      </section>

      {/* list */}
      <section className="section">
        <div className="container-tlp">
          {posts.length === 0 ? (
            <p className="text-muted">{t(lang, "More perspectives coming soon", "更多观点即将发布")}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link href={prefixPath(`/insights/${p.slug}`)} className="block h-full">
                    <article className="card h-full p-7 flex flex-col">
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <span className="rounded-full bg-sky-50 border border-sky/60 px-3 py-1 text-brand">
                          {t(lang, p.tag_en, p.tag_zh)}
                        </span>
                        <span className="text-muted">{fmtDate(p.date, lang)}</span>
                      </div>
                      <h2 className="mt-4 text-xl font-bold text-navy">{t(lang, p.title_en, p.title_zh)}</h2>
                      <p className="mt-3 text-sm text-muted flex-1">{t(lang, p.excerpt_en, p.excerpt_zh)}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                        {p.audio && p.audio.length > 0
                          ? t(lang, `Listen · ${p.audio.length} clips`, `收听 · ${p.audio.length} 段`)
                          : t(lang, "Read more", "阅读全文")}
                        <IconArrow width={16} height={16} />
                      </span>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
