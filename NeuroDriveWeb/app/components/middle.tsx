import Link from "next/link";
import { Fire } from "../../public/assets/Icons";
import Cards from "./cards";
import MiddleSliderBox from "./MiddleSliderBox";

export const MainSection = ({ searchParams }: any) => {
  return (
    <div  className="bg-white w-full flex flex-col items-center justify-center pt-16">
      <div id="features" className="flex flex-col justify-center items-center mb-11 pt-5 md:pt-16 md:pb-3 rounded-[12px] md:rounded-[33px]  md:h-[785px] border border-[#E7E7E7] w-[90vw] bg-[#F9F9F9] relative">
        <div className="bg-[#F9FAFB] w-[81px] text-[8px] md:text-[12px] md:w-[125px] h-[23px] md:h-[36px] border-[1.41px] border-[#EAECF0] flex justify-center items-center gap-1 md:gap-2 rounded-[140.6px] font-inter z-10">
          <Fire /> Features
        </div>
        <p className="text-[22px] md:text-[44px] text-[#1D203E] leading-[30px] md:leading-[54px] lg:w-[40%] text-center z-10">
          Power features, Securing Your Workflow
        </p>
        <MiddleSliderBox searchParams={searchParams} />
      </div>
      {/* <img
        src="/sideimage-mobile.svg"
        alt=""
        className="block md:hidden mb-8"
      /> */}
      <div id="benefits" className="flex flex-col px-4 sm:px-6 gap-2 pt-6 md:pt-0 justify-center items-center z-10">
        <p className="text-[22px] md:text-[44px] leading-[30.62px] md:leading-[54px] text-[#1D203E] w-[70%] lg:w-1/3 text-center">
          Secure Cloud Storage, Built for You
        </p>
        <p className="text-[12px] md:text-[16px] leading-[] font-inter text-[#031B1D] lg:w-[30%] text-center">
          Neuro Drive ensures your files are fully encrypted at all
          times—whether stored or in transit.{" "}
        </p>
        <div className="flex md:flex-row flex-col w-full h-full mb-28">
          <div className="flex flex-col w-full md:w-1/3 px-4 items-center justify-center gap-2 pt-6 md:pt-28">
            <img
              src="/icons1.png"
              alt="Logo"
              className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] h-auto max-w-full"
            />
            <p className="text-[20px] md:text-[22px]">Unmatched Privacy</p>
            <p className="text-[12px] md:text-[14px] font-inter text-center">
              Protected by global data laws and advanced encryption, your files
              remain yours—always.
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/3 h-1/3 px-4 items-center pt-5 md:pt-0 justify-center gap-2">
            <img
              src="/icons2.png"
              alt="Logo"
              className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] h-auto max-w-full"
            />
            <p className="text-[20px] md:text-[22px]">Transparent Security</p>
            <p className="text-[12px] md:text-[14px] font-inter text-center">
              Regular audits ensure Neuro Drive is secure, reliable, and built
              to perform as promised.
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/3 relative  px-4 items-center justify-center gap-2 pt-[58px] ">
            <div className="svgContainer bottom-0">
              <img src="/greenArrow.svg" className="arrowSvg green" />
              <img src="/collabAnimation.svg" className="animatedSvg" />
              <img src="/purpleArrow.svg" className="arrowSvg purple" />
            </div>

            <p className="text-[20px] md:text-[22px]">
              Freedom in collaboration
            </p>
            <p className="text-[12px] md:text-[14px] font-inter text-center">
              Empowering you to take full control of your data in a world where
              privacy matters most.
            </p>
          </div>
        </div>
        <p className="md:text-[33px] text-[20.83px] text-center leading-[29px] md:leading-[54px] bg-gradient1  bg-clip-text text-transparent">
          Neuro Doc, Sheets & PDFs
          <br />
          <span className="text-[#1D203E] text-[27px] md:text-[44px] leading-[38px] md:leading-[54px]">
            {" "}
            A Unified Smart Workspace
          </span>
        </p>
        <p className="text-[14px] md:text-[16px] text-[#031B1D] text-center lg:w-1/2 font-inter">
          Take control of your workflow with Neuro Drive’s powerful document
          ecosystem. Whether it’s Neuro Doc for rich text editing, Neuro Sheet
          for seamless data collaboration, or PDFs for secure sharing, we’ve got
          you covered. Elevate your productivity with our cloud-based,
          encrypted, and AI-powered solutions.
        </p>
        <Link
          href="https://storage.neurodrive.me/"
          className="text-[13px] mt-4 bg-btn border border-btn flex justify-center items-center w-[135px] md:w-[192px] h-[42px] font-inter rounded-[12px] text-white "
        >
          Get Neuro Drive
        </Link>
        <img
          src="/bg2.png"
          alt=""
          className="w-full h-full -mt-24 hidden md:block"
        />
        <img
          src="/mobile-bg2.svg"
          alt=""
          className="w-full h-full block md:hidden"
        />
        <Cards />
      </div>
    </div>
  );
};
