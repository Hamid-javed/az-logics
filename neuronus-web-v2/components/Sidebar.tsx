"use client";
import Previous from "@/public/icons/Previous";
import Logo from "./Logo";
import Github from "@/public/icons/Github";
import NavLinks from "./navbar/NavLinks";
import Button from "./Button";
import { useSidebar } from "@/hooks/useSidebar";
import { useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const { isSidebarVisible, hideSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openModal = useAuthStore((state) => state.openModal);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      hideSidebar();
    }
  };

  return (
    <div
      onClick={handleClose}
      className={`${
        !isSidebarVisible
          ? "translate-x-full bg-transparent"
          : "bg-black/21 translate-x-0"
      } transition-all box-border fixed w-full h-dvh left-0 top-0 text-white overflow-clip z-50`}
    >
      <div
        ref={sidebarRef}
        className="ms-auto h-full w-[85%] xs:w-85 bg-primary px-7.25 py-15 flex flex-col gap-8 justify-between overflow-y-auto relative"
      >
        <div className="absolute top-0 right-0 rounded-bl-full bg-backlight w-50 h-50 pointer-events-none blur-[79px]" />
        <div className="relative">
          <button onClick={hideSidebar}>
            <Previous className="text-white" />
          </button>
          <div className="flex items-center justify-between py-8">
            <Logo light />
            <Github className="text-white" />
          </div>
          <NavLinks sidebar />
        </div>
        {!isAuthenticated && (
          <div className="flex flex-col gap-5 items-start">
            <button
              className="cursor-pointer"
              onClick={() => openModal("loginSeeds")}
            >
              Sign in
            </button>
            <Button
              onClick={() => openModal("selectRegistration")}
              className={`text-sm! 2xl:text-[15px]!`}
              text="Create a free account"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
