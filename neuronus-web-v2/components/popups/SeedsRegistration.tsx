"use client";

import Seed from "@/public/icons/seedRegistration/Seed";
import { Modal } from "../Modal";
import Link from "next/link";
import Copy from "@/public/icons/Copy";
import Save from "@/public/icons/Save";
import Button from "../Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Services = [{ name: "Help" }, { name: "Privacy" }, { name: "Terms" }];

export const SeedsRegistration = ({ isOpen, onClose }: Props) => {
  const openModal = useAuthStore((state) => state.openModal);
  const activeModal = useAuthStore((state) => state.activeModal);

  const { seedsData, isGeneratingSeeds, error, handleRegister } =
    useAuthStore();
    
  useEffect(() => {
    if (!isGeneratingSeeds && activeModal === "seedsRegister") {
      handleRegister();
    }
  }, [handleRegister, activeModal]);

  const handleCopy = async () => {
    if (!seedsData) return;
    try {
      await navigator.clipboard.writeText(seedsData);
      toast.success("Seed phrase copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy seeds.");
    }
  };

  const handleSave = () => {
    if (!seedsData) return;
    const blob = new Blob([seedsData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "neuronus-recovery-seed.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.info("Seed file downloaded.");
  };

  const Seeds = seedsData ? seedsData.split(" ") : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="overflow-y-auto">
        <div className="flex items-center justify-center mt-4 sm:mt-8 md:mt-10 lg:mt-10 mb-6">
          <div className="flex items-center p-4 md:p-8 rounded-[129px] bg-white">
            <Seed className="size-14 xxs:size-20 md:size-25" />
          </div>
        </div>
        <h3 className="text-[22px] lg:text-4xl text-center font-semibold">
          Register Your Account
        </h3>
        <p className="text-[#000000B5] text-[14px] md:text-xl pl-4 md:pl-8 mt-7 font-normal">
          Your Seed
        </p>
        <div className="mt-2 bg-white min-h-28 rounded-xl border-[#ABABAB57] border mx-4 md:mx-7 flex items-center justify-center">
          {isGeneratingSeeds ? (
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-[#36F] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-[#36F] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-[#36F] rounded-full animate-bounce"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5 p-5 w-full">
              {Seeds.map((seed: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1.5 rounded-md border border-[#D5D5D5] font-normal text-[11px] lg:text-[20px]"
                >
                  {seed}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="xs:flex justify-between items-center mx-5 md:mx-7 mt-7">
          <span className="sm:flex gap-1 sm:gap-4 text-[10px] md:text-[16px] lg:text-xl">
            Already have account?
            <span
              onClick={() => openModal("loginSeeds")}
              className="cursor-pointer lg:underline text-[#36F] lg:text-black"
            >
              Login here
            </span>
          </span>
          <div className="flex xxs::justify-between items-center gap-4 sm:gap-10 text-[10px] md:text-[15.801px]">
            <button
              onClick={handleSave}
              disabled={!seedsData || isGeneratingSeeds}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity disabled:opacity-30"
            >
              <Save />
              Save
            </button>
            <button
              onClick={handleCopy}
              disabled={!seedsData || isGeneratingSeeds}
              className="flex items-center cursor-pointer gap-2 hover:opacity-70 transition-opacity disabled:opacity-30"
            >
              <Copy />
              Copy
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4 xs:mt-10">
          <Button
            disabled={isGeneratingSeeds || !!error}
            onClick={() => openModal("loginSeeds")}
            text="I have save my seed"
            className=" text-[12px] md:text-[19px]! px-18 md:px-30 py-1.5 md:py-4! mt-7"
          />
        </div>
        <div className="flex justify-center gap-5 xs:gap-10 mb-4 mt-6">
          {Services.map((s) => (
            <p className="flex justify-between text-sm lg:text-lg font-normal mt-4">
              {s.name}
            </p>
          ))}
        </div>
      </div>
    </Modal>
  );
};
