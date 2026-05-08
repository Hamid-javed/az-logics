import Image from "next/image";
import pool from "@/public/images/pool.png";
import dots from "@/public/images/dots-pool.png";
import thunder from "@/public/images/thunder.png";
import { zBubbles, zThunder, zToolTip } from "@/data/constants/zIndexes";
import Video from "@/components/Video";

const Pool = () => {
  return (
    <div className="overflow-hidden relative">
      <div className="relative pt-50">
        <Image
          src={dots}
          alt="dots"
          width={2500}
          height={1500}
          className="size-full object-cover absolute top-0 left-0"
        />
        <div className="w-full xs:w-[90%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-1/2 2xl:w-[40%] mx-auto relative">
          <div className="size-4/5 md:size-2/3 absolute bg-backlight blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Image
            src={pool}
            alt="valuation pool"
            width={2000}
            height={2000}
            className="w-full h-auto mx-auto relative"
          />
          <Video
            className="w-[60%] h-18 xxs:h-21 xs:h-24.5 min-[550px]:h-28.5 md:h-30 min-[900px]:h-33.5 lg:h-36 2xl:h-32.5 absolute top-[15.5%] left-1/2 -translate-x-1/2 [clip-path:ellipse(50%_50%)] object-cover"
            src="/videos/pool-waves.mp4"
          />

          <div className="absolute bottom-1/5 xs:bottom-[21%] sm:bottom-[23%] left-1/2 -translate-x-1/2 text-center w-fit text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
            <h2 className="font-NeueThin">Neuro Pool</h2>
            <p id="currentValuation" className="font-semibold">
              $30,000
            </p>
            <p
              id="updatedValuation"
              className="font-semibold text-[#FFC927] hidden opacity-0 transition-opacity duration-1000"
            >
              $40,000
            </p>
          </div>
          <div
            id="valuationTooltip"
            className={`absolute bg-[#6674be] backdrop-blur-lg py-2 xs:py-2.5 px-2 xs:ps-4 pe-3 xs:pe-5 sm:pe-10 rounded-r-full rounded-tl-full -right-[5%] top-[10%] opacity-0 text-xs xs:text-sm sm:text-base ${zToolTip}`}
          >
            <p className="font-NeueThin text-white">+10,000 USD</p>
          </div>
        </div>
        <Image
          src={thunder}
          alt="Thunder on pool"
          width={1500}
          height={1500}
          className={`size-full absolute top-[10%] left-0 object-contain ${zThunder}`}
        />
        <Video
          className={`size-[130%] absolute top-0 right-0 mix-blend-lighten scale-270 xs:scale-220 sm:scale-190 md:scale-160 lg:scale-150 xl:scale-110 ${zBubbles}`}
          src="/videos/bubble.mp4"
        />
      </div>
      <div className="absolute -bottom-1 left-0 bg-linear-to-t from-primary to-transparent w-full h-15" />
    </div>
  );
};

export default Pool;
