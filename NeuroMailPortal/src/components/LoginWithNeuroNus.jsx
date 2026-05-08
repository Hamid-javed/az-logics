import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { useAuth } from "../AuthContext";
import { ThreeDots } from "react-loader-spinner";

export const LoginWithNeuroNus = () => {
  const {
    hasHubAccount,
    isLocked,
    isUnlocking,
    isLoading,
    loginWithHub,
    unlockApp,
  } = useAuth();

  // ── Unlocking in progress ──────────────────────────────
  if (isLoading || isUnlocking) {
    return (
      <div className="w-full max-w-[450px] bg-white rounded-[24px] md:shadow-2xl md:border border-gray-100 p-8 md:p-10">
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <ThreeDots color="#36F" width={50} height={50} />
          <p className="text-gray-500 font-medium">
            {isUnlocking ? "Unlocking Vault..." : "Checking Secure Connection..."}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // ── App is LOCKED — session still active on hub ────────
  // Show Unlock — no redirect needed
  if (isLocked) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[450px] bg-white rounded-[24px] md:shadow-2xl md:border border-gray-100 p-8 md:p-10 transform transition-all animate-in fade-in zoom-in duration-300"
      >
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
          {/* Unlock — uses existing hub session, zero redirect */}
          <button
            onClick={unlockApp}
            className="group w-full bg-[#36F] hover:bg-[#2a55d6] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <KeyRound className="size-5" />
            Unlock Vault
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  // ── Session expired — had hub account before ───────────
  if (hasHubAccount) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[450px] bg-white rounded-[24px] md:shadow-2xl md:border border-gray-100 p-8 md:p-10 transform transition-all animate-in fade-in zoom-in duration-300"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-amber-50 p-4 rounded-full mb-4">
            <Lock className="size-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Session Expired</h2>
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
    );
  }

  // ── Brand new user — no session anywhere ───────────────
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[450px] bg-white rounded-[24px] md:shadow-2xl md:border border-gray-100 p-8 md:p-10 transform transition-all animate-in fade-in zoom-in duration-300"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="bg-[#36F]/10 p-4 rounded-full mb-4">
          <ShieldCheck className="size-8 text-[#36F]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
        <p className="text-gray-500 text-center mt-2">
          Access your passwords securely using your Neuronus account.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={loginWithHub}
          className="group w-full bg-[#36F] hover:bg-[#2a55d6] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <ShieldCheck className="size-5" />
          Login with Neuronus
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <Footer />
    </div>
  );
};

const Footer = () => (
  <div className="md:mt-5 pt-6 border-t border-gray-50 text-center">
    <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
      Powered by Neuronus Secure Core
    </p>
  </div>
);