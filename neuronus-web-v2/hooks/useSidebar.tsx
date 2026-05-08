import { useContext } from "react";
import {
  SidebarContext,
  SidebarContextType,
} from "@/providers/SidebarProvider";

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSettingsContext must be used inside SettingsProvider");
  return context;
};
