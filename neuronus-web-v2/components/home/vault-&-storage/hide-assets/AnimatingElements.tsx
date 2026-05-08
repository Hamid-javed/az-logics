"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ribbon from "@/public/images/home/vault/lock-ribbon.png";
import files from "@/public/images/home/vault/hide-assets-files.png";
import hiddenAsset from "@/public/images/home/vault/hiden-asset-img.png";

const AnimatingElements = () => {
  const filesRef = useRef<HTMLImageElement>(null);
  const hiddenAssetRef = useRef<HTMLImageElement>(null);
  const ribbon1Ref = useRef<HTMLImageElement>(null);
  const ribbon2Ref = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(filesRef.current, { left: "20%" });
      gsap.set(hiddenAssetRef.current, { left: "50%" });
      gsap.set(ribbon1Ref.current, { top: "10%" });
      gsap.set(ribbon2Ref.current, { bottom: "10%" });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
        delay: 2,
        defaults: { duration: 2, ease: "power2.inOut" },
      });

      tl.to(filesRef.current, { left: "50%" })
        .to({}, { duration: 1 })

        .to(hiddenAssetRef.current, { left: "80%" })
        .to({}, { duration: 1 })

        .to(ribbon1Ref.current, { top: "75%" }, "<")
        .to(ribbon2Ref.current, { bottom: "75%" }, "<")
        .to(hiddenAssetRef.current, { left: "50%" }, "<")
        .to({}, { duration: 1 })

        .to(ribbon1Ref.current, { top: "10%" }, "<")
        .to(ribbon2Ref.current, { bottom: "10%" }, "<")
        .to(filesRef.current, { left: "20%" })

        .to({}, { duration: 2 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Image
        ref={ribbon1Ref}
        src={ribbon}
        alt="lock ribbon"
        width={1000}
        height={500}
        className="w-full h-auto object-cover absolute"
      />
      <Image
        ref={ribbon2Ref}
        src={ribbon}
        alt="lock ribbon"
        width={1000}
        height={500}
        className="w-full h-auto object-cover absolute"
      />
      <Image
        ref={filesRef}
        src={files}
        alt="files"
        width={500}
        height={500}
        className="z-1 w-8 xs:w-10 sm:w-12 xl:w-15 h-auto object-contain absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
      />
      <Image
        ref={hiddenAssetRef}
        src={hiddenAsset}
        alt="hidden asset"
        width={500}
        height={500}
        className="z-1 w-8 xs:w-10 sm:w-12 xl:w-15 h-auto object-contain absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
      />
    </>
  );
};

export default AnimatingElements;
