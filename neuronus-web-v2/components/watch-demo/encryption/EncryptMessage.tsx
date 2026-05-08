"use client";
import Container from "@/components/Container";
import FlowCard from "./FlowCard";
import ActivityLog from "./ActivityLog";
import ServerStorage from "./ServerStorage";
import { useCrypto } from "../../../context/CryptoContext";

const EncryptMessage = () => {
  const {
    messageInput,
    setMessageInput,
    handleEncryptAndStore,
    encryptStatus,
    customEncryptedMessage,
    setCustomEncryptedMessage,
    decryptedMessage,
    handleDecryptCustomMessage,
    decryptStatus,
    isLoggedIn,
    encryptSteps,
  } = useCrypto();

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-16 lg:gap-5.25">
      <div className="space-y-3 lg:space-y-5">
        {/* ── Encrypt Message Card ─────────────────────────────────────── */}
        <FlowCard
          buttonText={
            encryptStatus === "running"
              ? "Encrypting…"
              : encryptStatus === "done"
                ? "Encrypted ✓"
                : "Encrypt & Store"
          }
          description="Write a message and encrypt it using your public key. Only your private key can decrypt it."
          placeholder="Type your secret message here..."
          title="Encrypt message"
          clearButton
          value={messageInput}
          onChange={setMessageInput}
          onClear={() => setMessageInput("")}
          buttonDisabled={
            !isLoggedIn || !messageInput.trim() || encryptStatus === "running"
          }
          onButtonClick={handleEncryptAndStore}
          extraContent={
            !isLoggedIn ? (
              <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                ⚠️ Please sign up or log in first to encrypt messages.
              </p>
            ) : null
          }
        />

        {/* ── Decrypt Custom Message Card ─────────────────────────────── */}
        <FlowCard
          buttonText={
            decryptStatus === "running" ? "Decrypting…" : "Decrypt Message"
          }
          description="Paste any encrypted message to decrypt it."
          placeholder="Paste your encrypted message here..."
          title="Decrypt Custom Message"
          clearButton
          value={customEncryptedMessage}
          onChange={setCustomEncryptedMessage}
          onClear={() => setCustomEncryptedMessage("")}
          buttonDisabled={
            !isLoggedIn ||
            !customEncryptedMessage.trim() ||
            decryptStatus === "running"
          }
          onButtonClick={handleDecryptCustomMessage}
          extraContent={
            decryptedMessage ? (
              <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Decrypted:
                </p>
                <pre className="text-sm whitespace-pre-wrap break-all text-gray-800">
                  {decryptedMessage}
                </pre>
              </div>
            ) : null
          }
        />
      </div>

      {/* ── Activity Log ─────────────────────────────────────────────────── */}
      <ActivityLog steps={encryptSteps} title="encrypt-message" />

      {/* ── Server Storage ────────────────────────────────────────────────── */}
      <ServerStorage />
    </Container>
  );
};

export default EncryptMessage;
