import SliderCardPill from "@/components/SliderCardPill";
import ThunderCard from "@/components/ThunderCardBg";
import Image from "next/image";
import sheet from "@/public/images/home/workspace/secure-sheet.png";

const SecuresheetCard = () => {
  return (
    <ThunderCard className="h-full pt-5 md:pt-6 pb-7 md:pb-9">
      <div className="flex flex-col justify-between gap-12 h-full">
        <SliderCardPill text="Secure Sheet" className="ml-3 sm:ml-5 md:ml-6" />
        <Image
          src={sheet}
          alt="secure sheet"
          width={1200}
          height={1000}
          className="w-68 xxs:w-80 xs:w-90 sm:w-100 xl:w-120 2xl:w-140 h-auto"
        />
      </div>
    </ThunderCard>
  );
};

export default SecuresheetCard;
