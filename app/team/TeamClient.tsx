"use client";

import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { IconUsers, IconNetwork, IconStrategy, IconCheck } from "@/components/Icons";

const strengths = [
  {
    Icon: IconUsers,
    en: "Core Members",
    zh: "核心成员",
    items_en: [
      "All from top insight, consulting & ops firms",
      "70%+ at Partner or Director level",
      "All with 20+ years of experience",
    ],
    items_zh: [
      "全部来自顶级洞察、咨询和运营公司",
      "70% 以上为合伙人、董事级别",
      "都具备 20 年以上的工作经验",
    ],
  },
  {
    Icon: IconStrategy,
    en: "Experts",
    zh: "专家资源",
    items_en: [
      "From top firms in China, EU, US, Japan",
      "10+ years of collaborative history",
      "Complementary strategy-to-ops experience",
    ],
    items_zh: [
      "来自中国、欧洲、美国、日本等市场的顶级公司",
      "相互之间超过 10 年的合作履历",
      "具备从战略到运营的互补性经验",
    ],
  },
  {
    Icon: IconNetwork,
    en: "Global Network",
    zh: "全球协作网络",
    items_en: [
      "Partnerships with int'l consulting, research & data providers",
      "Mobilize resources per project needs",
    ],
    items_zh: [
      "与海外咨询机构、调研机构、数据供应商保持合作",
      "按项目需求进行协作或调用相关资源",
    ],
  },
];

const people = [
  {
    initials: "OZ",
    en: "Olive Zhang",
    zh: "Olive Zhang",
    role_en: "General Manager · Consumer Insight & Strategy Expert",
    role_zh: "公司总经理 · 消费者洞察与策略专家",
    items_en: [
      "~20 years in market research & consulting across Greater China, APAC and North America",
      "~10 years at Nielsen (China & Canada), leading teams in media, retail, FMCG, auto and OTC pharma",
      "Led the only comprehensive ethnic-minority media tracking study at Nielsen Canada",
      "Key clients: SKP, IKEA, Disney, H&M, Ping An Bank, Rolls-Royce, Mercedes-Benz, Unilever, J&J",
      "MBA, Schulich School of Business, York University (2004)",
    ],
    items_zh: [
      "从事市场研究及咨询行业近 20 年，在大中华、亚太及北美多个市场有丰富经验",
      "近 10 年服务于尼尔森中国与加拿大，领导媒介、零售、快消、汽车、非处方药等团队",
      "在加拿大尼尔森领导当地唯一的少数族裔综合媒体跟踪研究",
      "主要客户：SKP、宜家、迪斯尼、H&M、平安银行、劳斯莱斯、奔驰、联合利华、强生等",
      "2004 年获约克大学舒力克商学院 MBA",
    ],
  },
  {
    initials: "PB",
    en: "Philippe Bu",
    zh: "Philippe Bu",
    role_en: "Partner · Strategy & Data Expert",
    role_zh: "合伙人 · 策略与数据专家",
    items_en: [
      "20 years in corporate management & consulting; deep corporate-strategy experience",
      "Focus areas: retail, consumer goods and the pet industry",
      "Built in-house and influencer livestreaming centers for multiple brands",
      "Brand expert serving consumer-goods and real-estate clients",
      "~5 years at a leading international consulting firm; MBA from IMD Lausanne; B.A. Zhejiang University",
    ],
    items_zh: [
      "20 年企业管理与咨询经验，在企业战略咨询有丰富的项目经验",
      "关注领域：零售、消费品和宠物行业",
      "一手建立公司自播与达播中心，为多品牌提供全域直播服务",
      "品牌专家，曾为消费品、地产等领域客户提供品牌咨询",
      "国际知名咨询公司近 5 年经历；瑞士洛桑管理学院（IMD）MBA；浙江大学本科",
    ],
  },
  {
    initials: "JW",
    en: "Judy Wang",
    zh: "Judy Wang",
    role_en: "Brand & Verbal Identity Expert",
    role_zh: "品牌专家 · 语词专家",
    items_en: [
      "15+ years in brand consulting, management and marketing communications",
      "Distinguished expert in verbal identity in China; 7 years as Creative Director at Labbrand",
      "500+ enterprises advised; 200+ creative works launched",
      "Notable: The Ring (Hongkong Land), ONVO 乐道 (NIO), VOYAH (Dongfeng), AUMOVIO 欧摩威 (Continental)",
      "China representative for WeAreNaming, the International Naming Alliance",
    ],
    items_zh: [
      "15 年以上品牌咨询、管理与营销传播经验",
      "中国语言识别领域杰出专家；曾任 Labbrand 创意总监七年",
      "为 500+ 家企业提供咨询，200+ 创意作品成功落地",
      "代表作：The Ring（香港置地）、ONVO 乐道（蔚来）、VOYAH（东风）、AUMOVIO 欧摩威（大陆汽车）",
      "国际命名联盟 WeAreNaming 中国指定代表",
    ],
  },
];

export default function TeamClient() {
  const { lang } = useLang();

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#000a56,#004fb0)" }} />
        <span className="deco-circle" style={{ width: 420, height: 420, left: -140, bottom: -180, background: "rgba(79,134,214,0.2)" }} />
        <div className="container-tlp relative py-24 md:py-28">
          <span className="eyebrow text-brand-400 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5">{t(lang, "Our Team", "我们的团队")}</span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold max-w-3xl">
            {t(lang, "Experts from diverse fields", "来自各领域的专家")}
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-4xl text-pretty">
            {t(
              lang,
              "Senior leaders from the world's top insight, consulting and operations firms — with complementary, strategy-to-execution experience",
              "汇聚来自全球顶级洞察、咨询与运营公司的资深专家，拥有从战略到执行的互补经验"
            )}
          </p>
        </div>
      </section>

      {/* strengths */}
      <section className="section">
        <div className="container-tlp grid md:grid-cols-3 gap-6">
          {strengths.map((s, i) => (
            <Reveal key={s.en} delay={i * 90}>
              <div className="card h-full p-8">
                <span className="icon-tile">
                  <s.Icon />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">{t(lang, s.en, s.zh)}</h3>
                <ul className="mt-4 space-y-2.5">
                  {t(lang, s.items_en, s.items_zh).map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm text-ink/80">
                      <IconCheck width={18} height={18} className="text-green shrink-0 mt-0.5" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* people */}
      <section className="section bg-cream">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Our People", "核心团队")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "The people behind TLU", "TLU 背后的团队")}
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6 items-stretch">
            {people.map((f, i) => (
              <Reveal key={f.en} delay={i * 100}>
                <div className="card h-full p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl text-white text-xl font-extrabold shrink-0" style={{ background: "linear-gradient(135deg,#000a56,#005dc4)" }}>
                      {f.initials}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-navy">{t(lang, f.en, f.zh)}</h3>
                      <p className="text-sm font-semibold text-brand">{t(lang, f.role_en, f.role_zh)}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {t(lang, f.items_en, f.items_zh).map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm text-ink/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
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
    </>
  );
}
