/* ============================================================
   TLU Insights / 观点 — your viewpoints & blog.

   👉 TO ADD A NEW ARTICLE: copy one { ... } block below, put it at
   the TOP of the array (newest first), and fill in the fields.

   - slug:    a short url-safe id (letters, numbers, hyphens). Must be unique.
   - date:    "YYYY-MM-DD"
   - tag:     short label (e.g. Perspective / 观点, Audio / 音频)
   - title:   the headline
   - excerpt: 1–2 sentence summary shown on the list page
   - body:    an array of paragraphs. Each string is one paragraph.
              Start a string with "## " to make it a sub-heading.
              (Leave body as [] if the article is audio-only.)
   - audio:   OPTIONAL list of audio clips. Each clip has a bilingual
              title and a `src` pointing to a file in /public/audio/.
              To add audio: drop the .mp3 in public/audio/ and reference
              it here as "/audio/your-file.mp3".

   Fill BOTH the _en (English) and _zh (中文) fields. If you only have
   one language, paste the same text into both for now.
   ============================================================ */

export type AudioClip = {
  title_en: string;
  title_zh: string;
  src: string;
};

export type Post = {
  slug: string;
  date: string;
  tag_en: string;
  tag_zh: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  body_en: string[];
  body_zh: string[];
  audio?: AudioClip[];
};

export const posts: Post[] = [
  {
    slug: "china-brands-going-global",
    date: "2026-03-17",
    tag_en: "Audio · Founder",
    tag_zh: "音频 · 创始人",
    title_en: "China brands going global",
    title_zh: "中国品牌出海",
    excerpt_en:
      "A founder's notes on what 'going global' really means — localization, consumer differences, and learning from DJI",
    excerpt_zh:
      "创始人谈「出海」的真正含义——本地化、消费者差异，以及向大疆学习",
    body_en: [
      "A short audio series from our founder on how Chinese brands can win abroad — beyond exports, toward real brands that travel.",
    ],
    body_zh: [
      "我们创始人关于中国品牌如何在海外取胜的一组短音频——超越「出口」，走向真正能走出去的品牌。",
    ],
    audio: [
      { title_en: "Defining 'going global' & the rise of auto exports", title_zh: "品牌出海的定义与汽车出口增长", src: "/audio/cbg-01.mp3" },
      { title_en: "The challenge of market localization", title_zh: "市场本地化的挑战", src: "/audio/cbg-02.mp3" },
      { title_en: "Consumer differences & brand challenges", title_zh: "消费者差异与品牌挑战", src: "/audio/cbg-03.mp3" },
      { title_en: "HQ arrogance & DJI's success", title_zh: "总部傲慢与大疆的成功", src: "/audio/cbg-04.mp3" },
    ],
  },
  {
    slug: "ai-and-raising-lobsters",
    date: "2026-03-30",
    tag_en: "Audio · Founder",
    tag_zh: "音频 · 创始人",
    title_en: "AI, and 'raising lobsters'",
    title_zh: "AI 与「养龙虾」",
    excerpt_en:
      "On AI replacing repetitive work, the cost of supervising it, and why China's environment is unique",
    excerpt_zh:
      "谈 AI 替代重复性工作、监督它的成本，以及中国土壤为何独特",
    body_en: [
      "Our founder's take on where AI actually helps, where it still falls short, and the capability gap that remains.",
    ],
    body_zh: [
      "我们创始人谈 AI 究竟在哪里有用、在哪里仍有不足，以及尚存的能力差距。",
    ],
    audio: [
      { title_en: "OpenCloud positioning & the 'raising lobsters' analogy", title_zh: "OpenCloud 定位与养龙虾比喻", src: "/audio/ai-01.mp3" },
      { title_en: "AI replacing repetitive work", title_zh: "AI 替代重复性工作", src: "/audio/ai-02.mp3" },
      { title_en: "AI's problems & the cost of supervision", title_zh: "AI 的问题与监督成本", src: "/audio/ai-03.mp3" },
      { title_en: "China's unique environment & the capability gap", title_zh: "中国土壤独特与能力差距", src: "/audio/ai-04.mp3" },
    ],
  },
  {
    slug: "the-pet-economy",
    date: "2025-11-18",
    tag_en: "Audio · Founder",
    tag_zh: "音频 · 创始人",
    title_en: "The pet economy",
    title_zh: "宠物经济",
    excerpt_en:
      "Pets as emotional anchors, a category exploding in variety, and the gaps in healthcare and brand building",
    excerpt_zh:
      "宠物作为情感寄托、品类的爆发，以及医疗与品牌建设的缺口",
    body_en: [
      "Our founder on why the pet economy is really an emotional economy — and where the opportunities and gaps lie.",
    ],
    body_zh: [
      "我们创始人谈宠物经济为何本质是情感经济——以及机会与缺口所在。",
    ],
    audio: [
      { title_en: "Pets as emotional anchor & projection", title_zh: "宠物是情感寄托与投射", src: "/audio/pet-01.mp3" },
      { title_en: "A category rich in variety", title_zh: "宠物经济品类丰富", src: "/audio/pet-02.mp3" },
      { title_en: "Industry status & brand building", title_zh: "行业现状与品牌建设", src: "/audio/pet-03.mp3" },
      { title_en: "The healthcare gap & social dimension", title_zh: "医疗缺口与社交属性", src: "/audio/pet-04.mp3" },
    ],
  },
  {
    slug: "technology-that-understands-business",
    date: "2026-06-28",
    tag_en: "Perspective",
    tag_zh: "观点",
    title_en: "Technology that understands business",
    title_zh: "懂生意的技术",
    excerpt_en:
      "Why the next wave of growth comes not from more data, but from closing the loop between insight, decision and execution",
    excerpt_zh:
      "为什么下一波增长不靠更多数据，而靠打通「洞察—决策—执行」的闭环",
    body_en: [
      "Most companies today are not short of data. They are short of decisions that data can actually drive, and the execution that turns those decisions into growth.",
      "## From data to decisions",
      "We believe the real differentiator is operational: the ability to move from a consumer insight to a concrete plan, and from a plan to omni-channel execution — without losing fidelity along the way.",
      "## The closed loop",
      "AI is most valuable when it is embedded in this loop, not bolted on at the end. Technology that understands business is technology that helps you decide and act, not just analyse.",
      "This is the first of our perspectives. We'll keep sharing how we think about growth, brands and markets here.",
    ],
    body_zh: [
      "今天大多数公司并不缺数据，缺的是数据能真正驱动的决策，以及把决策变成增长的执行。",
      "## 从数据到决策",
      "我们认为真正的差异化在于运营能力：能够从一个消费者洞察走到一份具体方案，再从方案走到全渠道执行，并在这个过程中不失真。",
      "## 闭环",
      "当 AI 被嵌入这个闭环、而不是事后附加时，它的价值最大。懂生意的技术，是帮助你决策与行动的技术，而不仅仅是做分析。",
      "这是我们的第一篇观点。我们会在这里持续分享我们对增长、品牌与市场的思考。",
    ],
  },
];
