"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

// ─── Crypto Utilities (ported from cryptoOperations.js) ────────────────────

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;
}

const WORD_LIST = [
  "abandon","ability","able","about","above","absent","absorb","abstract",
  "absurd","abuse","access","accident","account","accuse","achieve","acid",
  "acoustic","acquire","across","act","action","actor","actress","actual",
  "adapt","add","addict","address","adjust","admit","adult","advance",
  "advice","aerobic","affair","afford","afraid","again","age","agent",
  "agree","ahead","aim","air","airport","aisle","alarm","album",
  "alcohol","alert","alien","all","alley","allow","almost","alone",
  "alpha","already","also","alter","always","amateur","amazing","among",
  "amount","amused","analyst","anchor","ancient","anger","angle","angry",
  "dial","diamond","diary","dice","diesel","diet","differ","digital",
  "dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover",
  "disease","dish","dismiss","disorder","display","distance","divert","divide",
  "divorce","dizzy","doctor","document","dog","doll","dolphin","domain",
  "donate","donkey","donor","door","dose","double","dove","draft",
  "dragon","drama","drastic","draw","dream","dress","drift","drill",
  "drink","drip","drive","drop","drum","dry","duck","dumb",
  "dune","during","dust","dutch","duty","dwarf","dynamic","eager",
  "eagle","early","earn","earth","easily","east","easy","echo",
  "ecology","economy","edge","edit","educate","effort","egg","eight",
  "either","elbow","elder","electric","elegant","element","elephant","elevator",
  "elite","else","embark","embody","embrace","emerge","emotion","employ",
  "empower","empty","enable","enact","end","endless","endorse","enemy",
  "energy","enforce","engage","engine","enhance","enjoy","enlist","enough",
  "enrich","enroll","ensure","enter","entire","entry","envelope","episode",
  "equal","equip","era","erase","erode","erosion","error","erupt",
  "escape","essay","essence","estate","eternal","ethics","evidence","evil",
  "evoke","evolve","exact","example","exceed","excel","exception","excess",
  "exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit",
  "exile","exist","exit","exotic","expand","expect","expire","explain",
  "expose","express","extend","extra","eye","eyebrow","fabric","face",
  "faculty","fade","faint","faith","fall","false","fame","family",
  "famous","fan","fancy","fantasy","farm","fashion","fat","fatal",
  "father","fatigue","fault","favorite","feature","february","federal","fee",
  "feed","feel","female","fence","festival","fetch","fever","few",
  "fiber","fiction","field","figure","file","film","filter","final",
  "find","fine","finger","finish","fire","firm","first","fiscal",
  "jealous","jeans","jelly","jewel","job","join","joke","journey",
  "joy","judge","juice","jump","jungle","junior","junk","just",
  "kangaroo","keen","keep","ketchup","key","kick","kid","kidney",
  "kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi",
  "knee","knife","knock","know","lab","label","labor","ladder",
  "lady","lake","lamp","language","laptop","large","later","latin",
  "make","mammal","man","manage","mandate","mango","mansion","manual",
  "milk","million","mimic","mind","minimum","minor","minute","miracle",
  "mirror","misery","miss","mistake","mix","mixed","mixture","mobile",
  "nest","net","network","neutral","never","news","next","nice",
  "night","noble","noise","nominee","noodle","normal","north","nose",
  "notable","note","nothing","notice","novel","now","nuclear","number",
  "nurse","nut","oak","obey","object","oblige","obscure","observe",
  "obtain","obvious","occur","ocean","october","odor","off","offer",
  "office","often","oil","okay","old","olive","olympic","omit",
  "once","one","onion","online","only","open","opera","opinion",
  "oppose","option","orange","orbit","orchard","order","ordinary","organ",
  "orient","original","orphan","ostrich","other","outdoor","outer","output",
  "outside","oval","oven","over","own","owner","oxygen","oyster",
  "ozone","pact","paddle","page","pair","palace","palm","panda",
  "panel","panic","panther","paper","parade","parent","park","parrot",
  "party","pass","patch","path","patient","patrol","pattern","pause",
  "pave","payment","peace","peanut","pear","peasant","pelican","pen",
  "penalty","pencil","people","pepper","perfect","permit","person","pet",
  "phone","photo","phrase","physical","piano","picnic","picture","piece",
  "pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol",
  "pitch","pizza","place","planet","plastic","plate","play","player",
  "race","rack","radar","radio","rail","rain","raise","rally",
  "ramp","ranch","random","range","rapid","rare","rate","rather",
  "raven","raw","razor","ready","real","reason","rebel","rebuild",
  "recall","receive","recipe","record","recycle","reduce","reflect","reform",
  "refuse","region","regret","regular","reject","relax","release","relief",
  "rely","remain","remember","remind","remove","render","renew","rent",
  "reopen","repair","repeat","replace","report","require","rescue","resemble",
  "resist","resource","response","result","retire","retreat","return","reunion",
  "reveal","review","reward","rhythm","rib","ribbon","rice","rich",
  "siren","sister","situate","six","size","skate","sketch","ski",
  "skill","skin","skirt","skull","slab","slam","sleep","slender",
  "slice","slide","slight","slim","slogan","slot","slow","slush",
  "small","smart","smile","smoke","smooth","snack","snake","snap",
  "sniff","snow","soap","soccer","social","sock","soda","soft",
  "solar","soldier","solid","solution","solve","someone","song","soon",
  "sorry","sort","soul","sound","soup","source","south","space",
  "spare","spatial","spawn","speak","special","speed","spell","spend",
  "sphere","spice","spider","spike","spin","spirit","split","spoil",
  "sponsor","spoon","sport","spot","spray","spread","spring","spy",
  "square","squeeze","squirrel","stable","stadium","staff","stage","stairs",
  "taxi","teach","team","tell","ten","tenant","tennis","tent",
  "trash","travel","tray","treat","tree","trend","trial","tribe",
  "trick","trigger","trim","trip","trophy","trouble","truck","true",
  "truly","trumpet","trust","truth","try","tube","tuition","tumble",
  "tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice",
  "twin","twist","two","type","typical","ugly","umbrella","unable",
  "unaware","uncle","uncover","under","undo","unfair","unfold","unhappy",
  "uniform","unique","unit","universe","unknown","unlock","until","unusual",
  "unveil","update","upgrade","uphold","upon","upper","upset","urban",
  "urge","usage","use","used","useful","useless","usual","utility",
  "vacant","vacuum","vague","valid","valley","valve","van","vanish",
  "wine","wing","wink","winner","winter","wire","wisdom","wise",
  "wish","witness","wolf","woman","wonder","wood","wool","word",
  "work","world","worry","worth","wrap","wreck","wrestle","wrist",
  "write","wrong","yard","year","yellow","you","young","youth",
  "zebra","zero","zone","zoo",
];

