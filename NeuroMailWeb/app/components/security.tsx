"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Security() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/security.svg", "/security1.svg"];
  const mbimages = ["/t.svg", "/t3.svg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        id="pricing"
        className="relative h-[676px] bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-19 rounded-[33px] hidden lg:block mx-9"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[33px]">
          <img
            src="security.png"
            alt="Security background"
            className="w-full object-cover rounded-[33px] h-full object-center"
          />

          {/* Image Slider */}
          <div className="absolute inset-0 h-[699px] ml-[100px] mt-[50px]">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out h-full w-full rounded-[33px] ${
                  currentImage === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="relative mt-[90px]">
          <div className="grid gap-19 lg:grid-cols-3 lg:gap-2">
            <div className="leading-9 pl-7">
              <h2 className="text-3xl font-bold tracking-wide text-white sm:text-4xl w-[33vw]">
                We don&apos;t take your sensitive info, IP address & phone etc.
              </h2>
              <p className="mt-4 text-lg text-gray-200 w-[36vw]">
                NeuroMail offers encrypted communication, full control over your
                data, and AI-powered smart features. Privacy has never been this
                simple.
              </p>
              <div className="mt-8">
                <Link href="https://mailing.neuromail.cloud">
                  <button className="flex items-center justify-center bg-[#305EFF] text-white text-[14px] w-[200px] h-[45px] rounded-[9px]">
                    <img src="mail.svg" alt="" className="w-7 h-7 pr-[7px]" />
                    Get Free Email
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative h-[600px] flex flex-col justify-center px-4 mx-auto mt-2 max-w-[325px] lg:hidden bg-white py-16 sm:px-6 rounded-[17px]">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-[17px] flex-col justify-center">
          <img
            src="/mbbg.svg"
            alt="Mobile background"
            className="w-full h-full object-cover object-center rounded-[17px]"
          />
          {/* Dark Overlay for Better Readability */}
          <div className="absolute inset-0 "></div>
        </div>

        {/* Floating Images */}
        <div className="absolute mt-[119px] -ml-2 sm:-ml-4 flex justify-center w-full">
          {mbimages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`absolute transition-opacity duration-1000 ease-in-out w-[95%] ${
                currentImage === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="relative flex flex-col -mt-[250px] text-white px-2 max-w-[89%] ">
          <h2 className="text-[24px]  font-bold leading-tight">
            We don’t take your sensitive info, IP address & phone etc.
          </h2>
          <p className="mt-3 text-[10px] sm:text-[14px] text-gray-300">
            NeuroMail offers encrypted communication, full control over your
            data, and AI-powered smart features. Privacy has never been this
            simple.
          </p>
          <Link href="https://mailing.neuromail.cloud">
            <button className="mt-6 bg-[#305EFF] text-white text-[10px] w-[119px] h-[35px] rounded-[6px] shadow-md">
              Get Started
            </button>
          </Link>
        </div>
      </section>{" "}
    </>
  );
}
