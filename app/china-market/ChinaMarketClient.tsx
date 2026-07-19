"use client";

import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";

/* ─── Data ──────────────────────────────────────────────── */

const chapters = [
  { id: "before", en: "Before You Enter", zh: "进入前" },
  { id: "path", en: "Choose Your Path", zh: "选择路径" },
  { id: "brand", en: "Brand Path", zh: "品牌路径" },
  { id: "sales", en: "Sales Path", zh: "销售路径" },
  { id: "execution", en: "Execution", zh: "落地执行" },
];

const platforms = [
  {
    name: "Tmall / Taobao",
    users: "900M+",
    en: "Search-based e-commerce — the default purchase entry point",
    zh: "搜索型电商，消费者的默认购物入口",
  },
  {
    name: "JD.com",
    users: "580M+",
    en: "B2C mall with self-built logistics — trust & speed",
    zh: "自建物流的B2C商城，强调信任与速度",
  },
  {
    name: "Douyin",
    users: "700M+",
    en: "Short-video content commerce — interest-driven explosive growth",
    zh: "短视频内容电商，兴趣驱动的爆发式增长",
  },
  {
    name: "Xiaohongshu",
    users: "300M+",
    en: "Lifestyle seeding & reputation — where trust is built",
    zh: "生活方式种草与口碑平台，建立信任的核心阵地",
  },
  {
    name: "WeChat",
    users: "1.3B+",
    en: "Private domain & social — scalable owned consumer relationships",
    zh: "私域与社交，可规模化的自主消费者关系",
  },
];

const eras = [
  {
    period: "1997–2003",
    en: "Germination — B2B dominated, e-commerce gaining acceptance",
    zh: "萌芽期 — B2B 主导，电商开始被接受",
  },
  {
    period: "2003–2008",
    en: "Launch — SARS catalyzed online shopping; Taobao born, C2C exploded",
    zh: "起步期 — SARS 催化线上购物，淘宝诞生，C2C 爆发",
  },
  {
    period: "2008–2012",
    en: "Traffic era — Alipay secured transactions; Tmall launched; traffic dividends peaked",
    zh: "流量时代 — 支付宝保障交易，天猫上线，流量红利达到顶峰",
  },
  {
    period: "2012–2018",
    en: "Branding — B2C matured; consumers demanded better products and experiences",
    zh: "品牌化 — B2C 走向成熟，消费者追求更好的产品与体验",
  },
  {
    period: "2018–Now",
    en: "Digitalization — Consumer-centric, omnichannel; platforms handle both seeding and conversion",
    zh: "数智化 — 以消费者为中心的全渠道时代，平台同时承载种草与转化",
  },
];

const misconceptions = [
  {
    myth_en: "The platform will buy out or operate my brand.",
    myth_zh: "平台会帮我买断或运营品牌。",
    real_en: "Platforms are channels, not brand owners. Brand sovereignty stays with you — responsibilities among flagship stores, platform self-operated, and distribution must be clearly defined.",
    real_zh: "平台是渠道，不是品牌拥有者。品牌主权必须在你手里——旗舰店、平台自营和分销的职责需要清晰划分。",
  },
  {
    myth_en: "One playbook fits all brands.",
    myth_zh: "所有品牌都该走同一条路。",
    real_en: "Chinese e-commerce is multi-format. The right mix of platforms and channels depends entirely on your category and brand stage.",
    real_zh: "中国电商是多业态格局，平台和渠道的最优组合取决于你的品类和品牌阶段。",
  },
  {
    myth_en: "Everyone is on Douyin, so I must be too.",
    myth_zh: "大家都在做抖音，我也必须做。",
    real_en: "Choose platforms based on category and stage, not trends. Douyin excels at seeding but is hard to break even alone — it often needs Tmall for overall profitability.",
    real_zh: "根据品类和阶段选平台，而不是追趋势。抖音擅长种草但单独做很难盈利，通常需要天猫配合实现整体盈利。",
  },
  {
    myth_en: "Blast performance ads first, build the brand later.",
    myth_zh: "先砸效果广告冲销量，品牌以后再说。",
    real_en: "Brand and performance are layered, not sequential. Brand assets compound long-term; trade marketing drives short-term conversion. They should run in parallel from day one.",
    real_zh: "品牌与效果营销是叠加关系，不是先后关系。品牌资产长期积累，效果营销驱动短期转化——两者应从第一天起同步推进。",
  },
];

