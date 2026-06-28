"use client";

import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";

const approaches = [
  {
    no: "01",
    en: "Consumer Insight-Driven Brand Solutions",
    zh: "以消费者洞察为核心的品牌解决方案",
    body_en: "Consumer insight at the core, brand building as the foundation",
    body_zh: "以消费者洞察为核心，以品牌建设为基石的解决方案",
  },
  {
    no: "02",
    en: "Full Closed-Loop Execution",
    zh: "全闭环落地执行",
    body_en: "A complete closed loop — from trend research all the way to channel execution",
    body_zh: "趋势研究到渠道执行的全闭环落地执行方案",
  },
  {
    no: "03",
    en: "Big + Small Data Toolkit",
    zh: "大数据 + 小数据工具箱",
    body_en: "A big-data plus small-data toolkit that keeps execution orderly and on track",
    body_zh: "大数据结合小数据的数智化工具箱，确保方案执行有序",
  },
];

const model = [
  {
    en: "Trend Insights",
    zh: "趋势洞察",
    items_en: ["Internal diagnosis & analysis", "Data-driven market analysis", "Data-driven consumer insights"],
    items_zh: ["内部诊断和分析", "基于数据的市场分析", "基于数据的消费者洞察"],
  },
  {
    en: "Branding",
    zh: "品牌建设",
    items_en: ["Brand positioning", "Brand value assessment", "Brand experience uplift", "Brand health evaluation"],
    items_zh: ["品牌定位", "品牌价值评估", "品牌体验提升", "品牌健康度评估"],
  },
  {
    en: "Product R&D",
    zh: "产品研发",
    items_en: ["Product concept testing", "Go-to-market design", "Innovation workshop", "C2B reverse customization"],
    items_zh: ["产品概念测试", "产品落地方案设计", "产品创新工作坊", "C2B 反向定制梳理"],
  },
  {
    en: "Content & Comms",
    zh: "内容沟通",
    items_en: ["Emotional & scenario audience insights", "Content strategy & marketing", "People-product-content matching", "GEO"],
    items_zh: ["情绪化、场景化人群洞察", "人群内容策略及营销", "人货内容精准匹配策略", "GEO"],
  },
  {
    en: "Channel Execution",
    zh: "渠道执行",
    items_en: ["Omni-channel resource optimization", "Channel synergy strategy", "Channel product strategy"],
    items_zh: ["全渠道资源优化梳理", "渠道协同策略制定", "渠道产品策略"],
  },
];

export default function Solutions() {
  const { lang } = useLang();

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#000a56,#004fb0)" }} />
        <span className="deco-circle" style={{ width: 420, height: 420, right: -120, top: -160, background: "rgba(79,134,214,0.22)" }} />
        <div className="container-tlp relative py-24 md:py-28">
          <span className="eyebrow text-brand-400">{t(lang, "Solutions", "解决方案")}</span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold max-w-3xl">
            {t(lang, "We help business leaders solve these challenges", "我们致力于帮助商业领袖解决以下的问题")}
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl">
            {t(
              lang,
              "Consumer insight-driven, closed-loop solutions — from strategy to omni-channel execution",
              "以消费者洞察为驱动、从策略到全渠道执行的闭环解决方案"
            )}
          </p>
        </div>
      </section>

      {/* Three approaches */}
      <section className="section">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Our Approach", "我们的方法")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "Consumer insight-driven brand solutions", "以消费者洞察为核心的品牌解决方案")}
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {approaches.map((a, i) => (
              <Reveal key={a.no} delay={i * 90}>
                <div className="card h-full p-8">
                  <span className="text-5xl font-extrabold text-gradient">{a.no}</span>
                  <h3 className="mt-4 text-xl font-bold text-navy">{t(lang, a.en, a.zh)}</h3>
                  <p className="mt-3 text-muted">{t(lang, a.body_en, a.body_zh)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Growth model */}
      <section className="section bg-cream">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Growth Model", "增长模型")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "Data-driven intelligent business growth model", "基于大数据的智能商业增长模型")}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "Five connected stages — a closed loop from insight to execution",
                "五个相互衔接的阶段——从洞察到执行的闭环"
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {model.map((stage, i) => (
              <Reveal key={stage.en} delay={i * 80}>
                <div className="card h-full p-6 flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-navy leading-tight">{t(lang, stage.en, stage.zh)}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {t(lang, stage.items_en, stage.items_zh).map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-ink">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-tlp text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "See how it works in practice", "看看真实的落地效果")}
            </h2>
            <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
              {t(lang, "Explore client success stories across categories", "浏览跨品类的客户成功案例")}
            </p>
            <Link href="/cases" className="btn btn-primary mt-8">
              {t(lang, "View success cases", "查看成功案例")}
              <IconArrow width={18} height={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
