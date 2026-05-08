import Image from "next/image";
import NeuronusWhite from "@/public/icons/home/NeuronusWhite";
import thunder from "@/public/images/home/header/card-thunder.avif";
import bg from "@/public/images/home/header-card-bg.png";
import bgMobile from "@/public/images/home/header-card-bg-mob.png";
import dots from "@/public/images/dots-landing-header.png";
import WiresLeft from "@/public/images/home/WiresLeft";
import WiresRight from "@/public/images/home/WiresRight";
import WiresTop from "@/public/images/home/WiresTop";
import WiresBottom from "@/public/images/home/WiresBottom";
import Video from "@/components/Video";

interface HeaderCardProps {
  classes?: { root?: string };
  small?: boolean;
}

const HeaderCard = ({ classes = {}, small = false }: HeaderCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-4xl bg-linear-to-r from-[#0F2A73] to-[#030A3E] border border-[#293DAA] py-40 md:p-14 flex items-center justify-center before:absolute before:content-[''] before:w-[15%] before:h-3/4 before:bg-[#4761F2CF] before:left-0 before:bottom-1/2 md:before:bottom-0 before:rounded-br-full before:blur-[60px] md:before:rounded-tr-full  after:absolute after:content-[''] after:w-[15%] after:h-1/2 after:bg-[#2A4EA4] after:right-0 after:top-1/2 md:after:top-0 after:rounded-tl-full md:after:rounded-bl-full after:blur-[60px] ${
        classes.root || ""
      }`}
    >
      {/* Background */}
      <Image
        src={bg}
        alt="thunder"
        width={1500}
        height={600}
        className="size-full object-cover absolute top-0 left-0 hidden md:block"
      />
      <Image
        src={bgMobile}
        alt="thunder"
        width={800}
        height={1000}
        className="size-full object-cover absolute top-0 left-0 md:hidden"
      />

      <Image
        src={dots}
        alt="dots"
        width={1500}
        height={1500}
        className={`size-full object-cover absolute top-0 left-0 ${
          small ? "" : "hidden"
        }`}
      />

      {/* Wires */}
      <div className="absolute h-1/2 md:h-full w-full md:w-1/2 left-0 top-0 flex items-end md:items-center justify-center md:justify-end">
        <WiresLeft
          className={`${
            small ? "w-[95%]" : "w-[95%] lg:w-4/5"
          } hidden md:block`}
        />
        <WiresTop className="md:hidden h-[92%] w-auto" />
      </div>
      <div className="absolute h-1/2 md:h-full w-full md:w-1/2 right-0 bottom-0 flex items-start md:items-center justify-center md:justify-start">
        <WiresRight
          className={`${
            small ? "w-[95%]" : "w-[95%] lg:w-4/5"
          } hidden md:block`}
        />
        <WiresBottom className="md:hidden h-[92%] w-auto" />
      </div>

      <div
        className={`relative p-10 ${
          small ? "2xl:p-14 md:my-10 2xl:my-6" : "md:p-14 lg:p-16 xl:p-20"
        }`}
      >
        {/* Thunder */}
        <Image
          src={thunder}
          alt="thunder"
          width={700}
          height={700}
          className="absolute w-full h-auto top-0 left-0"
        />
        {/* dots */}
        <Image
          src={dots}
          alt="dots"
          width={1500}
          height={1500}
          className={`size-full object-cover absolute top-[-8%] left-0 ${
            small ? "hidden" : ""
          }`}
        />

        <Video
          className="absolute size-full object-cover object-center scale-200 top-0 left-0 mix-blend-lighten"
          src="/videos/space.mp4"
        />

        {/* Neuronus Circle */}
        <div
          className={`size-30 md:size-38 ${
            small ? "2xl:size-42" : "lg:size-42 xl:size-48 2xl:size-51.25"
          } rounded-full bg-[#050E44] border border-[#122573] flex items-center justify-center relative opacity-90`}
        >
          <div className="rounded-full size-4/5 border border-[#122573] bg-[linear-gradient(150deg,#D3FFFF_9.71%,#87EFFF_41.04%,#4091FD_60%,#B7F3FD_74.31%,#94C4CF_87.07%)] flex justify-center items-center">
            <div className="rounded-full size-3/4 border border-[#15309D] bg-[radial-gradient(7.2%_7.2%_at_50%_50%,#82B8FF_0%,#0A164D_100%)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center">
              <NeuronusWhite className="w-1/2 h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
