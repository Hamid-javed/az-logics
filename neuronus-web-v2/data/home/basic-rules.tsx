import AnonymityIcon from "@/components/home/basic-rules/AnonymityIcon";
import CensorshipIcon from "@/components/home/basic-rules/CensorshipIcon";
import Encryption from "@/public/icons/home/Encryption";
import NeuroCoinBlue from "@/public/icons/home/registration/NeuroCoinBlue";
import Btc from "@/public/icons/pricing/Btc";
import Sms from "@/public/icons/pricing/Sms";

export const rules = [
  {
    icon: <AnonymityIcon />,
    title: "Anonymity",
    description:
      "No email. No phone. No <br class='lg:hidden'/> ID. Just a seed key.",
  },
  {
    icon: <Encryption className="w-8 sm:w-10 xl:w-13 2xl:w-17 h-auto" />,
    title: "Encryption",
    description: `Zero-Knowledge means zero <br /> access. Even for us.`,
  },
  {
    icon: <CensorshipIcon />,
    title: "Anti-Censorship",
    description: `Unstoppable access. No moderators, <br /> no blocks, no borders.`,
  },
];

export const methods = [
  {
    icon: <Sms className="w-8 sm:w-10 xl:w-13 2xl:w-17 h-auto" />,
    title: "Cash by mail",
  },
  {
    icon: <Btc className="w-8 sm:w-10 xl:w-13 2xl:w-17 h-auto" />,
    title: "XMR, BTC",
  },
  {
    icon: <NeuroCoinBlue className="w-8 sm:w-10 xl:w-13 2xl:w-17 h-auto" />,
    title: "Anti-NCNC (NeuroCoin)",
  },
];
