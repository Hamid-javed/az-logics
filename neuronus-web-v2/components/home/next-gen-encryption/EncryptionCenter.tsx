import Image from "next/image";
import thunder from "@/public/images/home/header/card-thunder.avif";
import encryption from "@/public/images/home/next-gen-encryption.png";
import Video from "@/components/Video";

const EncryptionCenter = () => {
  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-70 lg:w-110 xl:w-120 2xl:w-70 h-[75vw] xs:h-1/3 lg:h-1/2 rotate-90 lg:rotate-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-4/5 bg-white overflow-hidden">
          <Video
            className="size-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover mix-blend-difference scale-90"
            src="/videos/next-gen-circle-light.mp4"
          />
        </div>
        <div className="w-3.5 h-full relative mx-auto rounded-full bg-[#4E68FF]">
          <div className="absolute left-0 top-0 h-full w-26 bg-linear-[270deg,rgba(77,104,255,0.00)_0%,rgba(77,104,255,0.40)_100%]" />
        </div>
        <div className="absolute size-32 xxs:size-35 xs:size-40 xl:size-45 2xl:size-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <Image
            src={encryption}
            alt="encryption"
            width={500}
            height={500}
            className="relative w-full h-auto object-cover -rotate-90 lg:rotate-0"
          />
          <Image
            src={thunder}
            alt="thunder"
            width={500}
            height={500}
            className="absolute top-0 left-0  w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="size-55 lg:size-63 bg-[#0180EA] blur-[140px] lg:blur-[200px] absolute top-1/4 lg:top-1/2 -translate-y-1/2 left-1/4" />
      <div className="size-55 lg:size-63 bg-[#7CCDF4] blur-[140px] lg:blur-[200px] absolute top-4/5 lg:top-3/5 -translate-y-1/2 right-1/4" />
    </>
  );
};

export default EncryptionCenter;
