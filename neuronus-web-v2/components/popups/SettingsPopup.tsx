"use client";

import { Modal } from "../Modal";
import Button from "../Button";
import { useState, useEffect, useRef } from "react";
import { authService } from "@/services/auth-service";
import { toast } from "react-toastify";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";

// ── App URLs for Tools tab ──
const APP_URLS: Record<string, string> = {
  "Neuro Mail":    "https://mail.neuronus.net",
  "Resonance":     "",
  "NeuroRSA":      "https://neurorsa.neuronus.net",
  "NeuroDrive":    "https://drive.neuronus.net",
  "NeuroPassword": "https://passwordmanager.neuronus.net",
  "GhostTransfer": "https://ghosttransfer.neuronus.net",
};

const tools = [
  { name: "Neuro Mail", icon: "/images/mail.svg" },
  { name: "Resonance", icon: "/images/resonance.svg" },
  { name: "NeuroRSA", icon: "/images/rsa.svg" },
  { name: "NeuroDrive", icon: "/images/drive.svg" },
  { name: "NeuroPassword", icon: "/images/password.svg" },
  { name: "GhostTransfer", icon: "/images/transfer.svg" },
];

const openAppWithSSO = (appUrl: string) => {
  if (!appUrl) return;
  window.open(appUrl, "_blank");
};

// ── Icons ──
const KeyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const FAIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const ServerIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);
const ToolsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const BoxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const LogOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);
const CheckCircle = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#22c55e" />
    <path
      d="M7 12.5L10.5 16L17 8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ArrowLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const QRIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-3 text-gray-700"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

