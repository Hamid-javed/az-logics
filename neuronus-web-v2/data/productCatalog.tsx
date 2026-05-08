import GhostTransfer from "@/public/icons/GhostTransfer";
import NeuroBrowser from "@/public/icons/home/accessNetork/NeuroBrowser";
import Polygon from "@/public/icons/home/Polygon";
import NeuroDrive from "@/public/icons/NeuroDrive";
import NeuroRSA from "@/public/icons/NeuroRSA";
import NeuroMail from "@/public/icons/home/registration/NeuroMail";
import NeuroPassword from "@/public/icons/home/registration/NeuroPassword";
import Resonance from "@/public/icons/Resonance";
import { ProductCatalog } from "@/types/productCatalog";
import Quantumography from "@/public/icons/Quantumography";
import NeuroScreens from "@/public/icons/NeuroScreens";
import NFile from "@/public/icons/home/registration/NFile";
import XFile from "@/public/icons/home/registration/XFile";
import NeuroCoin from "@/public/icons/NeuroCoin";
import NP from "@/public/icons/home/registration/NP";
import NeuroCoinBlue from "@/public/icons/home/registration/NeuroCoinBlue";

export const accessNetworkProducts: ProductCatalog[] = [
  {
    title: "NeuroBrowser",
    description: "Private browser with built-in AI and native protection.",
    productIcon: <NeuroBrowser className="text-backlight w-full h-auto" />,
  },
  {
    title: "NeuroSPN",
    description: "Multi-layer tunneling network (advanced alternative to VPN).",
    productIcon: <Polygon className="w-full h-auto text-backlight" />,
  },
  {
    title: "NeuroNode",
    description: "Get paid for sharing your unused internet bandwidth.",
    productIcon: (
      <Polygon className="w-full h-auto text-backlight -scale-y-100 -scale-x-100" />
    ),
  },
];

export const CommunicationProducts: ProductCatalog[] = [
  {
    title: "Neuro Mail",
    link: "https://mail.neuronus.net/",
    description: "Encrypted, zero-knowledge email service.",
    productIcon: <NeuroMail className="text-backlight w-full h-auto" />,
  },
  {
    title: "Resonance",
    link: "https://resonance.neuronus.net/",
    description: "Anonymous messenger with an integrated crypto wallet.",
    productIcon: <Resonance className=" text-backlight w-full h-auto" />,
  },
  {
    title: "NeuroRSA",
    link: "https://neurorsa.neuronus.net/",
    description: "Text encryption tool using public/private keys.",
    productIcon: (
      <NeuroRSA className="w-full h-auto text-backlight -scale-y-100 -scale-x-100" />
    ),
  },
];
export const vaultProducts: ProductCatalog[] = [
  {
    title: "Neuro Drive",
    link: "https://drive.neuronus.net",
    description: "Encrypted cloud storage.",
    productIcon: <NeuroDrive className="text-backlight w-full h-auto" />,
  },
  {
    title: "Neuro Password",
    link: "https://passwordmanager.neuronus.net",
    description: "Manager for passwords and secure notes.",
    productIcon: <NeuroPassword className="w-full h-auto" />,
  },
  {
    title: "Ghost Transfer",
    link: "https://ghosttransfer.neuronus.net/",
    description: "Disposable, secure file transfer..",
    productIcon: <GhostTransfer className="w-full h-auto text-backlight" />,
  },
  {
    title: "Quantumography ",
    link: "https://qgraphy.xyz/en",
    description: "Concealing data inside image files.",
    productIcon: <Quantumography className="w-full h-auto text-backlight" />,
  },
];
export const WorkSpaceProducts: ProductCatalog[] = [
  {
    title: "Neuro Screens",
    description: "Remote Desktop (RDP) / Private Cloud Computer.",
    productIcon: <NeuroScreens className="text-backlight w-full h-auto" />,
  },
  {
    title: "NeuroDoc",
    description: "Text editor (private alternative to Docs).",
    productIcon: <NFile className=" text-backlight w-full h-auto" />,
  },
  {
    title: "NeuroSheet",
    description: "Spreadsheets (private alternative to Excel).",
    productIcon: <XFile className="w-full h-auto text-backlight" />,
  },
];
export const FinanceProducts: ProductCatalog[] = [
  {
    title: "NeuroCoin",
    description: "Currency powered by tool profits.",
    productIcon: <NeuroCoinBlue className="text-backlight w-full h-auto" />,
  },
  {
    title: "NeuroPay",
    description: "Payment gateway for secure transactions.",
    productIcon: <NP className=" w-full h-auto" />,
  },
];
