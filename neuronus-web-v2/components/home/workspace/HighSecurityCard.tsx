import SliderCardPill from "@/components/SliderCardPill";
import ThunderCard from "@/components/ThunderCardBg";
import computer from "@/public/images/home/workspace/high-security.png";
import Image from "next/image";

const HighSecurityCard = () => {
  return (
    <ThunderCard className="px-3 sm:px-5 md:px-6 pt-5 md:pt-6 h-full">
      <div className="flex flex-col justify-between h-full gap-15">
        <div className="space-y-5 sm:space-y-7">
          <SliderCardPill text="High Security Computer" />
          <h1 className="font-semibold text-lg xs:text-xl md:text-2xl 2xl:text-3xl">
            No Hardware, No Hassle, <br /> Just Pure Speed.
          </h1>
        </div>
        <Image
          src={computer}
          alt="pc"
          width={1200}
          height={1000}
          className="w-62 xxs:w-70 xs:w-85 sm:w-90 xl:w-110 2xl:w-130 h-auto"
        />
      </div>
    </ThunderCard>
  );
};

export default HighSecurityCard;
