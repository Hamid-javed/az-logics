"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// ── Icons ──
const BellIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CameraIcon = () => (
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.23281 0.5C8.46536 0.499997 8.69358 0.562901 8.8933 0.682048C9.09301 0.801194 9.25677 0.972146 9.36724 1.17679L9.68049 1.7569C9.79096 1.96154 9.95472 2.13249 10.1544 2.25164C10.3541 2.37078 10.5824 2.43369 10.8149 2.43369H12.1021C12.444 2.43369 12.7719 2.5695 13.0137 2.81126C13.2554 3.05302 13.3912 3.38091 13.3912 3.72281V9.52386C13.3912 9.86576 13.2554 10.1937 13.0137 10.4354C12.7719 10.6772 12.444 10.813 12.1021 10.813H1.78912C1.44723 10.813 1.11933 10.6772 0.877575 10.4354C0.635818 10.1937 0.5 9.86576 0.5 9.52386V3.72281C0.5 3.38091 0.635818 3.05302 0.877575 2.81126C1.11933 2.5695 1.44723 2.43369 1.78912 2.43369H3.07631C3.30863 2.4337 3.53663 2.37093 3.7362 2.25203C3.93578 2.13312 4.09952 1.96249 4.2101 1.75818L4.52529 1.1755C4.63587 0.971194 4.79961 0.800566 4.99918 0.681659C5.19876 0.562753 5.42676 0.499987 5.65907 0.5H8.23281Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.9454 8.23456C8.01335 8.23456 8.87909 7.36882 8.87909 6.30087C8.87909 5.23293 8.01335 4.36719 6.9454 4.36719C5.87746 4.36719 5.01172 5.23293 5.01172 6.30087C5.01172 7.36882 5.87746 8.23456 6.9454 8.23456Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SignOutIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6797 14.62L14.2397 12.06L11.6797 9.5"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12.0596H14.17"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface AccountPopupProps {
  user?: {
    name?: string;
    avatar?: string;
    plan?: "free" | "premium" | "pro";
  };
}

export const AccountPopup = ({
  user = { name: "Your Private Space", plan: "premium" },
}: AccountPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const openModal = useAuthStore((state) => state.openModal);
  const globalLogout = useAuthStore((state) => state.globalLogout);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const planLabel =
    user.plan === "premium"
      ? { emoji: "👑", text: "Premium" }
      : user.plan === "pro"
        ? { emoji: "⚡", text: "Pro" }
        : { emoji: "🌱", text: "Free" };

  return (
    <div ref={ref} className="relative inline-block max-w-full font-sans">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 sm:px-4 py-1.5 font-NeueRegular sm:py-2.5 rounded-full text-white text-[12px] sm:text-[15px] font-semibold cursor-pointer transition-all duration-200 bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF] backdrop-blur-md border border-white/25 hover:bg-white/22"
      >
        My Account
        <ChevronDown open={isOpen} />
      </button>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+10px)] right-0 max-sm:right-[-8px] w-[calc(100vw-24px)] max-w-[260px] sm:max-w-[308px] rounded-[20px] overflow-hidden z-50 border border-[#4C67FF]/20"
          style={{
            background:
              "linear-gradient(213.74deg, #FFFFFF 54.2%, #C1C1C1 111.65%)",
            boxShadow:
              "0 4px 6px -1px rgba(47,101,255,0.08), 0 20px 50px -8px rgba(47,101,255,0.2), 0 0 0 1px rgba(79,103,255,0.06)",
            animation: "acctPopIn 0.2s cubic-bezier(0.34,1.4,0.64,1) forwards",
          }}
        >
          <style>{`
            @keyframes acctPopIn {
              from { opacity: 0; transform: scale(0.94) translateY(-8px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* ── Top bar: icons ── */}
          <div className="flex items-center justify-between px-4 pt-4 pb-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {}}
                className="w-9 h-9 rounded-full flex items-center justify-center text-black bg-white/80 border border-black/[0.07] hover:bg-white hover:text-[#2F65FF] transition-all duration-150"
              >
                <BellIcon />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  openModal("settings");
                }}
                className="w-9 h-9 cursor-pointer rounded-full flex items-center justify-center text-black bg-white/80 border border-black/[0.07] hover:bg-white hover:text-[#2F65FF] transition-all duration-150"
              >
                <SettingsIcon />
              </button>
            </div>
          </div>

          <div className="flex flex-col relative items-center pb-5 px-5">
            <div className="relative mb-2 sm:mb-4">
              <button className="px-3.5 py-1 absolute -top-3 sm:top-0 left-7 sm:left-12 font-NeueThin rounded-full text-black bg-[#B7EAFF] text-[12px] font-bold tracking-wide cursor-pointer border-none transition-opacity hover:opacity-90">
                Upgrade to Pro
              </button>
              <div className="w-[70px] h-[70px] sm:w-[86px] sm:h-[86px] rounded-full overflow-hidden border-[3px] border-[#4C67FF]/20 bg-gradient-to-br from-[#4C67FF]/10 to-[#2F65FF]/20 flex items-center justify-center">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="avatar"
                    width={86}
                    height={86}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-3xl font-bold text-[#4C67FF]">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <button
                onClick={() => {}}
                className="absolute bottom-0 right-0  w-[26px] h-[26px] rounded-full bg-[#1a1a2e] flex items-center justify-center text-white hover:bg-[#2F65FF] transition-colors duration-150 cursor-pointer"
              >
                <CameraIcon />
              </button>
            </div>

            <p className="text-[17px] font-bold font-NeueRegular text-[#1F2346] mb-1.5 tracking-tight">
              {user.name}
            </p>

            <div className="flex items-center font-NeueRegular gap-1.5 text-[13px]">
              <span className="text-slate-800 font-medium">Current Plan:</span>
              <span>{planLabel.emoji}</span>
              <span className="text-[#1F2346] font-bold">{planLabel.text}</span>
            </div>
          </div>

          {/* ── Sign out ── */}
          <div className="px-4 py-3">
            <button
              onClick={() => {
                setIsOpen(false);
                globalLogout?.();
              }}
              className="w-full flex items-center gap-3 px-5 py-1.5 sm:py-3 rounded-full bg-white border text-[15px] font-semibold text-[#0f0f10] hover:border-[#0284bc] border-[#01B4FF] transition-all duration-150 cursor-pointer group"
            >
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                <SignOutIcon />
              </span>
              Sign out
            </button>
          </div>

          {/* ── Footer ── */}
          <div className="text-center pb-4 text-[11.5px] text-slate-800">
            <a href="#" className="hover:text-[#2F65FF] transition-colors">
              Privacy Policy
            </a>
            <span className="mx-1.5 opacity-50">·</span>
            <a href="#" className="hover:text-[#2F65FF] transition-colors">
              Terms of Services
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPopup;
