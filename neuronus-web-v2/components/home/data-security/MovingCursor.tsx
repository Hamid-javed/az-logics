"use client";
import Cursor from "@/public/icons/home/Cursor";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import CursorText from "../CursorText";

const MovingCursor = () => {
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = badgeRef.current;
    if (!el) return;

    gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(el, {
        top: "50%",
        right: "35%",
        duration: 2,
        ease: "power2.inOut",
        delay: 1,
      })
      .to({}, { duration: 2 });
  }, []);

  return (
    <div ref={badgeRef} className="absolute top-1/5 right-[-10%]">
      <CursorText text="Scrambled Data" />
    </div>
  );
};

export default MovingCursor;
