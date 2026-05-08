// "use client";
import Link from "next/link";
import Encrypt from "./components/Encrypt";
import Footer from "./components/footer";
import { MainSection } from "./components/middle";
import NavBar from "./components/navbar";
import TopBar from "./components/topBar";

export default function Home({ searchParams }: any) {
  return (
    <div className="w-full">
      <div className="bg-background w-full h-full">
        <div className="flex justify-center items-center flex-col bg-image bg-cover h-full w-full bg-center">
          <TopBar />
          <NavBar />
          <div className="bg-white rounded-tl-[16px] rounded-tr-[16px] md:rounded-tl-[44px] md:rounded-tr-[44px] w-[90vw] h-[calc(90vw*2.15)] md:h-[calc(90vw*0.616)] overflow-hidden">
            <div className="bg-image1 bg-cover bg-center h-full w-full">
              <div className="flex justify-center items-center bg-image3 md:bg-image2 bg-center bg-cover w-full h-full">
                <div className="flex flex-col justify-center items-center">
                  <img src="/icons.svg" alt="" className="hidden md:block" />
                  <img
                    src="/icons-mobile.svg"
                    alt=""
                    className="md:hidden block"
                  />
                  <Encrypt />
                  <div className="flex gap-3 mt-4 md:mt-7">
                    <Link href="https://storage.neurodrive.me/" className="text-[13px] font-inter flex justify-center items-center text-center w-[263px] h-[35px] md:h-[42px] bg-btn border border-btn rounded-[12px] text-white">
                      Try Full NeuroDrive
                    </Link>
                  </div>
                  <span className="text-[12px] md:text-[16px] text-[#031B1D] w-[80vw] lg:w-[55vw] leading-[24px] font-inter text-center mt-3 md:mt-6 mb-16">
                    Want more control? Explore encrypted folders, team sharing
                    and zero-knowledge architecture.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainSection searchParams={searchParams} />
      <Footer />
      <div className="bg-gradient1 w-full py-1 md:py-2 text-[14px] font-inter text-center text-white">
        &copy; Copyright 2024 All rights reserved | Neuronus Computing
      </div>
    </div>
  );
}
