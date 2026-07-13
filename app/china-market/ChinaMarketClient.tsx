"use client";

import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import {
  IconArrow,
  IconStrategy,
  IconContent,
  IconTarget,
  IconUsers,
  IconNetwork,
  IconCheck,
} from "@/components/Icons";

/* ============================================================
   DATA
   ============================================================ */

// 01 — Platform ecosystem (MAU figures indicative, 2025)
const platforms = [
  {
    key: "tmall",
    name_en: "Taobao / Tmall",
    name_zh: "淘宝 / 天猫",
    role_en: "Search-led e-commerce — the default purchase destination",
    role_zh: "搜索型电商 —— 消费者的默认购买入口",
    mau: "900M+",
    tag_en: "Shelf & search",
    tag_zh: "货架与搜索",
    color: "#ff4400",
  },
  {
    key: "jd",
    name_en: "JD.com",
    name_zh: "京东",
    role_en: "B2C mall with its own logistics network",
    role_zh: "自建物流的 B2C 商城",
    mau: "580M+",
    tag_en: "Trust & speed",
    tag_zh: "信任与时效",
    color: "#e1251b",
  },
  {
    key: "douyin",
    name_en: "Douyin",
    name_zh: "抖音",
    role_en: "Short-video content commerce — discovery & bursts",
    role_zh: "短视频内容电商 —— 激发兴趣与爆发",
    mau: "700M+",
    tag_en: "Content & live",
    tag_zh: "内容与直播",
    color: "#161823",
  },
  {
    key: "red",
    name_en: "RED (Xiaohongshu)",
    name_zh: "小红书",
    role_en: "Lifestyle seeding and review-driven word of mouth",
    role_zh: "生活方式种草与口碑驱动",
    mau: "300M+",
    tag_en: "Seeding & reviews",
    tag_zh: "种草与口碑",
    color: "#ff2442",
  },
  {
    key: "wechat",
    name_en: "WeChat",
    name_zh: "微信",
    role_en: "Private-domain & social — owned relationship at scale",
    role_zh: "私域与社交 —— 规模化的自有关系",
    mau: "1.3B+",
    tag_en: "Private domain",
    tag_zh: "私域阵地",
    color: "#07c160",
  },
];

// 01 — E-commerce evolution timeline
const timeline = [
  {
    yr: "1997–2003",
    en: "Sprouting",
    zh: "萌芽",
    desc_en: "B2B is the dominant model; e-commerce is just being accepted.",
    desc_zh: "B2B 是主流模式，电商刚刚被市场接受。",
  },
  {
    yr: "2003–2008",
    en: "Starting",
    zh: "起步",
    desc_en: "SARS in 2003 opened new opportunities; Taobao is founded and C2C booms.",
    desc_zh: "2003 年非典带来新机会，淘宝成立，C2C 爆发。",
  },
  {
    yr: "2008–2012",
    en: "Traffic Era",
    zh: "流量时代",
    desc_en: "Alipay guarantees transactions; Tmall is established as traffic bonuses peak.",
    desc_zh: "支付宝保障交易，天猫成立，流量红利见顶。",
  },
  {
    yr: "2012–2018",
    en: "Branding",
    zh: "品牌化",
    desc_en: "B2C matures; Tmall splits from Taobao as consumers seek better products.",
    desc_zh: "B2C 成熟，天猫从淘宝分拆，消费者追求更好产品。",
  },
  {
    yr: "2018–Now",
    en: "Digitalization",
    zh: "数字化",
    desc_en: "Consumer-oriented and omni-channel — platforms enrich both discovery and purchase.",
    desc_zh: "以消费者为中心、全渠道并行，平台同时具备种草与转化能力。",
  },
];

