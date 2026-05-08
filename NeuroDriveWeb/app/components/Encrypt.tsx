"use client";
import { useEffect, useState } from "react";
import Upload, { Copy, ImgIcon, LogoIcon } from "../assets/icons";
import axios, { AxiosResponse } from "axios";
import moment from "moment-timezone";
import { ThreeDots } from "react-loader-spinner";

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
}

type Errors = {
  files?: string;
  max_views?: string;
  password?: string;
  confirmPassword?: string;
  allowed_ip?: string;
  expires_at?: string;
};

type FileStatus = "ready" | "uploading" | "success" | "error";

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  status: FileStatus;
  uploadResult?: { url?: string };
  error?: string;
}

const detectTimezone = (): string => {
  try {
    return moment.tz.guess();
  } catch (error) {
    return "Asia/Karachi";
  }
};

export default function Encrypt() {
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [ipRestrictions, setIpRestrictions] = useState<string>("");
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );
  const [successFiles, setSuccessFiles] = useState<Set<string>>(new Set());

  const uploadFile = async (file: File, isPublic = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("public", isPublic.toString());

    const response = await axios.post(
      "https://api.prod.ghosttransfer.tech/api/media/upload-file/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return response.data;
  };

  const handleFileUpload = async (fileData: UploadFile) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileData.id ? { ...f, status: "uploading" } : f,
      ),
    );

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 15, 90);
      setUploadProgress((prev) => ({ ...prev, [fileData.id]: progress }));
    }, 200);

    try {
      const result = await uploadFile(fileData.file);
      clearInterval(progressInterval);

      setUploadProgress((prev) => ({ ...prev, [fileData.id]: 100 }));

      if (result.url !== undefined && result.url !== null) {
        setUploadedUrls((prev) => [...prev, result.url as string]);
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileData.id
            ? { ...f, status: "success", uploadResult: result }
            : f,
        ),
      );

      setSuccessFiles((prev) => new Set(prev).add(fileData.id));

      setTimeout(() => {
        setSuccessFiles((prev) => {
          const next = new Set(prev);
          next.delete(fileData.id);
          return next;
        });
        setUploadProgress((prev) => {
          const { [fileData.id]: _, ...rest } = prev;
          return rest;
        });
      }, 1000);
    } catch (error: any) {
      clearInterval(progressInterval);

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileData.id
            ? { ...f, status: "error", error: error.message }
            : f,
        ),
      );
    }
  };

  const handleFileList = (fileList: FileList | null) => {
    if (!fileList) return;

    const incoming: UploadFile[] = Array.from(fileList).map((f) => ({
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${f.name}`,
      file: f,
      name: f.name,
      size: f.size,
      status: "ready",
    }));

    setFiles((prev) => [...prev, ...incoming]);
    incoming.forEach((fileData) => handleFileUpload(fileData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileList(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files) {
      handleFileList(e.dataTransfer.files);
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = (id: string, url?: string) => {
    setUploadedUrls((prev) => prev.filter((u) => u !== url));
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  //  const retryUpload = (fileData:any) => {

  //   setFiles((prev) =>
  //     prev.map((f) =>
  //       f.id === fileData.id ? { ...f, status: "ready", error: null } : f
  //     )
  //   );
  //   handleFileUpload(fileData);
  // };

  useEffect(() => {
    if (files.length > 0) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [files]);

  const clearSelection = () => {
    setFiles([]);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
    return `${value} ${sizes[i]}`;
  };

  const EyeIcon = ({ open = false }: { open?: boolean }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {open ? (
        <path
          d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 .001-10.001A5 5 0 0 1 12 17Zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
          fill="#6b7280"
        />
      ) : (
        <>
          <path
            d="M2 12S5.5 6.5 12 6.5 22 12 22 12s-3.5 5.5-10 5.5S2 12 2 12Z"
            stroke="#6b7280"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="#6b7280"
            strokeWidth="1.5"
            fill="none"
          />
        </>
      )}
    </svg>
  );

  const CloseIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const DownloadBadge = () => (
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/90">
      <Upload />
    </div>
  );

  const isUploading = files.some((f) => f.status === "uploading");

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

  const generateLink = async (): Promise<void> => {
    if (!validate()) return;

    const timezone = detectTimezone();
    try {
      setLoading(true);
      const payload: GenerateUrlPayload = {
        files: uploadedUrls,
        message: null,
        password: password || null,
        max_views: null,
        expires_at: null,
        allowed_ip: ipRestrictions.trim() || null,
        timezone,
      };

      const response: AxiosResponse<GenerateUrlResponse> = await axios.post(
        "https://api.prod.ghosttransfer.tech/api/file-share/generate-url/",
        payload,
      );

      setGeneratedUrl(`https://d.ghosttransfer.tech/${response.data.id}/`);
      setStep(3);
      resetForm();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          const backendErrors: Record<string, string> = {};

          for (const [key, value] of Object.entries(error.response.data)) {
            backendErrors[key] = Array.isArray(value)
              ? value[0]
              : String(value);
          }

          setErrors(backendErrors);
        } else if (error.response?.data?.detail) {
          // toast.error(error.response?.data?.detail[0]);
        }
      } else {
        // toast.error("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
    setIpRestrictions("");
    setErrors({});
    setUploadedUrls([]);
  };

  return (
    <>
      {" "}
      <p className="text-[18px] font-black md:text-[44px] mt-3 w-[50vw] lg:w-[40vw]  leading-[30px] md:leading-[54px] text-center text-[#1D203E] mb-6">
        {step === 1
          ? "Drop it. Encrypt it. Forget about limits."
          : "Your uploaded File"}
      </p>
      {step === 1 && (
        <p className="text-[12px] md:text-[16px] text-[#031B1D] w-[80vw] lg:w-[55vw] leading-[24px] font-inter text-center mb-16">
          Start with one file. Then meet the ecosystem built for control.
        </p>
      )}
      {/* Step 1: Upload */}
      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <h2 className="text-[#031B1D4D] text-[20px] md:text-[30px] font-normal leading-[150%] mb-4">
            Share file anonymously
          </h2>

          <label
            onDrop={onDrop}
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition"
          >
            <div className="flex items-center justify-center gap-2">
              <Upload />
              <p className="text-gray-600">Add Files</p>
            </div>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
      {/* Step 2: Options */}
      {files.length > 0 && step > 1 && (
        <div className="w-full max-w-[95%] md:max-w-2xl mx-auto">
          {/* Card with options */}
          {step === 2 ? (
            <>
              {/* Uploaded file pill */}
              <div className="relative flex justify-center rounded-2xl shadow-md p-2 ">
                <div
                  className={`
                    flex gap-1.5 md:gap-3 max-w-[310px] md:max-w-full w-full overflow-x-auto scroll-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
                  `}
                >
                  {files.map((file, idx) => {
                    const progress = uploadProgress[file.id];
                    const isUploading =
                      progress !== undefined && !successFiles.has(file.id);

                    return (
                      <div
                        key={file.id || idx}
                        className="relative w-[100px] md:w-[160px] rounded-2xl bg-gradient-to-r from-[#3983FF] via-[#6860FE] via-[#8C44FD] to-[#B325FC] px-4 h-[40px] md:h-[50px] flex items-center gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          {isUploading ? (
                            // 🔹 Progress Bar
                            <div className="w-full bg-white/20 rounded-full h-1 md:h-2 overflow-hidden">
                              <div
                                className="h-1 md:h-2 bg-white rounded-full transition-all duration-200"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          ) : (
                            // 🔹 File Name + Size
                            <>
                              <p className="text-white text-[13px] md:text-[16px] font-medium truncate">
                                {file.name}
                              </p>
                              <p className="text-white/80 text-[12px] md:text-sm">
                                {formatBytes(file.size)}
                              </p>
                            </>
                          )}
                        </div>

                        <button
                          aria-label="Remove"
                          onClick={() =>
                            removeFile(file.id, file.uploadResult?.url)
                          }
                          className="absolute top-0 md:-top-1 right-0 md:-right-2 w-4 md:w-6 h-4 md:h-6 drop-shadow-lg flex items-center justify-center rounded-full bg-white"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Scrollbar hint when > 6 */}
                {files.length > 6 && (
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Scroll to view more files...
                  </p>
                )}
              </div>
              <div className="mt-3 md:mt-4 bg-white rounded-2xl p-4 md:p-6 filter drop-shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                {/* Stepper */}
                <div className="flex items-center justify-center gap-8 mb-6">
                  <span
                    className={`h-[3px] w-20 md:w-24 rounded-full ${
                      step >= 1 ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                  <span
                    className={`h-[3px] w-20 md:w-24 rounded-full ${
                      step >= 2 ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                  <span
                    className={`h-[3px] w-20 md:w-24 rounded-full ${
                      step >= 3 ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                </div>

                {/* Form grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <label className="text-xs md:text-sm text-black">
                      Password <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="mt-1 md:mt-2 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPassword(val);
                          validatePasswords(val, confirmPassword);
                        }}
                        placeholder=""
                        className="w-full rounded-xl border border-gray-300 px-4 py-1 md:py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm text-black">
                      Confirm Password{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="mt-1 md:mt-2 relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          const val = e.target.value;
                          setConfirmPassword(val);
                          validatePasswords(password, val);
                        }}
                        placeholder=""
                        className="w-full rounded-xl border border-gray-300 px-4 py-1 md:py-2.5 md:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <EyeIcon open={showConfirm} />
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* OR divider */}
                <div className="flex items-center gap-4 my-2 md:my-4">
                  <span className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-500">or</span>
                  <span className="flex-1 h-px bg-gray-200" />
                </div>

                {/* IP restrictions */}
                <div>
                  <label className="text-xs md:text-sm text-black">
                    IP restrictions{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={ipRestrictions}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^[0-9.,:]*$/.test(value)) {
                        setIpRestrictions(value);
                      }
                      if (errors.allowed_ip) {
                        setErrors((prev) => {
                          const { allowed_ip, ...rest } = prev;
                          return rest;
                        });
                      }
                    }}
                    placeholder=""
                    className="mt-1 md:mt-2 w-full rounded-xl border border-gray-300 px-4 py-1 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.allowed_ip && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.allowed_ip}
                    </p>
                  )}
                </div>

                <div className="mt-3 md:mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      if (!isUploading) generateLink();
                    }}
                    disabled={isUploading || loading}
                    className={`px-10 py-1 md:py-2.5 rounded-xl text-sm md:text-md flex justify-center items-center gap-2 text-white font-medium 
                    bg-gradient-to-b from-[#77AAFF] to-[#3E85FF] 
                    ${
                      isUploading || loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-95"
                    } `}
                  >
                    Generate Secret Link
                    {loading && (
                      <ThreeDots height="25" width="25" color="white" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-3 md:mt-6 bg-white rounded-2xl p-6 border border-blue-400 filter drop-shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
              {/* Stepper */}
              <div className="flex items-center justify-center gap-8 mb-6">
                <span
                  className={`h-[3px] w-20 md:w-24 rounded-full ${
                    step >= 1 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
                <span
                  className={`h-[3px] w-20 md:w-24 rounded-full ${
                    step >= 2 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
                <span
                  className={`h-[3px] w-20 md:w-24 rounded-full ${
                    step >= 3 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              </div>

              <div className="flex justify-center items-center gap-3 py-2 mt-12">
                <LogoIcon />
                <p className="text-[#031B1D] text-[18px] md:text-[20px] font-medium">
                  Great! You’re done
                </p>
              </div>

              <div className="mt-6">
                <label className="text-sm text-gray-600">Copy URL</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    readOnly
                    value={generatedUrl}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-1.5 md:py-3 text-gray-700 overflow-hidden text-ellipsis"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(generatedUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 700);
                    }}
                    className=""
                    aria-label="Copy URL"
                  >
                    <Copy filled={copied} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