async function generateSeedPhrase(): Promise<string> {
  const entropy = crypto.getRandomValues(new Uint8Array(16));
  const seedWords: string[] = [];
  for (let i = 0; i < 16; i++) {
    seedWords.push(WORD_LIST[entropy[i] % WORD_LIST.length]);
  }
  return seedWords.join(" ");
}

async function deriveLoginHash(seedPhrase: string): Promise<{ loginHash: string }> {
  // Use PBKDF2 as bcrypt isn't available natively in browser
  // We simulate bcrypt-style output using PBKDF2 with high iterations
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(seedPhrase),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const hashBase64 = arrayBufferToBase64(bits);
 const saltBase64 = arrayBufferToBase64(salt.buffer);
  // Format: $pbkdf2$salt$hash  (analogous to bcrypt $2b$12$...)
  const loginHash = `$pbkdf2$${saltBase64}$${hashBase64}`;
  return { loginHash };
}

async function verifyLoginHash(seedPhrase: string, loginHash: string): Promise<boolean> {
  try {
    const parts = loginHash.split("$");
    // parts: ['', 'pbkdf2', saltBase64, hashBase64]
    if (parts.length !== 4 || parts[1] !== "pbkdf2") return false;
    const salt = base64ToArrayBuffer(parts[2]);
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(seedPhrase),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: new Uint8Array(salt), iterations: 100000, hash: "SHA-256" },
      keyMaterial,
      256
    );
    return arrayBufferToBase64(bits) === parts[3];
  } catch {
    return false;
  }
}

async function deriveEncryptionKey(
  seedPhrase: string,
  saltBase64?: string | null
): Promise<{ encryptionKey: CryptoKey; encryptionBase64: string; salt: string }> {
  const encoder = new TextEncoder();
  const seedBuffer = encoder.encode(seedPhrase);
  const saltBuffer = saltBase64
    ? new Uint8Array(base64ToArrayBuffer(saltBase64))
    : crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey("raw", seedBuffer, "PBKDF2", false, ["deriveKey"]);
  const encryptionKey = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltBuffer, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  const exportedKey = await crypto.subtle.exportKey("raw", encryptionKey);
  return {
    encryptionKey,
    encryptionBase64: arrayBufferToBase64(exportedKey),
    salt: arrayBufferToBase64(saltBuffer.buffer),
  };
}