// ── Tab types ──
type Tab = "2fa" | "tools" | "seeds" | "server" | "subscriptions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPopup = ({ isOpen, onClose }: Props) => {
  const globalLogout = useAuthStore((state) => state.globalLogout);
  const [activeTab, setActiveTab] = useState<Tab>("2fa");

  // 2FA state
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [showTotpSetup, setShowTotpSetup] = useState(false);
  const [totpData, setTotpData] = useState<{
    secret: string;
    qr_code: string;
    uri: string;
  } | null>(null);
  const [otpToken, setOtpToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisablingMode, setIsDisablingMode] = useState(false);

  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    otpInputRef.current?.focus();
  }, [otpToken]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("is_2fa");
      setIs2faEnabled(stored === "true");
    }
  }, [isOpen]);
  const handleStartTotpSetup = async () => {
    setIsLoading(true);
    try {
      const data = await authService.generateTotp();
      setTotpData(data);
      setIsDisablingMode(false);
      setShowTotpSetup(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to generate TOTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDisable = () => {
    setIsDisablingMode(true);
    setShowTotpSetup(true);
  };

  const handleVerifyAndEnable = async () => {
    if (!otpToken) {
      toast.error("Please enter the OTP code");
      return;
    }
    setIsLoading(true);
    try {
      await authService.manageTotp(true, otpToken);
      if (typeof localStorage !== "undefined")
        localStorage.setItem("is_2fa", "true");
      setIs2faEnabled(true);
      setShowTotpSetup(false);
      setTotpData(null);
      setOtpToken("");
      toast.success("2-Step Verification enabled successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2fa = async () => {
    if (!otpToken) {
      toast.error("Please enter the OTP code");
      return;
    }
    setIsLoading(true);
    try {
      await authService.manageTotp(false, otpToken);
      if (typeof localStorage !== "undefined")
        localStorage.setItem("is_2fa", "false");
      setIs2faEnabled(false);
      setShowTotpSetup(false);
      setIsDisablingMode(false);
      setOtpToken("");
      toast.success("2-Step Verification disabled successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSettings = () => {
    setShowTotpSetup(false);
    setIsDisablingMode(false);
    setTotpData(null);
    setOtpToken("");
  };

  // ── Sidebar button helper ──
  const SidebarButton = ({
    tab,
    icon,
    label,
  }: {
    tab: Tab;
    icon: React.ReactNode;
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-3 rounded-full transition-colors text-left w-full text-[15px] font-medium
        ${
          activeTab === tab
            ? " bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF] text-[white] shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
        }`}
    >
      {icon}
      {label}
    </button>
  );

  // ── Right side: Tools tab ──
  const ToolsContent = () => (
    <div className="w-full">
      <h3 className="text-[22px] font-bold text-[#1F2346] mb-2">Tools</h3>
      <p className="text-gray-500 text-[14px] mb-8">
        Click any tool to open it. You'll be logged in automatically.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {tools.map((tool) => {
          const appUrl = APP_URLS[tool.name];
          return (
            <button
              key={tool.name}
              onClick={() => appUrl && openAppWithSSO(appUrl)}
              disabled={!appUrl}
              className={`flex flex-col items-center justify-center gap-2 bg-white hover:bg-indigo-50 border border-[#EBEBEB] hover:border-indigo-200 rounded-2xl h-[110px] transition-all duration-200 group
                ${!appUrl ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={28}
                  height={28}
                  className="w-auto h-auto"
                />
              </div>
              <span className="text-[13px] font-semibold text-black text-center leading-tight px-2">
                {tool.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // ── Right side: 2FA tab ──
  const TwoFAContent = () => (
    <div className="w-full max-w-[550px] mx-auto mt-4">
      {!showTotpSetup ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-[#1F2346]">
              <h3 className="text-[22px] font-bold">
                2 Factor Authentications
              </h3>
            </div>
            {is2faEnabled && (
              <button
                onClick={handleStartDisable}
                disabled={isLoading}
                className={`text-[13px] font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Turn off 2-Step Verification
              </button>
            )}
          </div>
          <p className="text-gray-600 text-[14px] mb-4 leading-relaxed max-w-[480px]">
            Prevent hackers from accessing your account with an additional layer
            of security.
          </p>
          <p className="text-gray-600 text-[14px] mb-10 leading-relaxed max-w-[480px]">
            Unless you're signing in with a passkey, you'll be asked to complete
            the most secure second step available on your account.
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
            <h4 className="text-[18px] font-bold text-[#1F2346] mb-2">
              Second Steps
            </h4>
            <p className="text-gray-500 text-[13px] mb-8 leading-relaxed max-w-[450px]">
              Keep your account secure by updating sign-in options.
            </p>
            <div
              onClick={!is2faEnabled ? handleStartTotpSetup : undefined}
              className={`flex items-center justify-between group cursor-pointer hover:bg-gray-50/50 p-2 -mx-2 rounded-xl transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""} ${is2faEnabled ? "cursor-default" : ""}`}
            >
              <div className="flex items-center">
                <QRIcon />
                <span className="text-gray-700 font-medium text-[15px]">
                  Authenticator
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {is2faEnabled ? (
                    <>
                      <CheckCircle />
                      <span className="text-[13px] text-gray-500 font-medium">
                        Authenticator app added
                      </span>
                    </>
                  ) : (
                    <span className="text-[13px] text-[#2F65FF] font-medium hover:underline">
                      Add Authenticator app
                    </span>
                  )}
                </div>
                <div className="text-gray-400 group-hover:text-gray-700 transition-colors">
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackToSettings}
              className="hover:text-gray-900 transition-colors"
            >
              <ArrowLeft />
            </button>
            <h3 className="text-[20px] font-bold ml-2">
              {isDisablingMode
                ? "Disable 2-Step Verification"
                : "Set up Authenticator"}
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-[14px] mb-6 text-center">
              {isDisablingMode
                ? "Enter the 6-digit code from your authenticator app to confirm."
                : "Scan this QR code with your authenticator app."}
            </p>
            {!isDisablingMode && totpData?.qr_code && (
              <div className="bg-white p-4 border border-gray-200 rounded-xl mb-6 shadow-sm">
                <Image
                  src={totpData.qr_code}
                  alt="QR Code"
                  width={200}
                  height={200}
                />
              </div>
            )}
            {!isDisablingMode && totpData?.secret && (
              <div className="w-full max-w-[320px] mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secret Key
                </label>
                <code className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono break-all block">
                  {totpData.secret}
                </code>
              </div>
            )}
            <div className="w-full max-w-[320px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter the 6-digit code
              </label>
              <input
                ref={otpInputRef}
                autoFocus
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    otpToken.length === 6 &&
                    !isLoading
                  ) {
                    isDisablingMode
                      ? handleDisable2fa()
                      : handleVerifyAndEnable();
                  }
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F65FF] focus:border-transparent transition-all mb-6 text-center text-2xl tracking-[0.5em] font-mono"
                style={{ textIndent: "0.5em" }}
              />
              <Button
                text={
                  isLoading
                    ? "Verifying..."
                    : isDisablingMode
                      ? "Verify and Disable"
                      : "Verify and Enable"
                }
                onClick={
                  isDisablingMode ? handleDisable2fa : handleVerifyAndEnable
                }
                disabled={isLoading || otpToken.length !== 6}
                className={`w-full py-4 text-base font-bold shadow-md ${isDisablingMode ? "bg-red-500 hover:bg-red-600!" : ""}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── Placeholder for other tabs ──
  const PlaceholderContent = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <p className="text-[18px] font-medium">{title}</p>
      <p className="text-[13px] mt-2">Coming soon</p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[950px] p-0! flex flex-col md:flex-row min-h-[600px] overflow-hidden bg-white"
    >
      {/* ── Sidebar ── */}
      <div className="w-full md:w-[280px] bg-[#F4F7FC] p-6 lg:p-8 flex flex-col border-r border-gray-100/50">
        <h2 className="text-2xl font-bold text-[#1F2346] mb-8">Settings</h2>

        <div className="flex flex-col space-y-3 grow">
          <SidebarButton tab="seeds" icon={<KeyIcon />} label="Seed Keys" />
          <SidebarButton tab="2fa" icon={<FAIcon />} label="2 FA" />
          <SidebarButton
            tab="server"
            icon={<ServerIcon />}
            label="Server Location"
          />
          {/* Tools — clicking this switches right side to tools grid */}
          <SidebarButton tab="tools" icon={<ToolsIcon />} label="Tools" />
          <SidebarButton
            tab="subscriptions"
            icon={<BoxIcon />}
            label="Subscriptions"
          />

          {/* Logout — not a tab, just an action */}
          <button
            onClick={() => globalLogout()}
            className="flex items-center gap-3 px-4 py-3 hover:bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF] text-gray-600 hover:text-white rounded-full cursor-pointer transition-colors text-left w-full hover:bg-gray-100/50"
          >
            <LogOutIcon />
            <span className="font-medium text-[15px]">LogOut</span>
          </button>
        </div>
      </div>

      {/* ── Right side content — switches based on activeTab ── */}
      <div className="flex-1 bg-[#F9FBFF] p-6 md:p-10 flex flex-col">
        {activeTab === "2fa" && <TwoFAContent />}
        {activeTab === "tools" && <ToolsContent />}
        {activeTab === "seeds" && <PlaceholderContent title="Seed Keys" />}
        {activeTab === "server" && (
          <PlaceholderContent title="Server Location" />
        )}
        {activeTab === "subscriptions" && (
          <PlaceholderContent title="Subscriptions" />
        )}
      </div>
    </Modal>
  );
};
