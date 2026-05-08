import GhostTransfer from "@/public/icons/GhostTransfer";
import NeuroCoin from "@/public/icons/NeuroCoin";
import NeuroDrive from "@/public/icons/NeuroDrive";
import NeuroMail from "@/public/icons/NeuroMail";
import NeuroRSA from "@/public/icons/NeuroRSA";
import NeuroScreens from "@/public/icons/NeuroScreens";
import NeuroSPN from "@/public/icons/NeuroSPN";
import Resonance from "@/public/icons/Resonance";
import Wire1 from "@/public/images/Wire1";
import Wire2 from "@/public/images/Wire2";
import Wire3 from "@/public/images/Wire3";
import Wire4 from "@/public/images/Wire4";
import Wire5 from "@/public/images/Wire5";
import Wire6 from "@/public/images/Wire6";
import Wire7 from "@/public/images/Wire7";
import Wire8 from "@/public/images/Wire8";
import WireMob1 from "@/public/images/WireMob1";
import WireMob2 from "@/public/images/WireMob2";
import WireMob3 from "@/public/images/WireMob3";
import WireMob4 from "@/public/images/WireMob4";
import WireMob5 from "@/public/images/WireMob5";
import WireMob6 from "@/public/images/WireMob6";
import WireMob7 from "@/public/images/WireMob7";
import WireMob8 from "@/public/images/WireMob8";

export type ProductValuation = {
  icon: React.ReactNode;
  name: string;
  dailyRevenue: string;
  shareOfPool: string;
  wire: {
    image: React.ReactNode;
    imgMob: React.ReactNode;
    position?: "bottom" | "left" | "right";
    placement?: "left" | "right";
    placementMob: string;
    translateX?: string;
  };
  pathId: string;
};

export const productValuationData: ProductValuation[] = [
  {
    icon: <NeuroMail className="w-4.75 sm:w-5.75 h-auto text-white" />,
    name: "Neuro Mail",
    dailyRevenue: "$1,000",
    shareOfPool: "10%",
    wire: {
      image: <Wire1 />,
      placement: "left",
      imgMob: <WireMob1 />,
      placementMob: "left-1/2 -translate-x-[45%]",
    },
    pathId: "#wire1",
  },
  {
    icon: <Resonance className="w-4.5 sm:w-5.5 h-auto text-white" />,
    name: "Resonance",
    dailyRevenue: "$1,000",
    shareOfPool: "10%",
    wire: {
      image: <Wire2 />,
      placement: "left",
      imgMob: <WireMob2 />,
      placementMob: "right-1/2 translate-x-[45%]",
    },
    pathId: "#wire2",
  },
  {
    icon: <NeuroCoin className="size-5.5 sm:size-7 text-white" />,
    name: "Neuro Coin",
    dailyRevenue: "$2,000",
    shareOfPool: "20%",
    wire: {
      image: <Wire3 />,
      placement: "right",
      imgMob: <WireMob3 />,
      placementMob: "left-1/2 -translate-x-[42%]",
    },
    pathId: "#wire3",
  },
  {
    icon: <GhostTransfer className="w-4 sm:w-4.75 h-auto text-white" />,
    name: "Ghost Transfer",
    dailyRevenue: "$1,000",
    shareOfPool: "10%",
    wire: {
      image: <Wire4 />,
      placement: "right",
      imgMob: <WireMob4 />,
      placementMob: "right-1/2 translate-x-[42%]",
    },
    pathId: "#wire4",
  },
  {
    icon: <NeuroScreens className="w-3.75 sm:w-4.75 h-auto text-white" />,
    name: "Neuro Screens",
    dailyRevenue: "$1,000",
    shareOfPool: "10%",
    wire: {
      image: <Wire5 />,
      position: "left",
      imgMob: <WireMob5 />,
      placementMob: "left-1/2 -translate-x-px",
    },
    pathId: "#wire5",
  },
  {
    icon: <NeuroRSA className="w-3.75 sm:w-4.5 h-auto text-white" />,
    name: "Neuro RSA",
    dailyRevenue: "$1,000",
    shareOfPool: "10%",
    wire: {
      image: <Wire6 />,
      placement: "left",
      translateX: "translate-x-[-12%]",
      imgMob: <WireMob6 />,
      placementMob: "right-1/2 translate-x-px",
    },
    pathId: "#wire6",
  },
  {
    icon: <NeuroSPN className="text-white" />,
    name: "Neuro SPN",
    dailyRevenue: "$2,000",
    shareOfPool: "20%",
    wire: {
      image: <Wire7 />,
      placement: "right",
      translateX: "translate-x-[12%]",
      imgMob: <WireMob7 />,
      placementMob: "left-1/2 -translate-x-px",
    },
    pathId: "#wire7",
  },
  {
    icon: <NeuroDrive className="w-4 sm:w-5 h-auto text-white" />,
    name: "Neuro Drive",
    dailyRevenue: "$1,000",
    shareOfPool: "10%",
    wire: {
      image: <Wire8 />,
      position: "right",
      imgMob: <WireMob8 />,
      placementMob: "right-1/2 translate-x-px",
    },
    pathId: "#wire8",
  },
];
