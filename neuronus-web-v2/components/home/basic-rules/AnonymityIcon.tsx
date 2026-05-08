"use client";
import QuestionMark from "@/public/icons/QuestionMark";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const AnonymityIcon = () => {
  const divsRef = useRef<HTMLDivElement[]>([]);

  const gradientClass =
    "bg-radial-[54.44%_55.7%_at_56.56%_20.66%,#2E3E99_0%,#5A73FF_100%]";
  const animatedDivsClass = `absolute size-full rounded-[5px] top-0 -rotate-45 blur-[0.5px] ${gradientClass}`;
  const animatedDivs = ["left-3/4", "left-1/2", "left-1/4"];

  useLayoutEffect(() => {
    const divs = divsRef.current;

    gsap.set(divs, { autoAlpha: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.5,
    });

    tl.to(divsRef.current[2], { autoAlpha: 0.5, duration: 0.4 })
      .to(divsRef.current[1], { autoAlpha: 0.3, duration: 0.4 })
      .to(divsRef.current[0], { autoAlpha: 0.25, duration: 0.4 })
      .to(divsRef, {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
      });
  }, []);

  return (
    <div className="relative w-fit mx-auto mb-1">
      {animatedDivs.map((left, index) => (
        <div
          ref={(el) => {
            if (el) divsRef.current[index] = el;
          }}
          className={`${left} ${animatedDivsClass}`}
          key={`anonimity-${index}`}
        />
      ))}
      <div className="relative size-7 sm-size-8 xl:size-10 2xl:size-12.5 bg-linear-to-r from-[#91A2FF] to-[#576199] p-0.5 rounded-[5px] -rotate-45">
        <div
          className={`size-full rounded-[5px] flex justify-center items-center ${gradientClass}`}
        >
          <QuestionMark className="w-1.5 sm:w-2 xl:w-2.75 2xl:w-3.25 h-auto rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default AnonymityIcon;
