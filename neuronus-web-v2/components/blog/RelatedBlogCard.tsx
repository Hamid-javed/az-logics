"use client";

import { BlogType } from "@/app/api/blog";
import AppSwiper from "@/components/Swipper";
import Image from "next/image";
import Link from "next/link";
import { formatter } from "@/public/helper/date-formatter";
import { textTruncate } from "@/public/helper/text-truncate";

interface RelatedBlogsProps {
  blogs: BlogType[];
}

const RelatedBlogs = ({ blogs }: RelatedBlogsProps) => {
  if (!blogs?.length) return null;

  return (
    <>
      <AppSwiper className="pb-6">
        {blogs.map((blog) => {
          const date = new Date(blog.publishedAt);
          const publishedDate = formatter.format(date);
          const title = textTruncate(blog.title, 55);

          return (
            <Link href={`/blog/${blog.slug}`} className="block w-full">
              <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="relative w-full h-55">
                  <Image
                    src={blog?.cover?.url || ""}
                    alt={blog?.cover?.alt || blog.title || "blog image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-3">
                  <p className="text-xs mb-2">{publishedDate}</p>
                  <h3 className="text-sm font-neue-bold line-clamp-2 text-black">
                    {title}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </AppSwiper>
    </>
  );
};

export default RelatedBlogs;
