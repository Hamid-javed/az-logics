import { Feedback } from "@/app/api/blog";
import { formatter } from "@/public/helper/date-formatter";
import Image from "next/image";

const FeedbackMessage = ({ name, createdAt, comment }: Feedback) => {
  const date = new Date(createdAt);
  const publishedDate = formatter.format(date);

  return (
    <div className="flex gap-5">
      <Image
        src="/assets/home/blog/user-image-placeholder.png"
        alt="user"
        width={50}
        height={50}
        className="rounded-full md:size-12 size-8 object-contain"
      />
      <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs">{publishedDate}</p>
        <p className="text-sm mt-2">{comment}</p>
      </div>
    </div>
  );
};

export default FeedbackMessage;
