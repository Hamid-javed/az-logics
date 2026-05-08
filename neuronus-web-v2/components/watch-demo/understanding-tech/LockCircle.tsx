import DataEncryption from "@/public/icons/watch-demo/DataEncryption";
import Lock from "@/public/icons/pricing/Lock";
import Key from "@/public/icons/pricing/Key";
import Reward from "@/public/icons/pricing/Reward";
import Shield from "@/public/icons/pricing/Shield";
import OldLock from "@/public/icons/watch-demo/OldLock";
import IconWrapper from "./IconWrapper";

const LockCircle = () => {
  const baseClass =
    "relative flex justify-center items-center rounded-full border-[1.15px]";
  return (
    <div className="lg:ps-10 xl:ps-20 2xl:ps-25">
      <div className="bg-white rounded-[10px] w-full py-10.5 border border-[#D4D4D4]">
        <div
          className={`${baseClass} size-60 xs:size-80 sm:size-100 lg:size-80 xl:size-100 mx-auto border-[#4C67FF1F]`}
        >
          <IconWrapper Icon={Lock} className="absolute top-[20%] left-0" />
          <IconWrapper
            Icon={OldLock}
            className="absolute bottom-[20%] right-0"
          />
          <div className={`${baseClass} size-3/4 border-[#4C67FF36]`}>
            <IconWrapper
              Icon={Key}
              className="absolute top-[-3%] right-[25%]"
            />
            <IconWrapper Icon={Reward} className="absolute top-[20%] right-0" />
            <IconWrapper
              Icon={Shield}
              className="absolute bottom-[20%] left-0"
            />
            <div
              className={`${baseClass} size-3/5 border-backlight bg-[#4C67FF24] `}
            >
              <DataEncryption className="w-10 xs:w-13 sm:w-15 xl:w-17 h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockCircle;
