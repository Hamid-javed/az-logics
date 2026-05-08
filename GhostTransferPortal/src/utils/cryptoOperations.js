// src/utils/cryptoOperations.js
// Using Web Crypto API with AES-GCM for symmetric encryption

/**
 * Hash a user-provided key using SHA-256
 * @param {string} userKey - The user's encryption key
 * @returns {Promise<ArrayBuffer>} Hashed key as ArrayBuffer
 */
async function hashUserKey(userKey) {
    const encoder = new TextEncoder();
    const data = encoder.encode(userKey);
    return await crypto.subtle.digest('SHA-256', data);
}

/**
 * Hash file binary data using SHA-256
 * @param {ArrayBuffer|Uint8Array} fileBinary - The file binary data
 * @returns {Promise<string>} Hex string representation of the hash
 */
async function hashFileBinary(fileBinary) {
    const arrayBuffer = fileBinary instanceof ArrayBuffer
        ? fileBinary
        : fileBinary.buffer;

    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Import a hashed key for AES-GCM encryption/decryption
 * @param {ArrayBuffer} hashedKey - The hashed key as ArrayBuffer
 * @returns {Promise<CryptoKey>} Imported AES-GCM key
 */
async function importAESKey(hashedKey) {
    return await crypto.subtle.importKey(
        'raw',
        hashedKey,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Get the encryption key from user input or storage
 * @param {string} userKey - Optional user key (if provided, will hash and use it)
 * @returns {Promise<CryptoKey>} AES-GCM key ready for encryption/decryption
 */
async function getEncryptionKey(userKey = null) {
    let hashedKey;

    if (userKey && userKey.trim().length > 0) {
        hashedKey = await hashUserKey(userKey);
    } else {
        const storedKeyHashBase64 = localStorage.getItem('user_encryption_key_hash');
        if (!storedKeyHashBase64) {
            throw new Error('No encryption key found. Please enter your encryption key.');
        }
        hashedKey = base64ToArrayBuffer(storedKeyHashBase64);
    }

    return await importAESKey(hashedKey);
}

/**
 * Setup encryption environment with user key
 * @param {string} userKey - User's encryption key
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function setupDemoEnvironment(userKey) {
    try {
        if (!userKey || typeof userKey !== 'string' || userKey.trim().length === 0) {
            throw new Error('Please provide a valid encryption key');
        }

        console.log("Setting up encryption with user key...");

        const hashedKey = await hashUserKey(userKey);

        // Convert to base64 for storage
        const hashedKeyBytes = new Uint8Array(hashedKey);
        const chunkSize = 0x8000; // 32KB chunks
        let binary = '';
        for (let i = 0; i < hashedKeyBytes.length; i += chunkSize) {
            const chunk = hashedKeyBytes.subarray(i, Math.min(i + chunkSize, hashedKeyBytes.length));
            binary += String.fromCharCode.apply(null, chunk);
        }
        const hashedKeyBase64 = btoa(binary);

        localStorage.setItem('user_encryption_key_hash', hashedKeyBase64);

        return {
            success: true,
            message: 'Encryption key set successfully'
        };
    } catch (error) {
        console.error("Setup failed:", error);
        throw error;
    }
}

// Utility Functions
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000; // 32KB chunks
    let binary = '';

    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
        binary += String.fromCharCode.apply(null, chunk);
    }

    return btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

/**
 * Encrypt data using AES-GCM
 * @param {string} data - Data to encrypt
 * @param {CryptoKey} key - AES-GCM key
 * @returns {Promise<string>} Base64 encoded encrypted data with IV and tag
 */
async function encryptWithAES(data, key) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        dataBuffer
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);

    return arrayBufferToBase64(combined);
}

/**
 * Decrypt data using AES-GCM
 * @param {string} encryptedBase64 - Base64 encoded encrypted data with IV
 * @param {CryptoKey} key - AES-GCM key
 * @returns {Promise<string>} Decrypted data
 */
async function decryptWithAES(encryptedBase64, key) {
    const combined = base64ToArrayBuffer(encryptedBase64);

    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}

/**
 * Convert file to ArrayBuffer (binary)
 * @param {File|Blob|string} fileInput - File, blob, or base64 string
 * @returns {Promise<ArrayBuffer>} File binary as ArrayBuffer
 */
async function fileToArrayBuffer(fileInput) {
    try {
        if (typeof fileInput === 'string') {
            if (fileInput.startsWith('data:')) {
                const base64 = fileInput.split(',')[1];
                return base64ToArrayBuffer(base64);
            } else {
                return base64ToArrayBuffer(fileInput);
            }
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(fileInput);
        });
    } catch (error) {
        throw new Error(`Failed to convert file to binary: ${error.message}`);
    }
}

/**
 * Get MIME type from file input
 * @param {File|Blob|string} fileInput - File input
 * @returns {Promise<string>} MIME type
 */
