"use client";

import Link from "next/link";
import { useLang, t } from "@/components/LanguageProvider";
import { IconArrow } from "@/components/Icons";
import type { Post } from "@/lib/insights";

function fmtDate(d: string, lang: "en" | "zh") {
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightPostClient({ post }: { post: Post }) {
  const { lang } = useLang();

  const body = t(lang, post.body_en, post.body_zh);

  return (
    <article className="section">
      <div className="container-tlp max-w-3xl">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          <IconArrow width={16} height={16} className="rotate-180" />
          {t(lang, "All insights", "全部观点")}
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs font-semibold">
          <span className="rounded-full bg-sky-50 border border-sky/60 px-3 py-1 text-brand">
            {t(lang, post.tag_en, post.tag_zh)}
          </span>
          <span className="text-muted">{fmtDate(post.date, lang)}</span>
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy">
          {t(lang, post.title_en, post.title_zh)}
        </h1>

        <div className="mt-8 space-y-5">
          {body.map((para, i) =>
            para.startsWith("## ") ? (
              <h2 key={i} className="text-xl md:text-2xl font-bold text-navy pt-2">
                {para.replace(/^##\s+/, "")}
              </h2>
            ) : (
              <p key={i} className="text-lg leading-relaxed text-ink/85">
                {para}
              </p>
            )
          )}
        </div>

        {post.audio && post.audio.length > 0 && (
          <div className="mt-10 space-y-4">
            {post.audio.map((clip, i) => (
              <div key={clip.src} className="rounded-2xl bg-sky-50 border border-sky/60 p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-extrabold text-brand shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-navy">
                    {t(lang, clip.title_en, clip.title_zh)}
                  </h3>
                </div>
                <audio controls preload="none" className="mt-3 w-full">
                  <source src={clip.src} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link href="/contact" className="btn btn-primary">
            {t(lang, "Work with us", "与我们合作")}
            <IconArrow width={18} height={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
