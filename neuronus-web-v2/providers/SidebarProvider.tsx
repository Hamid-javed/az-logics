"use client";
import { createContext, useState, ReactNode, useLayoutEffect } from "react";

export interface SidebarContextType {
  isSidebarVisible: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const showSidebar = () => setIsSidebarVisible(true);
  const hideSidebar = () => setIsSidebarVisible(false);
  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  useLayoutEffect(() => {
    if (isSidebarVisible) {
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflow = "unset";
    }
  }, [isSidebarVisible]);

  return (
    <SidebarContext.Provider
      value={{ isSidebarVisible, showSidebar, hideSidebar, toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
