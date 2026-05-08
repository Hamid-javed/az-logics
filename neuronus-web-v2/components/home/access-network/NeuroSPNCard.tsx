import Image from "next/image";
import SliderCardPill from "@/components/SliderCardPill";
import hand from "@/public/images/home/access-network-mobile.png";
import Power from "@/public/icons/home/accessNetork/Power";
import ThunderCard from "@/components/ThunderCardBg";
import Video from "@/components/Video";

const NeuroSPNCard = () => {
  return (
    <ThunderCard className="h-full">
      <div className="absolute top-[6%] right-[5%] size-40 xxs:size-45 sm:size-50 2xl:size-56 rounded-full border border-[#2854FF]/10 flex items-center justify-center z-1">
        <div className="size-[85%] rounded-full border border-[#2058FF]/50 flex items-center justify-center">
          <div className="size-[85%] rounded-full bg-linear-to-b from-[#6A96FF] to-[#185BFF] flex items-center justify-center">
            <div className="bg-white rounded-full size-[85%] text-center flex flex-col items-center justify-center gap-0.5 text-[10px] sm:text-xs">
              <Power className="w-5 sm:w-7 2xl:w-9 h-auto mb-0.5" />
              <p className="text-[#778AA6]">Your IP</p>
              <p className="font-semibold">506.457.14.512</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <SliderCardPill text="SPN" className="ml-3 sm:ml-5 mt-5 md:m-6" />
        <div className="relative">
          <Video
            className="absolute w-full h-1/2 left-0 top-1/2 -translate-y-1/2 object-cover mix-blend-plus-lighter"
            src="/videos/globe.mp4"
          />
          <Image
            src={hand}
            alt="mobile in hand"
            width={800}
            height={1000}
            className="relative pl-5 sm:pl-15 pt-30 w-70 xxs:w-81 xs:w-95 sm:w-127 lg:w-105 2xl:w-127 h-auto object-cover"
          />
        </div>
      </div>
    </ThunderCard>
  );
};

export default NeuroSPNCard;
