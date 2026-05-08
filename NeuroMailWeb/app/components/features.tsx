"use client";
import dynamic from "next/dynamic";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
  }
);

import { AI, Quantom } from "@/public/assets/Icons";
import Animation from "./animation";

export default function Features() {
  return (
    <>
      <div id="collaboration" className="lg:flex justify-evenly items-center mx-9 gap-3 hidden">
        <section className="bg-cardsbg globeBgImage relative text-white overflow-hidden md:w-[594px] h-[322px] md:h-[400px] rounded-[17px] md:rounded-[33px] px-5 md:px-9 pt-4 md:py-12">
          <div className="flex gap-3 md:gap-5 items-center">
            <Quantom className={'w-[50px] h-[50px]'}/>
            <p className="text-[18px] md:text-[20px] lg:text-[22px]">
              Get Quantumography for Files Encryption
            </p>
          </div>
          <p className="font-inter text-[10px] md:text-[14px] mt-4">
            Acquire a comprehensive understanding of Quantumography alongside
            the groundbreaking advancements of Neuro Drive. These technologies
            collectively redefine innovation across imaging and cognitive
            domains.
          </p>
          <img src="/Vector.svg" alt="round-icon" className="vectorDarkBlue" />
          <div className="globecontainer">
            <div className="globeWrapper">
              <div className="w-full flex justify-center">
                <div className="relative container">
                  <div id="rings-outer" className="rings-outer animate">
                    <Player
                      autoplay
                      loop
                      src="https://lottie.host/5172e47a-e0ad-4ba0-92fe-df1e6b09499d/cfy169jA4q.json"
                      id="darklines"
                      className="darklines"
                    />
                    <img src="/ring.svg" alt="" id="ring" />
                    <img src="/stroke1.svg" alt="" id="stroke1" />
                    <img src="/stroke2.svg" alt="" id="stroke2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="/movingImageFile.png" className="movingImageFile" />
          <img src="/movingImage.png" className="movingImage" />
        </section>

        {/* <section className="relative py-16 h-[400px] w-[640px] overflow-hidden px-4  rounded-[33px] text-white lg:py-1 my-5 flex justify-end lg:px-8 ">
          <div className="absolute inset-0 z-0">
            <img src="AI.svg" alt="Background" className="object-cover" />
            <div className="absolute ml-[220px] -mt-9 w-[35px] h-[35px]">
              <Animation />
            </div>
          </div>
        </section> */}
        <section className="globeBgImage2 relative text-white md:w-[594px] h-[322px] md:h-[400px] overflow-hidden rounded-[17px] md:rounded-[33px] px-5 md:px-9 pt-4 md:pt-12">
          <div className="absolute ml-[120px] mt-[99px]">
            <Animation className={""} size={"w-[150px] h-[150px]"} />
          </div>{" "}
          <div className="flex gap-3 md:gap-5 items-center -mt-4">
            <AI />
            <p className="text-[18px] md:text-[20px] lg:text-[22px]">
              With AI Writer Craft Messages Like Famous Personalities
            </p>
          </div>
          <p className="font-inter text-[10px] md:text-[14px] mt-3">
            Unleash your creativity with NeuroMail&apos;s AI Writer.
            Effortlessly draft emails in the style of famous individuals,
            blending inspiration and personalization for impactful
            communication.
          </p>
          <img src="/AIimage.svg" alt="" className="aiImage" />
        </section>
      </div>

      <div className=" relative mx-auto w-full flex flex-col justify-center items-center h-[420px] lg:hidden gap-4 mb-12">
      <section className="bg-cardsbg globeBgImage relative text-white overflow-hidden w-[325px] h-[322px] rounded-[17px] px-5 md:px-9 pt-4">
          <div className="flex gap-2 items-center mt-2">
            <Quantom className={'w-[30px] h-[30px]'}/>
            <p className="text-[11px] font-[700]">
              Get Quantumography for Files Encryption
            </p>
          </div>
          <p className="text-[7px] text-gray-300 mt-2 max-w-[95%]">
            Acquire a comprehensive understanding of Quantumography alongside
            the groundbreaking advancements of Neuro Drive. These technologies
            collectively redefine innovation across imaging and cognitive
            domains.
          </p>
          <img src="/Vector.svg" alt="round-icon" className="vectorDarkBlue" />
          <div className="globecontainer">
            <div className="globeWrapper">
              <div className="w-full flex justify-center">
                <div className="relative container">
                  <div id="rings-outer" className="rings-outer animate">
                    <Player
                      autoplay
                      loop
                      src="https://lottie.host/5172e47a-e0ad-4ba0-92fe-df1e6b09499d/cfy169jA4q.json"
                      id="darklines"
                      className="darklines"
                    />
                    <img src="/ring.svg" alt="" id="ring" />

                    <img src="/stroke1.svg" alt="" id="stroke1" />
                    <img src="/stroke2.svg" alt="" id="stroke2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="/movingImageFile.png" className="movingImageFile" />
          <img src="/movingImage.png" className="movingImage" />
        </section>

        {/* <div className="absolute h-[10vh] lg:hidden flex  justify-center w-[86vw] rounded-2xl overflow-hidden">
          <img src="craft.svg" alt="" />
          <div className="lg:hidden absolute mt-[300px] -ml-5 w-[20px] h-[20px]">
            <Animation
              className={"-mt-[340px] -ml-[100px]"}
              size={"w-[300px] h-[300px]"}
            />
          </div>
        </div> */}
        <div className=" h-[300px] max-w-[325px]">
          <div className="absolute ml-16 mt-[60px]">
            <Animation className={""} size={"w-[100px] h-[100px]"} />
          </div>{" "}
          <img
            src="AIBgimage.svg"
            alt=""
            className="w-full object-cover object-center rounded-[17px]"
          />
          {/* Floating Images */}
          <div className="relative w-[30px]">
            <img src="mblogo.svg" alt="" className="-mt-[175px] ml-6" />
          </div>
          {/* Text Content */}
          <div className="relative flex flex-col -mt-8 text-white  ">
            <h2 className="text-[11px] mt-1 pl-16 font-bold leading-tight max-w-[80%]">
              With AI Writer Craft Messages Like Famous Personalities
            </h2>
            <p className=" text-[7px] pl-7 mt-2 text-gray-300 max-w-[95%]">
              Unleash your creativity with NeuroMail&apos;s AI Writer.
              Effortlessly draft emails in the style of famous individuals,
              blending inspiration and personalization for impactful
              communication.
            </p>
            <img
              src="/AIimage.svg"
              alt=""
              className="absolute mt-16 left-0 max-w-[76%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
