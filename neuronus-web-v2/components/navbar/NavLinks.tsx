"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navLinks";
import { useSidebar } from "@/hooks/useSidebar";

interface NavLinksProps {
  sidebar?: boolean;
}

const NavLinks = ({ sidebar = false }: NavLinksProps) => {
  const pathname = usePathname();
  const { hideSidebar } = useSidebar();

  const activeClasses = "border-[0.9px] border-[#7B8EFF] bg-primary";

  return (
    <div
      className={
        sidebar
          ? "flex flex-col lg:hidden w-fit gap-2"
          : "hidden lg:flex items-center rounded-full p-1 2xl:p-1.5 border-[0.9px] border-white bg-white/18 backdrop-blur-[1.8px]"
      }
    >
      {navLinks.map((link) => (
        <Link
          href={link.url}
          key={link.id}
          className={`py-1.5 2xl:py-2 px-4.5 2xl:px-5.5 rounded-full w-fit ${
            pathname === link.url ? activeClasses : ""
          }`}
          onClick={hideSidebar}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
