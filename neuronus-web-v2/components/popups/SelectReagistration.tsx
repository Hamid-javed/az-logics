"use client";

import { Modal } from "../Modal";
import NP from "@/public/icons/home/registration/NP";
import Polygon from "@/public/icons/home/Polygon";
import Resonance from "@/public/icons/Resonance";
import NeuroRSA from "@/public/icons/NeuroRSA";
import NeuroDrive from "@/public/icons/NeuroDrive";
import GhostTransfer from "@/public/icons/GhostTransfer";
import NeuroScreens from "@/public/icons/NeuroScreens";
import NeuroBrowser from "@/public/icons/home/accessNetork/NeuroBrowser";
import NeuroPassword from "@/public/icons/home/registration/NeuroPassword";
import Button from "../Button";
import NeuroMail from "@/public/icons/NeuroMail";
import NeuroCoin from "@/public/icons/NeuroCoin";
import NFile from "@/public/icons/home/registration/NFile";
import XFile from "@/public/icons/home/registration/XFile";
import Quantumography from "@/public/icons/Quantumography";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/services/auth-service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Icons = [
  { icon: NeuroBrowser },
  { icon: Polygon },
  { icon: Polygon },
  { icon: NeuroMail },
  { icon: Resonance },
  { icon: NeuroRSA },
  { icon: NeuroDrive },
  { icon: NeuroPassword },
  { icon: GhostTransfer },
  { icon: Quantumography },
  { icon: NeuroScreens },
  { icon: NFile },
  { icon: XFile },
  { icon: NeuroCoin },
  { icon: NP },
];

export const SelectRegistration = ({ isOpen, onClose }: Props) => {
  const openModal = useAuthStore((state) => state.openModal);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" pt-8 pb-6 text-center">
        <div className="text-[21px] lg:hidden text-center font-semibold">
          Submit Your Idea
        </div>
        <div className="xxs:max-w-[80vh]">
          <div className="flex items-center justify-center mt-6 overflow-hidden">
            {Icons.map((I, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center justify-center bg-white border-[0.35px] border-[#B8B8B8A8] rounded-[10.72px] p-2 w-11 h-11
                    transition-transform ${
                      index !== 0
                        ? "-ml-3 sm:-ml-3 md:-ml-2 -mr-2 lg:mr-0 lg:-ml-2"
                        : ""
                    }`}
                  style={{ zIndex: 5 + index }}
                >
                  <I.icon className="text-backlight" />
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-5 text-[22px] lg:text-[34px] font-semibold ">
          Get Started
        </p>
        <p className="text-[12px] md:text-xl p-4 text-[rgba(0,0,0,0.71)]">
          By Creating free account , you will get access to all our tools.
        </p>
        <span className="text-[12px] md:text-xl text-[rgba(0,0,0,0.71)]">
          Select how you would like to proceed
        </span>
        <div className="flex justify-center flex-col items-center text-[15px] lg:text-[19px] ">
          {/* <Button
            onClick={() => authService.generateTotp()}
            text="Generate TOTP"
            className=" text-[12px] md:text-[19px]! px-18 md:px-30 py-3 md:py-5! mt-7"
          /> */}
          <Button
            onClick={() => openModal("createAccount")}
            text="Registration with Seeds"
            className=" text-[12px] md:text-[19px]! px-18 md:px-30 py-3 md:py-5! mt-7"
          />
          <Button
            text="Registration with RGP"
            className=" text-[12px] md:text-[19px]! px-18 md:px-30 py-3 md:py-5! mt-7"
          />
        </div>
      </div>
    </Modal>
  );
};
