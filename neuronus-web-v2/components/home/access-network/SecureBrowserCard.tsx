import SliderCardPill from "@/components/SliderCardPill";
import Assistance from "@/public/icons/home/accessNetork/Assistance";
import Link from "@/public/icons/home/accessNetork/Link";
import Mic from "@/public/icons/home/accessNetork/Mic";
import NeuroBrowser from "@/public/icons/home/accessNetork/NeuroBrowser";
import Proxy from "@/public/icons/home/accessNetork/Proxy";
import Robot from "@/public/icons/home/accessNetork/Robot";
import Search from "@/public/icons/home/accessNetork/Search";
import Shortfiy from "@/public/icons/home/accessNetork/Shortfiy";
import Polygon from "@/public/icons/home/Polygon";
import Previous from "@/public/icons/Previous";

export default function SecureBrowserCard() {
  const products = [
    { icon: <Shortfiy className="w-full h-auto" />, label: "Shortfiy" },
    {
      icon: <Polygon className="text-black w-full h-auto" />,
      label: "NeuroSPN",
    },
    { icon: <Assistance className="w-full h-auto" />, label: "Assistance" },
  ];

  return (
    <div className="px-3 sm:px-5 pb-5.75 rounded-[22px] bg-[#D6E2FF] relative overflow-hidden w-70 xxs:w-fit h-full">
      <div className="relative bg-[#F2F6FF]/69 w-[90%] xxs:w-67 xs:w-80 lg:w-65 2xl:w-83 h-35 2xl:h-41.5 rounded-b-full flex items-end justify-center mb-7 xxs:mb-10 2xl:mb-12 mx-auto xxs:mx-5 sm:mx-18 2xl:mx-21.25">
        <div className="size-12 sm:size-16 2xl:size-20 bg-backlight rounded-full flex items-center justify-center translate-y-1/4 px-3 sm:px-4 2xl:px-5">
          <NeuroBrowser className="text-white w-full h-auto" />
        </div>
      </div>
      <SliderCardPill
        text="Secure Browser"
        className="absolute top-5.75 left-3 sm:left-5.25"
      />

      <div className="p-1.5 xxs:p-2.5 sm:p-3.5 bg-white/20 border-[0.3px] border-white rounded-3xl shadow-[0_38.026px_32.111px_0_rgba(0,0,0,0.10)] w-full">
        <div className="relative bg-white/60 rounded-full mb-2 xxs:mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Search or type a URL"
            className="w-full rounded-full pl-6 xxs:pl-8 sm:pl-12.75 pr-17 xxs:pr-24 sm:pr-32 py-3 sm:py-4 2xl:py-5 placeholder:text-black placeholder:text-sm text-sm outline-none"
          />
          <Search className="absolute left-2 xxs:left-2.5 sm:left-5 top-1/2 -translate-y-1/2 w-3 xxs:w-4 2xl:w-4.5 h-auto" />
          <div className="absolute right-3 xxs:right-5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 xxs:gap-1 sm:gap-2 2xl:gap-3">
            <Link className="w-5 xxs:w-6 sm:w-7 2xl:w-7.75 h-auto" />
            <Mic className="w-3.5 xxs:w-4 sm:w-4.5 2xl:w-5.25 h-auto" />
            <Proxy className="w-4 xxs:w-5 sm:w-6 2xl:w-7 h-auto" />
          </div>
        </div>

        {/* Chat */}
        <div className="relative">
          <textarea
            placeholder="Ask anything..."
            className="relative rounded-[10px] bg-white py-3 xxs:py-4.5 px-3.5 w-full resize-none outline-none placeholder:text-black placeholder:text-sm text-sm h-42 xxs:h-44"
            rows={5}
          />
          <div className="absolute bottom-5 left-3.5 bg-[#D6E2FF] rounded-full flex gap-3 items-center py-1.25 pl-1.25 pr-5">
            <div className="size-8 bg-white flex items-center justify-center rounded-full overflow-hidden p-1">
              <Robot className="w-full h-auto object-contain" />
            </div>
            <p className="text-xs">Resonance Robot</p>
            <div className="flex flex-col items-center gap-1">
              <Previous className="size-1.5 text-black/60 rotate-90" />
              <Previous className="size-1.5 text-black/60 -rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Icons */}
      <div className="flex text-center justify-center pt-4 xxs:pt-6 sm:pt-8 2xl:pt-11 pb-2 gap-5">
        {products.map((product) => (
          <div
            className="text-xs sm:text-sm text-center space-y-2.5"
            key={product.label}
          >
            <div className="w-12 sm:w-15 2xl:w-19 h-10 sm:h-14 2xl:h-16 flex items-center justify-center bg-white rounded-full px-3 sm:px-4 2xl:px-5">
              {product.icon}
            </div>
            <p>{product.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
