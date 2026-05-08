"use client";
import { useSidebar } from "@/hooks/useSidebar";
import Hamburger from "@/public/icons/Hamburger";

const Menu = () => {
  const { showSidebar } = useSidebar();
  return (
    <button className="xl:hidden" onClick={showSidebar}>
      <Hamburger className="w-6 sm:w-7.5 h-auto" />
    </button>
  );
};

export default Menu;
