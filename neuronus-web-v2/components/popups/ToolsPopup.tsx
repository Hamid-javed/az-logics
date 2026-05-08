"use client";

import Toolbox from "@/public/icons/Toolbox";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Button from "../Button";

const openAppWithSSO = (appUrl: string) => {
  if (!appUrl) return;
  window.open(appUrl, "_blank");
};

const APP_URLS: Record<string, string> = {
  "Neuro Mail":    "https://mail.neuronus.net",
  "Resonance":     "",
  "NeuroRSA":      "https://neurorsa.neuronus.net",
  "NeuroDrive":    "https://drive.neuronus.net",
  "NeuroPassword": "https://passwordmanager.neuronus.net",
  "GhostTransfer": "https://ghosttransfer.neuronus.net",
};

const tools = [
  { name: "Neuro Mail",    icon: "/images/mail.svg" },
  { name: "Resonance",     icon: "/images/resonance.svg" },
  { name: "NeuroRSA",      icon: "/images/rsa1.svg" },
  { name: "NeuroDrive",    icon: "/images/ndrive.svg" },
  { name: "NeuroPassword", icon: "/images/pass.svg" },
  { name: "GhostTransfer", icon: "/images/trans.svg" },
];

interface ToolsPopupProps {
  trigger?: React.ReactNode;
}

export const ToolsPopup = ({ trigger }: ToolsPopupProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer
          ${open
            ? "bg-white/20 text-white"
            : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        title="Our Tools"
      >
        {trigger ?? <Toolbox className="w-5.5 sm:w-6.5 h-auto" />}
      </button>

      {/* ── Popup ── */}
      {open && (
        <div
          className="absolute top-[calc(100%+10px)] right-0 w-[300px] sm:w-102.5 rounded-[22px] overflow-hidden z-50"
          style={{
            background: "linear-gradient(170deg, #f0f4ff 0%, #f8f9ff 40%, #ffffff 100%)",
            boxShadow: "0 8px 32px rgba(47,101,255,0.15), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1.5px rgba(79,103,255,0.15)",
            animation: "toolsPopIn 0.22s cubic-bezier(0.34,1.4,0.64,1) forwards",
          }}
        >
          <style>{`
            @keyframes toolsPopIn {
              from { opacity: 0; transform: scale(0.93) translateY(-10px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
            .tool-card:hover .tool-icon-wrap {
              transform: scale(1.1);
            }
          `}</style>

          {/* Header */}
          <div className="px-5 pt-5 pb-3">
            <h3 className="text-[18px] font-bold text-[#1F2346] tracking-tight">Our Tools</h3>
          </div>

          {/* Grid */}
          <div className="px-4 pb-3 grid grid-cols-4 gap-2.5">
            {tools.map((tool) => {
              const url = APP_URLS[tool.name];
              const disabled = !url;
              return (
                <button
                  key={tool.name}
                  onClick={() => !disabled && openAppWithSSO(url)}
                  disabled={disabled}
                  className={`tool-card flex flex-col items-center justify-center sm:gap-1.5 py-1.5 sm:py-3 px-2 rounded-2xl border transition-all duration-200 group
                    ${disabled
                      ? "opacity-40 cursor-not-allowed bg-white/50 border-gray-100"
                      : "bg-white border-gray-100/80 hover:border-[#4C67FF]/30 hover:bg-[#f0f4ff] hover:shadow-md cursor-pointer"
                    }`}
                >
                  <div
                    className="tool-icon-wrap w-9 h-9 flex items-center justify-center transition-transform duration-200"
                  >
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="w-6 h-4 sm:w-8 sm:h-8 object-contain"
                    />
                  </div>
                  <span className="text-[7px] sm:text-[10.5px] font-semibold text-[#1F2346]/80 text-center leading-tight px-0.5 group-hover:text-[#2F65FF] transition-colors">
                    {tool.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Continue button */}
          <div className="px-4 pb-5 pt-1 w-full flex justify-center">
          <Button
            text="Great, Continue"
            onClick={() => setOpen(false)}
            className="w-[90%] h-8 sm:h-11.25 flex justify-center items-center font-NeueRegular text-[12px] sm:text-[15.46px] shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-[0.98]"
          />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsPopup;