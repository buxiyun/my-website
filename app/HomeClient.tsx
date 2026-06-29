"use client";

import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import {
  IconStrategy,
  IconOperations,
  IconData,
  IconContent,
  IconInsight,
  IconShield,
  IconChart,
  IconTarget,
  IconArrow,
} from "@/components/Icons";

const pillars = [
  { Icon: IconStrategy, en: "Strategy", zh: "战略顾问", sub_en: "Strategy", sub_zh: "Strategy", grad: "linear-gradient(135deg,#000a56,#0a4fa0)" },
  { Icon: IconOperations, en: "Operations", zh: "运营伙伴", sub_en: "Operation", sub_zh: "Operation", grad: "linear-gradient(135deg,#0a4fa0,#005dc4)" },
  { Icon: IconData, en: "Data", zh: "数据供应商", sub_en: "Tech & Data", sub_zh: "Tech & Data", grad: "linear-gradient(135deg,#005dc4,#3f7fd6)" },
  { Icon: IconContent, en: "Content", zh: "内容合作商", sub_en: "Creative", sub_zh: "Creative", grad: "linear-gradient(135deg,#3f7fd6,#4f86d6)" },
];

const guarantees = [
  { Icon: IconInsight, en: "Sharp Insights & Clear Direction", zh: "敏锐的洞察力与明确的战略方向", body_en: "Sharp insights deliver confidence and a clear strategic direction", body_zh: "敏锐的洞察力，带来充分的信心和明确的战略方向" },
  { Icon: IconShield, en: "Fact-Based Evidence", zh: "基于事实的证据", body_en: "Decisions grounded in fact-based evidence — not just judgment", body_zh: "基于事实的证据，而不仅仅是主观判断" },
  { Icon: IconTarget, en: "Practical Solutions", zh: "实用的解决方案", body_en: "Solutions that are practical and built to be executed", body_zh: "实用、可落地执行的解决方案" },
  { Icon: IconChart, en: "World-Class Analytics", zh: "一流的分析能力", body_en: "World-class analytics powering every recommendation", body_zh: "一流的分析能力，支撑每一项建议" },
];

const markets = [
  { en: "Greater China", zh: "大中华" },
  { en: "APAC", zh: "亚太" },
  { en: "North America", zh: "北美" },
  { en: "Europe", zh: "欧洲" },
  { en: "Japan", zh: "日本" },
];

