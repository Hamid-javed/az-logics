"use client";
import dynamic from "next/dynamic";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
  }
);
import { Cleaner, Quantom } from "../../public/assets/Icons";

export default function Cards() {
  return (
    <>
      <div className="flex md:flex-row flex-col w-full gap-3 mt-6 mb-16">
        <section
          style={{
            backgroundImage: "url('/globeBgImage.png')", // If the image is in public folder
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          className="bg-cardsbg globeBgImage relative text-white overflow-hidden md:w-1/2 h-[322px] md:h-[450px] rounded-[17px] md:rounded-[33px] px-5 md:px-9 pt-4 md:py-5"
        >
          <div className="flex gap-3 md:gap-5 items-center">
            <img src="/quant.png" alt="" className="w-[40px] md:w-[80px]" />
            <p className="text-[18px] md:text-[20px] lg:text-[22px]">
              Get Quantumography
            </p>
          </div>
          <p className="font-inter text-[10px] md:text-[14px] mt-5">
            Acquire a comprehensive understanding of Quantumography alongside
            the groundbreaking advancements of Neuro Drive. These technologies
            collectively redefine innovation across imaging and cognitive
            domains.
          </p>
          <img
            src="/Vector.svg"
            alt="round-icon"
            className="vectorDarkBlue md:pt-10"
          />
          <div className="globecontainer md:pt-10">
            <div className="globeWrapper">
              <div className="w-full flex justify-center">
                <div className="relative container">
                  <div id="rings-outer" className="rings-outer animate">
                    <Player
                      autoplay
                      loop
                      src="https://lottie.host/5172e47a-e0ad-4ba0-92fe-df1e6b09499d/cfy169jA4q.json"
                      id="darklines"
                    />

                    <img
                      src="/ring.png"
                      className="md:p-10 md:-mt-12 w-[280px]"
                      alt=""
                      id="ring"
                    />

                    <img src="/stroke1.png" alt="" id="stroke1" />
                    <img src="/stroke2.png" alt="" id="stroke2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="/movingImageFile.png" className="movingImageFile" />
          <img src="/movingImage.png" className="movingImage" />
        </section>
        <section className="bg-cardsbg text-white md:w-1/2 overflow-hidden md:h-[450px] rounded-[17px] md:rounded-[33px] px-5 md:px-9 pt-4 md:py-5">
          <div className="flex gap-3 md:gap-5 items-center">
            <img src="/clean.png" alt="" className="w-[40px] md:w-[80px]" />
            <p className="text-[18px] md:text-[20px] lg:text-[22px]">
              Get Metadata Cleaner{" "}
            </p>
          </div>
          <p className="font-inter text-[10px] md:text-[14px] mt-5">
            Acquire a comprehensive understanding of Quantumography alongside
            the groundbreaking advancements of Neuro Drive. These technologies
            collectively redefine innovation across imaging and cognitive
            domains.
          </p>
          <img src="/cleaner.png" alt="" className="w-[530px]" />
        </section>
      </div>
    </>
  );
}