// Simple RSA-OAEP key pair (no openpgp dependency needed)
async function generateKeyPair(): Promise<{ privateKey: string; publicKey: string }> {
  const keyPair = await crypto.subtle.generateKey(
    { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true,
    ["encrypt", "decrypt"]
  );
  const pubExported = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privExported = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  return {
    publicKey: `-----BEGIN PUBLIC KEY-----\n${arrayBufferToBase64(pubExported)}\n-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN PRIVATE KEY-----\n${arrayBufferToBase64(privExported)}\n-----END PRIVATE KEY-----`,
  };
}

async function encryptPrivateKey(
  privateKey: string,
  encryptionKey: CryptoKey
): Promise<{ encryptedPrivateKey: string; iv: string; tag: string }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const privateKeyBuffer = new TextEncoder().encode(privateKey);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, encryptionKey, privateKeyBuffer);
  const tagLength = 16;
  const encryptedData = encrypted.slice(0, encrypted.byteLength - tagLength);
  const tag = encrypted.slice(encrypted.byteLength - tagLength);
  return {
    encryptedPrivateKey: arrayBufferToBase64(encryptedData),
    iv: arrayBufferToBase64(iv.buffer),
    tag: arrayBufferToBase64(tag),
  };
}

async function decryptPrivateKey(
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
    { name: "AES-GCM", iv: new Uint8Array(base64ToArrayBuffer(iv)) },
    encryptionKey,
    combined
  );
  return new TextDecoder().decode(decrypted);
}

async function importPublicKeyFromPem(pem: string): Promise<CryptoKey> {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = base64ToArrayBuffer(b64);
  return crypto.subtle.importKey("spki", der, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
}

async function importPrivateKeyFromPem(pem: string): Promise<CryptoKey> {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = base64ToArrayBuffer(b64);
  return crypto.subtle.importKey("pkcs8", der, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]);
}

async function encryptMessage(message: string, publicKeyPem: string): Promise<string> {
  const pubKey = await importPublicKeyFromPem(publicKeyPem);
  const encoded = new TextEncoder().encode(message);
  const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, pubKey, encoded);
  return `-----BEGIN ENCRYPTED MESSAGE-----\n${arrayBufferToBase64(encrypted)}\n-----END ENCRYPTED MESSAGE-----`;
}

async function decryptMessage(encryptedArmored: string, privateKeyPem: string): Promise<string> {
  const b64 = encryptedArmored.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const encrypted = base64ToArrayBuffer(b64);
  const privKey = await importPrivateKeyFromPem(privateKeyPem);
  const decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privKey, encrypted);
  return new TextDecoder().decode(decrypted);
}

