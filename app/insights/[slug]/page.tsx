import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/lib/insights";
import InsightPostClient from "./InsightPostClient";
import JsonLd from "@/components/JsonLd";

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
    alternates: {
      canonical: `/insights/${post.slug}`,
      languages: {
        "en": `https://www.theleapunion.com/insights/${post.slug}`,
        "zh-CN": `https://www.theleapunion.com/zh/insights/${post.slug}`,
      },
    },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theleapunion.com" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://www.theleapunion.com/insights" },
      { "@type": "ListItem", position: 3, name: post.title_en, item: `https://www.theleapunion.com/insights/${post.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title_en,
    description: post.excerpt_en,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "The Leap Union",
      url: "https://www.theleapunion.com",
    },
    publisher: {
      "@type": "Organization",
      name: "The Leap Union",
      url: "https://www.theleapunion.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.theleapunion.com/insights/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <InsightPostClient post={post} />
    </>
  );
}
