"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Polygon from "@/public/images/Polygon";
import { ProductValuation } from "@/data/productValuation";
import { useScreenSize } from "@/hooks/useScreenSize";
import { zValuation, zValutionCard } from "@/data/constants/zIndexes";

gsap.registerPlugin(MotionPathPlugin);

const ProductValuationCard = ({
  dailyRevenue,
  icon,
  name,
  shareOfPool,
  wire,
  pathId,
}: ProductValuation) => {
  const { screenWidth } = useScreenSize();
  const pRef = useRef<HTMLDivElement>(null);

  const {
    image,
    position = "bottom",
    placement = undefined,
    translateX = undefined,
    imgMob,
    placementMob,
  } = wire;

  const baseClass = "absolute translate-y-full";
  const placementClass =
    placement === "left"
      ? `left-1/2 ${translateX ? translateX : "-translate-x-px"}`
      : placement === "right"
      ? `right-1/2 ${translateX ? translateX : "lg:translate-x-px"}`
      : "";
  const positionClass =
    position === "bottom"
      ? "bottom-0"
      : position === "left"
      ? "-left-[25%] bottom-1/2"
      : "-right-[25%] bottom-1/2";

  useLayoutEffect(() => {
    gsap.to("#backLight", {
      rotation: 360,
      duration: 6,
      repeat: -1,
      ease: "none",
    });
  }, []);

  useLayoutEffect(() => {
    if (pRef.current) {
      gsap.to(pRef.current, {
        duration: 15,
        ease: "power1.in",
        motionPath: {
          path: pathId,
          align: pathId,
          autoRotate: true,
        },
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            gsap.to(pRef.current, { opacity: 0, ease: "none" });
          }
        },
        onComplete: () => {
          gsap.set("#currentValuation", { display: "none" });
          gsap.to("#updatedValuation", {
            opacity: 1,
            display: "block",
            ease: "power1.inOut",
          });
          gsap.to("#valuationTooltip", {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          });
          gsap.set("#currentNC", { display: "none" });
          gsap.to("#updatedNC", { opacity: 1, ease: "power1.inOut" });
          gsap.to("#NCGrowth", { opacity: 1, ease: "power1.inOut" });
          gsap.set("#currentToken", { display: "none" });
          gsap.to("#updatedToken", {
            opacity: 1,
            display: "block",
            ease: "power1.inOut",
          });
        },
      });
    }
  }, [pathId]);

  return (
    <div className="relative">
      {screenWidth >= 1024 && (
        <div
          className={`hidden lg:block ${baseClass} ${placementClass} ${positionClass}`}
        >
          {image}
        </div>
      )}
      {screenWidth < 1024 && (
        <div className={`lg:hidden ${baseClass} bottom-0 ${placementMob}`}>
          {imgMob}
        </div>
      )}
      <div
        ref={pRef}
        className={`absolute top-1/2 left-1/2 size-3 rounded-full opacity-100 flex justify-center ${zValuation}`}
      >
        <p className="bg-white/10 rounded-full border-[0.4px] border-white backdrop-blur-[2px] text-[15px] text-white px-2 py-1 font-NeueThin -rotate-90 size-fit">
          {dailyRevenue}
        </p>
      </div>
      <Polygon
        className={`absolute hidden lg:block ${
          position === "bottom"
            ? "-bottom-2.5 left-1/2 -translate-x-1/2"
            : position === "left"
            ? "top-1/2 -translate-y-1/2 -left-4 rotate-90"
            : "top-1/2 -translate-y-1/2 -right-4 -rotate-90"
        }`}
      />
      <Polygon
        className={`absolute lg:hidden -bottom-2.5 left-1/2 -translate-x-1/2`}
      />
      <div
        className={`p-1 xs:p-1.5 sm:p-2.5 xl:p-3.5 rounded-3xl bg-[#3448B9] relative overflow-hidden ${zValutionCard}`}
      >
        <div
          id="backLight"
          className="absolute w-[40%] h-[220%] left-1/2 top-1/2 bg-[#9AA9FF] blur-[18px] rounded-[25%] will-change-transform -translate-x-1/2 -translate-y-1/2"
        />
        <div className="rounded-3xl bg-primary p-2 xxs:p-2.5 sm:p-3 xl:p-5 relative">
          <div className="flex gap-1.5 sm:gap-2.5 xl:gap-3.5 items-center pb-5">
            <div className="size-8 sm:size-10 xl:size-11 rounded-lg border-[0.3px] border-[#223496] flex items-center justify-center backdrop-blur-[0.5px]">
              {icon}
            </div>
            <h1 className="text-xs xxs:text-sm xs:text-base sm:text-lg xl:text-[20px] font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#999999] via-white to-[#999999]">
              {name}
            </h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-r border-white/35">
              <h4 className="text-[9px] xxs:text-[10px] xs:text-xs xl:text-[15px] text-white/70">
                Daily Revenue
              </h4>
              <h2 className="sm:text-lg xl:text-[22px] text-white font-semibold">
                {dailyRevenue}
              </h2>
            </div>
            <div className="pl-2 sm:pl-5">
              <h4 className="text-[9px] xxs:text-[10px] xs:text-xs xl:text-[15px] text-white/70">
                Share of Pool
              </h4>
              <h2 className="sm:text-lg xl:text-[22px] text-white">
                {shareOfPool}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductValuationCard;
