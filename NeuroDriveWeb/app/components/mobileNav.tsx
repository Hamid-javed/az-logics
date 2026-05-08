"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { NavBtn } from "@/public/assets/Icons"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {/* Menu Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gradient1 lg:hidden"
      >
        <span className="sr-only">Open menu</span>
        <NavBtn/>
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
        className={`fixed inset-y-0 right-0 z-50 w-full transform overflow-y-auto bg-[#1D203E] transition duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-[#3D4280] px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <img src="logo.svg" alt="" className="w-7 h-5"/>
              <span className="text-[14px] font-[100] lg:text-xl">NeuroDrive</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-gray-600 hover:bg-gradient1">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-0 ">
          <div className=" rounded-[12px] ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-4 px-6 text-[16px] font-[100] text-white hover:bg-gradient1 transition-colors w-full border-b border-[#3D4280] last:border-b-1"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                <img src="arrow.svg" alt=""  />
               
              </Link>
            ))}
          </div>
        </nav>

        {/* Feature Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 h-[30vh]">
          {featureButtons.map((button) => (
            <button
              key={button.label}
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[#222648] flex items-center justify-center text-center px-4 py-6 text-sm font-[100] text-white transition-colors hover:bg-gradient1 relative overflow-hidden"
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Contact Support Card */}
        <div className="relative mx-4 mb-4 overflow-hidden rounded-lg text-white">
          <div className="absolute inset-0">
            <img src="contact.svg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative flex flex-col items-center p-11 text-center">
            <h3 className="text-[12px] opacity-70">Contact us</h3>
            <p className="mt-1 text-[19px] font-[100]">Get Help & Customer Support</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-lg bg-btn w-[114px] h-[30px] px-6 py-2 text-[8px] font-[100] text-white transition-colors hover:bg-gradient1"
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

