"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slides = [
    "Private Investigators",
    "Lawyers",
    "Researchers and Inventors",
    "Investors and Financial Advisors",
    "Cryptocurrency Users",
    "Whistleblowers",
    "Private Investigators",
    "Lawyers",
    "Researchers and Inventors",
    "Investors and Financial Advisors",
    "Cryptocurrency Users",
    "Whistleblowers",
  ];

  useLayoutEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const tl = gsap.to(slider, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden w-full mb-5">
      <div ref={sliderRef} className="flex w-fit">
        {slides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            className="bg-[#D7E3FF] py-2.5 px-4 rounded-xl whitespace-nowrap shrink-0 mr-2.5 text-xs sm:text-sm xl:text-base"
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