// 01 — Channel matrix (public/private × seeding/conversion)
const matrix = [
  {
    q_en: "Public · Seeding",
    q_zh: "公域 · 种草",
    items_en: ["RED (Xiaohongshu) content", "Douyin short-video & KOL", "Cross-platform content seeding"],
    items_zh: ["小红书内容种草", "抖音短视频与达人", "跨平台内容种草"],
  },
  {
    q_en: "Public · Conversion",
    q_zh: "公域 · 转化",
    items_en: ["Tmall / JD flagship stores", "Platform performance ads (SEO, banners)", "Live-streaming commerce"],
    items_zh: ["天猫 / 京东旗舰店", "平台效果广告（搜索、展示）", "直播电商"],
  },
  {
    q_en: "Private · Seeding",
    q_zh: "私域 · 种草",
    items_en: ["WeChat groups & communities", "Brand membership & VIP groups", "Owned content touchpoints"],
    items_zh: ["微信群与社群", "品牌会员与 VIP 群", "自有内容触点"],
  },
  {
    q_en: "Private · Conversion",
    q_zh: "私域 · 转化",
    items_en: ["WeChat Mini Program store", " Membership re-purchase loops", "1-to-1 clienteling (Enterprise WeChat)"],
    items_zh: ["微信小程序商城", "会员复购闭环", "企微 1 对 1 客户运营"],
  },
];

// 01 — Promotion calendar
const promo = [
  {
    name: "618",
    date_en: "Mid-year · June 18",
    date_zh: "年中 · 6 月 18 日",
    desc_en: "The first major sales peak of the year — a must-win window for category leadership.",
    desc_zh: "全年第一个大促峰值，是抢占品类心智的关键窗口。",
  },
  {
    name: "Double 11",
    date_en: "Year-end · November 11",
    date_zh: "年末 · 11 月 11 日",
    desc_en: "The largest single-day shopping festival — peak traffic, peak competition, peak ROI pressure.",
    desc_zh: "全球最大单日购物节，流量、竞争与 ROI 压力同时见顶。",
  },
];

// 02 — Common misconceptions
const myths = [
  {
    no: "01",
    myth_en: "Once I'm on Tmall or JD, the platform will buy out or run my brand for me.",
    myth_zh: "进了天猫或京东，平台就会买断或替我运营品牌。",
    real_en:
      "Platforms are channels, not brand owners. Platform self-operation or distribution is just one model of cooperation — brand ownership always stays with you. Know the difference between flagship (you operate), platform self-op (platform procures stock), and distribution.",
    real_zh:
      "平台是渠道方，不是品牌方。平台自营或经销只是分销方式之一，品牌归属永远在品牌方。要分清「旗舰店（你运营）/ 平台自营（平台采购）/ 经销」三种权责边界。",
  },
  {
    no: "02",
    myth_en: "Opening a Tmall flagship store is all I need — or every brand follows one playbook.",
    myth_zh: "开个天猫旗舰店就完事了，或者所有品牌都该走同一套打法。",
    real_en:
      "China's e-commerce is multi-form. Flagship, platform self-op, Douyin content commerce, RED seeding, WeChat private domain, distributors and DTC all coexist. The right mix depends on your category and brand stage — not a single template.",
    real_zh:
      "中国电商是多形态并存的：旗舰店、平台自营、抖音内容电商、小红书种草、微信私域、经销商、DTC。正确组合取决于品类与品牌阶段，不是一套模板。",
  },
  {
    no: "03",
    myth_en: "Everyone is on Douyin, so I must be there too — or I'll fall behind.",
    myth_zh: "别人都做抖音，我不做就落后了。",
    real_en:
      "Choose platforms by category and brand stage, not by hype. Douyin excels at seeding and bursts, but it is hard for smaller players to break even alone — our data shows it often needs to be combined with Tmall to reach overall profitability. Build assets, don't just chase platforms.",
    real_zh:
      "按品类与品牌阶段选平台，而不是追风口。抖音强在种草与爆发，但小玩家单独很难打平——数据显示它常需与天猫组合才能达到整体盈亏平衡。要建资产，不要只追平台。",
  },
  {
    no: "04",
    myth_en: "Just pour money into performance ads for sales now; we'll build the brand later.",
    myth_zh: "先砸效果广告冲销量，品牌以后再说。",
    real_en:
      "Branding and trade/performance marketing are not either-or — they are layers. Brand equity compounds long-term; trade marketing drives short-term conversion. Start with the end in mind: set the business goal first, then choose the mix. Content and product are the foundation; tools are leverage.",
    real_zh:
      "品牌与效果/贸易营销不是二选一，而是分层。品牌资产长期复利，贸易营销驱动短期转化。以终为始：先定生意目标，再选组合。内容与产品是地基，工具只是杠杆。",
  },
];

