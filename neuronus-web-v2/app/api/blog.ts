"use server";

import { STRAPI_API_URL, STRAPI_API_TOKEN } from "@/config/api";
import { FILE_CDN_URL } from "@/config/file";

type BlogFile = {
  alt: string;
  url: string;
};

type BlogMetaTag = {
  property: string;
  content: string;
};

export type Feedback = {
  name: string;
  email: string;
  website: string;
  comment: string;
  blog: number;
  createdAt: Date;
};

export type BlogType = {
  id: number;
  title: string;
  description: string;
  text: any;
  slug: string;
  cover: BlogFile;
  totalPages?: string;
  publishedAt: string;
  authors: string;
  tags?: string[];
  meta_tags?: BlogMetaTag[];
  categories?: string[];
};

export const fetchBlogs = async (
  locale: string,
  order = "asc",
  pageSize = "6",
  page = "1",
  categories: string[] = [],
  excludes: string[] = [],
): Promise<{ blogs: Array<BlogType>; totalPages: number }> => {
  const params = new URLSearchParams({
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "fields[0]": "title",
    "fields[1]": "published_date",
    "fields[2]": "description",
    "fields[3]": "text",
    "fields[4]": "slug",
    "populate[cover][fields][0]": "alternativeText",
    "populate[cover][fields][1]": "url",
    "populate[authors][fields][0]": "first_name",
    "populate[authors][fields][1]": "last_name",
    "sort[0]": `published_date:${order}`,
    locale: locale,
  });

  if (categories.length > 0) {
    categories.forEach((category, index) => {
      params.append(`filters[categories][id][$in][${index}]`, `${category}`);
    });
  }

  if (excludes.length > 0) {
    excludes.forEach((exclude, index) => {
      params.append(`filters[id][$notIn][${index}]`, `${exclude}`);
    });
  }

  const response = await fetch(`${STRAPI_API_URL}/blogs?${params}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  });
  const { data, meta } = await response.json();

  const blogs = data?.map((row: any): BlogType => {
    const bookAttrs = row?.attributes || {};
    const coverAttrs = bookAttrs?.cover?.data?.attributes || {};
    const authors = bookAttrs?.authors?.data || [];
    let coverUrl: string;

    try {
      coverUrl = new URL(coverAttrs?.url).pathname;
    } catch {
      coverUrl = coverAttrs?.url;
    }

    return {
      id: row?.id,
      title: row?.attributes?.title,
      description: row?.attributes?.description,
      publishedAt: row?.attributes?.published_date,
      text: row?.attributes?.text,
      slug: row?.attributes?.slug,
      cover: {
        url: `${FILE_CDN_URL}${coverUrl}`,
        alt: coverAttrs?.alternativeText,
      },
      authors: authors
        ?.map((author: any) =>
          `${author?.attributes?.first_name} ${
            author?.attributes?.last_name || ""
          }`.trim(),
        )
        .join(", "),
    };
  });

  return {
    blogs,
    totalPages: meta?.pagination?.pageCount || 0,
  };
};

export const fetchBlogBySlug = async (locale: string, slug: string) => {
  const slugResponse = await fetch(`${STRAPI_API_URL}/slugify/slugs/blog/${slug}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  });
  const { data: slugData } = await slugResponse.json();
  const id = slugData?.id;
  return fetchBlog(locale, id);
};

export const fetchBlog = async (
  locale: string,
  id: string,
): Promise<BlogType> => {
  const params = new URLSearchParams({
    "fields[0]": "title",
    "fields[1]": "published_date",
    "fields[2]": "description",
    "fields[3]": "text",
    "fields[4]": "tags",
    "fields[5]": "meta_tags",
    "populate[cover][fields][0]": "alternativeText",
    "populate[cover][fields][1]": "url",
    "populate[authors][fields][0]": "first_name",
    "populate[authors][fields][1]": "last_name",
    "populate[categories][fields][0]": "id",
    locale: locale,
  });

  const response = await fetch(`${STRAPI_API_URL}/blogs/${id}?${params}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  });
  const { data } = await response.json();

  if (!data) return {} as BlogType;

  const blogAttrs = data?.attributes || {};
  const coverAttrs = blogAttrs?.cover?.data?.attributes || {};
  const authors = blogAttrs?.authors?.data || [];
  const categories = blogAttrs?.categories?.data || [];
  let coverUrl: string;

  try {
    coverUrl = new URL(coverAttrs?.url).pathname;
  } catch {
    coverUrl = coverAttrs?.url;
  }

  return {
    id: data?.id,
    title: data?.attributes?.title,
    description: data?.attributes?.description,
    publishedAt: data?.attributes?.published_date,
    text: data?.attributes?.text,
    slug: data?.attributes?.slug,
    cover: {
      url: `${FILE_CDN_URL}${coverUrl}`,
      alt: coverAttrs?.alternativeText,
    },
    authors: authors
      ?.map((author: any) =>
        `${author?.attributes?.first_name} ${
          author?.attributes?.last_name || ""
        }`.trim(),
      )
      .join(", "),
    categories: categories?.map((category: any) => category?.id),
    tags: data?.attributes?.tags,
    meta_tags: data?.attributes?.meta_tags,
  };
};

export const createBlogFeedback = async (payload: any) => {
  const response = await fetch(`${STRAPI_API_URL}/blog-feedbacks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: { ...payload, publishedAt: null } }),
  });

  if (!response.ok) {
    throw new Error("Failed to create feedback");
  }

  return await response.json();
};

export const getBlogFeedbacks = async (
  blogId: number,
  locale: string,
  page: number,
): Promise<{
  feedbacks: Feedback[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}> => {
  const params = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": "15",
    "fields[0]": "name",
    "fields[1]": "email",
    "fields[2]": "comment",
    "fields[3]": "website",
    "fields[4]": "createdAt",
    "fields[5]": "publishedAt",
    "populate[blog][fields][0]": "id",
    "sort[0]": "createdAt:desc",
    "filters[blog][id][$eq]": blogId.toString(),
    locale: locale,
  });
  const response = await fetch(`${STRAPI_API_URL}/blog-feedbacks?${params}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  });
  const { data, meta } = await response.json();

  const feedbacks = data?.map((row: any) => ({
    name: row?.attributes?.name,
    email: row?.attributes?.email,
    comment: row?.attributes?.comment,
    createdAt: row?.attributes?.createdAt,
  }));

  return {
    feedbacks,
    pagination: meta?.pagination || {},
  };
};
