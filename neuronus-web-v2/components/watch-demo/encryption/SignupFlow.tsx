"use client";
import Container from "@/components/Container";
import FlowCard from "./FlowCard";
import CardButton from "./CardButton";
import ActivityLog from "./ActivityLog";
import ServerStorage from "./ServerStorage";
import { useCrypto } from "../../../context/CryptoContext";

const SignupFlow = () => {
  const {
    seed,
    signupStatus,
    handleSignup,
    loginSeedInput,
    setLoginSeedInput,
    loginStatus,
    loginResult,
    handleLogin,
    isLoggedIn,
    decryptedPrivateKey,
    handleDecryptPrivateKey,
    copiedField,
    copyToClipboard,
    signupSteps,
  } = useCrypto();

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-16 lg:gap-5.25">
      <div className="space-y-3 lg:space-y-5">
        {/* ── Signup Card ─────────────────────────────────────────────── */}
        <FlowCard
          title="Sign up for Secure Account"
          description="Create your account. Server stores only encrypted data – no access to your keys or seed."
          classes={{
            root: "bg-[#F1F6FE]! border border-[#4D67FF]",
            textarea: "bg-white!",
          }}
          // No textarea needed for signup – button only
          hideTextarea
          buttonText={
            signupStatus === "running"
              ? "Processing…"
              : signupStatus === "done"
                ? "Recreate Account"
                : "Run Signup Flow"
          }
          buttonDisabled={signupStatus === "running"}
          onButtonClick={handleSignup}
          // Seed phrase display slot
          extraContent={
            seed ? (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-800 text-sm">
                    Your Seed Phrase (Save This!)
                  </h4>
                  <button
                    onClick={() => copyToClipboard(seed, "seed")}
                    className="px-2 py-1 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors"
                  >
                    {copiedField === "seed" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {seed.split(" ").map((w, i) => (
                    <div
                      key={i}
                      className="bg-white uppercase border border-green-200 p-1 rounded text-[10px] text-center font-medium text-gray-700"
                    >
                      {w}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-green-600 text-center">
                  ⚠️ This seed never leaves your device. Save it securely!
                </p>
              </div>
            ) : null
          }
        />

        {/* ── Login Card ──────────────────────────────────────────────── */}
        <FlowCard
          title="Login with Your Seed"
          description="Enter Your Seed Phrase:"
          placeholder="Paste your 16-word seed phrase here..."
          value={loginSeedInput}
          onChange={setLoginSeedInput}
          buttonText={
            loginStatus === "logging-in" ? "Logging in…" : "Login to Account"
          }
          buttonDisabled={
            !loginSeedInput.trim() || loginStatus === "logging-in"
          }
          onButtonClick={handleLogin}
          classes={{ root: "border border-[#DCBAFF]" }}
          extraContent={
            loginResult ? (
              <div
                className={`mt-3 p-3 rounded-lg text-sm border ${
                  loginResult.success
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {loginResult.success ? "✅" : "❌"}
                  <span className="font-medium">{loginResult.message}</span>
                </div>
                {loginResult.details && (
                  <p className="mt-1 text-xs opacity-75">
                    {loginResult.details}
                  </p>
                )}
              </div>
            ) : null
          }
        />

        {/* ── Decrypt Private Key ─────────────────────────────────────── */}
        {isLoggedIn && (
          <div className="space-y-2 flex flex-col items-center w-full justify-center ">
            <CardButton
              text="Decrypt Private Key"
              className="w-[90%] bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF] rounded-full font-NeueRegular mx-auto lg:mx-0 block"
              onClick={handleDecryptPrivateKey}
            />
            {decryptedPrivateKey && (
              <div className="relative w-[100%] mx-auto lg:mx-0 p-3 max-h-40 overflow-auto rounded-lg text-[11px] font-mono bg-white border border-green-200 text-black">
                <button
                  onClick={() =>
                    copyToClipboard(decryptedPrivateKey, "privateKey")
                  }
                  className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-gray-600 text-white rounded"
                >
                  {copiedField === "privateKey" ? "Copied!" : "Copy"}
                </button>
                {decryptedPrivateKey}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Activity Log ──────────────────────────────────────────────── */}
      <ActivityLog steps={signupSteps} title="signup-flow" />

      {/* ── Server Storage ────────────────────────────────────────────── */}
      <ServerStorage />
    </Container>
  );
};

export default SignupFlow;
