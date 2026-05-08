import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { useAuth } from "../AuthContext";

export const LoginWithNeuroNus = ({ className = "" }) => {
  const {
    hasHubAccount,
    isLoading,
    isUnlocking,
    isLocked,
    loginWithHub,
    unlockApp,
  } = useAuth();

  // ── Loading or unlocking in progress ──────────────────
  if (isLoading || isUnlocking) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-4 h-full min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400" />
        <p className="text-base md:text-lg text-cyan-100/80 font-medium animate-pulse">
          {isUnlocking ? "Unlocking Vault..." : "Securing Connection..."}
        </p>
      </div>
    );
  }

  // ── App locked — session still active on hub ──────────
  if (isLocked) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full flex flex-col items-center pb-5 transform transition-all animate-in fade-in zoom-in duration-500 ${className}`}
      >
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl mb-6 border border-white/20 shadow-xl">
            <Lock className="size-10 md:size-12 text-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Vault Locked
          </h2>
          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-[280px] md:max-w-sm mt-4 leading-relaxed">
            Your session is still active.{" "}
            <span className="text-cyan-400 font-semibold">Unlock</span> to continue.
          </p>
        </div>

        <div className="w-full space-y-4 px-2">
          {/* Unlock — uses existing hub session, zero redirect */}
          <button
            onClick={unlockApp}
            className="group w-full bg-cyan-500 hover:bg-cyan-400 text-[#0b2837] py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98]"
          >
            <KeyRound className="size-6" />
            Unlock Vault
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
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
        className={`w-full flex flex-col items-center pb-5 transform transition-all animate-in fade-in zoom-in duration-500 ${className}`}
      >
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <div className="bg-amber-500/10 backdrop-blur-md p-5 rounded-3xl mb-6 border border-amber-500/20 shadow-xl">
            <Lock className="size-10 md:size-12 text-amber-400" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Session Expired
          </h2>
          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-[280px] md:max-w-sm mt-4 leading-relaxed">
            Your session has expired. Log back in to continue.
          </p>
        </div>

        <div className="w-full space-y-4 px-2">
          <button
            onClick={loginWithHub}
            className="group w-full bg-cyan-500 hover:bg-cyan-400 text-[#0b2837] py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98]"
          >
            <ShieldCheck className="size-6" />
            Login with Neuronus
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  // ── Brand new user — no session anywhere ───────────────
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-full flex flex-col items-center pb-5 transform transition-all animate-in fade-in zoom-in duration-500 ${className}`}
    >
      <div className="flex flex-col items-center text-center mb-6 md:mb-10">
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl mb-6 border border-white/20 shadow-xl">
          <ShieldCheck className="size-10 md:size-12 text-cyan-400" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Welcome
        </h2>
        <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-[280px] md:max-w-sm mt-4 leading-relaxed">
          Access your encrypted data securely via your{" "}
          <span className="text-cyan-400 font-semibold">NeuroNus</span> account.
        </p>
      </div>

      <div className="w-full space-y-4 px-2">
        <button
          onClick={loginWithHub}
          className="group w-full bg-cyan-500 hover:bg-cyan-400 text-[#0b2837] py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98]"
        >
          <ShieldCheck className="size-6" />
          Login with Neuronus
          <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <Footer />
    </div>
  );
};

const Footer = () => (
  <div className="mt-auto pt-8 w-full">
    <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent mb-2" />
      <p className="text-[10px] md:text-[12px] text-slate-400 uppercase tracking-[0.2em] font-black">
        Powered by Secure Core
      </p>
    </div>
  </div>
);