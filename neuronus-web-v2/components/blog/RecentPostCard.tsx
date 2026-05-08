"use client";

import Image from "next/image";
import { formatter } from "@/public/helper/date-formatter";
import { BlogType } from "@/app/api/blog";
import { textTruncate } from "@/public/helper/text-truncate";
import { useParams } from "next/navigation";
import Link from "next/link";

interface RecentPostCardProps {
  data: BlogType;
  classes?: { root?: string };
}

const RecentPostCard = ({ data, classes }: RecentPostCardProps) => {
  const date = new Date(data.publishedAt);
  const publishedDate = formatter.format(date);
  const title = textTruncate(data?.title, 30);

  return (
    <Link href={`/blog/${data.slug}`} className={`flex gap-2 ${classes?.root}`}>
      <Image
        src={data?.cover?.url || ""}
        alt={data?.cover?.alt || ""}
        width={200}
        height={200}
        className="object-cover rounded-lg md:size-12.5 size-8.75"
      />
      <div className="flex flex-col h-full justify-between">
        <p className="text-xs">{publishedDate}</p>
        <h3 className="text-sm dark:text-dark-neutrals-default text-black font-neue-bold">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default RecentPostCard;
