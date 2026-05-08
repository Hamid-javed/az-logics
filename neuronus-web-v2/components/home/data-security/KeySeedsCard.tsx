import Save from "@/public/icons/Save";
import HeadingBadge from "./HeadingBadge";
import Copy from "@/public/icons/Copy";
import AnimatedKeySeeds from "./AnimatedKeySeeds";

const KeySeedsCard = () => {
  return (
    <div className="rounded-xl bg-slate p-1.5 shadow-2xl">
      <div className="rounded-xl bg-white">
        <HeadingBadge className="bg-linear-to-r from-backlight to-[#2E3E99] py-2.5 xl:py-3 px-10 xs:px-12.5 text-white">
          This is What you see
        </HeadingBadge>
        <div className="flex items-center justify-between xl:mb-1 px-2.5 xxs:px-4 xs:px-5 xl:px-7">
          <h3 className="text-base sm:text-lg xl:text-xl 2xl:text-[22px]">
            Key Seed Phrase
          </h3>
          <div className="flex items-center gap-5 text-xs xl:text-sm">
            <button className="flex items-center gap-0.5">
              <Save className="w-5 xl:w-6.5 h-auto" /> Save
            </button>
            <button className="flex items-center gap-1">
              <Copy className="w-4 xl:w-4.75 h-auto text-black" /> Copy
            </button>
          </div>
        </div>
        <div className="bg-linear-to-b from-white via-[#4D67FF] to-[#112862] px-2 xxs:px-4 xs:px-5 xl:px-7 pt-2 pb-16 rounded-b-xl">
          <div className="bg-[#EEF6FF] rounded-[10.5px] p-2 xs:p-3 sm:p-4 xl:p-5.5 grid grid-cols-4 gap-x-2 xs:gap-x-3 xl:gap-x-5.5 gap-y-2.5 text-center mb-2">
            <AnimatedKeySeeds />
          </div>
          <p className="text-white text-xs xs:text-sm xl:text-lg 2xl:text-[19px] flex">
            <span>⚠️</span>
            <span className="translate-y-0.5 inline-block">
              This seed never leaves your device. Save it securely for
              decryption!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeySeedsCard;
