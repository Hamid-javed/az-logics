import Link from "next/link";
import Image from "next/image";
import { BlogType } from "@/app/api/blog";
import { formatter } from "@/public/helper/date-formatter";

interface BlogCardProps {
  data: BlogType;
  small?: boolean;
}

const BlogCard = ({ data, small = false }: BlogCardProps) => {
  const date = new Date(data.publishedAt);
  const publishedDate = formatter.format(date);

  return (
    <div className="flex flex-col gap-3 mb-10">
      <Link href={`/blog/${data.slug || ""}`}>
        <div className="rounded-lg overflow-hidden">
          <Image
            src={data?.cover?.url}
            alt={data?.cover?.alt || data.title || "Blog image"}
            width={1500}
            height={1000}
            loading="eager"
            className="object-cover scale-100 hover:scale-125 transition-all duration-300 w-full h-full xl:object-contain md:object-cover"
          />
        </div>
        <div
          className={`flex gap-5 text-sm ${small ? "mb-2 mt-1" : "mb-3 mt-2"}`}
        />
        <div
          className={`flex gap-5 text-sm ${small ? "mb-2 mt-1" : "mb-3 mt-2"}`}
        >
          <p className={small ? "text-xs! m-0!" : ""}>By: {data.authors}</p>
          <p className={small ? "text-xs! m-0!" : ""}>{publishedDate}</p>
        </div>
        <h1 className={`${small ? "text-lg!" : "text-xl"} font-neue-bold`}>
          {data.title}
        </h1>
        <p className={small ? "text-sm!" : ""}>{data.description}</p>
        <div
          className={`text-backlight hover:underline w-fit ${
            small ? "text-xs! mt-1" : ""
          }`}
        >
          Read More
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
