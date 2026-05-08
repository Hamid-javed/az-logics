"use client";
import Image from "next/image";
import { gsap } from "gsap";
import SliderCardPill from "@/components/SliderCardPill";
import ThunderCard from "@/components/ThunderCardBg";
import Browse from "@/public/icons/home/vault/Browse";
import Clock from "@/public/icons/home/vault/Clock";
import Enter from "@/public/icons/home/vault/Enter";
import Ip from "@/public/icons/home/vault/Ip";
import Lock from "@/public/icons/home/vault/Lock";
import Views from "@/public/icons/home/vault/Views";
import Pill from "./Pill";
import PulseAnimation from "./PulseAnimation";
import { useLayoutEffect, useRef } from "react";
import Step2 from "./Step2";

const AnonymousNotes = () => {
  const pulseRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const rabitRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(step1Ref.current, { opacity: 1 });
      gsap.set(step2Ref.current, { opacity: 0 });
      gsap.set(pillsRef.current, { opacity: 1 });
      gsap.set(pulseRef.current, { opacity: 0 });
      gsap.set(rabitRef.current, { opacity: 0 });

      const tl = gsap.timeline({ repeat: -1 });

      tl.to({}, { duration: 2.5 }) // hold step 1
        .to(pillsRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        })
        .to(
          pulseRef.current,
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<"
        )
        .to({}, { duration: 2.5 }) // hold pulse
        .to(step1Ref.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        })
        .to(
          [step2Ref.current, rabitRef.current],
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<"
        )
        .to({}, { duration: 2.5 }) // hold step 2
        .set(pillsRef.current, { opacity: 1 })
        .set(pulseRef.current, { opacity: 0 })
        .to([step2Ref.current, rabitRef.current], {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        })
        .to(
          step1Ref.current,
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <ThunderCard className="h-full">
      <div className="px-3 py-5 xs:p-5 sm:p-6 w-75 xs:w-95 sm:w-110 xl:w-125">
        <SliderCardPill text="Anonymous Notes" className="mb-5" />
        <h1 className="text-lg xs:text-xl sm:text-2xl xl:text-[30px] mb-5 xs:mb-7 sm:mb-10 xl:mb-17 font-semibold">
          Share Anything, Then It <br />
          Disappears
        </h1>
        <div className="relative">
          <div ref={step1Ref}>
            <div className="bg-white rounded-2xl sm:rounded-[25px] p-3 xl:p-5 mb-4 sm:mb-6 xl:mb-9">
              <div className="relative overflow-hidden">
                <textarea
                  readOnly
                  defaultValue={"Write your Secret note..."}
                  className="relative w-full h-40 xs:h-50 sm:h-61 border border-[#B7B7B7] resize-none rounded-2xl sm:rounded-[25px] text-sm xs:text-[15px] outline-none py-3 sm:py-5 xl:py-7 px-3.5 sm:px-4.5 mb-3 sm:mb-4 xl:mb-6.5"
                />
                <div
                  ref={pulseRef}
                  className="absolute size-full top-[25%] left-3.5 sm:left-4.5"
                >
                  <PulseAnimation />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs xs:text-[13px]">
                <div className="flex items-center gap-1.75">
                  <Browse className="w-3 xs:w-4 sm:w-4.5 h-auto" />
                  <p>Upload</p>
                </div>
                <div className="flex items-center gap-1.75">
                  <Enter className="w-2.5 xs:w-3 sm:w-3.75 h-auto" />
                  <p>Press Enter to send</p>
                </div>
              </div>
            </div>
            <div
              ref={pillsRef}
              className="grid grid-cols-2 text-xs xs:text-[13px] gap-y-3"
            >
              <Pill
                className="translate-x-[-5%]"
                text="Lifetime"
                icon={<Clock className="w-3 xs:w-4 h-auto" />}
              />
              <Pill
                text="Lifetime"
                icon={<Lock className="w-3 xs:w-3.75 h-auto text-black" />}
              />
              <Pill
                className="mx-auto"
                text="Max Views"
                icon={<Views className="w-4 xs:w-4.75 h-auto" />}
              />
              <Pill
                className="ms-auto"
                text="IP Restriction"
                icon={<Ip className="w-3.5 xs:w-4.25 h-auto" />}
              />
            </div>
          </div>
          <div ref={step2Ref} className="absolute top-0 w-full">
            <Step2 />
          </div>
        </div>
      </div>
      <Image
        ref={rabitRef}
        src="/videos/Bunny-gif.gif"
        alt="Arrow animation"
        unoptimized
        width={200}
        height={200}
        className="size-20 xs:size-25 sm:size-30 xl:size-37.5 absolute bottom-0 right-0 translate-y-2 xl:translate-y-3"
      />
    </ThunderCard>
  );
};

export default AnonymousNotes;
