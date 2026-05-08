import Image from "next/image";
import bg from "@/public/images/home/header-card-bg-mob.png";

const ThunderCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative overflow-hidden w-fit rounded-[22px] bg-linear-to-b from-[#CDDBFF] to-[#EFF4FF] ${className}`}
    >
      <Image
        src={bg}
        alt="bg"
        width={800}
        height={1000}
        className="size-full object-cover absolute top-0 left-0"
      />
      <div className="relative size-full">{children}</div>
    </div>
  );
};

export default ThunderCard;
