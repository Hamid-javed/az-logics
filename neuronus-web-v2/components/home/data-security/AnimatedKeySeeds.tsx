"use client";
import { keySeeds } from "@/data/home/keyseeds";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedKeySeeds = () => {
  const seedsRef = useRef<HTMLParagraphElement[]>([]);

  useLayoutEffect(() => {
    const seeds = seedsRef.current;

    gsap.set(seeds, { autoAlpha: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(seeds, {
      autoAlpha: 1,
      duration: 1,
      stagger: 0.5,
      ease: "power2.out",
    }).to(
      seeds,
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
        delay: 1,
      },
      "+=1"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return keySeeds.map((seed, index) => (
    <div
      key={`data-security-keyseed-${index}`}
      className="bg-white rounded-sm p-1.5 sm:p-2.5 text-[10px] xs:text-xs sm:text-sm 2xl:text-base"
    >
      <p
        ref={(el) => {
          if (el) seedsRef.current[index] = el;
        }}
      >
        {seed}
      </p>
    </div>
  ));
};

export default AnimatedKeySeeds;
