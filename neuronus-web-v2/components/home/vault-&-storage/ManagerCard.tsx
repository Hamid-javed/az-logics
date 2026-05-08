import Image from "next/image";
import ThunderCard from "@/components/ThunderCardBg";
import SliderCardPill from "@/components/SliderCardPill";
import laptop from "@/public/images/home/vault/manager.png";

const ManagerCard = () => {
  return (
    <ThunderCard className="h-full">
      <div className="flex flex-col justify-between h-full">
        <SliderCardPill
          text="Manager"
          className="mt-5 sm:mt-6 ml-3 xs:ml-5 sm:ml-6 mb-1"
        />
        <Image
          src={laptop}
          alt="bg"
          className="w-75 xs:w-95 sm:w-110 xl:w-130 h-auto"
        />
      </div>
    </ThunderCard>
  );
};

export default ManagerCard;
