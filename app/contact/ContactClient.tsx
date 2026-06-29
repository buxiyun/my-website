"use client";

import { useLang, t } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { IconMail, IconGlobe, IconArrow } from "@/components/Icons";

const regions = [
  { en: "Greater China", zh: "大中华" },
  { en: "APAC", zh: "亚太" },
  { en: "North America", zh: "北美" },
  { en: "Europe", zh: "欧洲" },
];

export default function ContactClient() {
  const { lang } = useLang();

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#000a56,#005dc4)" }} />
        <span className="deco-circle" style={{ width: 460, height: 460, right: -120, top: -180, background: "rgba(79,134,214,0.22)" }} />
        <span className="deco-circle" style={{ width: 260, height: 260, right: 160, bottom: -120, background: "rgba(215,235,247,0.12)" }} />
        <div className="container-tlp relative py-24 md:py-32 text-center">
          <span className="eyebrow text-brand-400 justify-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5">{t(lang, "Contact", "联系我们")}</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold">
            {t(lang, "Let's work together", "让我们一起合作")}
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl mx-auto">
            {t(
              lang,
              "Tell us about your growth challenge — from strategy to omni-channel execution, we're ready to help",
              "告诉我们您的增长挑战——从策略到全渠道落地，我们随时为您服务"
            )}
          </p>
          <a href="mailto:marketing@theleapunion.com" className="btn bg-white text-navy hover:-translate-y-0.5 mt-9">
            <IconMail width={18} height={18} />
            marketing@theleapunion.com
          </a>
        </div>
      </section>

      {/* details */}
      <section className="section">
        <div className="container-tlp grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="card h-full p-8">
              <span className="icon-tile">
                <IconMail />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-navy">{t(lang, "Email us", "邮件联系")}</h2>
              <p className="mt-3 text-muted">
                {t(
                  lang,
                  "The fastest way to reach us — we typically respond within two business days",
                  "联系我们最快的方式，我们通常会在两个工作日内回复"
                )}
              </p>
              <a
                href="mailto:marketing@theleapunion.com"
                className="mt-5 inline-flex items-center gap-2 text-lg font-semibold text-brand hover:underline"
              >
                marketing@theleapunion.com
                <IconArrow width={18} height={18} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card h-full p-8">
              <span className="icon-tile">
                <IconGlobe />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-navy">{t(lang, "Where we work", "服务区域")}</h2>
              <p className="mt-3 text-muted">
                {t(
                  lang,
                  "A global network mobilized around your project's needs",
                  "围绕您的项目需求调动的全球协作网络"
                )}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {regions.map((r) => (
                  <span key={r.en} className="rounded-full bg-sky-50 border border-sky/60 px-4 py-2 text-sm font-semibold text-navy">
                    {t(lang, r.en, r.zh)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* closing band */}
      <section className="pb-24">
        <div className="container-tlp">
          <Reveal>
            <div className="rounded-3xl bg-cream p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy">
                {t(
                  lang,
                  "Tech-enabled Business Solution, Your Global Growth Partner",
                  "懂生意的技术，你的全球增长伙伴"
                )}
              </h2>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
