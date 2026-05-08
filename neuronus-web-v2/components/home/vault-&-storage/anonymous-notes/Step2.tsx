import Image from "next/image";
import Copy from "@/public/icons/Copy";
import UrlLink from "@/public/icons/home/vault/UrlLink";

const Step2 = () => {
  const baseClass =
    "flex items-center justify-center rounded-full bg-white shadow-2xl size-[80%]";

  return (
    <>
      <div className="flex items-center gap-3 mb-2 xs:mb-2.5">
        <p className="text-sm xs:text-base xl:text-lg">Your secret URl</p>
        <UrlLink className="w-4 xs:w-4.5 sm:w-5 xl:w-5.5 h-auto" />
      </div>
      <div className="bg-white flex rounded-xl justify-between items-center shadow-2xl p-3.5 xl:p-4.5 mb-5 sm:mb-8 xl:mb-11">
        <p className="text-xs xs:text-sm xl:text-base">
          www.gtransfer.io/AzSop
        </p>
        <Copy className="text-[#B1B1B1] w-4 xs:w-5 xl:w-6 h-auto" />
      </div>
      <div
        className={`${baseClass} size-50! xs:size-60! sm:size-68! xl:size-76! mx-auto`}
      >
        <div className={`${baseClass}`}>
          <div className={baseClass}>
            <div className={baseClass}>
              <Image
                src="/videos/Notes-Arrow-gif.gif"
                alt="Arrow animation"
                unoptimized
                width={150}
                height={150}
                className="size-[80%]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
