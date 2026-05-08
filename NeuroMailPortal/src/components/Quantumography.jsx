import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

function Quantumography({ setMessageData, setIsOpen }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [secertUrl, setSecertUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 500 * 1024;

  useEffect(() => {
    if (!showVideo) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer); // Stop timer when it reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer); // Clean up interval on unmount
    }
  }, [showVideo]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      if (step === 1 && !["image/jpeg", "image/jpg"].includes(file.type)) {
        toast.warn("Wrong file type!");
        setFile(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.warn("File size must be less than 500KB!");
        setFile(null);
        return;
      }
      setFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (step === 1 && !["image/jpeg", "image/jpg"].includes(file.type)) {
        toast.warn("Wrong file type!");
        setFile(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.warn("File size must be less than 500KB!");
        setFile(null);
        return;
      }
      setFile(file);
    }
    e.target.value = null;
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const submitFile = async () => {
    if (!file) {
      toast.warn("Please select a file");
      return;
    }

    try {
      if (step === 1) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "cover");
        const { data, status } = await axios.post(
          "https://qa.neuronus.net/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data) {
          setIsLoading(false);
          setCoverUrl(data?.image_url);
          setStep(2);
          setFile(null);
        }
        return;
      }
      if (step === 2) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "secret");
        const { data, status } = await axios.post(
          "https://qa.neuronus.net/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data) {
          setIsLoading(false);
          setSecertUrl(data?.image_url);
          setStep(3);
        }
        return;
      }
      if (step === 3) {
        setIsLoading(true);
        const paylod = {
          original: coverUrl,
          password: "",
          offset: 100,
          amount: 0,
          is_paid: 1,
          secret_file: secertUrl,
        };
        const { data, status } = await axios.post(
          "https://qa.neuronus.net/vangonography_encode",
          paylod,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data) {
          setDownloadUrl(data?.path);
          setIsLoading(false);
          setSecertUrl(data);
          setTimeout(() => {
            setIsOpen(false);
          }, 6800);
          setStep(4);
        }
        return;
      }
    } catch (error) {
      toast.warn("Something wents wrong!");
    }
  };

  const handleFileDownload = async () => {
    try {
      if (downloadUrl !== "") {
        const paylod = {
          url: downloadUrl,
        };
        setDownloadLoading(true);
        const response = await axios.post(
          "https://dev.api.neuromail.space/api/media/file-download/",
          paylod,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const filename =
          downloadUrl.split("/").pop() || `download_${Date.now()}.png`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadLoading(false);
        toast.success("File Downloaded Successfully");
      }
    } catch (error) {
      toast.warn("Something wents wrong!");
    }
  };

  const handleFileAttacment = async () => {
    try {
      if (downloadUrl !== "") {
        const paylod = {
          url: downloadUrl,
        };
        setIsLoading(true);
        const response = await axios.post(
          "https://dev.api.neuromail.space/api/media/file-download/",
          paylod,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const filename =
          downloadUrl.split("/").pop() || `download_${Date.now()}.jpg`;
        const file = new File([blob], filename, {
          type: response.headers["content-type"],
        });
        setMessageData((prev) => ({
          ...prev,
          attachments: [...prev.attachments, file],
        }));
        setIsLoading(false);
        setIsOpen(false);
        toast.success("File attached!");
      }
    } catch (error) {
      toast.warn("Something wents wrong!");
    }
  };

  return (
    <div
      className="w-screen p-3 mb-4 md:w-auto bg-[#F1F5FA] text-[#192839] flex flex-col justify-start rounded-[6px] font-sans"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex flex-col md:flex-row gap-2 mr-5">
        <p className="font-[600] text-[14px] mb-2">Quantumography</p>
        <div className="w-full flex gap-7 text-[8px] font-thin">
          <div>
            <p className={`${step === 1 ? "text-black" : "text-gray-400"}`}>
              1/3 {step === 1 && "- Upload cover file"}
            </p>
            <div
              className={`w-24 md:w-30 h-1 rounded ${
                step === 1 ? "bg-[#005EFF]" : "bg-[#87acec]"
              }`}
            ></div>
          </div>
          <div>
            <p className={`${step === 2 ? "text-black" : "text-gray-400"}`}>
              2/3 {step === 2 && "- Upload private file"}
            </p>
            <div
              className={`w-24 md:w-30 h-1 rounded ${
                step === 2 ? "bg-[#005EFF]" : "bg-[#87acec]"
              }`}
            ></div>
          </div>
          <div>
            <p className={`${step === 3 ? "text-black" : "text-gray-400"}`}>
              3/3 {step === 3 && "- Encrypt file"}
            </p>
            <div
              className={`w-24 md:w-30 h-1 rounded ${
                step === 3 ? "bg-[#005EFF]" : "bg-[#87acec]"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {file ? (
        ""
      ) : (
        <p className="font-[600] text-[10px] mt-1">
          Upload your {step === 1 ? "cover" : "secret"} file here
        </p>
      )}

      <div className="flex flex-col gap-5 justify-between mt-6 text-[#40566D] text-[7px] rounded-mdcursor-pointer">
        {step !== 4 && (
          <div className="">
            {file ? (
              <div className="inline-flex items-center gap-3 bg-white p-3 rounded-lg shadow-lg">
                {file.type && file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Selected File"
                    className="md:w-10 md:h-10 w-8 h-8 object-cover rounded-lg shadow-lg"
                  />
                ) : file.type === "application/pdf" ? (
                  <img
                    src="/pdf.png"
                    alt="PDF File"
                    className="w-[30px] h-[30px] md:w-[30px] md:h-[30px]"
                  />
                ) : file.type === "application/vnd.ms-excel" ||
                  file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                  file.name?.endsWith(".xls") ||
                  file.name?.endsWith(".xlsx") ? (
                  <Xcel className="w-10 h-10 text-green-500" />
                ) : (
                  <img
                    src="/rich.png"
                    alt="Other File Type"
                    className="w-[30px] h-[30px] md:w-[30px] md:h-[30px]"
                  />
                )}
                <p className="text-base text-gray-700">{file.name}</p>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <p>Drop file</p>
                <p>OR</p>
                <button
                  onClick={handleBrowseClick}
                  className="border cursor-pointer border-[#4D7FFF] mt-2 flex items-center font-[700] justify-center text-[7px] text-[#4D7FFF] rounded-[4.15px] w-[81px] h-[20px]"
                >
                  BROWSE
                </button>
              </div>
            )}
          </div>
        )}
        {file && step !== 4 && (
          <div className="flex gap-2">
            {" "}
            <button
              onClick={() => {
                setFile(null), step === 1 ? setStep(1) : setStep(2);
              }}
              className="px-2 h-[25px] z-20 flex items-center justify-center hover:shadow-md shadow-slate-800 rounded-md border-2 text-[10px] border-[#305EFF] text-[#305EFF] font-sans font-[500] leading-[20px]"
            >
              Re upload
              {/* {isLoading && (
                <span className="ml-2">
                  <ThreeDots height="25" width="25" color="white" />
                </span>
              )} */}
            </button>
            <button
              onClick={() => submitFile()}
              className="px-3 h-[25px] z-20 flex items-center justify-center bg-[#305EFF]   hover:shadow-md shadow-slate-800 rounded-md text-white text-[10px] font-sans leading-[20px]"
            >
              {step !== 3 ? "Upload" : "Start encryption"}
              {isLoading && (
                <span className="ml-2">
                  <ThreeDots height="25" width="25" color="white" />
                </span>
              )}
            </button>
          </div>
        )}
        {
          step === 4 && (
            // (isLoading ? (
            //   <div className="w-full flex justify-center items-center">
            //     <ThreeDots color="#305EFF" />
            //   </div>
            // ) : (
            <div className="flex gap-3 justify-between">
              {/* Left Section (File Preview & Buttons) */}
              <div className="flex flex-col gap-3">
                {file && (
                  <div className="inline-flex items-center gap-3 bg-white p-3 rounded-lg shadow-lg w-auto max-w-max">
                    {/* Display preview based on file type */}
                    {file.type?.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Selected File"
                        className="w-10 h-10 object-cover rounded-lg shadow-lg"
                      />
                    ) : file.type === "application/pdf" ? (
                      <img
                        src="/pdf.png"
                        alt="PDF File"
                        className="w-[20px] h-[18px] md:w-[30px] md:h-[30px]"
                      />
                    ) : file.type?.includes("excel") ||
                      file.name?.endsWith(".xls") ||
                      file.name?.endsWith(".xlsx") ? (
                      <Xcel className="w-10 h-10 text-green-500" />
                    ) : (
                      <img
                        src="/rich.png"
                        alt="Other File Type"
                        className="w-[18px] h-[18px] md:w-[30px] md:h-[30px]"
                      />
                    )}

                    {/* File Name - Prevent Unnecessary Stretching */}
                    <p className="text-base text-gray-700 whitespace-nowrap">
                      {file.name}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleFileDownload}
                    className="px-3 h-[25px] z-20 flex items-center justify-center border-2 border-[#305EFF] text-[#305EFF] hover:shadow-md shadow-slate-800 rounded-md text-[10px] font-sans font-[100] leading-[20px]"
                  >
                    Download
                    {downloadLoading && (
                      <span className="ml-2">
                        <ThreeDots height="25" width="25" color="#305EFF" />
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleFileAttacment}
                    className="px-3 h-[25px] z-20 flex items-center justify-center bg-[#305EFF] hover:shadow-md shadow-slate-800 rounded-md text-white text-[10px] font-sans font-[100] leading-[20px]"
                  >
                    Add attachment
                    {isLoading && (
                      <span className="ml-2">
                        <ThreeDots height="25" width="25" color="white" />
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Section (Countdown & Video) */}
              <div className="flex items-center h-10 rounded-lg px-3 absolute right-3">
                <div className="relative inline-flex bg-white rounded-lg shadow-lg justify-center items-center bg-transparent w-auto max-w-max">
                  {showVideo ? (
                    <video
                      src="success.webm"
                      autoPlay
                      muted
                      className="w-10 h-10 md:w-[70px] md:h-[60px] rounded-lg px-3"
                      onEnded={() => setShowVideo(false)}
                    />
                  ) : countdown > 0 ? (
                    <p className="md:text-lg text-xs px-1 md:px-3 py-1">
                      00: 0{countdown} sec
                    </p>
                  ) : (
                    ""
                  )}
                  {showVideo && (
                    <p className="mr-3 md:text-[10px]">
                      Your encrypted file is ready.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
          // ))
        }
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default Quantumography;

const Download = () => (
  <svg
    width="24"
    height="16"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.702w-24 md:w-205C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.9952w-24 md:w-20C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04Z"
      fill="#4D7FFF"
    />
    <path
      d="M9 12H14M11.5 10.25V5M11.5 5L12.9583 6.53125M11.5 5L10.0417 6.53125"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Xcel = ({ className }) => (
  <svg
    width="61"
    height="77"
    viewBox="0 0 61 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M40.2394 0H8.67754C3.92849 0 0 3.90828 0 8.65733V68.3427C0 73.0917 3.92849 77 8.67754 77H51.5158C56.2649 77 60.1924 73.0917 60.1924 68.3427V20.9306L40.2394 0Z"
      fill="#0A6D42"
    />
    <path
      d="M40.3372 0.05896L60.2127 20.9501H46.9816C43.3078 20.9501 40.3372 17.9799 40.3372 14.3061V0.05896Z"
      fill="#24BC73"
    />
    <path
      d="M23.4797 26.3499L29.5627 36.7307L35.6457 26.3499H40.1419L31.943 39.0449L40.1419 51.7399H35.6457L29.5627 41.888L23.4797 51.7399H18.9836L27.0502 39.0449L18.9836 26.3499H23.4797Z"
      fill="white"
    />
  </svg>
);
