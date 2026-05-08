import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { useAuth } from "../AuthContext";
import { ThreeDots } from "react-loader-spinner";
import { useRef } from "react";

export const LoginWithNeuroNus = () => {
  const {
    isAuthHubVisible,
    setIsAuthHubVisible,
    hasHubAccount,
    isLocked,
    loginWithHub,
    unlockApp,
    loading,
    isUnlocking,
  } = useAuth();
  const overlayRef = useRef(null);
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      setIsAuthHubVisible(false);
    }
  };

  if (!isAuthHubVisible) return;
  if (isLocked) {
    return (
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 flex justify-center items-center bg-black/30 z-50 px-5"
      >
        <div className="w-full max-w-[450px] bg-white rounded-[24px] z-[9999] shadow-2xl border border-gray-100 p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#36F]/10 p-4 rounded-full mb-4">
              <Lock className="size-8 text-[#36F]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Vault Locked</h2>
            <p className="text-gray-500 text-center mt-2">
              Your session is still active. Unlock to continue.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={unlockApp}
              className="group w-full bg-[#36F] hover:bg-[#2a55d6] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <KeyRound className="size-5" />
              Unlock Vault
              {loading || isUnlocking ? (
                <ThreeDots color="white" width={25} height={25} />
              ) : (
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Session expired — had account before
  if (hasHubAccount) {
    return (
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 flex justify-center items-center bg-black/30 z-50  px-5"
      >
        <div className="w-full max-w-[450px] bg-white rounded-[24px] shadow-2xl border border-gray-100 p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-amber-50 p-4 rounded-full mb-4">
              <Lock className="size-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Session Expired
            </h2>
            <p className="text-gray-500 text-center mt-2">
              Your session has expired. Log back in to continue.
            </p>
          </div>
          <button
            onClick={loginWithHub}
            className="group w-full bg-[#36F] hover:bg-[#2a55d6] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <ShieldCheck className="size-5" />
            Login with Neuronus
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <Footer />
        </div>
      </div>
    );
  }

  // Brand new user — no account
  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 flex justify-center items-center bg-black/30 z-50  px-5"
    >
      <div className="w-full max-w-[450px] bg-white rounded-[24px] shadow-2xl border border-gray-100 p-8 md:p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#36F]/10 p-4 rounded-full mb-4">
            <ShieldCheck className="size-8 text-[#36F]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
          <p className="text-gray-500 text-center mt-2">
            Sign in with your Neuronus account to access your vault.
          </p>
        </div>
        <button
          onClick={loginWithHub}
          className="group w-full bg-[#36F] hover:bg-[#2a55d6] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <ShieldCheck className="size-5" />
          Login with Neuronus
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <Footer />
      </div>
    </div>
  );
};

const Footer = () => (
  <div className="mt-10 pt-6 border-t border-gray-50 text-center">
    <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
      Powered by Neuronus Secure Core
    </p>
  </div>
);