export default function Home() {
  const { lang, prefixPath } = useLang();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg,#000a56 0%,#003a96 55%,#005dc4 100%)",
          }}
        />
        <span className="deco-circle" style={{ width: 520, height: 520, right: -120, top: -120, background: "rgba(255,255,255,0.06)" }} />
        <span className="deco-circle" style={{ width: 360, height: 360, right: 120, top: 120, background: "rgba(79,134,214,0.25)" }} />
        <span className="deco-circle" style={{ width: 240, height: 240, right: -40, bottom: -80, background: "rgba(215,235,247,0.12)" }} />

        <div className="container-tlp relative py-28 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-sm font-medium backdrop-blur">
              {t(lang, "AI-Empowered Business Solutions", "AI 赋能的商业解决方案")}
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.08]">
              {t(
                lang,
                <>AI-Empowered <br className="hidden md:block" />Next-Gen Business <br className="hidden md:block" />Solution Provider</>,
                <>AI 赋能的<br className="hidden md:block" />下一代商业<br className="hidden md:block" />解决方案提供商</>
              )}
            </h1>
            <p className="mt-5 text-2xl md:text-3xl font-extrabold text-white">
              {t(lang, "Your Global Growth Partner", "你的全球增长伙伴")}
            </p>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl">
              {t(
                lang,
                "From data to decisions to growth — driving results through technology that understands business, built on deep consumer insight",
                "从数据到决策，再到增长——基于深度消费者洞察，通过“懂生意的技术”对准商业增长结果"
              )}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={prefixPath("/solutions")} className="btn btn-primary">
                {t(lang, "Explore Solutions", "查看解决方案")}
                <IconArrow width={18} height={18} />
              </Link>
              <Link href={prefixPath("/contact")} className="btn btn-ghost">
                {t(lang, "Get in Touch", "联系我们")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POSITIONING ===== */}
      <section className="section">
        <div className="container-tlp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">{t(lang, "Our Unique Positioning", "我们的独特定位")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(
                lang,
                "Value from strategic design to omni-channel execution",
                "从战略顶层设计到全渠道实战落地的综合价值创造"
              )}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "We don't just deliver plans — we drive growth through technology that understands business",
                "我们不仅仅提供方案，更通过“懂生意的技术”对准商业增长结果"
              )}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.en} delay={i * 90}>
                <div className="card h-full p-7 text-center flex flex-col items-center">
                  <span className="icon-tile">
                    <p.Icon />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{t(lang, p.en, p.zh)}</h3>
                  <p className="mt-1 text-sm text-muted">{t(lang, p.sub_en, p.sub_zh)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 rounded-2xl bg-sky-50 border border-sky/60 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex items-center gap-4 shrink-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                  <IconArrow width={22} height={22} />
                </span>
                <span className="text-3xl md:text-4xl font-extrabold text-navy">Impact</span>
              </div>
              <p className="text-base md:text-lg text-ink/85">
                <strong className="text-navy">{t(lang, "Core differentiation: ", "核心差异化：")}</strong>
                {t(
                  lang,
                  "Omni-channel operations are our key differentiator — closing the loop from data, to decisions, to growth",
                  "全渠道运营能力是我们最大的区别，致力于实现从“数据”到“决策”再到“增长”的闭环结果"
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== QUALITY GUARANTEE ===== */}
      <section className="section bg-cream">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Quality Guaranteed", "质量保证")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "Quality guaranteed for every client", "我们对每位客户交付均有质量保证")}
            </h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((g, i) => (
              <Reveal key={g.en} delay={i * 80}>
                <div className="card h-full p-7">
                  <span className="icon-tile" style={{ width: 58, height: 58 }}>
                    <g.Icon />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-navy">{t(lang, g.en, g.zh)}</h3>
                  <p className="mt-2 text-sm text-muted">{t(lang, g.body_en, g.body_zh)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GLOBAL REACH ===== */}
      <section className="section">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Global Capabilities", "全球能力")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "Our capabilities span the globe", "我们的能力覆盖全球")}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "A core team from top insight, consulting and operations firms — backed by a global network across China, the EU, the US and Japan",
                "核心团队来自顶级洞察、咨询与运营公司，并拥有覆盖中国、欧洲、美国、日本的全球协作网络"
              )}
            </p>
          </Reveal>
          <Reveal delay={100}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/world-map.png"
              alt={t(lang, "TLU global coverage map", "TLU 全球覆盖地图")}
              className="mt-10 w-full max-w-5xl mx-auto"
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {markets.map((m) => (
                <span
                  key={m.en}
                  className="rounded-full bg-sky-50 border border-sky/60 px-5 py-2 text-sm font-semibold text-navy"
                >
                  {t(lang, m.en, m.zh)}
                </span>
              ))}
            </div>
            <div className="mt-9 text-center">
              <Link href={prefixPath("/team")} className="btn btn-primary">
                {t(lang, "Meet the team", "了解我们的团队")}
                <IconArrow width={18} height={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="container-tlp">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-brand to-navy text-white p-10 md:p-16 text-center relative overflow-hidden">
              <span className="deco-circle" style={{ width: 300, height: 300, right: -80, top: -80, background: "rgba(255,255,255,0.08)" }} />
              <h2 className="relative text-3xl md:text-4xl font-extrabold">
                {t(lang, "Ready to drive closed-loop growth?", "准备好实现闭环增长了吗？")}
              </h2>
              <p className="relative mt-4 text-white/85 text-lg max-w-2xl mx-auto">
                {t(
                  lang,
                  "Let's turn consumer insight into execution — from strategy to results",
                  "让我们把消费者洞察转化为落地执行——从策略到结果"
                )}
              </p>
              <Link href={prefixPath("/contact")} className="relative btn bg-white text-navy hover:-translate-y-0.5 mt-8">
                {t(lang, "Start a conversation", "开启合作")}
                <IconArrow width={18} height={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
