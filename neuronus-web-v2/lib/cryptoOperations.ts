// src/utils/cryptoOperations.ts
import Words from '../data/constants/Seeds';

// Types
interface EncryptedPrivateKey {
  encryptedPrivateKey: string;
  iv: string;
  tag: string;
}

interface DeriveEncryptionKeyResult {
  encryptionKey: CryptoKey;
  encryptionBase64: string;
  salt: string;
}

interface PGPKeyPair {
  privateKey: string;
  publicKey: string;
}

interface SignupResult {
  loginHash: string;
  publicKey: string;
  encryptedPrivateKey: string;
  encryptedPrivateKeyIV: string;
  encryptedPrivateKeyTag: string;
  encSalt: string;
  createdAt: string;
}

interface UserCryptoData {
  publicKey: string;
  encryptedPrivateKey: string;
  encryptedPrivateKeyIV: string;
  encryptedPrivateKeyTag: string;
  encSalt: string;
}

interface LoginResponse {
  access: string;
  cryptographic_data: {
    public_key: string;
    encrypted_private_key: string;
    encrypted_private_key_iv: string;
    encrypted_private_key_tag: string;
    enc_salt: string;
  };
}

interface LoginResult {
  success: boolean;
  userCryptoData: UserCryptoData;
}

// 1. Generate Secure Seed Phrase
export async function generateSeedPhrase(): Promise<string> {
  const entropy = crypto.getRandomValues(new Uint8Array(16));
  const seedWords: string[] = [];
  
  for (let i = 0; i < 16; i++) {
    const randomIndex = entropy[i] % Words.length;
    seedWords.push(Words[randomIndex]);
  }
  
  return seedWords.join(' ');
}

async function getOpenPGP() {
  if (typeof window !== 'undefined' && (window as any).openpgp) {
    return (window as any).openpgp;
  }
  
  // Dynamically load the minified script if not present
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/openpgp@5.11.0/dist/openpgp.min.js';
    script.onload = () => resolve((window as any).openpgp);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 2. Derive Seeds Hash
export async function deriveSeedsHash(seedPhrase: string): Promise<{ loginHash: string }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(seedPhrase);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const loginHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return { loginHash };
}

// 3. Derive Encryption Key (using proper KDF)
export async function deriveEncryptionKey(
  seedPhrase: string, 
  saltBase64: string | null = null
): Promise<DeriveEncryptionKeyResult> {
  const encoder = new TextEncoder();
  const seedBuffer = encoder.encode(seedPhrase);
  const saltBuffer = saltBase64 
    ? base64ToArrayBuffer(saltBase64) 
    : crypto.getRandomValues(new Uint8Array(16));

  // Import raw seed
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    seedBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  );

  // Derive AES-GCM key
  const encryptionKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const exportedKey = await crypto.subtle.exportKey("raw", encryptionKey);
  const keyBase64 = arrayBufferToBase64(exportedKey);

  return {
    encryptionKey,
    encryptionBase64: keyBase64,
    salt: arrayBufferToBase64(saltBuffer)
  };
}

// 4. Generate PGP Key Pair (REAL PGP - Production Ready)
export async function generateKeyPair(): Promise<PGPKeyPair> {
  const openpgp = await getOpenPGP();
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa',
    rsaBits: 2048,
    userIDs: [{ name: 'Demo User' }]
  });

  return { privateKey, publicKey };
}

// 5. Encrypt Private Key (AES-GCM)
export async function encryptPrivateKey(
  privateKey: string, 
  encryptionKey: CryptoKey
): Promise<EncryptedPrivateKey> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const privateKeyBuffer = new TextEncoder().encode(privateKey);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    encryptionKey,
    privateKeyBuffer
  );

  // Extract the tag (typically 16 bytes for AES-GCM)
  const tagLength = 16;
  const encryptedData = encrypted.slice(0, encrypted.byteLength - tagLength);
  const tag = encrypted.slice(encrypted.byteLength - tagLength);

  return {
    encryptedPrivateKey: arrayBufferToBase64(encryptedData),
    iv: arrayBufferToBase64(iv),
    tag: arrayBufferToBase64(tag)
  };
}

export async function decryptPrivateKey(
  encryptedData: string, 
  iv: string, 
  tag: string, 
  encryptionKey: CryptoKey
): Promise<string> {
  const encryptedBuffer = base64ToArrayBuffer(encryptedData);
  const tagBuffer = base64ToArrayBuffer(tag);
  
  const combined = new Uint8Array(encryptedBuffer.byteLength + tagBuffer.byteLength);
  combined.set(new Uint8Array(encryptedBuffer), 0);
  combined.set(new Uint8Array(tagBuffer), encryptedBuffer.byteLength);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: base64ToArrayBuffer(iv)
    },
    encryptionKey,
    combined
  );

  return new TextDecoder().decode(decrypted);
}

export async function encryptUserData(
  userData: string, 
  publicKeyArmored: string
): Promise<string> {
  const openpgp = await getOpenPGP();
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: userData }),
    encryptionKeys: publicKey
  });

  return encrypted;
}

