import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function InternalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/internal/login");
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-navy">管理后台</h1>
            <p className="text-muted text-sm mt-1">
              已登录：{user.email}
            </p>
          </div>
          <form action="/internal/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-muted hover:text-ink border border-slate-300 rounded-lg hover:bg-white transition"
            >
              退出登录
            </button>
          </form>
        </div>

        {/* Placeholder content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/internal/interview-outline/"
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand hover:shadow-md transition group block"
          >
            <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-ink mb-1">访谈提纲生成器</h3>
            <p className="text-sm text-muted">管理各国市场的访谈提纲内容，支持 PPT 导出</p>
            <span className="inline-block mt-3 text-sm font-medium text-brand group-hover:underline">打开工具 →</span>
          </a>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-ink mb-1">观点文章管理</h3>
            <p className="text-sm text-muted">发布和编辑 Insights 观点文章（即将上线）</p>
          </div>
        </div>
      </div>
    </div>
  );
}
