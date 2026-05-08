"use client";
import Link from "next/link";
import React, { useState } from "react";

const Banner = () => {
  const [isClose, setIsClose] = useState(false);

  if (isClose) return null; 

  return (
    <div className="bg-[#383838] w-full py-1 md:py-2 text-[12px] font-inter text-center text-white flex justify-center items-center">
      GET A FREE ACCOUNT
      <Link href="https://mailing.neuromail.cloud">
      <button className="w-[78px] h-[23px] bg-[#949495] rounded-[6px] mx-4">
        Get Started
      </button>
      </Link>
      <img
        src="cross.svg"
        alt="Close"
        onClick={() => setIsClose(true)}
        className="cursor-pointer hover:bg-gray-700 p-1 rounded-[9px] w-4 h-4"
      />
    </div>
  );
};

export default Banner;
