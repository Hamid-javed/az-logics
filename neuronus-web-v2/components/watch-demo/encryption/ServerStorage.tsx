"use client";
import { useState } from "react";
import { useCrypto } from "../../../context/CryptoContext";

// ── Accordion ────────────────────────────────────────────────────────────────

interface AccordionProps {
  title: React.ReactNode;
  preview: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection = ({
  title,
  preview,
  isOpen,
  onToggle,
  children,
}: AccordionProps) => (
  <div className="border-t border-gray-100 pt-4">
    <button
      className="w-full flex items-center gap-3 bg-transparent border-none px-2 py-3 cursor-pointer text-left rounded-lg transition-all hover:bg-gray-50 active:bg-gray-100"
      onClick={onToggle}
    >
      <div className="flex-1 font-semibold text-sm text-gray-800">{title}</div>
      <div className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded">
        {preview}
      </div>
      <div
        className={`transition-transform duration-200 text-gray-400 text-xs ${isOpen ? "rotate-180" : ""}`}
      >
        ▼
      </div>
    </button>
    {isOpen && (
      <div className="ml-3 mt-2 pl-3 border-l-2 border-blue-200">
        {children}
      </div>
    )}
  </div>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const prettyPreview = (str?: string) =>
  str ? `${str.substring(0, 8)}…${str.substring(str.length - 8)}` : "—";

// ── ServerStorage ─────────────────────────────────────────────────────────────

const ServerStorage = () => {
  const {
    serverRecord,
    copiedField,
    copyToClipboard,
    handleLogout,
    isLoggedIn,
  } = useCrypto();
  const [openSection, setOpenSection] = useState<string>("loginHash");

  const toggle = (id: string) =>
    setOpenSection((prev) => (prev === id ? "" : id));

  const CopyBtn = ({ text, field }: { text?: string; field: string }) => (
    <button
      onClick={() => text && copyToClipboard(text, field)}
      disabled={!text}
      className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors font-medium disabled:opacity-40"
    >
      {copiedField === field ? "Copied!" : "Copy"}
    </button>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Server Storage</h2>
        <span className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded-full">
          {serverRecord ? "Stored" : "Empty"}
        </span>
      </div>

      <div className="space-y-2">
        {/* Login Hash */}
        <AccordionSection
          title={
            <div className="flex items-center gap-2">
              <span>Login Hash</span>
              {isLoggedIn && (
                <span className="flex items-center gap-1 text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </span>
              )}
            </div>
          }
          preview={prettyPreview(serverRecord?.loginHash)}
          isOpen={openSection === "loginHash"}
          onToggle={() => toggle("loginHash")}
        >
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600 font-medium">
                Derived from seed phrase (PBKDF2)
              </span>
              <CopyBtn text={serverRecord?.loginHash} field="loginHash" />
            </div>
            <code className="text-xs break-all font-mono block bg-white p-2 rounded border">
              {serverRecord?.loginHash || "No data available"}
            </code>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Length: {serverRecord?.loginHash?.length || 0} chars</span>
              <span>Hash: PBKDF2-SHA256</span>
            </div>
          </div>
        </AccordionSection>

        {/* Public Key */}
        <AccordionSection
          title="Public Key"
          preview={serverRecord?.publicKey ? "RSA Key" : "—"}
          isOpen={openSection === "publicKey"}
          onToggle={() => toggle("publicKey")}
        >
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-blue-700 font-medium">
                Public Key (RSA-OAEP)
              </span>
              <CopyBtn text={serverRecord?.publicKey} field="publicKey" />
            </div>
            <pre className="text-xs whitespace-pre-wrap max-h-40 overflow-auto bg-white p-2 rounded border font-mono">
              {serverRecord?.publicKey || "No public key generated"}
            </pre>
            <div className="flex justify-between mt-2 text-xs text-blue-600">
              <span>Used for encryption</span>
              <span>RSA-OAEP SHA-256</span>
            </div>
          </div>
        </AccordionSection>

        {/* Encrypted Private Key */}
        <AccordionSection
          title="Encrypted Private Key"
          preview={serverRecord?.encryptedPrivateKey ? "AES-256-GCM" : "—"}
          isOpen={openSection === "privateKey"}
          onToggle={() => toggle("privateKey")}
        >
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-300">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-purple-700 font-medium">
                  Encrypted Private Key (AES-256-GCM)
                </span>
                <CopyBtn
                  text={serverRecord?.encryptedPrivateKey}
                  field="encryptedPrivateKey"
                />
              </div>
              <code className="text-xs break-all max-h-40 overflow-auto font-mono block bg-white p-2 rounded border">
                {serverRecord?.encryptedPrivateKey ||
                  "No encrypted private key"}
              </code>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-purple-50 rounded border border-purple-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-purple-600">
                    Initialization Vector
                  </span>
                  <CopyBtn
                    text={serverRecord?.encryptedPrivateKeyIV}
                    field="encryptedPrivateKeyIV"
                  />
                </div>
                <code className="text-xs font-mono block">
                  {serverRecord?.encryptedPrivateKeyIV
                    ? prettyPreview(serverRecord.encryptedPrivateKeyIV)
                    : "—"}
                </code>
              </div>
              <div className="p-2 bg-purple-50 rounded border border-purple-200">
                <div className="text-xs text-purple-600 mb-1">Algorithm</div>
                <div className="text-xs font-medium">AES-256-GCM</div>
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* Encrypted Message */}
        <AccordionSection
          title="Encrypted Message"
          preview={serverRecord?.encryptedUserData ? "Encrypted" : "—"}
          isOpen={openSection === "message"}
          onToggle={() => toggle("message")}
        >
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-orange-700 font-medium">
                Encrypted User Data
              </span>
              <CopyBtn
                text={serverRecord?.encryptedUserData}
                field="encryptedUserData"
              />
            </div>
            <pre className="text-xs whitespace-pre-wrap max-h-40 overflow-auto bg-white p-2 rounded border font-mono">
              {serverRecord?.encryptedUserData || "No encrypted message stored"}
            </pre>
            <div className="flex justify-between mt-2 text-xs text-orange-600">
              <span>End-to-end encrypted</span>
              <span>RSA-OAEP Standard</span>
            </div>
          </div>
        </AccordionSection>

        {/* Technical Details */}
        <AccordionSection
          title="Technical Details"
          preview="Crypto Info"
          isOpen={openSection === "technical"}
          onToggle={() => toggle("technical")}
        >
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-2">
                <div>
                  <div className="text-gray-600 font-medium">Key Algorithm</div>
                  <div className="text-gray-800">RSA-OAEP 2048</div>
                </div>
                <div>
                  <div className="text-gray-600 font-medium">Encryption</div>
                  <div className="text-gray-800">AES-256-GCM</div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-gray-600 font-medium">
                    Key Derivation
                  </div>
                  <div className="text-gray-800">PBKDF2-SHA256</div>
                </div>
                <div>
                  <div className="text-gray-600 font-medium">Login Hashing</div>
                  <div className="text-gray-800">PBKDF2 100k iter</div>
                </div>
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* Logout */}
        {isLoggedIn && (
          <div className="pt-4 mt-4 border-t border-gray-200">
            <button
              className="w-full bg-red-100 text-red-700 py-2 rounded-lg font-medium text-sm transition-all hover:bg-red-200"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerStorage;
