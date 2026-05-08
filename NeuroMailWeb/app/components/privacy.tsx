import { SideLine } from "@/public/assets/Icons";
import Link from "next/link";

export default function Privacy() {
  return (
    <section id="features" className="bg-white py-4 sm:px-4 lg:px-4 lg:py-16 mx-3 mt-5">
      <div className="mx-auto bg-[#F6F6F6] rounded-[33px] lg:w-[90vw] p-7">
        {/* Top Section */}
        <div className="text-center flex flex-col items-center">
          <img src="features.svg" alt="Features" className="pt-6 pb-4 w-12 sm:w-16 lg:w-[110px]" />
          <img src="protect.svg" alt="" />
          {/* <h2 className="text-[22px] w-[73vw] px-1 sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Protecting Your <span className="text-[#305EFF]">Privacy</span>, <br />
            Empowering Your Conversations
          </h2> */}
        </div>

        {/* Floating Circle */}
        {/* <div className="hidden lg:block absolute right-[430px] -mt-[80px]">
          <img src="circle.svg" alt="Circle" />
        </div> */}

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-10">
          {/* Left Section - Features */}
          <div className="bg-white w-[70vw] max-w-md h-fit lg:w-[449px] py-2 lg:py-5 rounded-[12px] lg:rounded-[20px] shadow-md lg:h-[365px]">
            <div>
              <h2 className="text-[13px] lg:text-lg font-bold text-gray-900 mt-2 px-4">Classic Mail</h2>
              <p className=" text-gray-700 text-[10px] lg:text-sm px-4 ">
                Experience end-to-end encryption with compliance to strict privacy laws. Your communication stays secure and confidential.
              </p>
            </div>
            {/* <div className="w-[90%] bg-[#6860FE1A] flex flex-col justify-center h-[113px] px-4 relative rounded-[12px]">
            <span className="absolute left-[-2px] ">
                <SideLine />
              </span>
              <p className="text-[16px] lg:text-[22px] leading-[30px] lg:leading-[54px] lg:text-black bg-gradient  bg-clip-text text-transparent">
                Secure your data with a password
              </p>
              <p className="text-[12px] lg:text-[14px] leading-[20px] font-inter">
                We never share or sell your data to third parties, and we don&apos;t
                use it for targeted ads—your data stays yours.
              </p>
            </div> */}
            <div className="bg-sky-50 rounded-lg mx-2 p-3 mt-2 relative">
            <span className="absolute left-[-2px] -mt-3">
                <SideLine />
              </span>
              <h2 className="text-[13px] lg:text-lg font-bold text-[#305EFF]">Bulk Mail</h2>
              <p className=" text-gray-700 text-[10px] lg:text-sm ">
                Effortlessly send large-scale emails with speed and reliability. Designed for campaigns and newsletters.
              </p>
            </div>
            <div className="mt-2">
              <h2 className="text-[13px] lg:text-lg font-bold text-gray-900 px-4">Ghost Mail</h2>
              <p className=" text-gray-700 text-[10px] lg:text-sm px-4">
                Collaborate in real-time with secure sharing and productivity-focused tools. Privacy is always guaranteed.
              </p>
            </div>
            <Link href="https://mailing.neuromail.cloud">
            <button className="bg-[#305EFF] mx-4 text-white w-fit px-3 py-1 lg:p-2 sm:w-40 h-fit lg:rounded-lg text-[10px] lg:text-sm mt-3 rounded-md">
              Get Started
            </button>
           </Link>
          </div>

          {/* Right Section - Image */}
          <div className="w-full max-w-sm lg:max-w-md">
            <img src="privacy.svg" alt="Privacy Illustration" className="w-full " />
          </div>
        </div>
      </div>
    </section>
  );
  
}
