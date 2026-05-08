import SliderCardPill from "@/components/SliderCardPill";
import ThunderCard from "@/components/ThunderCardBg";
import EllipseCenter from "./EllipseCenter";
import bg from "@/public/images/home/vault/hide-assets-bg.png";
import Image from "next/image";
import Slider from "./Slider";

const HideAssets = () => {
  return (
    <ThunderCard className="h-full w-71! xs:w-90! sm:w-105! xl:w-130! 2xl:w-140! overflow-hidden">
      <div className="relative">
        <Image
          src={bg}
          alt="background"
          width={1000}
          height={1000}
          className="size-full object-cover absolute top-0 left-0"
        />
        <SliderCardPill
          text="Hide Assets"
          className="ml-3 xs:ml-5 sm:ml-6 mt-5 sm:mt-6 relative"
        />
        <EllipseCenter />
      </div>
      <h2 className="sm:text-lg pl-6 mb-2 sm:mb-3">Best for</h2>
      <Slider />
    </ThunderCard>
  );
};

export default HideAssets;
