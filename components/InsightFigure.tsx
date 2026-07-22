"use client";

import { useLang, t } from "@/components/LanguageProvider";
import type { Figure } from "@/lib/insights";

/* Renders a bilingual framework diagram ("框架示意图") as crisp HTML/CSS —
   no image files, no garbled Chinese. Three layouts: pyramid, grid, flow. */
export default function InsightFigure({ figure }: { figure: Figure }) {
  const { lang } = useLang();
  const title = t(lang, figure.title_en, figure.title_zh);

  return (
    <figure className="my-8 rounded-2xl border border-sky/60 bg-sky-50/60 p-5 md:p-7">
      <figcaption className="mb-5 text-center text-sm font-extrabold uppercase tracking-wide text-brand">
        {title}
      </figcaption>
      {figure.kind === "pyramid" && <Pyramid figure={figure} lang={lang} />}
      {figure.kind === "grid" && <Grid figure={figure} lang={lang} />}
      {figure.kind === "flow" && <Flow figure={figure} lang={lang} />}
    </figure>
  );
}

type Lang = "en" | "zh";

function Pyramid({ figure, lang }: { figure: Figure; lang: Lang }) {
  // Apex first. Widths widen toward the base.
  const n = figure.nodes.length;
  return (
    <div className="flex flex-col items-center gap-2">
      {figure.nodes.map((node, i) => {
        const pct = n > 1 ? 55 + (i * 45) / (n - 1) : 100;
        return (
          <div
            key={i}
            className="rounded-xl bg-gradient-to-br from-brand to-sky-700 px-4 py-3 text-center text-white shadow-sm"
            style={{ width: `${pct}%`, minWidth: "12rem" }}
          >
            <div className="text-sm font-bold md:text-base">
              {t(lang, node.title_en, node.title_zh)}
            </div>
            {(node.desc_en || node.desc_zh) && (
              <div className="mt-0.5 text-xs text-white/85">
                {t(lang, node.desc_en ?? "", node.desc_zh ?? "")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Grid({ figure, lang }: { figure: Figure; lang: Lang }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {figure.nodes.map((node, i) => (
        <div
          key={i}
          className="rounded-xl border border-sky/60 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-white">
              {i + 1}
            </span>
            <div>
              <div className="text-sm font-bold text-navy md:text-base">
                {t(lang, node.title_en, node.title_zh)}
              </div>
              {(node.desc_en || node.desc_zh) && (
                <div className="mt-1 text-sm leading-relaxed text-ink/75">
                  {t(lang, node.desc_en ?? "", node.desc_zh ?? "")}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Flow({ figure, lang }: { figure: Figure; lang: Lang }) {
  return (
    <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
      {figure.nodes.map((node, i) => (
        <div key={i} className="flex flex-1 items-center gap-2 md:flex-col md:gap-2">
          <div className="flex-1 rounded-xl border border-sky/60 bg-white p-4 text-center shadow-sm md:w-full">
            <div className="text-sm font-bold text-navy md:text-base">
              {t(lang, node.title_en, node.title_zh)}
            </div>
            {(node.desc_en || node.desc_zh) && (
              <div className="mt-1 text-xs leading-relaxed text-ink/75">
                {t(lang, node.desc_en ?? "", node.desc_zh ?? "")}
              </div>
            )}
          </div>
          {i < figure.nodes.length - 1 && (
            <span className="shrink-0 text-lg font-bold text-brand md:rotate-90">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