// 03 — Service optimization & capability building
const build = [
  {
    Icon: IconUsers,
    en: "Customer journey tiering (AIPL)",
    zh: "客户旅程分层（AIPL）",
    body_en:
      "Map the full path — Awareness, Interest, Purchase, Loyalty — and deploy the right tool at each stage. Platforms provide advertising products to maximize every step of the funnel.",
    body_zh:
      "梳理完整路径——认知、兴趣、购买、忠诚，并在每个阶段部署对的工具。平台提供广告产品把漏斗每一步都最大化。",
  },
  {
    Icon: IconTarget,
    en: "Goal-first transmission",
    zh: "以终为始的目标传递",
    body_en:
      "Sales, PR, reputation and user growth demand completely different approaches. Define the business goal before execution — precisely targeted spend without direction is just burning money.",
    body_zh:
      "销量、公关、口碑、用户增长需要完全不同的打法。执行前先定生意目标——方向不清的精准投放，只是烧钱。",
  },
  {
    Icon: IconContent,
    en: "Content capability upgrade",
    zh: "内容能力升级",
    body_en:
      "Three mechanisms work together: platform performance marketing, social seeding, and platform marketing IP. Content and product are the foundation; the rest is leverage on top of it.",
    body_zh:
      "三类机制协同：平台效果营销、社媒种草、平台营销 IP。内容与产品是地基，其余都是叠加其上的杠杆。",
  },
];

