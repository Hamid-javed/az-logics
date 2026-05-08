"use client";

import { useState } from "react";
import Seed from "@/public/icons/seedRegistration/Seed";
import { Modal } from "../Modal";
import Button from "../Button";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import Words from "@/data/constants/Seeds";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openTools: () => void;
}

const Services = [{ name: "Help" }, { name: "Privacy" }, { name: "Terms" }];

export const LoginSeeds = ({ isOpen, onClose, openTools }: Props) => {
  const loginWithSeeds = useAuthStore((state) => state.loginWithSeeds);
  const loginWithOTP = useAuthStore((state) => state.loginWithOTP);
  const isLoading = useAuthStore((state) => state.isLoading);
  const requires2FA = useAuthStore((state) => state.requires2FA);
  const openModal = useAuthStore((state) => state.openModal);
  const error = useAuthStore((state) => state.error);
  // Input States
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [seedsValue, setSeedsValue] = useState<string[]>([]);
  const [otpValue, setOtpValue] = useState("");

  // --- Handlers ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim().split(/\s+/).length > 1) {
      const pastedWords = value.trim().split(/\s+/).slice(0, 16);
      setSeedsValue(pastedWords);
      setInputValue("");
      return;
    }
    if (value.length > 0) {
      const filtered = Words.filter((word: string) =>
        word.toLowerCase().startsWith(value.toLowerCase()),
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      addSeed(suggestions[0]);
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      seedsValue.length > 0
    ) {
      setSeedsValue(seedsValue.slice(0, -1));
    }
  };

  const addSeed = (word: string) => {
    if (seedsValue.length < 16) {
      setSeedsValue([...seedsValue, word]);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const removeSeed = (indexToRemove: number) => {
    setSeedsValue(seedsValue.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (requires2FA) {
      if (otpValue.length !== 6) {
        toast.error("Please enter a valid 6-digit code.");
        return;
      }
      const success = await loginWithOTP(otpValue);
      if (success) {
        toast.success("Logged In Successfully.");
        onClose();
        openTools();
      }
      return;
    }

    // Join the 16 words into a single string
    const seedsString = seedsValue.join(" ");

    const success = await loginWithSeeds(seedsString);

    if (success) {
      toast.success("Logged In Successfully.");
      onClose();
      openTools();
    } else {
      // If not 2FA, the store error might be set. We can show it here if needed.
      // But requires2FA should trigger a re-render.
      console.log(
        "Login failed, requires2FA is:",
        useAuthStore.getState().requires2FA,
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="overflow-y-auto">
        {/* Header Icon */}
        <div className="flex items-center justify-center mt-4 sm:mt-8 md:mt-10 mb-6">
          <div className="flex items-center p-4 md:p-8 rounded-[129px] bg-white">
            <Seed className="size-14 xxs:size-20 md:size-25" />
          </div>
        </div>

        <h3 className="text-[22px] lg:text-4xl text-center font-semibold">
          Login
        </h3>

        {!requires2FA ? (
          <>
            <div className="flex justify-between items-center px-4 md:px-8 mt-7">
              <p className="text-[#000000B5] text-[14px] md:text-xl font-normal">
                Your Seed
              </p>
              {seedsValue.length === 16 && (
                <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                  ✓ 16 Words Complete
                </span>
              )}
            </div>

            <div className="mt-2 bg-white min-h-28 rounded-xl border-[#ABABAB57] border mx-4 md:mx-7 p-4">
              <div className="flex flex-wrap gap-2.5">
                {seedsValue.map((seed, index) => (
                  <span
                    key={index}
                    onClick={() => removeSeed(index)}
                    className="group relative px-2 py-1.5 rounded-md border border-[#D5D5D5] bg-gray-50 font-normal text-[11px] lg:text-[18px] cursor-pointer hover:border-red-400"
                  >
                    {seed}
                    <span className="hidden group-hover:inline ml-1 text-red-500 text-xs">
                      ×
                    </span>
                  </span>
                ))}

                {seedsValue.length < 16 && (
                  <input
                    autoFocus
                    className="outline-none bg-transparent flex-1 min-w-[150px] text-[11px] lg:text-[20px] placeholder:text-gray-300"
                    placeholder={
                      seedsValue.length === 0
                        ? "Paste seeds or type here..."
                        : ""
                    }
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 px-4 md:px-8 mt-3 h-8">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => addSeed(suggestion)}
                  className="px-3 py-1 bg-[#36F1] text-[#36F] rounded-full text-xs lg:text-sm hover:bg-[#36F2] transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <p className="xxs:flex gap-2 xs:gap-4 text-[14px] lg:text-xl px-7 mt-7">
              Don't have account yet?
              <span
                onClick={() => openModal("createAccount")}
                className="cursor-pointer lg:underline text-[#36F] lg:text-black font-medium"
              >
                Register here
              </span>
            </p>
          </>
        ) : (
          <div className="px-4 md:px-8 mt-7">
            <p className="text-[#000000B5] text-[14px] md:text-xl font-normal mb-4">
              Enter 2FA Code
            </p>
            <div className="mt-2 bg-white rounded-xl border-[#ABABAB57] border p-4">
              <input
                autoFocus
                type="text"
                maxLength={6}
                className="w-full outline-none bg-transparent text-center text-2xl lg:text-4xl tracking-[0.5em] placeholder:text-gray-300"
                placeholder="000000"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <p className="text-[#00000080] text-xs md:text-sm mt-4 text-center">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Button
            disabled={
              (!requires2FA && seedsValue.length !== 16) ||
              (requires2FA && otpValue.length !== 6) ||
              isLoading
            }
            onClick={handleSubmit}
            text={
              isLoading
                ? requires2FA
                  ? "Verifying"
                  : "Logging in"
                : requires2FA
                  ? "Verify OTP"
                  : "Login"
            }
            className="text-[12px] md:text-[19px]! flex justify-center items-center gap-2 px-18 md:px-30 py-1.5 md:py-4! mt-7"
            isLoading={isLoading}
          />
        </div>

        <div className="flex justify-center gap-5 xs:gap-10 mb-4 mt-6">
          {Services.map((s) => (
            <p
              key={s.name}
              className="text-[10.327px] lg:text-[17.603px] font-normal mt-4 text-gray-500"
            >
              {s.name}
            </p>
          ))}
        </div>
      </div>
    </Modal>
  );
};
