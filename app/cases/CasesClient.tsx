"use client";

import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";

const cases = [
  {
    tag_en: "Category Win",
    tag_zh: "品类突围",
    client_en: "Pet Food Client",
    client_zh: "某宠物食品客户",
    body_en: "Two phases — from category positioning to a product strategy mix; a complete plan covering new concepts, pricing and channel strategy to break into the staple-food market",
    body_zh: "两阶段推进：从品类定位到产品策略组合，输出包含新品概念、价格体系及渠道策略的完整方案，助力品牌从零食赛道成功切入干粮市场",
    metrics: [
      { v: "4", en: "new products launched", zh: "款新产品上新" },
      { v: "200%", en: "GMV growth", zh: "GMV 增长" },
    ],
    grad: "linear-gradient(135deg,#000a56,#005dc4)",
  },
  {
    tag_en: "Omni-Channel",
    tag_zh: "全域蓝图",
    client_en: "Int'l Beverage Giant",
    client_zh: "某国际饮料巨头",
    body_en: "Digital transformation grounded in trend research and expert interviews; an omni-channel digital roadmap and a three-year path for flagship-store strategy",
    body_zh: "数字化转型：基于行业趋势研究与专家访谈，制定全域数字化发展蓝图及未来三年路径，明确旗舰店发展策略，抢占电商机会点",
    metrics: [
      { v: "★", en: "Flagship store positioning", zh: "明确旗舰店营销定位" },
      { v: "★", en: "Membership center pivot", zh: "转型会员中心定位" },
    ],
    grad: "linear-gradient(135deg,#0a4fa0,#19ac71)",
  },
  {
    tag_en: "0-to-1 Launch",
    tag_zh: "0-1 孵化",
    client_en: "Int'l Snack Client",
    client_zh: "国际生鲜零食客户",
    body_en: "Cross-category innovation — creative beef-snack co-creation; consumer co-creation and concept validation to raise the new-product success rate and explore a second growth curve",
    body_zh: "跨品类创新：创意牛肉零食共创，利用消费者共创与概念验证，提升新品孵化胜率，探索业务增长第二曲线",
    metrics: [
      { v: "4", en: "new products launched", zh: "款新产品上新" },
      { v: "✓", en: "New-product targets met", zh: "达成新品业绩" },
    ],
    grad: "linear-gradient(135deg,#005dc4,#fc6b27)",
  },
];

export default function CasesClient() {
  const { lang, prefixPath } = useLang();

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#000a56,#004fb0)" }} />
        <span className="deco-circle" style={{ width: 420, height: 420, right: -120, top: -160, background: "rgba(79,134,214,0.22)" }} />
        <div className="container-tlp relative py-24 md:py-28">
          <span className="eyebrow text-brand-400 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5">{t(lang, "Success Cases", "成功案例")}</span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold max-w-3xl">
            {t(lang, "Closed-loop growth, proven across categories", "跨品类验证的闭环增长")}
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl">
            {t(
              lang,
              "Driven by consumer insight, TLU helps brands achieve closed-loop growth — from insight to execution",
              "基于消费者洞察，TLU 助力品牌实现从策略洞察到商业落地的闭环增长"
            )}
          </p>
        </div>
      </section>

      {/* cases */}
      <section className="section">
        <div className="container-tlp flex flex-col gap-8">
          {cases.map((c, i) => (
            <Reveal key={c.client_en} delay={i * 80}>
              <div className="card p-8 md:p-10 grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <span className="inline-block rounded-full px-4 py-1.5 text-sm font-bold text-white" style={{ background: c.grad }}>
                    {t(lang, c.tag_en, c.tag_zh)}
                  </span>
                  <h3 className="mt-4 text-2xl font-extrabold text-navy">{t(lang, c.client_en, c.client_zh)}</h3>
                  <p className="mt-3 text-muted leading-relaxed">{t(lang, c.body_en, c.body_zh)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="rounded-2xl bg-sky-50 border border-sky/60 p-5 text-center">
                      <span className="block text-3xl font-extrabold text-gradient">{m.v}</span>
                      <span className="mt-1 block text-xs font-semibold text-muted">{t(lang, m.en, m.zh)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* impact band */}
      <section className="section bg-cream">
        <div className="container-tlp">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-navy to-brand text-white p-10 md:p-14 text-center">
              <span className="text-4xl md:text-5xl font-extrabold">Impact</span>
              <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                {t(
                  lang,
                  "Driven by consumer insights, TLU helps brands achieve closed-loop growth from insight to execution",
                  "基于消费者洞察，TLU 助力品牌在不同行业实现从策略洞察到商业落地的闭环增长"
                )}
              </p>
              <Link href={prefixPath("/contact")} className="btn bg-white text-navy hover:-translate-y-0.5 mt-8">
                {t(lang, "Become our next case", "成为我们的下一个案例")}
                <IconArrow width={18} height={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
