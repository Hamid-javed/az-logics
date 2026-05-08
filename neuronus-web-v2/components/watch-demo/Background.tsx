import Image from "next/image";
import bg from "@/public/images/home/basic-rules-bg.png";
import brain from "@/public/images/header-brain.png";
import BasicRulesEllipse from "@/public/images/home/BasicRulesEllipse";
import BasicRulesEllipseVerticle from "@/public/images/home/BasicRulesEllipseVerticle";
import Video from "@/components/Video";

const Background = () => {
  return (
    <>
      <Image
        src={bg}
        alt="background"
        width={1800}
        height={1500}
        className="absolute top-0 left-0 size-full object-cover mix-blend-overlay translate-x-[-20%] scale-x-140"
      />
      <Image
        src={bg}
        alt="background"
        width={1800}
        height={1500}
        className="absolute top-0 left-0 size-full object-cover mix-blend-lighten translate-x-[-20%] scale-x-140"
      />
      <div className="w-1/2 h-4/5 bg-[#C4C5CF] blur-[80px] absolute top-0 left-0 -translate-y-1/4 rounded-full " />
      <div className="-translate-x-1/4 size-1/2 bg-[#FCF1EE] blur-[50px] absolute top-[10%] left-0 rounded-[50%/50%] " />
      <div className="-translate-x-[60%] translate-y-1/2 size-1/2 bg-[#FFE2DB] blur-[50px] absolute bottom-0 left-0 rounded-[50%/50%] " />
      <div className="translate-y-3/5 size-1/2 bg-[#FCF1EE] blur-[20px] absolute bottom-0 left-[10%] rounded-[50%/50%] " />
      <div className="translate-x-[55%] -translate-y-1/3 size-4/5 bg-[#FFFDF4] blur-[50px] absolute top-0 left-0 rounded-[50%/50%] " />
      <div className="translate-y-[-5%] translate-x-[5%] absolute h-4/5 w-2/3 right-0 top-0 bg-[#B8BDD3] rounded-[50%/50%] blur-[161px]" />
      <Video
        className="absolute top-0 left-0 size-full object-cover mix-blend-plus-lighter"
        src="/videos/basic-rules-cloud.mp4"
      />
      <div className="size-50 lg:size-80 xl:size-100 absolute left-1/5 top-1/3 bg-[#0180EA] rounded-full blur-[90px] lg:blur-[150px]" />
      <div className="size-50 lg:size-80 xl:size-100 absolute right-1/5 top-1/2 bg-[#7CCDF4] rounded-full blur-[90px] lg:blur-[150px]" />
      <div className="w-[15%] h-1/2 absolute left-1/2 translate-y-1/2 bottom-0 bg-[#FFC8C15E] blur-[100px]" />
      <BasicRulesEllipse className="absolute w-full h-180 2xl:h-200 object-cover bottom-0 hidden lg:block" />
      <BasicRulesEllipseVerticle className="lg:hidden absolute top-0 left-0 size-full object-cover" />
      <Image
        src={brain}
        alt="brain"
        width={1800}
        height={1500}
        className="absolute bottom-0 left-[10%] size-1/2 object-cover mix-blend-screen translate-y-1/5"
      />
    </>
  );
};

export default Background;
