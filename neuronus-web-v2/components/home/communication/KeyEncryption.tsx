import ThunderCard from "../../ThunderCardBg";
import Top from "@/public/images/home/Top-Card.png";
import Image from "next/image";
import Sheild from "@/public/icons/communication/Sheild";
import Bin from "@/public/icons/communication/Bin";
import Info from "@/public/icons/communication/Info";
import Option from "@/public/icons/communication/Option";
import OpenEye from "@/public/icons/communication/OpenEye";
import SliderCardPill from "../../SliderCardPill";
import DotedPath from "@/public/icons/communication/DotedPath";

const KeyEncryption = () => {
  return (
    <ThunderCard className="h-full w-70! xxs:w-75! xs:w-85! sm:w-95! xl:w-110! 2xl:w-120!">
      <SliderCardPill
        text="Key Encryption"
        className="absolute top-5 2xl:top-6 left-3 xl:left-5 2xl:left-6 z-20 "
      />
      <DotedPath className="absolute w-24 sm:w-28 xl:w-34.5 h-auto right-[8%] top-[27%]" />
      <div className="relative mb-20 sm:mb-32">
        <Image
          src={Top}
          alt="top Bg"
          width={800}
          height={1200}
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3 size-20 sm:size-24 xl:size-27 2xl:size-35 rounded-full bg-white flex items-center justify-center z-10 shadow-2xl">
          <div className="size-[80%] rounded-full bg-linear-to-b from-[#2E3E99] to-[#4C67FF] flex items-center justify-center">
            <Sheild className="size-10 sm:size-12 xl:size-13 2xl:size-17 h-auto mb-0.5 p-3" />
          </div>
        </div>
      </div>

      <div className="px-3 xl:px-5 2xl:px-6 space-y-3 sm:space-y-5">
        <div className="mx-2 xl:mx-3 py-1 sm:py-1.5 2xl:py-1.75 pe-1 sm:pe-1.75 2xl:pe-2.25 ps-2 sm:ps-4 2xl:ps-5.25  bg-white/25 rounded-2xl sm:rounded-[22px] border-[0.8px] border-white flex justify-between items-center backdrop-blur-[5px]">
          <p className="text-sm sm:text-base xl:text-lg 2xl:text-xl text-[#323232]">
            Add Note
          </p>
          <button className="bg-white text-sm 2xl:text-[15px] rounded-xl sm:rounded-2xl 2xl:rounded-[22px] py-2 sm:py-3 2xl:py-4 px-4 sm:px-6 xl:px-9">
            Encrypt
          </button>
        </div>

        <div className="bg-white rounded-[22px] px-3 xs:px-5 py-5 sm:py-7">
          <div className="flex items-center justify-between border-b border-black/12 mb-3 pb-3">
            <p className="text-sm sm:text-base 2xl:text-lg">
              tails-website@boum.org
            </p>
            <Bin className="w-3 sm:w-4 2xl:w-4.75 h-auto" />
          </div>

          <div className="grid grid-cols-2 text-xs sm:text-sm 2xl:text-[15px] gap-5">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-2.5">
                <p>Public Key</p>
                <Info className="w-3 sm:w-4 2xl:w-4.5 h-auto" />
              </div>
              <Option className="w-1 sm:w-1.25 2xl:w-1.5 h-auto" />
            </div>

            <div className="flex items-center gap-2.5">
              <p>Private Key</p>
              <OpenEye className="w-3 sm:w-4 2xl:w-5 h-auto" />
              <Info className="w-3 sm:w-4 2xl:w-4.5 h-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#B7C3FF] py-2 sm:py-2.5 rounded-b-[22px] w-[80%] mx-auto" />
      <div className="bg-[#6D82F6] py-2 sm:py-2.5 rounded-b-[22px] w-2/3 mx-auto mb-5 sm:mb-10 2xl:mb-15" />
    </ThunderCard>
  );
};

export default KeyEncryption;
