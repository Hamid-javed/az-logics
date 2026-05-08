import { useDispatch } from "react-redux";
import { Cross, Copy2, TickIcon } from "../assets/Icons";
import { CiUser } from "react-icons/ci";
import {fetchData, postData } from "../features/ApiSlice";
import { AppDispatch } from "../app/store";
import { useState, useEffect, useRef } from "react";
import { getDirectory } from "../features/directories/folderSlice";
import { toast } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios, { AxiosResponse } from "axios";
import moment from "moment-timezone";
import { ThreeDots } from "react-loader-spinner";
import { generateRandomKey } from "../services/apiClient";
import { uploadFile } from "../utils/cryptoOperations";

const FILE_SHARE_BASE_URL = import.meta.env.VITE_FILE_SHARE_BASE_URL as string;

interface Props {
  file?: any;
  setShare?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GenerateUrlPayload {
  files: string[];
  message: string | null;
  password: string | null;
  max_views: number | null;
  expires_at: string | null;
  allowed_ip: string | null;
  timezone: string;
}

interface GenerateUrlResponse {
  id: string;
  key?: string;
}

type AccessType = "anyone" | "restricted" | "copyLink";

type Errors = {
  files?: string;
  max_views?: string;
  password?: string;
  confirmPassword?: string;
  allowed_ip?: string;
  expires_at?: string;
};

type UrlState = {
  anyone?: string;
  copyLink?: string;
};

const detectTimezone = (): string => {
  try {
    return moment.tz.guess();
  } catch (error) {
    console.error("Failed to detect timezone, using default:", error);
    return "Asia/Karachi";
  }
};

function calculateExpiration(lifetime: string | null): {
  expiresAt: string | null;
  timezone: string;
} {
  const timezone = detectTimezone();
  let expiresAt: string | null = null;

  if (lifetime) {
    const now = moment();
    let expirationTime: moment.Moment | null = null;

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
    }

    if (expirationTime) {
      expiresAt = expirationTime.format("YYYY-MM-DDTHH:mm:ss");
    }
  }

  return { expiresAt, timezone };
}

const viewOptions = [
  { value: "unlimited", label: "∞" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 100, label: "100" },
];

const lifetimeOptions = [
  { value: "", label: "No Limit" },
  { value: "5m", label: "5 Minute" },
  { value: "30m", label: "30 Minute" },
  { value: "1h", label: "1 Hour" },
  { value: "4h", label: "4 Hour" },
  { value: "12h", label: "12 Hour" },
  { value: "1d", label: "1 Day" },
  { value: "3d", label: "3 Day" },
  { value: "7d", label: "7 Day" },
];

const randomWords = [
  "My Friend",
  "Secret",
  "RememberMe",
  "Little Dog",
  "Hint123",
  "Lock",
  "Alpha",
  "Beta",
  "Gamma",
];

function getRandomHint(): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  if (Math.random() < 0.5) {
    return randomWords[Math.floor(Math.random() * randomWords.length)];
  }
  const length = Math.floor(Math.random() * 5) + 4;
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

const buildShareUrl = (id: string, key?: string): string => {
  const baseUrl = FILE_SHARE_BASE_URL || "https://d.ghosttransfer.tech";
  let url = `${baseUrl}/${id}`;
  if (key) {
    url += `?key=${encodeURIComponent(key)}`;
  }
  return url;
};

