"use client";

import Image from "next/image";
import Button from "../Button";


const APP_URLS: Record<string, string> = {
  "Neuro Mail":    "https://mail.neuronus.net",
  "Resonance":     "",
  "NeuroRSA":      "https://neurorsa.neuronus.net",
  "NeuroDrive":    "https://drive.neuronus.net",
  "NeuroPassword": "https://passwordmanager.neuronus.net",
  "GhostTransfer": "https://ghosttransfer.neuronus.net",
};

const tools = [
  { name: "Neuro Mail",     icon: "/images/mail.svg" },
  { name: "Resonance",      icon: "/images/resonance.svg" },
  { name: "NeuroRSA",       icon: "/images/rsa.svg" },
  { name: "NeuroDrive",     icon: "/images/drive.svg" },
  { name: "NeuroPassword",  icon: "/images/password.svg" },
  { name: "GhostTransfer",  icon: "/images/transfer.svg" },
];

const openAppWithSSO = (appUrl: string) => {
  if (!appUrl) return;
  window.open(appUrl, "_blank");
};

export default function RegisteredToolsPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-[#F1F5FA] rounded-3xl shadow-2xl p-6 animate-fade-in">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-700 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.40625 0.40625L15.6113 15.6113M15.6113 0.40625L0.40625 15.6113" stroke="black" strokeWidth="0.813946" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div className="flex justify-center w-full">
          <h2 className="text-center text-[1.7rem] w-[80%] font-NeueBold text-gray-900 leading-snug mb-5">
            Your Registered Tools —
            All in One Place
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {tools.map((tool) => {
            const appUrl = APP_URLS[tool.name];

            return (
              <button
                key={tool.name}
                onClick={() => {
                  if (appUrl) {
                    openAppWithSSO(appUrl);
                  }
                }}
                className="flex flex-col items-center justify-center gap-2 bg-white hover:bg-indigo-50 border border-[#EBEBEB] hover:border-indigo-200 rounded-2xl w-[138px] h-[128px] transition-all duration-200 group cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={30}
                    height={30}
                    className="w-auto h-auto"
                  />
                </div>
                <span className="text-[0.92rem] font-NeueRegular font-semibold text-black text-center leading-tight">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center w-full">
          <Button
            text="Great, Continue"
            onClick={onClose}
            className="w-[70%] py-4 font-NeueRegular text-[15.46px] shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-[0.98]"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out both;
        }
      `}</style>
    </div>
  );
}