// 7. Complete Production Signup Flow
export async function storeEncryptionKey(key: string): Promise<{ success: boolean }> {
  try {
    localStorage.setItem('encryption-key', key);
    return { success: true };
  } catch (error) {
    throw new Error('Failed to store seed phrase');
  }
}

export async function importAesKeyFromBase64(base64Key: string): Promise<CryptoKey> {
  const rawKey = base64ToArrayBuffer(base64Key);

  return crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function getStoredEncryptionKey(): Promise<CryptoKey> {
  try {
    const base64Key = localStorage.getItem('encryption-key');
    if (!base64Key) {
      throw new Error('No encryption key found in storage');
    }

    // Convert Base64 → CryptoKey
    const cryptoKey = await importAesKeyFromBase64(base64Key);
    return cryptoKey;

  } catch (error) {
    throw new Error('Failed to load encryption key');
  }
}

export async function performSignup(seedPhrase: string): Promise<SignupResult> {
  try {
    const { loginHash } = await deriveSeedsHash(seedPhrase);
    const { encryptionKey, encryptionBase64, salt } = await deriveEncryptionKey(seedPhrase);
    const { privateKey, publicKey } = await generateKeyPair();
    const encryptedPrivate = await encryptPrivateKey(privateKey, encryptionKey);
    await storeEncryptionKey(encryptionBase64);

    return {
      loginHash,
      publicKey,
      encryptedPrivateKey: encryptedPrivate.encryptedPrivateKey,
      encryptedPrivateKeyIV: encryptedPrivate.iv,
      encryptedPrivateKeyTag: encryptedPrivate.tag,
      encSalt: salt,
      createdAt: new Date().toISOString(),
    };

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
    throw new Error('Signup failed: Unknown error');
  }
}

// 9. Login Flow 
export async function handleSuccessfulLogin(
  loginResponse: LoginResponse, 
  seedPhrase: string
): Promise<LoginResult> {
  try {
    const { access, cryptographic_data } = loginResponse;

    localStorage.setItem('access_token', access);

    const userCryptoData: UserCryptoData = {
      publicKey: cryptographic_data.public_key,
      encryptedPrivateKey: cryptographic_data.encrypted_private_key,
      encryptedPrivateKeyIV: cryptographic_data.encrypted_private_key_iv,
      encryptedPrivateKeyTag: cryptographic_data.encrypted_private_key_tag,
      encSalt: cryptographic_data.enc_salt,
    };

    localStorage.setItem('crypto_data', JSON.stringify(userCryptoData));

    const { encryptionBase64 } = await deriveEncryptionKey(seedPhrase, cryptographic_data.enc_salt);
    await storeEncryptionKey(encryptionBase64);

    try {
      return {
        success: true,
        userCryptoData,
      };
    } catch (decryptError) {
      return {
        success: true,
        userCryptoData,
      };
    }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login processing failed: ${error.message}`);
    }
    throw new Error('Login processing failed: Unknown error');
  }
}

export function logoutUser(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('crypto_data');
  localStorage.removeItem('encryption-key');
  localStorage.removeItem('is_2fa');
}

// 10. Utility Functions
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...bytes));
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return bytes.buffer;
}

export async function encryptAnyData(data: string | object): Promise<string> {
  const openpgp = await getOpenPGP();
  try {
    const cryptoData = localStorage.getItem("crypto_data");
    if (!cryptoData) {
      throw new Error("No cryptographic data found. Please login first.");
    }

    const parsedCryptoData = JSON.parse(cryptoData);
    const publicKeyToUse = parsedCryptoData.publicKey;

    if (!data) {
      throw new Error("No data provided for encryption.");
    }

    let dataString: string;
    if (typeof data === 'string') {
      dataString = data;
    } else if (typeof data === 'object') {
      dataString = JSON.stringify(data);
    } else {
      dataString = String(data);
    }

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyToUse });
    const message = await openpgp.createMessage({ text: dataString });
    const encrypted = await openpgp.encrypt({
      message: message,
      encryptionKeys: publicKey,
      config: {
        preferredCompressionAlgorithm: openpgp.enums.compression.zlib
      }
    });

    return encrypted;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
    throw new Error('Encryption failed: Unknown error');
  }
}

export async function decryptAnyData(encryptedDataArmored: string): Promise<string | object> {
  const openpgp = await getOpenPGP();
  try {
    if (!encryptedDataArmored) {
      throw new Error("No encrypted data provided.");
    }

    const cryptoData = localStorage.getItem("crypto_data");
    if (!cryptoData) {
      throw new Error("No cryptographic data found. Please login first.");
    }

    const parsedCryptoData: UserCryptoData = JSON.parse(cryptoData);
    const encryptionKey = await getStoredEncryptionKey();

    // Decrypt the private key
    const privateKey = await decryptPrivateKey(
      parsedCryptoData.encryptedPrivateKey,
      parsedCryptoData.encryptedPrivateKeyIV,
      parsedCryptoData.encryptedPrivateKeyTag,
      encryptionKey
    );

    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
    const message = await openpgp.readMessage({
      armoredMessage: encryptedDataArmored
    });
    
    const { data: decryptedString } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKeyObj
    });

    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
    throw new Error('Decryption failed: Unknown error');
  }
}

export default {
  generateSeedPhrase,
  performSignup,
  deriveSeedsHash,
};