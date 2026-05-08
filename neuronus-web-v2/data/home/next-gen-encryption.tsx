import Incognito from "@/public/icons/home/Incognito";
import Shield from "@/public/icons/home/Shield";
import Lock from "@/public/icons/home/Lock";
import GhostTransfer from "@/public/icons/GhostTransfer";
import NeuroCoinWhite from "@/public/icons/home/NeuroCoinWhite";
import Polygon from "@/public/icons/home/Polygon";
import NeuroDrive from "@/public/icons/NeuroDrive";
import NeuroMail from "@/public/icons/NeuroMail";
import NeuroRSA from "@/public/icons/NeuroRSA";
import NeuroScreens from "@/public/icons/NeuroScreens";
import Resonance from "@/public/icons/Resonance";

export const encryptionData = [
  {
    label: "Encryption",
    class:
      "left-[36%] sm:left-[42%] lg:left-[35%] top-[36%] lg:top-2/3 rotate-11 lg:-rotate-11",
  },
  {
    label: "Anonymity",
    class:
      "left-2/3 sm:left-3/5 md:left-[55%] lg:left-[32%] top-[30%] lg:top-1/2 -rotate-11",
  },
  {
    label: "Storage",
    class:
      "left-[35%] md:left-2/5 top-[27%] lg:left-[25%] lg:top-2/5 -rotate-11",
  },
  {
    label: "Communication",
    class: "left-2/3 sm:left-3/5 top-[22%] lg:left-[15%] lg:top-2/3 -rotate-11",
  },
  {
    label: "Investment",
    class:
      "left-[32%] sm:left-[37%] top-[18%] lg:left-[17%] lg:top-1/2 -rotate-11 lg:rotate-11",
  },
  {
    label: "Secret Notes",
    class:
      "left-[65%] top-[12%] lg:left-[7%] lg:top-4/5 -rotate-11 lg:rotate-11",
  },
  {
    label: "Isolation",
    class:
      "left-1/4 sm:left-1/3 top-[10%] lg:left-[7%] lg:top-3/5 rotate-11 lg:-rotate-11",
  },
  {
    label: "Fragmented",
    class:
      "left-1/2 md:left-[45%] top-[5%] lg:left-[10%] lg:top-1/3 -rotate-11 lg:rotate-11",
  },
];

export const encryptedProducts = [
  {
    icon: <Resonance className="w-full h-auto" />,
    class:
      "right-[66%] sm:right-[62%] top-2/3 lg:top-1/3 lg:right-1/3 rotate-22",
  },
  {
    icon: <Polygon className="w-full h-auto text-white" />,
    class:
      "right-[35%] sm:right-[40%] top-[70%] lg:top-1/2 lg:right-[35%] -rotate-11",
  },
  {
    icon: <NeuroCoinWhite className="w-full h-auto" />,
    class:
      "right-[63%] sm:right-[60%] top-[78%] lg:top-2/5 lg:right-[22%] rotate-5",
  },
  {
    icon: <NeuroDrive className="w-full h-auto" />,
    class:
      "right-[38%] sm:right-[45%] top-[80%] lg:top-3/5 lg:right-1/4 rotate-5",
  },
  {
    icon: <NeuroRSA className="w-full h-auto" />,
    class:
      "right-[75%] sm:right-[70%] top-[90%] lg:top-[27%] lg:right-[15%] rotate-2",
  },
  {
    icon: <NeuroMail className="w-full h-auto" />,
    class:
      "right-[28%] sm:right-[33%] top-[90%] lg:top-[55%] lg:right-[17%] rotate-2",
  },
  {
    icon: <GhostTransfer className="w-full h-auto" />,
    class: "right-[55%] top-[85%] lg:top-[70%] lg:right-1/5 rotate-2",
  },
  {
    icon: <NeuroScreens className="w-full h-auto" />,
    class: "right-1/2 top-[93%] lg:top-[60%] lg:right-[8%] rotate-5",
  },
];

export const encryptionIcons = [
  {
    icon: <Lock className="w-full h-auto" />,
    class: "left-[72%] sm:left-[67%] top-[5%] lg:top-[45%] lg:left-[5%]",
  },
  {
    icon: <Shield className="w-full h-auto" />,
    class: "left-[55%] sm:left-[50%] top-[17%] lg:left-1/4 lg:top-2/3",
  },
  {
    icon: <Incognito className="w-full h-auto" />,
    class: "left-[64%] sm:left-[60%] top-[38%] lg:top-[35%] lg:left-1/3",
  },
];
