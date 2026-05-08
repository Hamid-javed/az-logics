import { Metadata } from "next";
import { fetchBlogBySlug } from "@/app/api/blog";
import BlogDetail from "./BlogDetail";

type MetaTag = {
  property: string;
  content: string | any;
};

type BlogMetaData = {
  other: {
    [key: string]: string;
  };
} & Metadata;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug("en", slug);

  const metaTags: MetaTag[] = blog.meta_tags || [];
  const metadata: BlogMetaData = {
    openGraph: {
      type: "article",
    },
    other: {},
  };

  metaTags.forEach((tag) => {
    const { property, content } = tag;

    switch (property) {
      case "og:title":
        metadata.openGraph!.title = content;
        break;
      case "og:description":
        metadata.openGraph!.description = content;
        break;
      case "og:url":
        metadata.openGraph!.url = content;
        break;
      case "og:images":
        metadata.openGraph!.images = content;
        break;
      case "authors":
        metadata.authors = [{ name: content }];
        break;
      case "og:site_name":
        metadata.openGraph!.siteName = content;
        break;
      case "og:type":
        metadata.other["og:type"] = content;
        break;
      default:
        metadata.other[property] = content;
        break;
    }
  });

  return metadata;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  return <BlogDetail params={resolvedParams} />;
}
