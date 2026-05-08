"use client";
import {
  encryptedProducts,
  encryptionData,
  encryptionIcons,
} from "@/data/home/next-gen-encryption";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const EncryptionAnimation = () => {
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const productsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current;
      const products = productsRef.current;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      items.forEach((item, i) => {
        // Force product start state every time
        tl.set(products[i], {
          top: "50%",
          right: "50%",
          opacity: 0,
        });

        // Item moves to center
        tl.to(item, {
          left: "50%",
          top: "50%",
          opacity: 0,
        });

        // Product moves out
        tl.to(
          products[i],
          {
            clearProps: "top,right",
            opacity: 1,
          },
          "+=0.5"
        );

        tl.to({}, { duration: 2, ease: "none" });
      });

      // Reset all products
      tl.to(products, {
        top: "50%",
        right: "50%",
        opacity: 0,
      });

      // Reset all items
      tl.to(items, {
        clearProps: "top,left",
        opacity: 1,
      });

      tl.to({}, {});
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {encryptionData.map((elem, index) => (
        <div
          ref={(el) => {
            if (el) itemsRef.current[index] = el;
          }}
          key={`next-gen-encryption-of-${elem.label}`}
          className={`absolute -translate-x-1/2 -translate-y-1/2 bg-white px-3 xl:px-5 2xl:px-6 py-0.5 lg:py-1 xl:py-1.5 2xl:py-2 rounded-lg text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-[22px] will-change-transform transition-all duration-700 ease-initial ${elem.class}`}
        >
          {elem.label}
        </div>
      ))}

      {encryptedProducts.map((product, index) => (
        <div
          ref={(el) => {
            if (el) productsRef.current[index] = el;
          }}
          className={`absolute translate-x-1/2 -translate-y-1/2 p-px xl:p-[1.5px] rounded-lg lg:rounded-xl xl:rounded-[18px] bg-linear-to-b from-[#AAB5F6] to-backlight shadow-md will-change-transform transition-all duration-700 ease-initial opacity-0 ${product.class}`}
          key={`next-gen-encrypted-product-${index}`}
        >
          <div className="bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%] size-8 sm:size-10 lg:size-12 xl:size-14 2xl:size-16.75 rounded-lg lg:rounded-xl xl:rounded-[18px] px-2 sm:px-2.5 lg:px-3 xl:px-4 2xl:px-4.5 flex items-center justify-center text-white">
            {product.icon}
          </div>
        </div>
      ))}

      {encryptionIcons.map((elem, i) => (
        <div
          className={`bg-white/30 size-8 md:size-11 xl:size-15 2xl:size-17.5 absolute -translate-y-1/2 -translate-x-1/2 rounded-full flex items-center justify-center ${elem.class}`}
          key={`next-gen-encryption-icon-${i}`}
        >
          <div className="size-2/3 bg-white rounded-full flex items-center justify-center px-1.25 md:px-2 xl:px-2.75 2xl:px-3.5">
            {elem.icon}
          </div>
        </div>
      ))}
    </>
  );
};

export default EncryptionAnimation;
