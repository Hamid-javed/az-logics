import Growth from "@/public/icons/Growth";
import NeuroCoin from "@/public/icons/NeuroCoin";
import { zWorthCard } from "@/data/constants/zIndexes";

const NeuroCoinWorth = () => {
  return (
    <div
      className={`translate-y-[-10%] w-full relative pb-10 overflow-hidden ${zWorthCard}`}
    >
      <div className="rounded-[22px] bg-[#00113E] flex gap-2 xs:gap-3 sm:gap-5 ps-3 pt-5 pb-10 pe-3 xxs:pe-5 xs:pe-10 sm:pe-15 md:pe-30 relative w-full sm:w-[90%] lg:w-2/3 xl:w-1/2 2xl:w-[40%] mx-auto">
        <div className="size-10 xs:size-12 sm:size-14.5 flex items-center justify-center bg-primary border-[0.4px] border-[#223496] rounded-xl backdrop-blur-[0.7px]">
          <NeuroCoin className="text-white w-5.5 xs:w-6.5 sm:w-7.25 h-auto" />
        </div>
        <div className="text-white flex-1">
          <h1 className="bg-clip-text text-transparent bg-linear-to-r from-[#999999] via-white to-[#999999] text-xl sm:text-2xl lg:text-[26px] font-semibold mt-2 mb-5">
            Your Neuro Coin Worth
          </h1>
          <h2 className="xs:text-lg sm:text-xl lg:text-[22px] font-medium mb-3.5">
            1NCNC= <span id="currentNC">$0.0015</span>{" "}
            <span id="updatedNC" className="opacity-0 text-[#FFC927]">
              $0.0223
            </span>
          </h2>
          <div
            id="NCGrowth"
            className="text-sm xs:text-base flex gap-3 xs:gap-5 items-center mb-8 xs:mb-10 opacity-0"
          >
            <div className="bg-[#22C55E] rounded-sm px-4 xs:px-6 py-1.5 flex gap-1.5 items-center">
              <Growth className="text-[#00113E]" />
              <p className="text-[#00113E]">+25%</p>
            </div>
            <p>vs last period</p>
          </div>
          <hr className="border-white" />
          <div className="flex justify-between items-center text-sm xxs:text-base xs:text-lg sm:text-xl lg:text-[22px] pt-8 xs:pt-10">
            <h3>Token Price</h3>
            <h3 id="currentToken" className="font-semibold">
              1 NCNC = $0.0015
            </h3>
            <h3
              id="updatedToken"
              className="font-semibold hidden opacity-0 text-[#FFC927]"
            >
              1 NCNC = $0.0223
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroCoinWorth;
