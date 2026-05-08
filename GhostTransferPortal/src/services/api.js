import axios from "axios";
import moment from "moment-timezone";
import { encryptFile } from "../utils/cryptoOperations";

// Base API configuration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FILE_SHARE_BASE_URL = import.meta.env.VITE_FILE_SHARE_BASE_URL;

console.log(FILE_SHARE_BASE_URL, "   |||   ", API_BASE_URL);

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error("API Response Error:", error);
        return Promise.reject(error);
    }
);

/**
 * Generate a random encryption key of length 15-18 characters
 * @returns {string} Random key string
 */
export function generateRandomKey() {
    const length = Math.floor(Math.random() * 4) + 15; // Random length between 15-18
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*';
    let key = '';
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < length; i++) {
        key += charset[randomValues[i] % charset.length];
    }
    return key;
}

/**
 * Encrypt a file and return the encrypted hash instead of uploading
 * @param {File} file - The file to encrypt
 * @param {boolean} isPublic - Whether the file should be public (kept for compatibility, not used)
 * @param {string|null} encryptionKey - Optional encryption key to use. If not provided, generates a new one.
 * @returns {Promise<Object>} - Object with encrypted hash (as url) and encryption key
 */
export const uploadFile = async (file, isPublic = false, encryptionKey = null) => {
    try {
        // Use provided key or generate a new random encryption key (15-18 characters)
        const key = encryptionKey || generateRandomKey();

        // Encrypt the file using the key
        const encryptedHash = await encryptFile(file, key);

        // Return the encrypted hash as the "url" and include the key
        return {
            url: encryptedHash,
            key: key
        };
    } catch (error) {
        console.error("File encryption error:", error);
        throw new Error(`Failed to encrypt file: ${error.message}`);
    }
};

/**
 * Hash message text using SHA-256 (same method as files)
 * @param {string} messageText - The message text to hash
 * @returns {Promise<string>} Hex string representation of the hash
 */
async function hashMessageText(messageText) {
    const encoder = new TextEncoder();
    const messageBuffer = encoder.encode(messageText);
    const hashBuffer = await crypto.subtle.digest('SHA-256', messageBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Convert string to base64
 * @param {string} text - Text to convert
 * @returns {string} Base64 encoded string
 */
function stringToBase64(text) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const chunkSize = 0x8000; // 32KB chunks
    let binary = '';
    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
        binary += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binary);
}

/**
 * Convert ArrayBuffer to base64
 * @param {ArrayBuffer} buffer - Buffer to convert
 * @returns {string} Base64 encoded string
 */
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

/**
 * Hash user key using SHA-256
 * @param {string} userKey - The user's encryption key
 * @returns {Promise<ArrayBuffer>} Hashed key as ArrayBuffer
 */
async function hashUserKey(userKey) {
    const encoder = new TextEncoder();
    const data = encoder.encode(userKey);
    return await crypto.subtle.digest('SHA-256', data);
}

/**
 * Import AES key for encryption
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
 * Encrypt a message and return the encrypted hash (same method as files)
 * @param {string} message - The message text to encrypt
 * @param {string|null} encryptionKey - Optional encryption key to use. If not provided, generates a new one.
 * @returns {Promise<Object>} - Object with encrypted hash (as url) and encryption key
 */
export const encryptMessage = async (message, encryptionKey = null) => {
    try {
        if (!message || message.trim().length === 0) {
            return { url: null, key: encryptionKey };
        }

        // Use provided key or generate a new random encryption key (15-18 characters)
        const key = encryptionKey || generateRandomKey();

        // Get encryption key (hash the user key)
        const hashedKey = await hashUserKey(key);
        const aesKey = await importAESKey(hashedKey);

        // Hash the message text - SHA-256 produces a 32-byte hash (256 bits)
        const messageHash = await hashMessageText(message);

        // Convert message to base64 for storage
        const base64Data = stringToBase64(message);

        // Create compact object with hash and message data (same structure as files)
        const hashData = {
            h: messageHash,      // hash
            m: 'text/plain',     // mimeType
            d: base64Data       // data
        };

        const hashDataString = JSON.stringify(hashData);

        // Encrypt the hash data using AES-GCM (same as files)
        const encrypted = await encryptWithAES(hashDataString, aesKey);

        // Return the encrypted hash as the "url" and include the key
        return {
            url: encrypted,
            key: key
        };
    } catch (error) {
        console.error("Message encryption error:", error);
        throw new Error(`Failed to encrypt message: ${error.message}`);
    }
};

/**
 * Generate a secret share URL
 * @param {Object} params - Share parameters
 * @param {string[]} params.files - Array of file URLs
 * @param {string|null} params.message - Optional message
 * @param {string|null} params.password - Optional password
 * @param {number|null} params.maxViews - Maximum number of views
 * @param {string|null} params.expiresAt - Expiration datetime (naive format)
 * @param {string|null} params.allowedIp - Allowed IP addresses
 * @param {string|null} params.timezone - Timezone for expiration
 * @returns {Promise<Object>} - Generated share response
 */
export const generateShareUrl = async ({
    files,
    message = null,
    password = null,
    maxViews = null,
    expiresAt = null,
    allowedIp = null,
    timezone = null,
}) => {
    const requestBody = {
        files,
        message,
        password,
        max_views: maxViews,
        expires_at: expiresAt,
        allowed_ip: allowedIp,
        timezone,
    };

    // Remove null/undefined values
    Object.keys(requestBody).forEach((key) => {
        if (requestBody[key] === null || requestBody[key] === undefined) {
            delete requestBody[key];
        }
    });

    console.log("Generating share URL with params:", requestBody);

    const response = await apiClient.post("/api/file-share/generate-url/", requestBody);

    console.log("API Response:", response.data);
    return response.data;
};

/**
 * Auto-detect user timezone
 * @returns {string} - Detected timezone or fallback
 */
export const detectTimezone = () => {
    try {
        return moment.tz.guess();
    } catch (error) {
        console.warn("Could not detect timezone, using fallback:", error);
        return "Asia/Karachi";
    }
};

/**
 * Calculate expiration time based on lifetime selection
 * @param {string} lifetime - Lifetime option (5m, 30m, 1h, etc.)
 * @returns {Object} - { expiresAt: string|null, timezone: string }
 */
export const calculateExpiration = (lifetime) => {
    const timezone = detectTimezone();
    let expiresAt = null;

    if (lifetime) {
        const now = moment();
        let expirationTime;

        switch (lifetime) {
            case "5m":
                expirationTime = now.clone().add(5, "minutes");
                break;
            case "30m":
                expirationTime = now.clone().add(30, "minutes");
                break;
            case "1h":
                expirationTime = now.clone().add(1, "hour");
                break;
            case "4h":
                expirationTime = now.clone().add(4, "hours");
                break;
            case "12h":
                expirationTime = now.clone().add(12, "hours");
                break;
            case "1d":
                expirationTime = now.clone().add(1, "day");
                break;
            case "3d":
                expirationTime = now.clone().add(3, "days");
                break;
            case "7d":
                expirationTime = now.clone().add(7, "days");
                break;
            default:
                expirationTime = null;
        }

        if (expirationTime) {
            // Format as naive datetime (no timezone info) - format: 2025-09-27T15:40:59
            expiresAt = expirationTime.format("YYYY-MM-DDTHH:mm:ss");
        }
    }

    return { expiresAt, timezone };
};

/**
 * Format file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted size string
 */
export const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(value >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const Secret_Link_Base_URL = FILE_SHARE_BASE_URL;
// Export API base URL for use in other components
export { API_BASE_URL, Secret_Link_Base_URL };

export default apiClient;