function ShareFile({ setShare, file }: Props) {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";

  const [shake, setShake] = useState(false);
  const [access, setAccess] = useState<AccessType>("anyone");
  const calledRef = useRef(false);
  // Restricted access state
  const [isLifetimeOpen, setIsLifetimeOpen] = useState(false);
  const lifetimeRef = useRef<HTMLDivElement>(null);
  const [lifetime, setLifetime] = useState("No Limit");
  const [maxViews, setMaxViews] = useState("");
  const [isUnlimitedViews, setIsUnlimitedViews] = useState(true);
  const [showMaxViewsDropdown, setShowMaxViewsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ipRestrictions, setIpRestrictions] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [URL, setURL] = useState<UrlState>({});
  const [errors, setErrors] = useState<Errors>({});
  const [passwordHint, setPasswordHint] = useState<string>("");

  // Protected file download-for-sharing flow (FileGallery parity)
  const [isProtectedPromptOpen, setIsProtectedPromptOpen] = useState(false);
  const [protectedFilePassword, setProtectedFilePassword] = useState("");
  const [protectedFilePasswordError, setProtectedFilePasswordError] =
    useState("");
  const [showProtectedFilePassword, setShowProtectedFilePassword] =
    useState(false);
  const [pendingAccessType, setPendingAccessType] = useState<AccessType | null>(
    null,
  );
  const [downloadedShareFile, setDownloadedShareFile] = useState<File | null>(
    null,
  );

  useEffect(() => {
    setPasswordHint(getRandomHint());
  }, []);

  useEffect(() => {
    // Reset protected/download cache when file changes
    setDownloadedShareFile(null);
    setProtectedFilePassword("");
    setProtectedFilePasswordError("");
    setPendingAccessType(null);
    setIsProtectedPromptOpen(false);
    calledRef.current = false;
  }, [file?.id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = (event as TouchEvent).touches
        ? (event as TouchEvent).touches[0]?.target as Node
        : (event as MouseEvent).target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShowMaxViewsDropdown(false);
      }
      if (lifetimeRef.current && !lifetimeRef.current.contains(target)) {
        setIsLifetimeOpen(false);
      }
    };

    // mousedown handles desktop; touchstart handles iOS Safari where
    // mousedown is NOT reliably fired on non-interactive elements.
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    document.addEventListener("touchstart", handleClickOutside as EventListener, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
      document.removeEventListener("touchstart", handleClickOutside as EventListener);
    };
  }, []);


  const handleCopyLink = async (url: any) => {
    if (!url) return;
    try {
      // navigator.clipboard requires HTTPS and an active user-gesture context.
      // On iOS Safari over HTTP, or when the gesture context has expired after
      // an async await, clipboard is undefined and throws a hard TypeError.
      // The execCommand fallback works on all iOS versions.
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(url);
      } else {
        // iOS / HTTP fallback
        const el = document.createElement("textarea");
        el.value = url;
        el.style.position = "fixed";
        el.style.top = "0";
        el.style.left = "0";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      toast.success("Link copied to clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      toast.warn("Failed to copy link");
    }
  };


  const handleClick = () => {
    if (address === "") {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    handleShare();
  };

  const handleShare = async () => {
    const paylod = {
      user_address: address,
      is_giving_permission: true,
    };
    try {
      await dispatch(
        postData({
          url: `files/${file?.id}/`,
          payload: paylod,
          method: "patch",
          key: "shareFile",
        }),
      ).unwrap();
      toast.success("File shared successfully");
      dispatch(getDirectory(parentFolderId));
      setShare?.(false);
    } catch (error: any) {
      toast.warn(error.detail);
    }
  };

  const selectedLifetimeLabel =
    lifetimeOptions.find((o) => o.value === lifetime)?.label || "No Limit";

  const resetForm = () => {
    setLifetime("");
    setMaxViews("");
    setIsUnlimitedViews(true);
    setPassword("");
    setConfirmPassword("");
    setIpRestrictions("");
    setErrors({});
  };

  const clampViews = (value: any) => {
    const numeric = Number.isNaN(Number(value)) ? 1 : parseInt(value, 10);
    return Math.max(1, numeric);
  };

  const handleMaxViewsChange = (e: any) => {
    setIsUnlimitedViews(false);
    setMaxViews(e.target.value);
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    const error: { password?: string; confirmPassword?: string } = {};

    if (
      password &&
      !/^[A-Za-z0-9!@#$%^&*()_+={}:;"'<>?,.]{6,}$/.test(password)
    ) {
      error.password =
        "Password must be at least 6 characters and contain only valid symbols.";
    }
    if (confirmPassword) {
      if (!password) {
        error.confirmPassword = "Password is required before confirming";
      } else if (password !== confirmPassword) {
        error.confirmPassword = "Passwords do not match";
      }
    }

    setErrors((prev) => ({ ...prev, ...error }));
    if (!error.password) {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
    if (!error.confirmPassword) {
      setErrors((prev) => {
        const { confirmPassword, ...rest } = prev;
        return rest;
      });
    }
    return error;
  };

  const validate = () => {
    let nextErrors: Errors = {};
    if (!isUnlimitedViews) {
      if (!maxViews || clampViews(maxViews) < 1)
        nextErrors.max_views = "Enter at least 1 view";
    }

    if (ipRestrictions.trim()) {
      const ipv4Regex =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      if (!ipv4Regex.test(ipRestrictions.trim())) {
        nextErrors.allowed_ip =
          "Please enter a valid IPv4 address (e.g., 192.168.1.1)";
      }
    }

    if (password && !confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
    }

    nextErrors = {
      ...nextErrors,
      ...validatePasswords(password, confirmPassword),
    };

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const isFilePasswordProtected = (f: any) =>
    Boolean(f?.is_password_protected || f?.is_protected);

  const fetchFileDetailsForSharing = async (filePassword?: string) => {
    if (!file) return null;

    // Protected file: needs password to obtain url
    if (isFilePasswordProtected(file)) {
      const response = await dispatch(
        postData({
          url: `files/password-protected/${file.id}/`,
          payload: { password: filePassword || "" },
          method: "post",
          key: "protectedFileFetchForShare",
        }),
      ).unwrap();
      return response?.data || null;
    }

    // Normal file
    const result = await dispatch(
      fetchData({ url: `files/${file.id}/`, key: "fileFetch" }),
    ).unwrap();
    return result?.data || null;
  };

  const downloadFileForSharing = async (fileUrl: string, fileName?: string) => {
    const fetchResponse = await fetch(fileUrl);
    if (!fetchResponse.ok) {
      throw new Error("Failed to download file for sharing");
    }
    const fileBlob = await fetchResponse.blob();
    const mimeType = file?.content_type || "application/octet-stream";
    return new File([fileBlob], fileName || file?.name || "file", {
      type: mimeType,
    });
  };

  const ensureShareFileDownloaded = async (): Promise<File | null> => {
    if (!file) return null;
    if (downloadedShareFile) return downloadedShareFile;

    if (isFilePasswordProtected(file) && !protectedFilePassword) {
      setPendingAccessType(access);
      setIsProtectedPromptOpen(true);
      return null;
    }

    const details = await fetchFileDetailsForSharing(protectedFilePassword);
    if (!details) return null;

    const { url: fileUrl, name: fileName } = details;
    if (!fileUrl) return null;

    const fileObj = await downloadFileForSharing(fileUrl, fileName);
    setDownloadedShareFile(fileObj);
    return fileObj;
  };

const generateLink = async (accessType: AccessType): Promise<void> => {
  if (!file) return;
  if (accessType === "copyLink") {
    if (!validate()) return;
  }

  const { expiresAt, timezone } = calculateExpiration(lifetime);

  try {
    setLoading(true);

    let encryptionKey: string;
    let fileS3Url: string;

    const fileObj = await ensureShareFileDownloaded();
    if (!fileObj) {
      return;
    }

    const newKey = generateRandomKey();
    const uploadResult = await uploadFile(fileObj, newKey);

    if (!uploadResult?.url) {
      toast.error("File encryption failed");
      return;
    }
    encryptionKey = newKey;
    fileS3Url = uploadResult.url;

    const payload: GenerateUrlPayload = {
      files: [fileS3Url], 
      message: null,
      password: password || null,
      max_views: isUnlimitedViews ? null : parseInt(maxViews) || null,
      expires_at: expiresAt,
      allowed_ip: ipRestrictions.trim() || null,
      timezone,
    };

    const apiUrl = `https://api.prod.ghosttransfer.tech/api/file-share/generate-url/`;
    const response: AxiosResponse<GenerateUrlResponse> = await axios.post(apiUrl, payload);

    // Build the share URL with encryption key
    const shareUrl = buildShareUrl(response.data.id, encryptionKey);
    setURL((prev) => ({ ...prev, [accessType]: shareUrl }));
    setAccess(accessType);
    setErrors({});

  } catch (error: unknown) {
    console.error("Error generating link:", error);
    if (axios.isAxiosError(error)) {
      const data: any = error.response?.data;
      if (data) {
        const backendErrors: Record<string, string> = {};
        let firstToastMessage: string | null = null;

        const topDetail =
          typeof data?.detail === "string"
            ? data.detail
            : Array.isArray(data?.detail)
              ? data.detail[0]
              : null;
        if (topDetail) firstToastMessage = topDetail;
        for (const [key, value] of Object.entries(data)) {
          let message: string | null = null;

          if (typeof value === "string") message = value;
          else if (Array.isArray(value)) message = value[0] ? String(value[0]) : null;
          else if (value && typeof value === "object") {
            if (typeof (value as any).detail === "string") message = (value as any).detail;
            else if (Array.isArray((value as any).detail))
              message = (value as any).detail[0]
                ? String((value as any).detail[0])
                : null;
          }

          if (message) {
            backendErrors[key] = message;
            if (!firstToastMessage) firstToastMessage = message;
          }
        }

        if (Object.keys(backendErrors).length > 0) setErrors(backendErrors);
        if (firstToastMessage) toast.error(firstToastMessage);
      }
    } else {
      toast.error("Unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!calledRef.current) {
      if (file && isFilePasswordProtected(file)) {
        setPendingAccessType("anyone");
        setIsProtectedPromptOpen(true);
      } else {
        generateLink("anyone");
      }
      calledRef.current = true;
    }
  }, [file]);

  return (
    <div className="fixed inset-0 bg-[#000000BA] z-50 flex items-center justify-center overflow-x-hidden">
      {isProtectedPromptOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.33)] z-[60] flex items-center justify-center">
          <div className="relative py-8 w-[95vw] max-w-[420px] px-4 flex flex-col items-center justify-center rounded-lg bg-[#ffffff]">
            <span
              onClick={() => {
                setShare?.(false);
                setIsProtectedPromptOpen(false);
                setPendingAccessType(null);
                setProtectedFilePassword("");
                setProtectedFilePasswordError("");
              }}
              className="absolute right-4 top-4 cursor-pointer"
            >
              <Cross className="w-[11px] h-[11px] md:w-3 md:h-3" color="#000000" />
            </span>

            <p className="text-[16px] md:text-[18px] font-bold text-[#202343] mb-2">
              Enter password to access file
            </p>
            <p className="text-[11px] md:text-[12px] text-[#6B7280] mb-4 text-center">
              This file is protected. We need the password to fetch the download URL.
            </p>

            <div className="w-full">
              <div className="relative">
                <input
                  value={protectedFilePassword}
                  onChange={(e) => {
                    const val = e.target.value;
                    setProtectedFilePassword(val);
                    if (val.length > 0 && val.length < 8) {
                      setProtectedFilePasswordError(
                        "Password must be at least 8 characters long",
                      );
                    } else {
                      setProtectedFilePasswordError("");
                    }
                  }}
                  type={showProtectedFilePassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-[42px] rounded-md border bg-[#ECECEC] pr-10 pl-3 text-[12px] text-[#1E1E1E] outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowProtectedFilePassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E1E1E]"
                >
                  {!showProtectedFilePassword ? (
                    <IoEyeOff size={16} />
                  ) : (
                    <IoEye size={16} />
                  )}
                </button>
              </div>
              {protectedFilePasswordError && (
                <p className="text-red-500 text-[11px] mt-1">
                  {protectedFilePasswordError}
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={
                !protectedFilePassword ||
                Boolean(protectedFilePasswordError) ||
                loading
              }
              onClick={async () => {
                try {
                  setIsProtectedPromptOpen(false);
                  const next = pendingAccessType || "anyone";
                  setPendingAccessType(null);
                  // Trigger generation now that password is provided
                  await generateLink(next);
                } catch (e) {
                  toast.error("Failed to access protected file. Please try again.");
                }
              }}
              style={{
                background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                borderImageSource:
                  "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
              }}
              className="w-full h-[44px] disabled:opacity-75 disabled:cursor-not-allowed flex justify-center items-center gap-2 rounded-md border text-white font-sans text-[14px] hover:shadow-lg mt-4"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div
        className={`relative w-[95vw] max-w-[351px] md:w-[40vw] md:min-w-[493px] px-3 md:px-6 flex flex-col items-center rounded-xl bg-[#F3F3F3] ${
          access === "restricted"
            ? "h-[85vh] md:h-[90vh] max-h-[800px] overflow-y-auto overflow-x-hidden pb-6 thin-scrollbar"
            : "h-[60vh] md:h-[75vh] md:min-h-[514px] overflow-x-hidden"
        }`}
      >
        <span
          onClick={() => setShare?.(false)}
          className="absolute right-[17px] top-[17px]  cursor-pointer"
        >
          <Cross
            className={"w-[11px] h-[11px] md:w-4 md:h-4"}
            color={"#3C3C4399"}
          />
        </span>
        <div className="flex justify-between w-full mt-7">
          <p className="text-[16px] md:text-[22px] font-bold text-[#202343]">
            Share this file
          </p>
        </div>
        {/* Access toggles (radio style) */}
        <div className="w-full mt-3 flex items-center gap-6">
          <button
            type="button"
            onClick={() => {
              setAccess("anyone");
              resetForm();
            }}
            className="flex items-center gap-2 text-[12px] md:text-[14px] text-[#1E1E1E]"
          >
            <span
              className={`flex items-center justify-center h-4 w-4 rounded-full border-2 ${
                access === "anyone" ? "border-[#5B91FF]" : "border-[#D1D5DB]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  access === "anyone" ? "bg-[#5B91FF]" : "bg-transparent"
                }`}
              />
            </span>
            Access for Anyone
          </button>
          <button
            type="button"
            onClick={() => {
              setAccess("restricted");
              resetForm();
            }}
            className="flex items-center gap-2 text-[12px] md:text-[14px] text-[#1E1E1E]"
          >
            <span
              className={`flex items-center justify-center h-4 w-4 rounded-full border-2 ${
                access === "restricted" || access === "copyLink"
                  ? "border-[#5B91FF]"
                  : "border-[#D1D5DB]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  access === "restricted" || access === "copyLink"
                    ? "bg-[#5B91FF]"
                    : "bg-transparent"
                }`}
              />
            </span>
            Restricted Access
          </button>
        </div>
        {/* Copy link field (only when access === "copyLink") */}
        {access === "copyLink" && (
          <div className="w-full mt-4">
            <p className="text-[12px] text-[#1E1E1E] mb-2">Copy Link</p>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={URL.copyLink || ""}
                className="w-full bg-[#F3F3F3] h-[40px] md:h-[44px] rounded-md border border-gray-500 pr-12 pl-3 text-[12px] md:text-[14px] text-[#1E1E1E] outline-none overflow-hidden text-ellipsis whitespace-nowrap"
              />
              <button
                onClick={() => handleCopyLink(URL.copyLink || "")}
                type="button"
                aria-label="Copy link"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center hover:bg-[#F3F4F6]"
              >
                {copied ? <TickIcon /> : <Copy2 />}
              </button>
            </div>
          </div>
        )}
        {access === "anyone" && (
          <div className="w-full mt-4">
            <p className="text-[12px] text-[#1E1E1E] mb-2">Copy Link</p>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={URL.anyone || ""}
                className="w-full bg-[#F3F3F3] h-[40px] md:h-[44px] rounded-md border border-gray-500 pr-12 pl-3 text-[12px] md:text-[14px] text-[#1E1E1E] outline-none overflow-hidden text-ellipsis whitespace-nowrap"
              />
              {loading && !URL.anyone && (
                <span className="absolute left-2 top-1/4">
                  <ThreeDots height="25" width="25" color="black" />
                </span>
              )}
              <button
                onClick={() => handleCopyLink(URL.anyone || "")}
                type="button"
                aria-label="Copy link"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center hover:bg-[#F3F4F6]"
              >
                {copied ? <TickIcon className="w-4 h-4" /> : <Copy2 />}
              </button>
            </div>
          </div>
        )}

        {/* Restricted Access Configuration */}
        {access === "restricted" && (
          <div className="w-full mt-4 space-y-4">
            {/* Lifetime + Max Views row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lifetime */}
              <div>
                <label className="block text-[12px] text-[#1E1E1E] mb-2">
                  Lifetime
                </label>

                <div className="relative" ref={lifetimeRef}>
                  <button
                    type="button"
                    onClick={() => setIsLifetimeOpen((v) => !v)}
                    className={`w-full h-[40px] rounded-[10px] border  bg-white pl-3 pr-8 text-[12px] text-[#1E1E1E] flex items-center ${
                      errors.expires_at ? "border-red-500" : "border-[#D1D5DB]"
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={isLifetimeOpen}
                  >
                    {errors.expires_at && (
                      <p className="text-[10px] md:text-xs text-red-500 mt-1">
                        {errors.expires_at}
                      </p>
                    )}
                    <span className="truncate text-[12px] text-[#1E1E1E]">
                      {selectedLifetimeLabel}
                    </span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                      {" "}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform  ${
                          isLifetimeOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {isLifetimeOpen && (
                    <div
                      role="listbox"
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D1D5DB] rounded-[10px] shadow-lg z-10"
                    >
                      {lifetimeOptions.map((opt, idx) => {
                        const isSelected = opt.value === lifetime;
                        return (
                          <button
                            type="button"
                            key={opt.value + idx}
                            onClick={() => {
                              setLifetime(opt.value);
                              setIsLifetimeOpen(false);
                            }}
                            className={`${
                              isSelected ? "bg-[#EFF6FF] text-[#5B91FF]" : ""
                            } w-full px-3 py-2 text-[12px] text-[#1E1E1E] text-left hover:bg-[#F3F4F6] last:rounded-b-[10px] first:rounded-t-[10px]`}
                            role="option"
                            aria-selected={isSelected}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Max Views */}
              <div>
                <label className="block text-[12px] text-[#1E1E1E] mb-2">
                  Max Views
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div className="w-full h-[40px] rounded-[10px] border border-[#D1D5DB] bg-white pl-3 pr-8 text-[12px] text-[#1E1E1E] flex items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={isUnlimitedViews ? "" : maxViews}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (
                          val === "" ||
                          (Number(val) <= 999 && val.length <= 3)
                        ) {
                          handleMaxViewsChange(e);
                        }
                        setErrors((prev) => {
                          const { max_views, ...rest } = prev;
                          return rest;
                        });
                      }}
                      disabled={isUnlimitedViews}
                      placeholder={isUnlimitedViews ? "∞" : "Enter views"}
                      className={`w-full h-full outline-none bg-transparent disabled:cursor-not-allowed
                        ${
                          isUnlimitedViews
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowMaxViewsDropdown(!showMaxViewsDropdown)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                      aria-label="Toggle Max Views options"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform ${
                          showMaxViewsDropdown ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  {errors.max_views && (
                    <p className="text-[10px] md:text-xs text-red-500 mb-2">
                      {errors.max_views}
                    </p>
                  )}
                  {showMaxViewsDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D1D5DB] rounded-[10px] shadow-lg z-10">
                      {viewOptions.map((opt, idx) => {
                        const isSelected =
                          (opt.value === "unlimited" && isUnlimitedViews) ||
                          (!isUnlimitedViews &&
                            String(opt.value) === String(maxViews));
                        return (
                          <button
                            type="button"
                            key={String(opt.value) + idx}
                            onClick={() => {
                              if (opt.value === "unlimited") {
                                setIsUnlimitedViews(true);
                                setMaxViews("");
                              } else {
                                setIsUnlimitedViews(false);
                                setMaxViews(String(opt.value));
                              }
                              setShowMaxViewsDropdown(false);
                            }}
                            className={`${
                              isSelected ? "bg-[#EFF6FF] text-[#5B91FF]" : ""
                            } w-full px-3 py-2 text-[12px] text-[#1E1E1E] text-left hover:bg-[#F3F4F6] last:rounded-b-[10px] first:rounded-t-[10px]`}
                            role="option"
                            aria-selected={isSelected}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] text-[#1E1E1E] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    validatePasswords(val, confirmPassword);
                  }}
                  placeholder="Enter password"
                  className={`w-full h-[40px] rounded-md border  bg-white pr-10 pl-3 text-[12px] text-[#1E1E1E] outline-none
                  ${errors.password ? "border-red-600" : "border-[#E5E7EB]"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E1E1E]"
                >
                  {!showPassword ? <IoEyeOff size={16} /> : <IoEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] md:text-xs text-red-500 mb-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[12px] text-[#1E1E1E] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    const val = e.target.value;
                    setConfirmPassword(val);
                    validatePasswords(password, val);
                  }}
                  placeholder="Confirm password"
                  className={`w-full h-[40px] rounded-md border bg-white pr-10 pl-3 text-[12px] text-[#1E1E1E] outline-none ${
                    errors.confirmPassword
                      ? "border-red-600"
                      : "border-[#E5E7EB]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E1E1E]"
                >
                  {!showConfirmPassword ? (
                    <IoEyeOff size={16} />
                  ) : (
                    <IoEye size={16} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[10px] md:text-xs text-red-500 mb-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Hint */}
            <div>
              <label className="flex items-center gap-2 text-[12px] text-[#1E1E1E] mb-2">
                ☝🏻 Set a password hint (optional)
              </label>
              <p className="text-[10px] text-[#6B7280] mb-2">
                A password hint can help you remember your password, but avoid
                using the actual password or obvious clues
              </p>
              <input
                type="text"
                value={passwordHint}
                onChange={(e) => setPasswordHint(e.target.value)}
                className="w-full h-[40px] rounded-md border border-[#E5E7EB] bg-white px-3 text-[12px] text-[#1E1E1E] outline-none"
              />
            </div>

            {/* Separator */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative bg-[#F3F3F3] px-3">
                <span className="text-[12px] text-[#6B7280]">or</span>
              </div>
            </div>

            {/* IP Restrictions */}
            <div>
              <label className="block text-[12px] text-[#1E1E1E] mb-2">
                IP restrictions (Optional)
              </label>
              <input
                type="text"
                value={ipRestrictions}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[0-9.]*$/.test(value)) {
                    setIpRestrictions(value);
                  }
                  setErrors((prev) => {
                    const { allowed_ip, ...rest } = prev;
                    return rest;
                  });
                }}
                placeholder="Enter IP address or range"
                className={`w-full h-[40px] rounded-md border bg-white px-3 text-[12px] text-[#1E1E1E] outline-none
                 ${errors.allowed_ip ? "border-red-600" : "border-[#E5E7EB]"}`}
              />
              {errors.allowed_ip && (
                <p className="text-[10px] md:text-xs text-red-500 mb-2">
                  {errors.allowed_ip}
                </p>
              )}
            </div>

            {/* Generate Link Button */}
            <button
              type="button"
              onClick={() => generateLink("copyLink")}
              style={{
                background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                borderImageSource:
                  "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
              }}
              className="w-full h-[44px] flex justify-center items-center gap-2 rounded-md border text-white font-sans text-[14px] hover:shadow-lg mt-4"
            >
              Generate Link
              {loading && <ThreeDots height="25" width="25" color="white" />}
            </button>
          </div>
        )}

        {/* Original invite section - only show for "Access for Anyone" */}
        {access === "anyone" && (
          <div className="flex w-full my-1 md:my-2 gap-2 items-center justify-between">
            {/* Input Field */}
            <div
              className={`w-full h-[37px] md:h-[54px] rounded-[4px] md:rounded-md border flex items-center px-4 border-[#0000004D] 
          ${shake ? "animate-shake border-red-500" : ""}
        `}
            >
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter address"
                className="text-[10px] md:text-[14px] w-full text-black outline-none placeholder:text-[#0000004D] bg-[#ffffff00] font-sans"
              />
            </div>

            {/* Invite Button */}
            <button
              onClick={handleClick}
              style={{
                background: "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
                borderImageSource:
                  "linear-gradient(0deg, #5896FF 0%, rgba(53, 90, 153, 0) 100%)",
              }}
              className="w-[57px] h-[37px] md:min-w-[91px] md:h-[53px] rounded-xl border text-white font-sans text-[10px] md:text-[14px] hover:shadow-lg"
            >
              Invite
            </button>
          </div>
        )}

        {/* WHO HAS ACCESS section - only show for "Access for Anyone" */}
        {access === "anyone" && (
          <>
            <p className="text-[12px] md:text-[14px] text-[#0000004D] w-full text-start mt-4 md:mt-6 ml-1">
              WHO HAS ACCESS
            </p>
            {file?.shared_accesses.length > 0 ? (
              file.shared_accesses.map((items: any) => (
                <div
                  key={items.id}
                  className="flex w-full mt-2 items-center p-1 px-2 justify-between font-sans text-black"
                >
                  <p className="text-[12px] md:text-[14px] flex items-center gap-2">
                    {items.image ? (
                      <img
                        src={items.image}
                        alt="User"
                        className="rounded-full h-9 w-9 object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <CiUser className="w-9 h-9 border-2 border-gray-500 rounded-full bg-white shadow-md p-1" />
                    )}
                  </p>
                  <p className="text-[10px] md:text-[14px]">
                    {items?.permission_type}
                  </p>
                </div>
              ))
            ) : (
              <p className="absolute top-80">No one has file access</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ShareFile;
