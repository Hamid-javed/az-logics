"use client";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const AnimatingElements = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const tooltipRefs = useRef<HTMLHeadingElement[]>([]);

  const tooltips = [
    {
      label: "Classic Mail",
      classes: "rounded-bl-none! top-[11%] right-[16%]",
    },
    {
      label: "Ghost Mail",
      classes: "rounded-br-none! bottom-[25%] left-0",
    },
    { label: "Bulk Mail", classes: "rounded-bl-none! bottom-[13%] right-[5%]" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

      tl.set(circleRef.current, {
        xPercent: 100,
        yPercent: 100,
        opacity: 0,
      });
      tl.set(tooltipRefs.current, { opacity: 0 });

      tl.to(circleRef.current, {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
      tl.to(
        tooltipRefs.current,
        {
          opacity: 1,
          duration: 2.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "<"
      );

      tl.to({}, { duration: 2 });

      tl.to(circleRef.current, {
        xPercent: 100,
        yPercent: 100,
        opacity: 0,
        duration: 2,
        ease: "power3.inOut",
      });
      tl.to(
        tooltipRefs.current,
        {
          opacity: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: "power2.in",
        },
        "<"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={circleRef}
        className="absolute bottom-0 left-0 size-full rounded-full bg-white/40 flex justify-center items-center z-1"
      >
        <div className="flex justify-center items-center size-4/5 rounded-full bg-white/60 shadow-xl">
          <div className="flex justify-center items-center bg-white shadow-xl size-3/4 rounded-full">
            <div className="size-2/3 bg-white drop-shadow-2xl rounded-full" />
          </div>
        </div>
      </div>

      {tooltips.map((tooltip, i) => (
        <h3
          ref={(el) => {
            if (el) tooltipRefs.current[i] = el;
          }}
          key={tooltip.label}
          className={`absolute z-3 bg-white shadow-lg rounded-[14px] h-8 xs:h-10.75 w-18 xs:w-22 sm:w-30 xl:w-35 flex justify-center items-center text-xs xs:text-sm sm:text-base xl:text-lg ${tooltip.classes}`}
        >
          {tooltip.label}
        </h3>
      ))}
    </>
  );
};

export default AnimatingElements;
