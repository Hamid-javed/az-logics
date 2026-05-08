import React from "react";
import Image from "next/image";
import MobileNav from "./mobileNav";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="w-full flex justify-between py-4 md:py-3 px-5 text-white items-center bg-[#ffffff0c]">
      <div className="flex gap-3 justify-center items-center">
        <Image
          src="/logo.svg"
          alt=""
          width={30}
          height={26}
          className="w-[30px] h-[26px] md:w-[62px] md:h-[55.34px]"
        />
        <p className="font-chakra text-[16px] md:text-[22px]leading-[28px]">
          NeuroDrive
        </p>
      </div>
      <div className="md:flex font-inter text-[16px] gap-3 leading-[19.36px] hidden">
        <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="#features">
          <button>Features</button>
        </Link>
        <Link href="#benefits">
          <button>Benefits</button>
        </Link>
        <button>Solutions</button>
      </div>
      <div className="md:flex items-center font-inter text-[16px] gap-4 hidden">
        <Link href="https://storage.neurodrive.me/login">
          <button>Log in</button>
        </Link>
        <Link href="https://storage.neurodrive.me">
          <button className="text-[13px] bg-btn border-btn px-2 py-2 rounded-[12px] font-inter">
            Get Neuro Drive
          </button>
        </Link>
      </div>
      <MobileNav />
    </div>
  );
};

export default NavBar;
