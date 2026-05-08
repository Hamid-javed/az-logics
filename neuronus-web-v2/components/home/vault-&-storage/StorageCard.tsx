import Image from "next/image";
import ThunderCard from "@/components/ThunderCardBg";
import SliderCardPill from "@/components/SliderCardPill";
import pc from "@/public/images/home/vault/storage.png";

const StorageCard = () => {
  return (
    <ThunderCard className="h-full py-5 sm:py-6 pl-3 xs:pl-5 sm:pl-6 pr-5 sm:pr-14">
      <div className="flex flex-col justify-between h-full">
        <SliderCardPill text="Storage" className="mb-5" />
        <Image
          src={pc}
          width={1000}
          height={1500}
          alt="computer"
          className="w-63 xs:w-85 sm:w-90 xl:w-120 h-auto"
        />
      </div>
    </ThunderCard>
  );
};

export default StorageCard;
