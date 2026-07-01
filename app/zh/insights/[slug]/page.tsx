import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/lib/insights";
import InsightPostClient from "@/app/insights/[slug]/InsightPostClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title_zh,
    description: post.excerpt_zh,
    alternates: {
      canonical: `/zh/insights/${post.slug}`,
      languages: {
        "en": `https://www.theleapunion.com/insights/${post.slug}`,
        "zh-CN": `https://www.theleapunion.com/zh/insights/${post.slug}`,
        "x-default": `https://www.theleapunion.com/insights/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title_zh,
      description: post.excerpt_zh,
      url: `/zh/insights/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["The Leap Union"],
    },
  };
}

export default async function InsightPostZhPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <InsightPostClient post={post} />;
}
