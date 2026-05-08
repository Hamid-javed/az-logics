import GhostTransfer from "@/public/icons/GhostTransfer";
import NeuroCoinBlue from "@/public/icons/home/registration/NeuroCoinBlue";
import NeuroDrive from "@/public/icons/NeuroDrive";
import NeuroRSA from "@/public/icons/NeuroRSA";
import NeuroScreens from "@/public/icons/NeuroScreens";
import CreaditCard from "@/public/icons/pricing/CreaditCard";
import Resonance from "@/public/icons/Resonance";
import Tick from "@/public/icons/watch-demo/signupFlow/Tick";
import Button from "../Button";
import NeuroMail from "@/public/icons/home/registration/NeuroMail";

const AllIcon = [
  <NeuroMail className="size-5" />,
  <NeuroDrive className="text-backlight size-5" />,
  <Resonance className="text-backlight size-5" />,
  <GhostTransfer className="text-backlight" />,
  <NeuroScreens className="text-backlight" />,
  <NeuroCoinBlue className="size-5" />,
  <NeuroRSA className="text-backlight" />,
];

interface SubscriptionCardProps {
  recomended?: boolean;
  title: string;
  NcncDiscount?: string;
  icons: number;
  storage: string;
  email: number;
  price: string;
  annualPrice: string;
  buttonText: string;
  annual: boolean;
  benefits: React.ReactNode[];
}

const SubscriptionCard = ({
  title,
  NcncDiscount,
  icons,
  storage,
  email,
  price,
  buttonText,
  benefits,
  recomended,
  annualPrice,
  annual = false,
}: SubscriptionCardProps) => {
  const visibleIcons = AllIcon.slice(0, icons);

  return (
    <div
      className={`flex flex-col h-fit sm:h-full ${recomended ? "rounded-[22px] bg-backlight" : ""}`}
    >
      <p
        className={`text-center text-2xl py-2 text-white ${recomended ? "" : "invisible"}`}
      >
        Recomended
      </p>
      <div className="bg-white border border-[#8F8F8F5E] rounded-[22px] px-7.75 pt-7 flex-1">
        <p className="text-[22px] 2xl:text-2xl font-semibold">
          Neuronus {title}
        </p>
        <p
          className={`bg-[#68FF6D69] text-[#00B206] w-fit rounded-full px-4 py-1 ${NcncDiscount ? "" : "invisible"}`}
        >
          {NcncDiscount}OFF with NCNC
        </p>
        <div className="flex items-center mt-5 overflow-hidden border-b border-[#8F8F8F91] pb-7">
          {visibleIcons.map((icon, index) => {
            return (
              <div
                key={`${icon}-${index}`}
                className={`flex items-center justify-center bg-white border-[0.35px] border-[#B8B8B8A8] rounded-[10.72px] p-2 w-11 h-11
                      transition-transform ${
                        index !== 0
                          ? "-ml-3 sm:-ml-3 md:-ml-2 -mr-2 lg:mr-0 lg:-ml-2"
                          : ""
                      }`}
                style={{ zIndex: 5 + index }}
              >
                {icon}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 text-2xl font-semibold py-7">
          <div>
            <p>{storage}</p>
            <p className="text-black/70 text-lg font-semibold">Storage</p>
          </div>
          <div>
            <p>{email}</p>
            <p className="text-black/70 text-base md:text-lg font-semibold">
              Email Address
            </p>
          </div>
        </div>
        <div className="flex items-baseline-last gap-2">
          <p className="font-semibold text-3xl">
            ${annual ? annualPrice : price}
          </p>
          <p className="font-semibold text-sm text-black/70">/month</p>
        </div>
        <Button
          text={buttonText}
          className=" py-4! 2xl:py-5! px-12 2xl:px-15 text-base! whitespace-nowrap my-3.5"
        />
        <div className="flex items-center justify-center gap-2 mb-12">
          <CreaditCard />
          <p className="text-sm text-black/55">No credit card required</p>
        </div>
        <div className="text-base text-black/72">
          {benefits.map((benefit, index) => (
            <div
              key={`${title}-${index}`}
              className="flex items-center gap-1.75 pb-7"
            >
              <Tick /> {benefit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
