import Image from "next/image";
import bg from "@/public/images/home/neuronus-protects/bg.avif";
import ellipse from "@/public/images/home/neuronus-protects/ellipse.avif";

const Background = () => {
  return (
    <>
      <Image
        src={bg}
        alt="coins bg"
        width={1500}
        height={1800}
        className="w-full h-180 xs:h-190 sm:h-200 md:h-210 lg:h-240 xl:h-250 2xl:h-260 object-cover"
      />
      <div className="relative">
        <Image
          src={ellipse}
          alt="ellipse bg"
          width={1500}
          height={500}
          className="w-full h-auto object-cover -translate-y-[25%]"
        />
      </div>
      <div className="absolute w-full h-12.5 bg-[linear-gradient(90deg,#01123F_45.07%,#00328E_87.9%)] left-0 -top-6.25 blur-[10px]" />
    </>
  );
};

export default Background;