/* ─── Component ─────────────────────────────────────────── */

export default function ChinaMarketClient() {
  const { lang, prefixPath } = useLang();

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #000a56 0%, #001a6e 45%, #003a96 100%)" }}
        />
        <span
          className="deco-circle"
          style={{ width: 480, height: 480, right: -160, top: -200, background: "rgba(79,134,214,0.15)" }}
        />
        <span
          className="deco-circle"
          style={{ width: 320, height: 320, left: -80, bottom: -120, background: "rgba(0,93,196,0.12)" }}
        />

        <div className="container-tlp relative py-24 md:py-32">
          <span className="eyebrow text-white bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5">
            {t(lang, "China Market Guide", "中国市场指南")}
          </span>
          <h1 className="mt-5 text-3xl md:text-5xl font-extrabold max-w-3xl leading-tight">
            {t(
              lang,
              "Understand the market before you enter it",
              "进入中国之前，先读懂这个市场"
            )}
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl">
            {t(
              lang,
                "A practical guide for international brands — the decision framework, common pitfalls, and what you actually need to get right, from strategy to execution.",
              "一份面向国际品牌的实战指南——从决策框架、常见陷阱到从策略到落地你需要做对的一切。"
            )}
          </p>

          {/* Journey pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            {chapters.map((ch, i) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="group inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/20 transition-colors"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  {i + 1}
                </span>
                {t(lang, ch.en, ch.zh)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CH 1 — BEFORE YOU ENTER ══════════ */}
      <section id="before" className="section">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Chapter 1", "第一章")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "Before You Enter — Understand the Market", "进入前 — 看清市场")}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "China's digital ecosystem is not one platform or one model — it's a vibrant, interconnected landscape. Before you invest, understand what you're stepping into.",
                "中国的数字生态不是单一平台或单一模式——而是一个充满活力的互联生态。在投入之前，先了解你要进入的是什么。"
              )}
            </p>
          </Reveal>

          {/* Platform landscape */}
          <Reveal delay={80}>
            <h3 className="mt-12 text-xl font-bold text-navy">
              {t(lang, "The Platform Landscape", "平台全景")}
            </h3>
            <p className="mt-2 text-muted max-w-2xl">
              {t(
                lang,
                "Five major platforms, each with a distinct role in the consumer journey:",
                "五大核心平台，各自在消费者旅程中扮演不同角色："
              )}
            </p>
          </Reveal>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {platforms.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <div className="card h-full p-5">
                  <span className="text-lg font-extrabold text-gradient">{p.name}</span>
                  <span className="ml-2 text-xs font-bold text-brand bg-sky-50 rounded-full px-2 py-0.5">
                    {p.users}
                  </span>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {t(lang, p.en, p.zh)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Market evolution */}
          <Reveal delay={100}>
            <h3 className="mt-14 text-xl font-bold text-navy">
              {t(lang, "25 Years of Market Evolution", "25年市场演变")}
            </h3>
            <p className="mt-2 text-muted max-w-2xl">
              {t(
                lang,
                "This market has matured through five distinct eras. Understanding this history explains why a one-size-fits-all playbook no longer works.",
                "这个市场经历了五个截然不同的阶段。理解这段历史，就能明白为什么「一套打法通吃」已经行不通。"
              )}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 relative">
              {/* timeline line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-sky hidden md:block" />
              <div className="grid md:grid-cols-5 gap-4">
                {eras.map((era, i) => (
                  <div key={era.period} className="relative pl-0 md:pl-0">
                    <div className="flex md:flex-col items-start md:items-start gap-3 md:gap-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">
                        {i + 1}
                      </span>
                      <div className="md:mt-3">
                        <span className="text-xs font-bold text-brand tracking-wide">{era.period}</span>
                        <p className="mt-1 text-sm text-ink leading-relaxed">{t(lang, era.en, era.zh)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Key takeaway */}
          <Reveal delay={140}>
            <div className="mt-12 rounded-2xl bg-sky-50 border border-sky/60 p-7 md:p-9">
              <p className="text-base md:text-lg text-ink/85">
                <strong className="text-navy">
                  {t(lang, "The bottom line: ", "核心结论：")}
                </strong>
                {t(
                  lang,
                  "Today's China market requires a coordinated, multi-touchpoint strategy. No single platform, no single model, no shortcut. Brands that succeed are the ones that understand this complexity — and plan for it before they enter.",
                  "今天的中国市场需要协调一致的多触点策略。没有单一平台、没有单一模式、没有捷径。成功的品牌，是那些在进入之前就理解这种复杂性并做好准备的品牌。"
                )}
              </p>
            </div>
          </Reveal>

          {/* Journey flow */}
          <Reveal delay={160}>
            <div className="mt-12 flex justify-center">
              <a href="#path" className="group flex items-center gap-2 text-brand font-semibold hover:text-navy transition-colors">
                {t(lang, "Next: Choose your path", "下一步：选择你的路径")}
                <IconArrow width={18} height={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CH 2 — CHOOSE YOUR PATH ══════════ */}
      <section id="path" className="section bg-cream">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Chapter 2", "第二章")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "Choose Your Path — Brand or Sales?", "选择路径 — 做品牌还是做销售？")}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "The first strategic decision isn't which platform to pick — it's what kind of presence you want to build. Two legitimate paths, very different resource profiles.",
                "第一个战略决策不是选哪个平台——而是你想建立什么样的市场存在。两条路都合理，但资源配置截然不同。"
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {/* Path A */}
            <Reveal delay={60}>
              <div className="card h-full p-8 border-t-4 border-t-brand">
                <span className="text-5xl font-extrabold text-gradient">A</span>
                <h3 className="mt-4 text-xl font-bold text-navy">
                  {t(lang, "Brand First", "品牌先行")}
                </h3>
                <p className="mt-3 text-muted">
                  {t(
                    lang,
                    "For international brands with brand equity willing to invest medium-to-long term. Build awareness and reputation first, then scale conversion.",
                    "适合拥有品牌资产、愿意中长期投入的国际品牌。先建立认知和口碑，再逐步规模化转化。"
                  )}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    { en: "Brand naming & identity localization", zh: "品牌命名与识别本地化" },
                    { en: "Positioning & differentiation strategy", zh: "定位与差异化战略" },
                    { en: "Platform-adapted messaging", zh: "平台适配的传播语言" },
                    { en: "Seeding & word-of-mouth building", zh: "种草与口碑积累" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#brand"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-navy transition-colors"
                >
                  {t(lang, "Explore the brand path", "了解品牌路径")}
                  <IconArrow width={14} height={14} />
                </a>
              </div>
            </Reveal>

            {/* Path B */}
            <Reveal delay={120}>
              <div className="card h-full p-8 border-t-4 border-t-green">
                <span className="text-5xl font-extrabold" style={{ color: "#19ac71" }}>
                  B
                </span>
                <h3 className="mt-4 text-xl font-bold text-navy">
                  {t(lang, "Sales Driven", "销售驱动")}
                </h3>
                <p className="mt-3 text-muted">
                  {t(
                    lang,
                    "For brands that want to quickly validate market fit. Pick the right channels, run the conversion loop, then decide on brand investment.",
                    "适合想快速验证市场匹配度的品牌。选对渠道，跑通转化闭环，再决定品牌投入。"
                  )}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    { en: "Platform & channel selection", zh: "平台与渠道选择" },
                    { en: "Store model & distribution design", zh: "店铺模式与分销设计" },
                    { en: "Conversion loop optimization", zh: "转化闭环优化" },
                    { en: "Shopping festival calendar", zh: "购物节点规划" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#sales"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-navy transition-colors"
                >
                  {t(lang, "Explore the sales path", "了解销售路径")}
                  <IconArrow width={14} height={14} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Misconceptions */}
          <Reveal delay={100}>
            <h3 className="mt-16 text-xl font-bold text-navy">
              {t(lang, "Four Assumptions That Quietly Consume Budgets", "四个悄悄烧掉预算的假设")}
            </h3>
            <p className="mt-2 text-muted max-w-2xl">
              {t(
                lang,
                "These are the most common mistakes we see international brands make when entering China:",
                "以下是我们最常见到的国际品牌进入中国时犯的错误："
              )}
            </p>
          </Reveal>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {misconceptions.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card h-full p-7">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 text-sm font-bold">
                      !
                    </span>
                    <div>
                      <p className="font-bold text-navy">{t(lang, m.myth_en, m.myth_zh)}</p>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {t(lang, m.real_en, m.real_zh)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="mt-12 flex justify-center">
              <a href="#brand" className="group flex items-center gap-2 text-brand font-semibold hover:text-navy transition-colors">
                {t(lang, "Next: The brand path in detail", "下一步：品牌路径详解")}
                <IconArrow width={18} height={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CH 3 — BRAND PATH ══════════ */}
      <section id="brand" className="section">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Chapter 3", "第三章")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "The Brand Path — From Naming to Messaging", "品牌路径 — 从命名到落地传播")}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "If you've chosen brand first, the work follows a clear chain: give the brand a local identity, define its position, then translate that position into platform-native content.",
                "如果你选择了品牌先行，接下来的工作是一条清晰的链条：赋予品牌本地身份，明确品牌定位，再将定位转化为平台原生的内容。"
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {/* Naming */}
            <Reveal delay={60}>
              <div className="card h-full p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white text-base font-bold">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-navy">
                    {t(lang, "Naming & Identity", "命名与品牌资产")}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {[
                    { en: "Chinese brand name creation — not just translation, but cultural resonance", zh: "中文品牌命名——不是翻译，而是文化共鸣" },
                    { en: "Visual identity adaptation for local market contexts", zh: "视觉识别体系的本地化适配" },
                    { en: "Verbal identity: tone, voice, and naming conventions that feel local", zh: "语言识别：让语调、声音和命名规范有本地感" },
                    { en: "The 'imported brand' halo is fading — authentic local emotional connection wins", zh: "\"进口光环\"正在消退——真实的本地情感连接才能胜出" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Positioning */}
            <Reveal delay={120}>
              <div className="card h-full p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white text-base font-bold">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-navy">
                    {t(lang, "Positioning", "品牌定位")}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {[
                    { en: "Where do you sit vs. local competitors? Mapping the competitive landscape", zh: "相对本土竞品你的位置在哪里？绘制竞争格局地图" },
                    { en: "Why should Chinese consumers choose you? Defining the brand promise", zh: "中国消费者为什么要选你？定义品牌承诺" },
                    { en: "Price architecture & value proposition calibration", zh: "价格架构与价值主张校准" },
                    { en: "Category entry point — which subcategory to own first", zh: "品类切入点——先占领哪个细分品类" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Messaging */}
            <Reveal delay={180}>
              <div className="card h-full p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white text-base font-bold">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-navy">
                    {t(lang, "Messaging & Content", "落地传播与内容")}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {[
                    { en: "Platform-adapted messaging — same brand, different expression per channel", zh: "平台适配传播语言——同一品牌，不同渠道不同表达" },
                    { en: "Xiaohongshu: educational, lifestyle-first seeding content", zh: "小红书：教育性、生活方式优先的种草内容" },
                    { en: "Douyin: snackable short-video storytelling & scenario demos", zh: "抖音：碎片化短视频叙事与场景化演示" },
                    { en: "WeChat: long-form brand stories & community depth", zh: "微信：长内容品牌故事与社群深度运营" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Flow note */}
          <Reveal delay={200}>
            <div className="mt-10 rounded-2xl bg-sky-50 border border-sky/60 p-7">
              <p className="text-base text-ink/85">
                <strong className="text-navy">
                  {t(lang, "How these three connect: ", "这三步如何衔接：")}
                </strong>
                {t(
                  lang,
                  "Naming gives you a local identity. Positioning gives you a reason to exist. Messaging turns that reason into content that lives natively on each platform. Skip any step and the chain breaks — you end up with translated slogans that nobody searches for.",
                  "命名给你本地身份，定位给你存在理由，传播把理由变成各平台原生内容。跳过任何一步，链条就断了——你最终只会得到一堆没人会搜的翻译口号。"
                )}
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex justify-center">
              <a href="#sales" className="group flex items-center gap-2 text-brand font-semibold hover:text-navy transition-colors">
                {t(lang, "Next: The sales path", "下一步：销售路径")}
                <IconArrow width={18} height={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CH 4 — SALES PATH ══════════ */}
      <section id="sales" className="section bg-cream">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Chapter 4", "第四章")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "The Sales Path — From Selection to Conversion", "销售路径 — 从选品到转化")}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "If your priority is fast market validation, the focus shifts to channel selection, store design, and running a tight conversion loop.",
                "如果你的优先级是快速验证市场，重点就转向渠道选择、店铺设计和跑通转化闭环。"
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {/* Platform Selection */}
            <Reveal delay={60}>
              <div className="card h-full p-7">
                <h3 className="text-lg font-bold text-navy">
                  {t(lang, "Platform Selection", "平台选择")}
                </h3>
                <p className="mt-3 text-sm text-muted">
                  {t(
                    lang,
                    "Match platforms to your category and target demographics:",
                    "根据品类和目标人群选择平台："
                  )}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    { en: "Beauty & food — content platforms (Douyin, RED)", zh: "美妆、食品 — 内容平台（抖音、小红书）" },
                    { en: "Premium & trust-critical — Tmall flagship, JD logistics", zh: "高端、信任敏感 — 天猫旗舰、京东物流" },
                    { en: "High-ticket & B2B — WeChat private domain first", zh: "高客单、B2B — 微信私域优先" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Store Model */}
            <Reveal delay={120}>
              <div className="card h-full p-7">
                <h3 className="text-lg font-bold text-navy">
                  {t(lang, "Store Model & Distribution", "店铺模式与分销")}
                </h3>
                <p className="mt-3 text-sm text-muted">
                  {t(
                    lang,
                    "Three operating models — the right one depends on control, cost and speed:",
                    "三种运营模式——选择取决于控制力、成本和速度："
                  )}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    { en: "Flagship store — maximum brand control, highest cost", zh: "旗舰店 — 品牌控制力最强，成本最高" },
                    { en: "Platform self-operated (JD, Tmall Supermarket) — shared logistics", zh: "平台自营（京东、天猫超市）— 共享物流体系" },
                    { en: "Authorized distribution — broadest reach, lower margin", zh: "授权分销 — 覆盖最广，利润较低" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Conversion & Festivals */}
            <Reveal delay={180}>
              <div className="card h-full p-7">
                <h3 className="text-lg font-bold text-navy">
                  {t(lang, "Conversion Loop & Key Moments", "转化闭环与关键节点")}
                </h3>
                <p className="mt-3 text-sm text-muted">
                  {t(
                    lang,
                    "Run a tight loop — then scale what works:",
                    "跑通闭环，再规模化有效打法："
                  )}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    { en: "618 (Jun 18) — mid-year peak, category mindshare battle", zh: "618（6月18日）— 年中大促，品类心智争夺战" },
                    { en: "Double 11 (Nov 11) — world's largest single-day shopping event", zh: "双11（11月11日）— 全球最大的单日购物节" },
                    { en: "Content rhythm: daily seeding, thematic campaigns, peak bursts", zh: "内容节奏：日常种草、主题活动、峰值爆发" },
                  ].map((item) => (
                    <li key={item.en} className="flex gap-2 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                      {t(lang, item.en, item.zh)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Multi-touchpoint insight */}
          <Reveal delay={120}>
            <div className="mt-12 grid md:grid-cols-4 gap-4">
              {[
                {
                  title_en: "Public Seeding",
                  title_zh: "公域种草",
                  desc_en: "Xiaohongshu, Douyin KOLs, cross-platform content",
                  desc_zh: "小红书、抖音达人、跨平台内容",
                },
                {
                  title_en: "Public Conversion",
                  title_zh: "公域转化",
                  desc_en: "Tmall/JD flagships, performance ads, livestreaming",
                  desc_zh: "天猫/京东旗舰店、效果广告、直播带货",
                },
                {
                  title_en: "Private Seeding",
                  title_zh: "私域种草",
                  desc_en: "WeChat groups, VIP communities, owned channels",
                  desc_zh: "微信群、VIP社群、自有渠道",
                },
                {
                  title_en: "Private Conversion",
                  title_zh: "私域转化",
                  desc_en: "Mini-programs, repurchase loops, 1-on-1 WeCom ops",
                  desc_zh: "小程序、复购闭环、企业微信1对1运营",
                },
              ].map((q, i) => (
                <Reveal key={q.title_en} delay={140 + i * 60}>
                  <div className="card h-full p-5 text-center">
                    <span className="text-sm font-bold text-brand bg-sky-50 rounded-full px-3 py-1">
                      {t(lang, q.title_en, q.title_zh)}
                    </span>
                    <p className="mt-3 text-sm text-muted">{t(lang, q.desc_en, q.desc_zh)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 flex justify-center">
              <a href="#execution" className="group flex items-center gap-2 text-brand font-semibold hover:text-navy transition-colors">
                {t(lang, "Next: Execution & capability", "下一步：落地执行与能力建设")}
                <IconArrow width={18} height={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CH 5 — EXECUTION ══════════ */}
      <section id="execution" className="section">
        <div className="container-tlp">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t(lang, "Chapter 5", "第五章")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(lang, "Execution — Turning Strategy into Results", "落地执行 — 把策略变成结果")}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "No matter which path you chose, execution requires three capabilities: a clear funnel model, defined business goals, and content that actually works on each platform.",
                "无论选择哪条路径，落地执行需要三项能力：清晰的漏斗模型、明确的商业目标，以及真正在各平台生效的内容。"
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                no: "01",
                title_en: "Customer Journey Layering",
                title_zh: "客户旅程分层",
                sub_en: "Awareness → Interest → Purchase → Loyalty",
                sub_zh: "认知 → 兴趣 → 购买 → 忠诚",
                desc_en: "Map every touchpoint to a funnel stage. Deploy the right tools and content at each level — don't blast the same message everywhere.",
                desc_zh: "将每个触点对应到漏斗阶段，在每一层部署正确的工具和内容——而不是到处投放同样的信息。",
              },
              {
                no: "02",
                title_en: "End-in-Mind Goal Delivery",
                title_zh: "以终为始的目标交付",
                sub_en: "Sales, PR, word-of-mouth, growth — define before you spend",
                sub_zh: "销售、公关、口碑、增长——花钱之前先定义目标",
                desc_en: "Without defined business goals, you're burning money on directionless targeting. Set the KPIs first, then design the execution backwards.",
                desc_zh: "没有明确的商业目标，就是在漫无目的地烧钱。先设定KPI，再倒推设计执行方案。",
              },
              {
                no: "03",
                title_en: "Content Capability Upgrade",
                title_zh: "内容能力升级",
                sub_en: "Platform marketing + social seeding + IP collaboration",
                sub_zh: "平台营销 + 社交种草 + IP联名",
                desc_en: "Content and products are the foundation; tools and platforms are just leverage. Upgrade from 'posting content' to 'running a content system'.",
                desc_zh: "内容和产品是基础，工具和平台只是杠杆。从「发内容」升级到「运营内容体系」。",
              },
            ].map((cap, i) => (
              <Reveal key={cap.no} delay={i * 90}>
                <div className="card h-full p-8">
                  <span className="text-5xl font-extrabold text-gradient">{cap.no}</span>
                  <h3 className="mt-4 text-lg font-bold text-navy">
                    {t(lang, cap.title_en, cap.title_zh)}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand">
                    {t(lang, cap.sub_en, cap.sub_zh)}
                  </p>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {t(lang, cap.desc_en, cap.desc_zh)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closing thought */}
          <Reveal delay={120}>
            <div className="mt-12 rounded-2xl bg-sky-50 border border-sky/60 p-7 md:p-9">
              <p className="text-base md:text-lg text-ink/85">
                <strong className="text-navy">
                  {t(lang, "Remember: ", "记住：")}
                </strong>
                {t(
                  lang,
                  "Brand and sales are not an either/or choice — they're layered. Brand assets compound over time; performance marketing drives immediate results. The brands that win in China run both in parallel from day one, adjusting the ratio as they learn.",
                  "品牌和销售不是二选一——它们是叠加的。品牌资产随时间积累，效果营销驱动即时结果。在中国胜出的品牌，从第一天就两者并行，随着市场认知不断调整配比。"
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="section">
        <div className="container-tlp">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-brand to-navy text-white p-10 md:p-16 text-center relative overflow-hidden">
              <span
                className="deco-circle"
                style={{ width: 300, height: 300, right: -80, top: -80, background: "rgba(255,255,255,0.08)" }}
              />
              <h2 className="relative text-3xl md:text-4xl font-extrabold">
                {t(
                  lang,
                  "Ready to enter China? Let's map it out together.",
                  "准备进入中国？我们一起把它画清楚。"
                )}
              </h2>
              <p className="relative mt-4 text-white/85 text-lg max-w-2xl mx-auto">
                {t(
                  lang,
                  "Whether you're starting from scratch or rethinking an existing presence — we'll help you find the right models, platforms, and content strategies for your brand.",
                  "无论你是从零开始，还是重新审视现有布局——我们帮你找到最适合的品牌路径、平台选择和内容策略。"
                )}
              </p>
              <Link
                href={prefixPath("/contact")}
                className="relative btn bg-white text-navy hover:-translate-y-0.5 mt-8"
              >
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
