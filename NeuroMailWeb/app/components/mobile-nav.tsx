
"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);
  

  return (
    <>
      {/* Menu Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
      >
        <span className="sr-only">Open menu</span>
       <img src="hamburger.svg" alt="" />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transform bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full transform overflow-y-auto bg-white transition duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b px-9 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
             <img src="neuromail.svg" alt="" />
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-0 p-5 ">
          <div className="bg-[#13279C] rounded-[12px] ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-6 text-[13px] text-white hover:bg-[#1a309e] transition-colors border-b border-[#6F76D6] last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                <img src="arrow.svg" alt="" />
               
              </Link>
            ))}
          </div>
        </nav>

        {/* Feature Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 p-5 -mt-5 w-full ">
          {featureButtons.map((button) => (
            <button
              key={button.label}
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[#13279C] p-3 text-wrap text-center text-[15px] text-white transition-colors hover:bg-[#305EFF] relative overflow-hidden h-[15vh] w-full"
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Contact Support Card */}
        <div className="relative mx-5 mb-4 overflow-hidden rounded-[12px] text-white ">
          <div className="absolute inset-0">
            <img src="contact.svg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative flex flex-col items-center p-16 text-center justify-center">
            <h3 className="text-[15px] opacity-70 ">Contact us</h3>
            <p className="mt-1 text-[19px] font-medium whitespace-nowrap">Get Help & Customer Support</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-lg bg-[#305EFF] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2347cc]"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Benefit", href: "#benefit" },
  { label: "Solutions", href: "#solutions" },
]

const featureButtons = [
  { label: "Upload your Files", href: "#upload" },
  { label: "Compare our plans", href: "#plans" },
  { label: "Go to Quantumography", href: "#quantum" },
  { label: "Go to Neuromius", href: "#neuromius" },
]