async function getFileMimeType(fileInput) {
    if (fileInput instanceof File) {
        return fileInput.type || 'application/octet-stream';
    }

    if (fileInput instanceof Blob) {
        return fileInput.type || 'application/octet-stream';
    }

    if (typeof fileInput === 'string') {
        if (fileInput.startsWith('data:')) {
            const match = fileInput.match(/data:([^;]+)/);
            return match ? match[1] : 'application/octet-stream';
        }
    }

    return 'application/octet-stream';
}

/**
 * Convert file to base64 data URL for display/download
 * @param {File|Blob|string} fileInput - File input
 * @param {string} mimeType - MIME type
 * @returns {Promise<string>} Base64 data URL
 */
async function fileToBase64DataURL(fileInput, mimeType) {
    if (typeof fileInput === 'string' && fileInput.startsWith('data:')) {
        return fileInput;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            // Ensure correct MIME type in data URL
            if (!result.startsWith(`data:${mimeType}`)) {
                const base64 = result.split(',')[1] || result;
                resolve(`data:${mimeType};base64,${base64}`);
            } else {
                resolve(result);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(fileInput);
    });
}

/**
 * Encrypt any file by hashing its binary and encrypting the hash
 * Supports all file types: PDF, images, documents, etc.
 * @param {File|Blob|string} fileInput - File, blob, or base64 string
 * @param {string} userKey - Optional user key
 * @returns {Promise<string>} Base64 encoded encrypted hash (short and fast)
 */
export async function encryptFile(fileInput, userKey = null) {
    try {
        if (!fileInput) {
            throw new Error("No file provided for encryption.");
        }

        const encryptionKey = await getEncryptionKey(userKey);

        // Convert file to binary
        const fileBinary = await fileToArrayBuffer(fileInput);

        // Hash the file binary - SHA-256 produces a 32-byte hash (256 bits)
        const fileHash = await hashFileBinary(fileBinary);

        // Get MIME type
        const mimeType = await getFileMimeType(fileInput);

        // Convert file to base64 for storage
        let base64Data;
        if (typeof fileInput === 'string' && fileInput.startsWith('data:')) {
            base64Data = fileInput.split(',')[1];
        } else {
            const dataURL = await fileToBase64DataURL(fileInput, mimeType);
            base64Data = dataURL.split(',')[1];
        }

        // Create compact object with hash and file data
        const hashData = {
            h: fileHash,      // hash
            m: mimeType,      // mimeType
            d: base64Data     // data
        };

        const hashDataString = JSON.stringify(hashData);

        // Encrypt the hash data using AES-GCM
        const encrypted = await encryptWithAES(hashDataString, encryptionKey);

        return encrypted;

    } catch (error) {
        throw new Error(`File encryption failed: ${error.message}`);
    }
}

/**
 * Decrypt an encrypted file hash to get back the file data
 * Supports all file types: PDF, images, documents, etc.
 * @param {string} encryptedHashBase64 - Base64 encoded encrypted hash data
 * @param {string} userKey - Optional user key
 * @returns {Promise<{blob: Blob, dataUrl: string, mimeType: string, hash: string, fileName?: string}>} Decrypted file data
 */
export async function decryptFile(encryptedHashBase64, userKey = null) {
    try {
        if (!encryptedHashBase64) {
            throw new Error("No encrypted hash provided.");
        }

        const key = await getEncryptionKey(userKey);

        // Decrypt the encrypted hash data
        const decryptedString = await decryptWithAES(encryptedHashBase64, key);

        // Parse the decrypted hash data
        const hashData = JSON.parse(decryptedString);
        const fileHash = hashData.h || hashData.hash;
        const mimeType = hashData.m || hashData.mimeType || 'application/octet-stream';
        const base64Data = hashData.d || hashData.data;

        // Verify hash by re-hashing the base64 data
        const fileBinary = base64ToArrayBuffer(base64Data);
        const computedHash = await hashFileBinary(fileBinary);

        if (computedHash !== fileHash) {
            console.warn('Hash verification failed - data may be corrupted');
        }

        // Convert base64 to Blob
        const blob = new Blob([fileBinary], { type: mimeType });

        // Create data URL for display/download
        const dataUrl = `data:${mimeType};base64,${base64Data}`;

        return {
            blob,
            dataUrl,
            mimeType: mimeType,
            hash: fileHash
        };

    } catch (error) {
        throw new Error(`File decryption failed: ${error.message}`);
    }
}

// Legacy function names for backward compatibility
export async function encryptImage(imageInput, userKey = null) {
    return encryptFile(imageInput, userKey);
}

export async function decryptImage(encryptedHashBase64, userKey = null) {
    return decryptFile(encryptedHashBase64, userKey);
}

export default {
    setupDemoEnvironment,
    encryptFile,
    decryptFile,
    encryptImage,  // Legacy alias
    decryptImage   // Legacy alias
};
