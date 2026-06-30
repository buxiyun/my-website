"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";

const DURATION = 6000;

export default function HeroCarousel() {
  const { lang, prefixPath } = useLang();
  const [cur, setCur] = useState(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [loopActive, setLoopActive] = useState(0);
  const total = 3;

  /* ---- navigation ---- */
  const go = useCallback(
    (i: number) => {
      const next = ((i % total) + total) % total;
      setCur(next);
    },
    [],
  );

  /* ---- auto-rotate ---- */
  useEffect(() => {
    if (pausedRef.current) return;
    timerRef.current = setInterval(() => {
      setCur((c) => (c + 1) % total);
    }, DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cur]);

  /* ---- slide-2 card highlight loop ---- */
  useEffect(() => {
    if (cur === 1) {
      let idx = 0;
      loopTimerRef.current = setInterval(() => {
        idx = (idx + 1) % 4;
        setLoopActive(idx);
      }, 1300);
    } else {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      setLoopActive(0);
    }
    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    };
  }, [cur]);

  /* ---- keyboard nav ---- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [cur, go]);

  /* ---- pause on hover ---- */
  const pause = () => {
    pausedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resume = () => {
    pausedRef.current = false;
  };

  /* ---- progress bar restart (key trick) ---- */
  const barKey = Date.now();

  const isLight = cur === 1;

  return (
    <section
      className="hc-hero"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="hc-slides">
        {/* ============ SLIDE 1 — AI-Empowered ============ */}
        <div className={`hc-slide ${cur === 0 ? "active" : ""}`} data-theme="dark">
          <div className="hc-grid-bg" />
          <div className="hc-glow1" />
          <div className="hc-glow2" />
          <div className="hc-ticker">
            {t(lang, "01 / AI · VALUE PROPOSITION", "01 / AI · 核心价值")}
          </div>

          <div className="hc-wrap">
            <div className="hc-left">
              <div className="hc-eyebrow r-1">
                <span className="hc-dot" />
                {t(lang, "AI-Empowered · Next-Gen", "AI 赋能 · 新一代")}
              </div>
              <h1 className="hc-headline r-2">
                {t(
                  lang,
                  <>From Data,<br />to Decisions,<br />to <span style={{ color: "#bfd6ff" }}>Growth</span>.</>,
                  <>从数据，<br />到决策，<br />到<span style={{ color: "#bfd6ff" }}>增长</span>。</>,
                )}
              </h1>
              <p className="hc-sub r-3">
                {t(
                  lang,
                  "We're the AI-empowered, next-gen business solution provider — driving results through technology that actually understands business, built on deep consumer insight.",
                  "我们是 AI 驱动的新一代商业解决方案提供者——以真正理解商业的技术，基于深度消费者洞察，驱动可见的增长。",
                )}
              </p>
              <div className="hc-ctas r-4">
                <Link href={prefixPath("/solutions")} className="hc-btn hc-btn-primary">
                  {t(lang, "Explore Solutions", "了解解决方案")}
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
                <Link href={prefixPath("/contact")} className="hc-btn hc-btn-ghost">
                  {t(lang, "Get in Touch", "联系我们")}
                </Link>
              </div>
            </div>

            <div className="hc-right r-5">
              <div className="hc-neural">
                <div className="hc-ring" style={{ width: 480, height: 480 }} />
                <div className="hc-ring hc-ring-r2" style={{ width: 340, height: 340 }} />
                <div className="hc-ring" style={{ width: 200, height: 200 }} />

                <svg viewBox="0 0 480 480">
                  <defs>
                    <linearGradient id="hc-line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#9fbeff" stopOpacity={0} />
                      <stop offset="50%" stopColor="#9fbeff" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#hc-line)" strokeWidth={1} fill="none">
                    <path d="M240 240 L 80 100" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite" /></path>
                    <path d="M240 240 L 420 130" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2.5s" repeatCount="indefinite" /></path>
                    <path d="M240 240 L 90 360" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-40" dur="3s" repeatCount="indefinite" /></path>
                    <path d="M240 240 L 400 380" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2.2s" repeatCount="indefinite" /></path>
                    <path d="M240 240 L 240 60" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2.8s" repeatCount="indefinite" /></path>
                    <path d="M240 240 L 240 420" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2.6s" repeatCount="indefinite" /></path>
                    <path d="M80 100 L 240 60" strokeOpacity={0.3} />
                    <path d="M420 130 L 240 60" strokeOpacity={0.3} />
                    <path d="M90 360 L 240 420" strokeOpacity={0.3} />
                    <path d="M400 380 L 240 420" strokeOpacity={0.3} />
                  </g>
                  <circle className="hc-node" cx={80} cy={100} r={5}><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite" /></circle>
                  <circle className="hc-node" cx={420} cy={130} r={6}><animate attributeName="opacity" values=".5;1;.5" dur="2.4s" repeatCount="indefinite" /></circle>
                  <circle className="hc-node" cx={90} cy={360} r={5}><animate attributeName="opacity" values="1;.5;1" dur="2.8s" repeatCount="indefinite" /></circle>
                  <circle className="hc-node" cx={400} cy={380} r={6}><animate attributeName="opacity" values=".4;1;.4" dur="2.2s" repeatCount="indefinite" /></circle>
                  <circle className="hc-node-big" cx={240} cy={60} r={7}><animate attributeName="opacity" values="1;.6;1" dur="1.8s" repeatCount="indefinite" /></circle>
                  <circle className="hc-node-big" cx={240} cy={420} r={7}><animate attributeName="opacity" values=".6;1;.6" dur="2s" repeatCount="indefinite" /></circle>
                </svg>

                <div className="hc-center-orb">TLU·AI</div>

                <div className="hc-chip hc-chip-1">consumer.signal</div>
                <div className="hc-chip hc-chip-2">decision.model</div>
                <div className="hc-chip hc-chip-3">campaign.roi</div>
                <div className="hc-chip hc-chip-4">channel.sync</div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ SLIDE 2 — Capability Loop ============ */}
        <div className={`hc-slide hc-slide-light ${cur === 1 ? "active" : ""}`} data-theme="light">
          <div className="hc-ticker">
            {t(lang, "02 / CAPABILITY · CLOSED LOOP", "02 / 能力体系 · 闭环")}
          </div>

          <div className="hc-wrap">
            <div className="hc-left">
              <div className="hc-eyebrow r-1">
                <span className="hc-dot" />
                {t(lang, "Our Unique Positioning", "我们的独特定位")}
              </div>
              <h1 className="hc-headline r-2">
                {t(
                  lang,
                  <>Strategy meets<br /><span className="hc-accent">execution</span>,<br />in one loop.</>,
                  <>从战略设计<br />到<span className="hc-accent">全域执行</span>，<br />一个闭环。</>,
                )}
              </h1>
              <p className="hc-sub r-3">
                {t(
                  lang,
                  "Four capabilities — Strategy, Operations, Tech & Data, Creative — running as one closed system. From insight to decision to growth, fully connected.",
                  "四大能力——战略、运营、技术与数据、内容创意——作为一个闭环系统协同运转。从洞察到决策，再到增长，全链路打通。",
                )}
              </p>
              <div className="hc-ctas r-4">
                <Link href={prefixPath("/solutions")} className="hc-btn hc-btn-primary">
                  {t(lang, "See How We Work", "了解我们的方法")}
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
                <Link href={prefixPath("/cases")} className="hc-btn hc-btn-ghost">
                  {t(lang, "View Cases", "查看案例")}
                </Link>
              </div>
            </div>

            <div className="hc-right r-5">
              <div className="hc-loop">
                <div className="hc-loop-ring-bg" />

                <svg className="hc-loop-arrow" viewBox="0 0 280 280">
                  <defs>
                    <marker id="hc-arr" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                      <path d="M0 0 L 10 5 L 0 10 z" fill="#0936ff" />
                    </marker>
                  </defs>
                  <circle cx={140} cy={140} r={120} fill="none" stroke="#0936ff" strokeWidth={2} strokeDasharray="6 12" opacity={0.6} />
                  <path d="M 140 20 A 120 120 0 0 1 250 130" fill="none" stroke="#0936ff" strokeWidth={2.5} markerEnd="url(#hc-arr)" />
                </svg>

                {([
                  { en: "Strategy", zh: "战略", sub_en: "Sharp insights · clear direction", sub_zh: "锐利洞察 · 清晰方向", icon: <><circle cx={12} cy={12} r={9} /><circle cx={12} cy={12} r={4} /><circle cx={12} cy={12} r={1} fill="currentColor" /></> },
                  { en: "Operations", zh: "运营", sub_en: "Omni-channel · always-on", sub_zh: "全域协同 · 持续运营", icon: <><path d="M4 7h16M4 12h10M4 17h16" /><circle cx={18} cy={12} r={2} fill="currentColor" /></> },
                  { en: "Tech & Data", zh: "技术与数据", sub_en: "World-class analytics engine", sub_zh: "世界级分析引擎", icon: <><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></> },
                  { en: "Creative", zh: "内容创意", sub_en: "Content that converts", sub_zh: "以转化为目标的内容", icon: <><rect x={3} y={5} width={18} height={14} rx={2} /><path d="M3 9h18M8 14l3-2 3 2 4-3" /></> },
                ] as const).map((cap, i) => {
                  const posClass = `hc-cap hc-cap-${i + 1}`;
                  const activeClass = loopActive === i ? " active" : "";
                  return (
                    <div key={cap.en} className={`${posClass}${activeClass}`}>
                      <div className="hc-cap-ico">
                        <svg viewBox="0 0 24 24">{cap.icon}</svg>
                      </div>
                      <h4>{t(lang, cap.en, cap.zh)}</h4>
                      <p>{t(lang, cap.sub_en, cap.sub_zh)}</p>
                    </div>
                  );
                })}

                <div className="hc-loop-core">
                  {t(lang, <>CLOSED<span className="hc-loop-big">LOOP</span></>, <>闭环<span className="hc-loop-big">CLOSED LOOP</span></>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ SLIDE 3 — Global Reach ============ */}
        <div className={`hc-slide ${cur === 2 ? "active" : ""}`} data-theme="dark">
          <div className="hc-glow3" />
          <div className="hc-ticker">
            {t(lang, "03 / GLOBAL · FOOTPRINT", "03 / 全球 · 布局")}
          </div>

          <div className="hc-wrap">
            <div className="hc-left">
              <div className="hc-eyebrow r-1">
                <span className="hc-dot" />
                {t(lang, "Global Capabilities", "全球化能力")}
              </div>
              <h1 className="hc-headline r-2">
                {t(
                  lang,
                  <>One team,<br /><span style={{ color: "#bfd6ff" }}>four continents</span>,<br />your growth partner.</>,
                  <>一支团队，<br /><span style={{ color: "#bfd6ff" }}>横跨四大洲</span>，<br />您的全球增长伙伴。</>,
                )}
              </h1>
              <p className="hc-sub r-3">
                {t(
                  lang,
                  "A core team from top insight, consulting and operations firms — backed by a global network across China, the EU, the US and Japan.",
                  "核心团队来自顶级咨询、洞察与运营公司，依托覆盖中国、欧洲、美国与日本的全球化网络。",
                )}
              </p>
            </div>

            <div className="hc-right r-5">
              <div className="hc-globe-wrap">
                <div className="hc-globe">
                  <div className="hc-map">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero-v2/world-map.svg" alt={t(lang, "TLU global coverage map", "TLU 全球覆盖地图")} style={{ width: "100%", height: "100%", opacity: 0.55 }} />
                  </div>

                  {([
                    { en: "NEW YORK", zh: "纽约", top: "27.4%", left: "29.4%", b: true },
                    { en: "LONDON · PARIS", zh: "伦敦 · 巴黎", top: "19.5%", left: "49.9%", b: false },
                    { en: "SHANGHAI", zh: "上海", top: "34.6%", left: "83.6%", b: false },
                    { en: "TOKYO", zh: "东京", top: "31.1%", left: "88.8%", b: true },
                    { en: "SINGAPORE", zh: "新加坡", top: "56.4%", left: "78.8%", b: true },
                  ] as const).map((city) => (
                    <div key={city.en} className={`hc-city${city.b ? " hc-city-b" : ""}`} style={{ top: city.top, left: city.left }}>
                      <div className="hc-pin" />
                      <div className="hc-city-lbl">{t(lang, city.en, city.zh)}</div>
                    </div>
                  ))}

                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", zIndex: 2 }} viewBox="0 0 1000 500" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hc-arcGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#9fbeff" stopOpacity={0} />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#9fbeff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <path d="M 294 137 Q 400 40 499 97" fill="none" stroke="url(#hc-arcGrad)" strokeWidth={1.5}><animate attributeName="stroke-dasharray" values="0 600;600 0" dur="3s" repeatCount="indefinite" /></path>
                    <path d="M 499 97 Q 700 30 836 173" fill="none" stroke="url(#hc-arcGrad)" strokeWidth={1.5}><animate attributeName="stroke-dasharray" values="0 700;700 0" dur="3.5s" repeatCount="indefinite" /></path>
                    <path d="M 836 173 Q 870 140 888 156" fill="none" stroke="url(#hc-arcGrad)" strokeWidth={1.5}><animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2.5s" repeatCount="indefinite" /></path>
                    <path d="M 836 173 Q 820 260 788 282" fill="none" stroke="url(#hc-arcGrad)" strokeWidth={1.5}><animate attributeName="stroke-dasharray" values="0 250;250 0" dur="3s" repeatCount="indefinite" /></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Controls ---- */}
      <div className={`hc-controls${isLight ? " light" : ""}`}>
        <button className="hc-arrow-btn" onClick={() => go(cur - 1)} aria-label="Previous">
          <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <div className="hc-dots">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={`hc-dotbtn${cur === i ? " active" : ""}`}
              onClick={() => go(i)}
            >
              <span className="hc-fill" key={cur === i ? barKey : `idle-${i}`} />
            </button>
          ))}
        </div>
        <button className="hc-arrow-btn" onClick={() => go(cur + 1)} aria-label="Next">
          <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </section>
  );
}
