"use client";
import Image from "next/image";
import Mobile from "@/public/images/home/Communication-mobile.png";
import Mobile2 from "@/public/images/home/Communication-mobile2.png";
import Message from "@/public/images/home/Message";
import CursorText from "@/components/home/CursorText";
import Resonance from "@/public/icons/Resonance";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatingElements = () => {
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const resonanceRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      const messages = gsap.utils.toArray(".com-message");

      tl.to(
        badge1Ref.current,
        { yPercent: 120, duration: 2.5, ease: "power2.inOut" },
        0
      )
        .to(
          badge2Ref.current,
          { yPercent: -100, duration: 2.5, ease: "power2.inOut" },
          0
        )
        .to(
          cursorRef.current,
          { top: "73%", duration: 2, ease: "power2.inOut" },
          0
        )
        .to(messages, { opacity: 0, duration: 3.5, ease: "power2.out" }, 0)
        .to(clickRef.current, { scale: 2, opacity: 1, ease: "power2.out" })
        .to(clickRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" })

        .to({}, { duration: 1 })

        .to(image1Ref.current, { opacity: 0, duration: 1.5 })
        .to(
          image2Ref.current,
          { left: "0%", duration: 1.5, ease: "power2.inOut" },
          "<"
        )

        .to({}, { duration: 2 })

        .to(image2Ref.current, { opacity: 0, duration: 1.5 })
        .to(
          resonanceRef.current,
          { top: "35%", duration: 2, ease: "power2.inOut" },
          "<"
        )

        .to({}, { duration: 2 })

        .set(
          [
            badge1Ref.current,
            badge2Ref.current,
            cursorRef.current,
            clickRef.current,
            messages,
          ],
          { clearProps: "all" }
        )

        .to(resonanceRef.current, { opacity: 0, duration: 1.5 })
        .to(image1Ref.current, { opacity: 1, duration: 1.5 }, "<");
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={image1Ref}
        className="w-70 xxs:w-75 xs:w-80 sm:w-104 xl:w-113 2xl:w-119"
      >
        <div
          ref={badge1Ref}
          className="h-6 xs:h-8 sm:h-12.5 w-20 xs:w-28 sm:w-44 rounded-[22px_22px_0_22px] bg-white ms-auto me-6"
        />
        <div
          ref={badge2Ref}
          className="h-6 xs:h-8 sm:h-12.5 w-20 xs:w-28 sm:w-44 rounded-[22px_22px_22px_0] bg-white mb-5 xs:mb-8"
        />
        <div className="relative">
          <Image
            src={Mobile}
            alt="ai chat"
            width={1800}
            height={1800}
            className="w-full h-auto"
          />
          <div
            ref={cursorRef}
            className="absolute top-[10%] left-2/3 -translate-y-1/2 -translate-x-1/2"
          >
            <div
              ref={clickRef}
              className="size-5 rounded-full border opacity-0 border-sky-200 absolute top-[-5%] left-[-5%] -translate-x-full -translate-y-full"
            />
            <CursorText text="Highly Secured Chats" />
          </div>
        </div>
        <Message className="com-message w-5 xs:w-7 sm:w-11 h-auto absolute right-[10%] top-[38%] sm:top-[35%]" />
        <Message className="com-message w-5 xs:w-7 sm:w-11 h-auto absolute left-[3%] top-[62%] sm:top-[60%]" />
      </div>
      <Image
        ref={image2Ref}
        src={Mobile2}
        alt="mobile messages"
        className="absolute w-full h-auto bottom-[-5%] left-full"
      />
      <div
        ref={resonanceRef}
        className="absolute top-full left-1/2 -translate-x-1/2 size-42 xs:size-50 sm:size-75 2xl:size-85 rounded-full bg-white flex items-center justify-center"
      >
        <div className="rounded-full bg-[#6753E4] size-[90%] flex justify-center items-center">
          <Resonance className="text-white size-22 xs:size-30 sm:size-40 2xl:size-45 pl-3 xs:pl-5" />
        </div>
      </div>
    </>
  );
};

export default AnimatingElements;
