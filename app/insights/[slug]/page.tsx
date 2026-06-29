import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/lib/insights";
import InsightPostClient from "./InsightPostClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title_en,
    description: post.excerpt_en,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title_en,
      description: post.excerpt_en,
      url: `/insights/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["The Leap Union"],
    },
  };
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <InsightPostClient post={post} />;
}
