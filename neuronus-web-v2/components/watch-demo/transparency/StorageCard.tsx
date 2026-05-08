import Description from "@/components/Description";
import React from "react";

interface StorageCardProps {
  title: string;
  icon: React.ReactNode;
  descriptions: DescriptionItem[];
  cardBg?: string;
  borderColor?: string;
  iconBg?: string;
}

interface DescriptionItem {
  icon: React.ReactNode;
  text: string;
  lineThrough?: boolean;
}

const StorageCard = ({
  title,
  icon,
  descriptions,
  cardBg = "bg-white",
  borderColor,
  iconBg,
}: StorageCardProps) => {
  const iconBorderClass = `rounded-full ms-10 md:ms-20 p-1 border ${borderColor} w-fit`;

  return (
    <div
      className={`${cardBg} border ${borderColor} rounded-[10px] ps-4.25 sm:ps-6.5 pt-5.5 sm:pt-8`}
    >
      <div className="flex items-center gap-4 sm:gap-5.75">
        <div
          className={`${iconBg} rounded-[5px]  size-10 md:size-14 flex items-center justify-center`}
        >
          {icon}
        </div>
        <p className="font-semibold text-[20px] sm:text-[28px] md:text-[32px]">
          {title}
        </p>
      </div>

      <div className="my-4 flex flex-col gap-4">
        {descriptions.map((desc, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-5">
            <div className={iconBorderClass}>{desc.icon}</div>
            <Description
              className={`${desc.lineThrough ? "line-through" : ""}`}
            >
              {desc.text}
            </Description>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageCard;
