import Image from "next/image";
import bg from "@/public/images/home/data-security-bg.png";
import thunder from "@/public/images/home/data-security/thunder.avif";
import Video from "@/components/Video";

const Background = () => {
  return (
    <>
      {/* Backgroung Image */}
      <Image
        src={bg}
        alt="backgroung"
        width={1500}
        height={1500}
        className="absolute scale-x-125 md:scale-x-140 lg:scale-x-100 w-full lg:w-4/5 lg:translate-x-[-17%] h-1/2 lg:h-auto object-cover top-0 left-0"
      />
      <Image
        src={thunder}
        alt="thunder"
        width={500}
        height={500}
        className="absolute w-2/5 lg:w-1/3 h-auto object-contain top-1/4 lg:top-1/2 -translate-y-1/2 left-[-20%]"
      />

      {/* Thunder Background Video */}
      <Video
        className="absolute size-full object-cover top-0 left-0 mix-blend-screen"
        src="/videos/data-security-thunder.mp4"
      />

      {/* Bubbles Background Video */}
      <Video
        className="absolute size-full object-cover top-0 left-0 mix-blend-screen"
        src="/videos/data-security-bubbles.mp4"
      />
    </>
  );
};

export default Background;
