"use client";
import Header from "@/components/Header";
import Description from "@/components/Description";
import Button from "@/components/Button";
import bg from "@/public/images/watch-demo/bg.png";
import HeaderLock from "@/public/images/watch-demo/HeaderLock";
import Image from "next/image";
import Shield from "@/public/icons/watch-demo/Shield";

const HeaderWatchDemo = () => {
  const features = ["End-to-End Encrypted", "Open Source", "Zero-Knowledge"];

  return (
    <div className="relative w-full overflow-hidden">
      <Image
        src={bg}
        alt="1 0 background"
        width={1500}
        height={2000}
        className="w-3/5 md:w-2/5 h-auto absolute top-0 left-0 z-1"
      />

      <HeaderLock className="absolute right-0 w-1/2 xs:w-[40%] sm:w-[30%] h-auto bottom-[10%] md:bottom-auto md:top-1/2! md:-translate-y-1/2 translate-x-[10%] z-1 opacity-50 xs:opacity-75" />

      <Header
        title={
          <span>
            The Architecture <br /> of Absolute Privacy.
          </span>
        }
        description="Test our protocol live. From key generation to encryption — full control remains on your device."
        classes={{
          container: "z-2",
          desc: "text-white!",
          rightImg: "md:hidden top-0! w-[40%]!",
          leftImg: "top-1/4 md:top-0 left-0 w-1/5! lg:w-[13%]!",
        }}
        subTitle={{ text: "Zero-Knowledge Encryption", icon: Shield }}
      >
        <Description
          white
          className="md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto pt-6 md:pt-10 pb-10 sm:pb-12 md:pb-16 lg:pb-20 text-center"
          text="What happens to your data when you use Neuronus? Nothing. We can't see it. Unlike email providers that read your messages, cloud storage that scans your files, or messaging apps that backup your conversations — Neuronus is built differently."
        />
        <Button
          text="Start Live Demo"
          className="mb-6 sm:mb-10 w-45 xs:w-50 sm:w-55 lg:w-70 mx-auto block"
        />
        <div className="text-[9px] xxs:text-[10px] xs:text-xs sm:text-base md:text-lg xl:text-xl 2xl:text-[22px] text-white flex justify-center gap-6 sm:gap-10 items-center pb-30 sm:pb-40">
          {features.map((feature) => (
            <div
              key={`watch-demo-feat-${feature}`}
              className="flex gap-1.5 sm:gap-3.25 items-center"
            >
              <span className="size-2 rounded-full bg-[#79FF54] inline-block" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </Header>
    </div>
  );
};

export default HeaderWatchDemo;