// 04 — Social & content localization
const social = [
  {
    Icon: IconNetwork,
    en: "Platform selection",
    zh: "平台选择",
    body_en:
      "Match platforms to category and audience. Beauty, food and apparel fit content commerce well; high-consideration or B2B categories need a different entry point. Decide by the consumer decision path, not the trend.",
    body_zh:
      "按品类与人群匹配平台。美妆、食品、服饰天然适配内容电商；高客单或 B2B 品类需要不同切入点。看消费者决策路径，而不是看风口。",
  },
  {
    Icon: IconContent,
    en: "Content strategy",
    zh: "内容策略",
    body_en:
      "A rhythm of daily, thematic and campaign content keeps the brand present and educates new consumers, while big campaigns concentrate impact around promotion peaks.",
    body_zh:
      "日常、主题、大促三层内容节奏，既维持品牌在场、教育新客，又在大促节点集中爆发。",
  },
  {
    Icon: IconUsers,
    en: "KOL collaboration",
    zh: "达人合作",
    body_en:
      "Tiers span from top anchors (¥10M+ per live) to pure-commission streamers. Select by audience fit and sales data, and seed a hero product on RED / Douyin before the live to maximize conversion.",
    body_zh:
      "从头部主播（单场千万级）到纯佣达人，按人群匹配与销售数据筛选；直播前先在小红书 / 抖音种草爆款，放大转化。",
  },
  {
    Icon: IconStrategy,
    en: "Localized expression",
    zh: "本地化表达",
    body_en:
      "The premium attached to 'international brands' is fading fast. What resonates with Chinese consumers is genuine local emotion — not imported brand mythology. Localize the feeling, not just the language.",
    body_zh:
      "「进口品牌」的光环正在快速褪色。能打动中国消费者的，是真实的本地情绪，而不是进口的牌子神话。本地化的是感受，而不只是语言。",
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */

export default function ChinaMarketClient() {
  const { lang, prefixPath } = useLang();

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg,#000a56,#004fb0)" }}
        />
        <span
          className="deco-circle"
          style={{ width: 460, height: 460, right: -140, top: -180, background: "rgba(79,134,214,0.22)" }}
        />
        <span
          className="deco-circle"
          style={{ width: 320, height: 320, left: -120, bottom: -140, background: "rgba(25,172,113,0.16)" }}
        />
        <div className="container-tlp relative py-24 md:py-28">
          <span className="eyebrow text-white bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5">
            {t(lang, "China Market", "中国市场")}
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold max-w-4xl">
            {t(
              lang,
              "Understand the China market before you enter it",
              "进入中国市场之前，先读懂它"
            )}
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-2xl leading-relaxed">
            {t(
              lang,
              "A practical guide for global brands: how China's digital ecosystem really works, the models behind it, and the misconceptions that cost foreign brands time and budget.",
              "为国外品牌准备的一份实战指南：中国数字生态到底怎么运转、背后是什么模型，以及那些让外国品牌白花时间与预算的误区。"
            )}
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              { n: "¥15T+", l_en: "Online retail (approx. 2025)", l_zh: "线上零售（约 2025）" },
              { n: "900M+", l_en: "Online shoppers", l_zh: "线上购物用户" },
              { n: "1.3B+", l_en: "WeChat users", l_zh: "微信用户" },
              { n: "5+", l_en: "Major platforms to master", l_zh: "需要攻克的头部平台" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-5 backdrop-blur-sm">
                <div className="text-3xl font-extrabold text-white">{s.n}</div>
                <div className="mt-1.5 text-xs text-white/70">{t(lang, s.l_en, s.l_zh)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 01 现状与模式 ===================== */}
      <section className="section">
        <div className="container-tlp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">01 · {t(lang, "Landscape & Models", "现状与模式")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(
                lang,
                "A dynamic ecosystem — not one platform, not one model",
                "一个充满活力的生态 —— 不是一个平台，也不是一种模式"
              )}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "China's digital ecosystem is dominated by a few giants, but every platform plays a distinct role across the consumer journey.",
                "中国数字生态由几家巨头主导，但每个平台在消费者旅程中扮演不同角色。"
              )}
            </p>
          </Reveal>

          {/* Platform ecosystem */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {platforms.map((p, i) => (
              <Reveal key={p.key} delay={i * 70}>
                <div className="card h-full p-6 flex flex-col">
                  <span className="h-1.5 w-10 rounded-full" style={{ background: p.color }} />
                  <h3 className="mt-4 text-lg font-bold text-navy leading-tight">{t(lang, p.name_en, p.name_zh)}</h3>
                  <p className="mt-2 text-sm text-muted flex-1">{t(lang, p.role_en, p.role_zh)}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-2xl font-extrabold text-gradient">{p.mau}</span>
                    <span className="text-xs font-semibold text-brand bg-sky-50 rounded-full px-2.5 py-1">
                      {t(lang, p.tag_en, p.tag_zh)}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted/70">
            {t(
              lang,
              "Monthly active users are indicative figures for 2025, for orientation only.",
              "月活用户为 2025 年参考性数据，仅用于建立认知。"
            )}
          </p>

          {/* Evolution timeline */}
          <Reveal className="mt-16 max-w-3xl">
            <h3 className="text-2xl font-extrabold text-navy">
              {t(lang, "How we got here: five eras in 25 years", "来路：25 年里的五个时代")}
            </h3>
          </Reveal>
          <div className="mt-8 relative">
            <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-slate-200" />
            <div className="grid md:grid-cols-5 gap-6">
              {timeline.map((s, i) => (
                <Reveal key={s.yr} delay={i * 70}>
                  <div className="relative">
                    <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white text-xs font-bold mx-auto relative z-10 shadow-[0_10px_24px_-10px_rgba(0,93,196,0.7)]">
                      {i + 1}
                    </div>
                    <div className="card mt-4 md:mt-5 p-5">
                      <div className="text-xs font-bold text-brand tracking-wide">{s.yr}</div>
                      <div className="mt-1 text-base font-bold text-navy">{t(lang, s.en, s.zh)}</div>
                      <p className="mt-2 text-sm text-muted leading-relaxed">{t(lang, s.desc_en, s.desc_zh)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Channel matrix */}
          <Reveal className="mt-16 max-w-3xl">
            <h3 className="text-2xl font-extrabold text-navy">
              {t(lang, "One touchpoint is not enough", "单一触点已经不够了")}
            </h3>
            <p className="mt-3 text-muted">
              {t(
                lang,
                "From 'single touchpoint' to 'multi-touchpoint' — brands must operate across public and private domains, seeding and conversion.",
                "从「单一触点」到「多触点」——品牌必须在公域与私域、种草与转化之间协同运作。"
              )}
            </p>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {matrix.map((m, i) => (
              <Reveal key={m.q_en} delay={i * 70}>
                <div className="card h-full p-6 bg-cream">
                  <div className="text-sm font-bold text-brand">{t(lang, m.q_en, m.q_zh)}</div>
                  <ul className="mt-4 space-y-2.5">
                    {t(lang, m.items_en, m.items_zh).map((it: string) => (
                      <li key={it} className="flex gap-2 text-sm text-ink">
                        <IconCheck width={16} height={16} className="mt-1 shrink-0 text-green" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Promotion calendar */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {promo.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div className="card h-full p-8 flex items-center gap-6">
                  <div className="shrink-0 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy text-white text-2xl font-extrabold">
                    {p.name}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand">{t(lang, p.date_en, p.date_zh)}</div>
                    <p className="mt-2 text-muted leading-relaxed">{t(lang, p.desc_en, p.desc_zh)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 02 误区与挑战 ===================== */}
      <section className="section bg-cream">
        <div className="container-tlp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">02 · {t(lang, "Misconceptions", "误区与挑战")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(
                lang,
                "Four assumptions that quietly drain budget",
                "四个悄悄吞噬预算的假设"
              )}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "The most expensive mistakes are the ones made before execution even starts.",
                "最贵的错误，往往在执行开始之前就已经发生。"
              )}
            </p>
          </Reveal>

          <div className="mt-12 space-y-5">
            {myths.map((m, i) => (
              <Reveal key={m.no} delay={i * 60}>
                <div className="card overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="p-7 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-extrabold text-slate-200">{m.no}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-orange">
                          {t(lang, "Myth", "误区")}
                        </span>
                      </div>
                      <p className="mt-3 text-lg font-semibold text-navy leading-snug">
                        {t(lang, m.myth_en, m.myth_zh)}
                      </p>
                    </div>
                    <div className="p-7 md:p-8 bg-sky-50/60">
                      <div className="flex items-center gap-3">
                        <IconCheck width={18} height={18} className="text-green" />
                        <span className="text-xs font-bold uppercase tracking-wider text-green">
                          {t(lang, "Reality", "现实")}
                        </span>
                      </div>
                      <p className="mt-3 text-muted leading-relaxed">{t(lang, m.real_en, m.real_zh)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 03 服务优化与能力建设 ===================== */}
      <section className="section">
        <div className="container-tlp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">03 · {t(lang, "Optimization & Capability", "服务优化与能力建设")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(
                lang,
                "Turn understanding into execution",
                "把「读懂」变成「落地」"
              )}
            </h2>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {build.map((b, i) => {
              const Ico = b.Icon;
              return (
                <Reveal key={b.en} delay={i * 90}>
                  <div className="card h-full p-8">
                    <span className="icon-tile">
                      <Ico width={40} height={40} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-navy">{t(lang, b.en, b.zh)}</h3>
                    <p className="mt-3 text-muted leading-relaxed">{t(lang, b.body_en, b.body_zh)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 04 社媒运营与内容本地化 ===================== */}
      <section className="section bg-cream">
        <div className="container-tlp">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">04 · {t(lang, "Social & Content Localization", "社媒运营与内容本地化")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
              {t(
                lang,
                "Where we can help you directly",
                "我们能直接帮你落地的部分"
              )}
            </h2>
            <p className="mt-4 text-lg text-muted">
              {t(
                lang,
                "Platform selection, content strategy, KOL collaboration and localized expression — the parts of the journey where local execution makes or breaks the result.",
                "平台选择、内容策略、达人合作与本地化表达——本地化执行决定成败的那一段旅程。"
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {social.map((s, i) => {
              const Ico = s.Icon;
              return (
                <Reveal key={s.en} delay={i * 70}>
                  <div className="card h-full p-6">
                    <span className="icon-tile">
                      <Ico width={38} height={38} />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">{t(lang, s.en, s.zh)}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{t(lang, s.body_en, s.body_zh)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="section">
        <div className="container-tlp">
          <Reveal>
            <div className="card bg-navy text-white p-10 md:p-14 text-center relative overflow-hidden">
              <span
                className="deco-circle"
                style={{ width: 300, height: 300, right: -80, top: -120, background: "rgba(79,134,214,0.25)" }}
              />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-extrabold max-w-2xl mx-auto">
                  {t(
                    lang,
                    "Entering China? Let's map it together.",
                    "准备进入中国？我们一起把它画清楚。"
                  )}
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                  {t(
                    lang,
                    "Talk to our China-market team about the right model, platforms and content approach for your brand.",
                    "和我们的中国市场团队聊聊，为你的品牌找到对的模型、平台与内容打法。"
                  )}
                </p>
                <Link href={prefixPath("/contact")} className="btn btn-primary mt-8">
                  {t(lang, "Contact the China team", "联系中国市场团队")}
                  <IconArrow width={18} height={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
