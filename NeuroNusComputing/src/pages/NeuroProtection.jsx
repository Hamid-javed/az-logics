"use client";

import React from "react";
import Image from "next/image";

export default function NeuroProtection() {
  return (
    <main
    className="w-screen h-screen relative overflow-hidden flex flex-col items-center"
    style={{
      backgroundImage: 'url("/Neuronus components/3rd section.gif")',
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >

      {/* Background Neural Patterns */}
      {/* <div className="absolute top-0 left-0 w-[40%] h-[60%] pointer-events-none select-none z-0 opacity-40">
        <Image
          src="/homeLeft.png"
          alt="Neural Pattern Left"
          fill
          className="object-contain object-top-left"
        />
      </div>
      <div className="absolute top-0 right-0 w-[40%] h-[60%] pointer-events-none select-none z-0 opacity-40">
        <Image
          src="/homeRight.png"
          alt="Neural Pattern Right"
          fill
          className="object-contain object-top-right"
        />
      </div> */}

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-40 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 leading-tight">
          Understand how Neuronus <br /> protects you
        </h1>
        <p className="text-sm md:text-base text-white/60 mb-5 max-w-2xl font-light tracking-wide">
          Find clear, honest explanations about Neuronus tools, security, and
          anonymity
        </p>

        {/* FAQ Button with Glow */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-[#4F6EF7] rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
          <button className="relative px-12 py-4 bg-[#4B6BFF] text-white rounded-full text-[15px] font-semibold  border-t-2 border-white/90 shadow-[0_0_20px_rgba(79,110,247,0.4)] hover:bg-[#5a78ff] transition-all duration-300 transform hover:scale-105 active:scale-95">
            Chech FAQ
          </button>
        </div>
      </div>

   

  
    </main>
  );
}
