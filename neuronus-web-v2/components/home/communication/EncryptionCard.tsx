import ThunderCard from "../../ThunderCardBg";
import Top from "@/public/images/home/Top-Card.png";
import Image from "next/image";
import Sheild from "@/public/icons/home/communication/Sheild";
import Bin from "@/public/icons/home/communication/Bin";
import Info from "@/public/icons/home/communication/Info";
import Option from "@/public/icons/home/communication/Option";
import OpenEye from "@/public/icons/home/communication/OpenEye";
import SliderCardPill from "../../SliderCardPill";
import DotedPath from "@/public/icons/home/communication/DotedPath";
const EncryptionCard = () => {
  return (
    <ThunderCard>
      <SliderCardPill
        text="Key Encryption"
        className="absolute top-5 left-5 z-20 "
      />
      <DotedPath className="absolute right-[8%] top-[27%]" />
      <Image
        src={Top}
        alt="top Bg"
        width={800}
        height={1200}
        className="w-full h-auto object-cover relative z-0 opacity-99"
      />
      <div className="absolute top-[28%] right-[35%] size-27 lg:size-35 rounded-full bg-white flex items-center justify-center z-10 shadow-2xl">
        <div className="size-[85%] rounded-full bg-linear-to-b from-[#2E3E99] to-[#4C67FF] flex items-center justify-center">
          <Sheild className="size-15 lg:size-20 h-auto mb-0.5 p-3" />
        </div>
      </div>
      <div className="flex justify-center pt-30 px-10">
        <div className="px-18  bg-[#FFFFFF]/40 rounded-2xl border border-white opacity-99">
          <div className="flex justify-between">
            <p className="p-5.5 text-[20px] text-[#323232]">Add Note</p>
            <span className="p-2">
              <p className="bg-white text-[15px] rounded-3xl py-4 px-9">
                Encrypt
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="px-6 pt-2.5">
        <div className="bg-white opacity-95 rounded-3xl px-5 py-7 ">
          <div className="flex items-center justify-between border-b border-[#000000]/12">
            <p className="text-[19px] mb-3 font-normal">
              tails-website@boum.org
            </p>
            <Bin />
          </div>
          <div className="flex items-center justify-between pt-5 font-normal">
            <div className="flex items-center gap-4">
              <p className="text-[15px]">Public Key</p>
              <Info />
            </div>
            <Option />
            <div className="flex items-center gap-4 pr-20">
              <p className="text-[15px]">Private Key</p>
              <OpenEye />
              <Info />
            </div>
          </div>
        </div>
      </div>
      <div className="px-14">
        <div className="bg-[#B7C3FF] py-2.5 rounded-br-[22px] rounded-bl-[22px] opacity-95"></div>
      </div>
      <div className="px-20 mb-10">
        <div className="bg-[#6D82F6]  py-2.5 rounded-br-[22px] rounded-bl-[22px]  opacity-95"></div>
      </div>
    </ThunderCard>
  );
};

export default EncryptionCard;
