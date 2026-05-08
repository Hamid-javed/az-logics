export const signupFlowActivityLogs = [
  {
    title: "Signup Process",
    pill: "Pending",
    description: "Creating your secure account with encrypted keys",
    logs: [
      "Seeds never leaves your browser.",
      "Ready for cryptographic operations",
      "Deriving cryptographic keys (Login Hash + Encryption Key) from seeds",
      "Generating PGP key pair",
      "Encrypting private key using AES-256-GCM with derived (Encryption Key)",
      "Storing encrypted data on server",
    ],
  },
];

export const encryptMessagectivityLogs = [
  {
    title: "Encrypt message",
    pill: "Pending",
    description: "Encrypting your message using public key cryptography",
    logs: [
      "Using stored public key for encryption",
      "Creating PGP encrypted message",
      "Storing encrypted message on server",
    ],
  },
  {
    title: "Decrypt message",
    pill: "Pending",
    description: "Decrypting message using your seed-derived keys",
    logs: [
      "Deriving keys from seed phrase",
      "Decrypting private key",
      "PGP decrypting the message",
      "Displaying original content",
    ],
  },
];
