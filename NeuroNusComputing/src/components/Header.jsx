"use client";

import React, { useState } from "react";
import { Setting, GitHub } from "@/assets/Icons";
import Image from "next/image";
const Header = () => {
  const [active, setActive] = useState("Home");

  const navItems = [
    "Home",
    "About",
    "Products",
    "Value Flow",
    "Blog",
    "Contact",
    "Pricing",
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 pt-3 pb-6 bg-transparent z-50">
      {/* Left section for Logo */}
      <div className="flex-1 flex justify-start">
        <div className="shrink-0 cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={40}
            priority
            className="h-20  mt-5 w-auto object-contain"
          />
        </div>
      </div>

      {/* Center section for Navigation */}
      <nav className="hidden md:flex items-center gap-1 p-1 bg-[#7B8EFF] backdrop-blur-xl border border-white/10 rounded-full">
        {navItems.map((item) => (
          <div
            key={item}
            className={`px-5 py-2.5 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap
                            ${
                              active === item
                                ? "bg-[#181E4B]/60 text-white border border-white/10 shadow-lg"
                                : "text-white/70 hover:text-white"
                            }`}
            onClick={() => setActive(item)}
          >
            {item}
          </div>
        ))}
      </nav>

      {/* Right section for Actions */}
      <div className="flex-1 flex items-center justify-end gap-6">
        <span className="hidden md:block text-white/80 text-[15px] font-medium cursor-pointer hover:text-white transition-colors">
          Sign in
        </span>
        <button className="hidden md:block bg-[#4F6EF7] text-white px-6 py-2.5 rounded-full text-[15px] font-medium shadow-[0_4px_15px_rgba(79,110,247,0.3)] hover:shadow-[0_6px_20px_rgba(79,110,247,0.5)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 whitespace-nowrap">
          Create a free account
        </button>
        <div className="flex items-center gap-4">
          <button
            className="p-1 opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-200"
            aria-label="Settings"
          >
            <Setting />
          </button>
          <button
            className="p-1 opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-200"
            aria-label="GitHub"
          >
            <GitHub />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
