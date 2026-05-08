"use client"

import { ReactNode, useEffect, useRef } from "react";
import Close from "@/public/icons/home/Close";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className  }: BaseModalProps) => {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    scrollYRef.current = scrollY;

    requestAnimationFrame(() => {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    });

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className={`relative w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F1F5FA] ${className || 'max-w-[90vw] xs:max-w-[85vw] sm:max-w-125 md:max-w-140 lg:max-w-162 p-4'}`}>
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 hover:text-gray-500 z-50 text-gray-500"
        >
          <Close />
        </button>

        {children}
      </div>
    </div>
  );
};