async function importAesKeyFromBase64(base64Key: string): Promise<CryptoKey> {
  const rawKey = base64ToArrayBuffer(base64Key);
  return crypto.subtle.importKey("raw", rawKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ServerRecord {
  loginHash: string;
  publicKey: string;
  encryptedPrivateKey: string;
  encryptedPrivateKeyIV: string;
  encryptedPrivateKeyTag: string;
  encSalt: string;
  encryptedUserData?: string;
  messageCount?: number;
  lastUpdated?: string;
  createdAt: string;
}

export interface SubstepState {
  label: string;
  completed: boolean;
}

export interface StepState {
  id: string;
  title: string;
  description: string;
  status: "pending" | "active" | "completed" | "error";
  substeps: SubstepState[];
}

export interface CryptoContextValue {
  // State
  activeTab: "signup" | "encrypt";
  setActiveTab: (tab: "signup" | "encrypt") => void;
  seed: string;
  serverRecord: ServerRecord | null;
  isLoggedIn: boolean;

  // Signup
  signupStatus: "idle" | "running" | "done" | "error";
  handleSignup: () => Promise<void>;

  // Login
  loginSeedInput: string;
  setLoginSeedInput: (v: string) => void;
  loginStatus: "idle" | "logging-in" | "success" | "error";
  loginResult: { success: boolean; message: string; details?: string } | null;
  handleLogin: () => Promise<void>;

  // Decrypt private key
  decryptedPrivateKey: string;
  handleDecryptPrivateKey: () => Promise<void>;

  // Encrypt message
  messageInput: string;
  setMessageInput: (v: string) => void;
  handleEncryptAndStore: () => Promise<void>;
  encryptStatus: "idle" | "running" | "done" | "error";

  // Decrypt message
  customEncryptedMessage: string;
  setCustomEncryptedMessage: (v: string) => void;
  decryptedMessage: string | null;
  handleDecryptCustomMessage: () => Promise<void>;
  decryptStatus: "idle" | "running" | "done" | "error";

  // Steps (activity log)
  signupSteps: StepState[];
  encryptSteps: StepState[];

  // Clipboard
  copiedField: string | null;
  copyToClipboard: (text: string, field: string) => void;

  // Logout
  handleLogout: () => void;
}

// ─── Initial step configs ────────────────────────────────────────────────────

const makeSignupSteps = (): StepState[] => [
  {
    id: "step1",
    title: "Signup Process",
    description: "Creating your secure account with encrypted keys",
    status: "pending",
    substeps: [
      { label: "Seeds never leaves your browser.", completed: false },
      { label: "Ready for cryptographic operations", completed: false },
      { label: "Deriving cryptographic keys (Login Hash + Encryption Key) from seeds", completed: false },
      { label: "Generating key pair", completed: false },
      { label: "Encrypting private key using AES-256-GCM with derived Encryption Key", completed: false },
      { label: "Storing encrypted data on server", completed: false },
    ],
  },
];

const makeEncryptSteps = (): StepState[] => [
  {
    id: "step2",
    title: "Encrypt Message",
    description: "Encrypting your message using public key cryptography",
    status: "pending",
    substeps: [
      { label: "Using stored public key for encryption", completed: false },
      { label: "Creating encrypted message", completed: false },
      { label: "Storing encrypted message on server", completed: false },
    ],
  },
  {
    id: "step3",
    title: "Decrypt Message",
    description: "Decrypting message using your seed-derived keys",
    status: "pending",
    substeps: [
      { label: "Deriving keys from seed phrase", completed: false },
      { label: "Decrypting private key", completed: false },
      { label: "Decrypting the message", completed: false },
      { label: "Displaying original content", completed: false },
    ],
  },
];

// ─── Context ─────────────────────────────────────────────────────────────────

const CryptoContext = createContext<CryptoContextValue | null>(null);

export function CryptoProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<"signup" | "encrypt">("signup");
  const [seed, setSeed] = useState("");
  const [serverRecord, setServerRecord] = useState<ServerRecord | null>(null);
  const [signupStatus, setSignupStatus] = useState<"idle" | "running" | "done" | "error">("idle");

  const [loginSeedInput, setLoginSeedInput] = useState("");
  const [loginStatus, setLoginStatus] = useState<"idle" | "logging-in" | "success" | "error">("idle");
  const [loginResult, setLoginResult] = useState<{ success: boolean; message: string; details?: string } | null>(null);

  const [decryptedPrivateKey, setDecryptedPrivateKey] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [customEncryptedMessage, setCustomEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [encryptStatus, setEncryptStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [decryptStatus, setDecryptStatus] = useState<"idle" | "running" | "done" | "error">("idle");

  const [signupSteps, setSignupSteps] = useState<StepState[]>(makeSignupSteps());
  const [encryptSteps, setEncryptSteps] = useState<StepState[]>(makeEncryptSteps());

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isLoggedIn = !!serverRecord;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("active-user");
      if (stored) setServerRecord(JSON.parse(stored));
    } catch {
      localStorage.removeItem("active-user");
    }
  }, []);

  // ── Step helpers ──────────────────────────────────────────────────────────

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const updateSignupStep = (idx: number, updates: Partial<StepState>) => {
    setSignupSteps((prev) => prev.map((s, i) => (i === idx ? { ...s, ...updates } : s)));
  };

  const completeSignupSubstep = async (stepIdx: number, substepIdx: number, ms = 900) => {
    await delay(ms);
    setSignupSteps((prev) =>
      prev.map((s, i) => {
        if (i !== stepIdx) return s;
        return {
          ...s,
          substeps: s.substeps.map((sub, j) => (j === substepIdx ? { ...sub, completed: true } : sub)),
        };
      })
    );
  };

  const updateEncryptStep = (idx: number, updates: Partial<StepState>) => {
    setEncryptSteps((prev) => prev.map((s, i) => (i === idx ? { ...s, ...updates } : s)));
  };

  const completeEncryptSubstep = async (stepIdx: number, substepIdx: number, ms = 900) => {
    await delay(ms);
    setEncryptSteps((prev) =>
      prev.map((s, i) => {
        if (i !== stepIdx) return s;
        return {
          ...s,
          substeps: s.substeps.map((sub, j) => (j === substepIdx ? { ...sub, completed: true } : sub)),
        };
      })
    );
  };

  // ── Signup ────────────────────────────────────────────────────────────────

  const handleSignup = useCallback(async () => {
    setSignupStatus("running");
    setSignupSteps(makeSignupSteps());
    setSeed("");

    try {
      updateSignupStep(0, { status: "active" });

      // Generate seed
      const newSeed = await generateSeedPhrase();
      setSeed(newSeed);
      await completeSignupSubstep(0, 0, 700);
      await completeSignupSubstep(0, 1, 700);

      // Derive keys
      await completeSignupSubstep(0, 2, 1200);
      const { loginHash } = await deriveLoginHash(newSeed);
      const { encryptionKey, encryptionBase64, salt } = await deriveEncryptionKey(newSeed);

      // Generate key pair
      await completeSignupSubstep(0, 3, 1300);
      const { privateKey, publicKey } = await generateKeyPair();

      // Encrypt private key
      await completeSignupSubstep(0, 4, 1200);
      const encryptedPrivate = await encryptPrivateKey(privateKey, encryptionKey);

      // Store
      await completeSignupSubstep(0, 5, 1000);
      localStorage.setItem("encryption-key", encryptionBase64);

      const record: ServerRecord = {
        loginHash,
        publicKey,
        encryptedPrivateKey: encryptedPrivate.encryptedPrivateKey,
        encryptedPrivateKeyIV: encryptedPrivate.iv,
        encryptedPrivateKeyTag: encryptedPrivate.tag,
        encSalt: salt,
        createdAt: new Date().toISOString(),
      };

      const existing: ServerRecord[] = JSON.parse(localStorage.getItem("production-users") || "[]");
      existing.push(record);
      localStorage.setItem("production-users", JSON.stringify(existing));
      localStorage.setItem("active-user", JSON.stringify(record));
      setServerRecord(record);

      updateSignupStep(0, { status: "completed" });
      setSignupStatus("done");
    } catch (err: any) {
      updateSignupStep(0, { status: "error" });
      setSignupStatus("error");
      console.error("Signup error:", err);
    }
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────

  const handleLogin = useCallback(async () => {
    if (!loginSeedInput.trim()) {
      setLoginResult({ success: false, message: "Please enter your seed phrase" });
      return;
    }
    setLoginStatus("logging-in");
    setLoginResult(null);
    try {
      const users: ServerRecord[] = JSON.parse(localStorage.getItem("production-users") || "[]");
      let found: ServerRecord | null = null;
      for (const u of users) {
        const valid = await verifyLoginHash(loginSeedInput.trim(), u.loginHash);
        if (valid) { found = u; break; }
      }
      if (!found) throw new Error("User not found – invalid seed phrase");

      const { encryptionBase64 } = await deriveEncryptionKey(loginSeedInput.trim(), found.encSalt);
      localStorage.setItem("encryption-key", encryptionBase64);
      localStorage.setItem("active-user", JSON.stringify(found));
      setServerRecord(found);
      setLoginStatus("success");
      setLoginResult({
        success: true,
        message: "Login successful!",
        details: "Your seed phrase was used to derive keys and verify your identity without exposing the seed to the server.",
      });
    } catch (err: any) {
      setLoginStatus("error");
      setLoginResult({ success: false, message: "Login failed: " + err.message });
    }
  }, [loginSeedInput]);

  // ── Decrypt private key ───────────────────────────────────────────────────

  const handleDecryptPrivateKey = useCallback(async () => {
    if (!serverRecord) return;
    try {
      const base64Key = localStorage.getItem("encryption-key");
      if (!base64Key) throw new Error("No encryption key in storage");
      const encKey = await importAesKeyFromBase64(base64Key);
      const pk = await decryptPrivateKey(
        serverRecord.encryptedPrivateKey,
        serverRecord.encryptedPrivateKeyIV,
        serverRecord.encryptedPrivateKeyTag,
        encKey
      );
      setDecryptedPrivateKey(pk);
    } catch (err: any) {
      setDecryptedPrivateKey("Decryption failed: " + err.message);
    }
  }, [serverRecord]);

  // ── Encrypt & store message ───────────────────────────────────────────────

  const handleEncryptAndStore = useCallback(async () => {
    if (!serverRecord || !messageInput) return;
    setEncryptStatus("running");
    setEncryptSteps(makeEncryptSteps());

    try {
      updateEncryptStep(0, { status: "active" });
      await completeEncryptSubstep(0, 0, 800);

      const encrypted = await encryptMessage(messageInput, serverRecord.publicKey);
      await completeEncryptSubstep(0, 1, 1000);

      const users: ServerRecord[] = JSON.parse(localStorage.getItem("production-users") || "[]");
      const idx = users.findIndex((u) => u.loginHash === serverRecord.loginHash);
      const updated: ServerRecord = {
        ...(idx >= 0 ? users[idx] : serverRecord),
        encryptedUserData: encrypted,
        lastUpdated: new Date().toISOString(),
        messageCount: (serverRecord.messageCount || 0) + 1,
      };
      if (idx >= 0) users[idx] = updated; else users.push(updated);
      localStorage.setItem("production-users", JSON.stringify(users));
      localStorage.setItem("active-user", JSON.stringify(updated));
      setServerRecord(updated);
      await completeEncryptSubstep(0, 2, 800);

      updateEncryptStep(0, { status: "completed" });
      setEncryptStatus("done");
      setMessageInput("");
    } catch (err: any) {
      updateEncryptStep(0, { status: "error" });
      setEncryptStatus("error");
      console.error(err);
    }
  }, [serverRecord, messageInput]);

  // ── Decrypt custom message ────────────────────────────────────────────────

  const handleDecryptCustomMessage = useCallback(async () => {
    if (!serverRecord || !customEncryptedMessage) return;
    setDecryptedMessage(null);
    setDecryptStatus("running");

    setEncryptSteps((prev) =>
      prev.map((s, i) => (i === 1 ? { ...makeEncryptSteps()[1], status: "active" } : s))
    );

    try {
      await completeEncryptSubstep(1, 0, 800);

      const base64Key = localStorage.getItem("encryption-key");
      if (!base64Key) throw new Error("No encryption key");
      const encKey = await importAesKeyFromBase64(base64Key);
      const pk = await decryptPrivateKey(
        serverRecord.encryptedPrivateKey,
        serverRecord.encryptedPrivateKeyIV,
        serverRecord.encryptedPrivateKeyTag,
        encKey
      );
      await completeEncryptSubstep(1, 1, 1000);

      const decrypted = await decryptMessage(customEncryptedMessage.trim(), pk);
      setDecryptedMessage(decrypted);
      await completeEncryptSubstep(1, 2, 800);
      await completeEncryptSubstep(1, 3, 500);

      setEncryptSteps((prev) =>
        prev.map((s, i) => (i === 1 ? { ...s, status: "completed" } : s))
      );
      setDecryptStatus("done");
    } catch (err: any) {
      setEncryptSteps((prev) =>
        prev.map((s, i) => (i === 1 ? { ...s, status: "error" } : s))
      );
      setDecryptStatus("error");
      console.error(err);
    }
  }, [serverRecord, customEncryptedMessage]);

  // ── Clipboard ─────────────────────────────────────────────────────────────

  const copyToClipboard = useCallback((text: string, field: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 800);
    });
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────

  const handleLogout = useCallback(() => {
    localStorage.removeItem("active-user");
    localStorage.removeItem("encryption-key");
    setServerRecord(null);
    setSeed("");
    setSignupStatus("idle");
    setLoginSeedInput("");
    setLoginStatus("idle");
    setLoginResult(null);
    setDecryptedPrivateKey("");
    setMessageInput("");
    setCustomEncryptedMessage("");
    setDecryptedMessage(null);
    setEncryptStatus("idle");
    setDecryptStatus("idle");
    setSignupSteps(makeSignupSteps());
    setEncryptSteps(makeEncryptSteps());
  }, []);

  return (
    <CryptoContext.Provider
      value={{
        activeTab, setActiveTab,
        seed, serverRecord, isLoggedIn,
        signupStatus, handleSignup,
        loginSeedInput, setLoginSeedInput,
        loginStatus, loginResult, handleLogin,
        decryptedPrivateKey, handleDecryptPrivateKey,
        messageInput, setMessageInput,
        handleEncryptAndStore, encryptStatus,
        customEncryptedMessage, setCustomEncryptedMessage,
        decryptedMessage, handleDecryptCustomMessage, decryptStatus,
        signupSteps, encryptSteps,
        copiedField, copyToClipboard,
        handleLogout,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto(): CryptoContextValue {
  const ctx = useContext(CryptoContext);
  if (!ctx) throw new Error("useCrypto must be used inside CryptoProvider");
  return ctx;
}
