"use client";
import Cursor from "@/public/icons/home/Cursor";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const MovingCursor = () => {
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = badgeRef.current;
    if (!el) return;

    gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(el, {
        top: "82%",
        right: "10%",
        bottom: "50%",
        duration: 2,
        ease: "power2.inOut",
        delay: 1,
      })
      .to({}, { duration: 2 });
  }, []);

  return (
    <div ref={badgeRef} className="absolute top-108 right-0">
      <div className="relative p-1.25 bg-white/50 backdrop-blur-[20px] rounded-full w-fit">
        <div className="bg-linear-to-r from-[#526BFF] to-[#243C93] text-xs px-2.5 py-1.25 rounded-full text-white">
          <p>Highly Secured Chats</p>
          <Cursor className="absolute -top-2 -left-3" />
        </div>
      </div>
    </div>
  );
};

export default MovingCursor;
