"use client";
import Image from "next/image";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import ghostCoin from "@/public/images/home/neuronus-protects/ghost-coin.avif";
import resonanceCoin from "@/public/images/home/neuronus-protects/resonance-coin.avif";
import neuronusCoin from "@/public/images/home/neuronus-protects/neuronus-coin.avif";
import neuroscreenCoin from "@/public/images/home/neuronus-protects/neuroscreen-coin.avif";
import neuroRSACoin from "@/public/images/home/neuronus-protects/neuroRSA-coin.avif";
import neuroDriveCoin from "@/public/images/home/neuronus-protects/neuroDrive-coin.avif";
import neuroMailCoin from "@/public/images/home/neuronus-protects/neuroMail-coin.avif";
import polygonCoin from "@/public/images/home/neuronus-protects/polygon-coin.avif";

const Coins = () => {
  const ghResRef = useRef<HTMLDivElement>(null);
  const neuronusRef = useRef<HTMLImageElement>(null);
  const neuroscreenRef = useRef<HTMLImageElement>(null);
  const neuroRSARef = useRef<HTMLImageElement>(null);
  const neuroMailRef = useRef<HTMLImageElement>(null);
  const neuroDriveRef = useRef<HTMLImageElement>(null);
  const polygonRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    gsap.to(ghResRef.current, {
      yPercent: -17,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 2,
    });

    gsap.to(neuronusRef.current, {
      yPercent: 50,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 3,
    });

    gsap.to(neuroscreenRef.current, {
      yPercent: -25,
      xPercent: -52,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 3,
    });

    gsap.to(neuroDriveRef.current, {
      yPercent: 50,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 2,
    });

    gsap.to(neuroMailRef.current, {
      yPercent: -45,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 2,
    });

    gsap.to(neuroRSARef.current, {
      yPercent: 40,
      xPercent: 140,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 2,
    });

    gsap.to(polygonRef.current, {
      yPercent: -130,
      xPercent: -115,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 2,
    });
  }, []);
  return (
    <>
      <div
        ref={ghResRef}
        className="absolute bottom-[12%] xs:bottom-1/4 md:bottom-[30%] left-[2%] sm:left-[1%]"
      >
        <Image
          src={ghostCoin}
          alt="ghost mail coin"
          width={500}
          height={500}
          className="w-8 sm:w-10 md:w-14 lg:w-20 xl:w-25 2xl:w-30 h-auto object-contain mb-25 md:mb-35 lg:mb-40 xl:mb-50"
        />
        <Image
          src={resonanceCoin}
          alt="resonance coin"
          width={800}
          height={800}
          className="w-12 sm:w-14 md:w-20 lg:w-30 xl:w-38 2xl:w-44 h-auto object-contain"
        />
      </div>
      <Image
        ref={neuronusRef}
        src={neuronusCoin}
        alt="neuronus coin"
        width={800}
        height={800}
        className="absolute top-1/3 xs:top-1/2 md:top-2/5 lg:top-[35%] xl:top-1/4 left-[13%] sm:left-[10%] w-10 sm:w-12 md:w-18 lg:w-24 xl:w-32 2xl:w-40 h-auto object-contain"
      />
      <Image
        ref={neuroscreenRef}
        src={neuroscreenCoin}
        alt="neuroscreen coin"
        width={800}
        height={800}
        className="absolute bottom-1/5 xs:bottom-[30%] md:bottom-1/3 left-1/3 xs:left-[22%] sm:left-[18%] md:left-1/5 xl:left-1/4 w-10 sm:w-12 md:w-18 lg:w-24 xl:w-32 2xl:w-40 h-auto object-contain"
      />
      <Image
        ref={neuroDriveRef}
        src={neuroDriveCoin}
        alt="neuroscreen coin"
        width={800}
        height={800}
        className="absolute top-2/3 sm:top-[55%] md:top-1/2 lg:top-[45%] xl:top-2/5 right-[2%] w-12 sm:w-16 md:w-24 lg:w-32 xl:w-42 2xl:w-50 h-auto object-contain"
      />
      <Image
        ref={neuroMailRef}
        src={neuroMailCoin}
        alt="neuroscreen coin"
        width={800}
        height={800}
        className="absolute bottom-[10%] sm:bottom-1/4 md:bottom-1/5 lg:bottom-[18%] xl:bottom-[15%] right-[2.5%] w-10 sm:w-12 md:w-18 lg:w-24 xl:w-32 2xl:w-40 h-auto object-contain"
      />
      <Image
        ref={polygonRef}
        src={polygonCoin}
        alt="neuroscreen coin"
        width={800}
        height={800}
        className="absolute bottom-[15%] sm:bottom-1/4 xl:bottom-[30%] right-[12%] xl:right-[15%] w-10 sm:w-12 md:w-18 lg:w-24 xl:w-32 2xl:w-40 h-auto object-contain"
      />
      <Image
        ref={neuroRSARef}
        src={neuroRSACoin}
        alt="neuroscreen coin"
        width={800}
        height={800}
        className="absolute top-2/5 md:top-[35%] lg:top-[30%] xl:top-1/4 right-1/3 xs:right-1/4 w-16 sm:w-20 md:w-26 lg:w-35 xl:w-45 2xl:w-55 h-auto object-contain"
      />
    </>
  );
};

export default Coins;
