import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import getTempMail from "../hooks/UseTempMail";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoIosArrowForward } from "react-icons/io";

const TempMail = () => {
  const [copied, setCopied] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [Refresh, setRefresh] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [hoverTooltip, setHoverTooltip] = useState(false);
  const { mutate, data, isPending } = getTempMail();
  const email = data?.email;

  useEffect(() => {
    mutate(false);
  }, [Refresh]);

  // Function to copy text
  const handleCopy = (icon) => {
    navigator.clipboard.writeText(email);
    setCopied(icon);
    setTimeout(() => setCopied(false), 2000);
  };

  const openModal = (email) => {
    setSelectedMail(email);
    setIsOpen(true);
  };

  return (
    <div className="w-full bg-[#F1F5FA] h-[100vh]">
      <div
        className="py-8 flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/tempMailbg.png')" }}
      >
        <div className=" bg-opacity-50 p-6 rounded-lg border-2 border-dashed border-gray-500 max-w-lg w-full text-center">
          {/* Title */}
          <h2 className="text-white text-xl font-semibold mb-4">
            Your Temporary Email Address
          </h2>

          {/* Email Container */}
          <div className="flex items-center bg-[#262626] px-3 py-2 rounded-lg shadow-lg relative">
            {/* Email Address */}
            <input
              type="text"
              value={isPending ? "" : email}
              placeholder={isPending ? "Loading..." : ""}
              className="bg-transparent md:text-xl sm:text-xl text-[12px] font-sans text-white ml-3 flex-1 outline-none"
              readOnly
              onMouseEnter={() => setHoverTooltip(true)}
              onMouseLeave={() => setHoverTooltip(false)}
            />
            {hoverTooltip && (
              <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded-md">
                Your Temporary Email Address
                <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
              </div>
            )}

            {/* Icons */}
            <div className="flex space-x-2 relative">
              <img className="w-10" src="qrCode.png" alt="QR Code" />

              {/* Copy Button */}
              <div
                className="bg-[#305EFF] flex w-10 h-10 items-center justify-center rounded-md cursor-pointer relative"
                onClick={() => handleCopy("input")}
              >
                <CopyImg />

                {/* Tooltip */}
                {copied === "input" && (
                  <div className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded-md">
                    Copied!
                    <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
        </div>
        <p className="text-[#FFFFFF99] font-sans mt-4 text-[8px] max-w-lg text-center">
          Forget about spam, advertising mailings, hacking, and attacking
          robots. Keep your real mailbox clean and secure. Temp Mail provides
          temporary, secure, anonymous, free, disposable email addresses.
        </p>
      </div>
      <div className="text-black flex gap-1 sm:gap-6 md:gap-8  items-center justify-center mt-3">
        <div
          onClick={() => handleCopy("copyButton")}
          className="flex relative gap-1 sm:gap-2 items-center justify-center bg-white hover:bg-[#e8e8e8ea] px-1 py-1 w-[75px] h-[36px] md:w-[100px] md:h-[42px] rounded-lg cursor-pointer"
        >
          <Copy />
          <p className="font-sans sm:text-sm  text-[10px]">Copy</p>
          {copied === "copyButton" && (
            <div className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded-md">
              Copied!
              <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
          )}
        </div>
        <div
          onClick={() => setRefresh((prev) => !prev)}
          className="flex gap-1 sm:gap-2 items-center justify-center bg-white hover:bg-[#e8e8e8ea] px-1 py-1 w-[75px] h-[36px] md:w-[100px] md:h-[42px] rounded-lg cursor-pointer"
        >
          <IoMdRefresh className="text-2xl" />
          <p className="font-sans sm:text-sm text-[10px]">Refresh</p>
        </div>
        <div
          onClick={() => mutate(true)}
          className="flex gap-1 sm:gap-2 items-center justify-center bg-white hover:bg-[#e8e8e8ea] px-1 py-1 w-[75px] h-[36px] md:w-[100px] md:h-[42px] rounded-lg cursor-pointer"
        >
          <Change />
          <p className="font-sans sm:text-sm  text-[10px]">Change</p>
        </div>
        <div
          onClick={() => mutate(true)}
          className="flex gap-1 sm:gap-2 items-center justify-center bg-white hover:bg-[#e8e8e8ea] px-1 py-1 w-[75px] h-[36px] md:w-[100px] md:h-[42px] rounded-lg cursor-pointer"
        >
          <Delete />
          <p className="font-sans sm:text-sm  text-[10px]">Delete</p>
        </div>
      </div>
      <div className="my-14 flex justify-center items-center w-full">
        <div className="w-[90%] md:w-[70%]">
          {/* Header */}
          <div className="bg-[#305EFF] px-3 py-4 flex justify-between rounded-tl-lg rounded-tr-lg text-white">
            <span className="font-semibold w-1/3">Sender</span>
            <span className="font-semibold w-1/3 text-center">Subject</span>
            <span className="font-semibold w-1/3 text-right">View</span>
          </div>

          {/* Inbox Content */}
          <div className="bg-white py-1 text-black font-sans text-[13px] flex flex-col">
            {data?.inbox.length > 0 ? (
              <div className="flex flex-col">
                {data.inbox.map((email, index) => {
                  // Extract name and email using regex
                  const senderMatch =
                    email.mail_from.match(/(.*?)\s*<([^>]+)>/);
                  const senderName = senderMatch
                    ? senderMatch[1]
                    : "Unknown Sender";
                  const senderEmail = senderMatch
                    ? senderMatch[2]
                    : email.mail_from;

                  return (
                    <div
                      onClick={() => openModal(email)}
                      key={email.mail_id || index}
                      className="flex px-4 py-2 items-center border-b cursor-pointer"
                    >
                      {/* Sender (Name & Email) */}
                      <div className="w-1/3">
                        <span className="font-bold block truncate">
                          {senderName}
                        </span>
                        <span className="text-gray-500 block text-sm truncate">
                          {senderEmail}
                        </span>
                      </div>

                      {/* Subject */}
                      <div className="w-1/3 text-center truncate">
                        {email.mail_subject}
                      </div>

                      {/* View Icon (Aligned Right) */}
                      <div className="w-1/3 flex justify-end">
                        <IoIosArrowForward className="text-2xl" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col py-6 items-center justify-center">
                <video className="w-36" src="noMail.webm" autoPlay muted loop />
                <h1 className="font-bold text-[20px]">Your inbox is empty</h1>
                <p className="text-[10px]">Waiting for incoming emails</p>
              </div>
            )}
          </div>
          {selectedMail && (
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
            >
              {/* Main Popup */}
              {/* Header */}
              <DialogPanel className="bg-white relative w-[90vw] md:w-[70vw] min-h-[60vh] rounded-lg shadow-lg px-6 py-4">
                <span className="text-black flex justify-between">
                  <p>Mail</p>{" "}
                  <IoClose
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer font-bold text-2xl"
                  />
                </span>
                <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between mt-6 md:items-center border-b pb-4">
                  <div className="">
                    {" "}
                    <div className="flex items-center gap-3">
                      {/* User Avatar */}
                      <div className="w-9 h-9 md:w-12 md:h-12 capitalize rounded-full bg-gray-200 flex items-center justify-center text-lg md:text-xl font-bold text-blue-600">
                        {selectedMail.mail_from.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-[15px] md:text-lg font-semibold font-sans text-black">
                          {selectedMail.mail_from.split(" <")[0]}
                        </h2>
                        <p className="text-gray-500 text-sm font-sans">
                          {selectedMail.mail_from.match(/<([^>]+)>/)?.[1] || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-sans flex flex-row md:flex-col gap-6 md:gap-0">
                    <p className="md:text-end">Date:</p>
                    {new Date(
                      selectedMail.mail_timestamp * 1000
                    ).toLocaleString()}
                  </p>
                </div>
                {/* Mail Body Section */}
                <div className="mt-4 overflow-hidden">
                  <h3 className="text-md py-1 font-sans text-gray-700 border-b">
                    Subject:{" "}
                    <span className="text-gray-500 ml-4">
                      {selectedMail.mail_subject}
                    </span>
                  </h3>

                  {/* Scrollable Mail Content */}
                  <div
                    className="mt-4 flex justify-center min-h-[40vh] max-h-[50vh] 
             overflow-auto px-2 custom-scrollbar"
                  >
                    {/* Render HTML Content for Styled Emails */}
                    {selectedMail.mail_html ? (
                      <div
                        className="w-full text-gray-800"
                        dangerouslySetInnerHTML={{
                          __html: selectedMail.mail_html,
                        }}
                      />
                    ) : (
                      <p className="w-full break-words text-xs font-sans font-[400] sm:text-sm text-gray-800 leading-tight sm:leading-normal">
                        {selectedMail.mail_text}
                      </p>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default TempMail;

const CopyImg = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.7387 9.91727V19.9465C24.7387 21.0543 23.8406 21.9524 22.7328 21.9524C22.1789 21.9524 21.7299 21.5033 21.7299 20.9494V14.27C21.7305 13.9643 21.6075 13.6713 21.3889 13.4576L17.8987 10.0075C17.2764 9.37513 16.4291 9.01459 15.5419 9.00461H11.7007C11.1468 9.00461 10.6977 8.55559 10.6977 8.00169V6.87841C10.6977 6.11327 11.0024 5.37962 11.5444 4.83953C12.0863 4.29943 12.821 3.99735 13.5862 4.00002H18.9117C19.6648 4.00761 20.3849 4.31006 20.9176 4.84247L23.9263 7.85125C24.4615 8.40421 24.7539 9.14788 24.7387 9.91727ZM19.8845 13.929L16.8758 10.9202C16.3443 10.386 15.6234 10.0832 14.8699 10.0777H9.54442C7.9531 10.0833 6.66601 11.3748 6.66602 12.9662V25.1116C6.66602 26.7068 7.95921 28 9.55444 28H17.8687C19.4521 27.9835 20.7271 26.6951 20.727 25.1116V15.9348C20.7348 15.1776 20.4469 14.4472 19.9247 13.8989L19.8845 13.929Z"
      fill="white"
    />
  </svg>
);

const Copy = () => (
  <svg
    width="31"
    height="30"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3311_28566)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.1733 10.0738V18.3226C23.1733 19.2337 22.4347 19.9723 21.5236 19.9723C21.068 19.9723 20.6987 19.6031 20.6987 19.1475V13.6538C20.6991 13.4023 20.598 13.1614 20.4182 12.9857L17.5477 10.1481C17.0357 9.62794 16.3389 9.3314 15.6092 9.3232H12.4499C11.9943 9.3232 11.625 8.95389 11.625 8.49832V7.57445C11.625 6.94515 11.8756 6.34174 12.3213 5.89752C12.7671 5.45331 13.3713 5.20485 14.0006 5.20705H18.3808C19.0001 5.21329 19.5924 5.46205 20.0305 5.89995L22.5051 8.37459C22.9453 8.82938 23.1859 9.44103 23.1733 10.0738Z"
        fill="#22242B"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.1825 13.3731L16.7078 10.8985C16.2707 10.4591 15.6778 10.21 15.0581 10.2056H10.678C9.36913 10.2101 8.31053 11.2724 8.31055 12.5812V22.5705C8.31055 23.8826 9.37417 24.9462 10.6862 24.9462H17.5244C18.8268 24.9326 19.8755 23.873 19.8754 22.5705V15.0228C19.8818 14.4 19.645 13.7993 19.2154 13.3483L19.1825 13.3731Z"
        fill="#22242B"
      />
    </g>
    <defs>
      <clipPath id="clip0_3311_28566">
        <rect
          width="29.6091"
          height="29.6091"
          fill="white"
          transform="translate(0.908203 0.271973)"
        />
      </clipPath>
    </defs>
  </svg>
);

const Change = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3311_28580)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.8852 24.994C26.8852 25.4767 26.494 25.868 26.0114 25.868H12.9033C12.4206 25.868 12.0294 25.4767 12.0294 24.994C12.0294 24.5114 12.4206 24.1202 12.9033 24.1202H26.0114C26.494 24.1202 26.8852 24.5114 26.8852 24.994ZM11.4526 21.1666L7.42408 18.8769C7.15853 18.7235 6.8319 18.7204 6.5635 18.8688C6.29509 19.0173 6.12421 19.2958 6.11328 19.6023L5.91228 25.3611C5.90756 25.5356 5.99957 25.6985 6.15147 25.7845C6.30338 25.8705 6.49037 25.8657 6.63759 25.7718L11.4876 22.6696C11.7493 22.5061 11.9055 22.2166 11.8983 21.908C11.8911 21.5996 11.7217 21.3177 11.4526 21.1666ZM9.40777 17.8109L11.3915 18.9469C12.6488 19.6628 14.2484 19.2248 14.9656 17.9682L19.335 10.2606C20.0509 9.00326 19.6128 7.40363 18.3562 6.68647L16.3725 5.55043C15.1152 4.83449 13.5156 5.27253 12.7984 6.52917L8.42903 14.2367C7.71309 15.4941 8.15113 17.0937 9.40777 17.8109Z"
        fill="#22242B"
      />
    </g>
    <defs>
      <clipPath id="clip0_3311_28580">
        <rect
          width="29.6091"
          height="29.6091"
          fill="white"
          transform="translate(0.976562 0.271973)"
        />
      </clipPath>
    </defs>
  </svg>
);
const Delete = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3311_28586)">
      <g clip-path="url(#clip1_3311_28586)">
        <path
          opacity="0.01"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.515625 0.271973V29.881H30.1247V0.271973H0.515625Z"
          fill="#1C8FF8"
          fill-opacity="0.338428"
        />
        <path
          d="M13.6651 14.9848L14.5375 15.8572C15.0193 15.3753 15.0193 14.5942 14.5375 14.1123L13.6651 14.9848ZM15.4099 16.7295L16.2822 15.8572C15.8003 15.3753 15.0193 15.3753 14.5375 15.8572L15.4099 16.7295ZM17.1546 14.9848L16.2822 14.1123C15.8003 14.5942 15.8003 15.3753 16.2822 15.8572L17.1546 14.9848ZM15.4099 13.24L14.5375 14.1123C15.0193 14.5942 15.8003 14.5942 16.2822 14.1123L15.4099 13.24ZM8.49796 8.07289L10.2427 6.32816C9.2791 5.36457 7.71681 5.36457 6.75322 6.32816L8.49796 8.07289ZM8.49796 8.07289L6.75322 6.32816C5.78963 7.29175 5.78963 8.85404 6.75322 9.81763L8.49796 8.07289ZM14.5375 14.1123L8.49796 8.07289L6.75322 9.81763L12.7927 15.8572L14.5375 14.1123ZM8.31507 22.0795L14.5375 15.8572L12.7927 14.1123L6.57035 20.3348L8.31507 22.0795ZM8.31507 22.0795L6.57035 20.3348C5.60676 21.2983 5.60676 22.8606 6.57035 23.8242L8.31507 22.0795ZM8.31507 22.0795L6.57035 23.8242C7.53394 24.7877 9.09622 24.7877 10.0598 23.8242L8.31507 22.0795ZM14.5375 15.8572L8.31507 22.0795L10.0598 23.8242L16.2822 17.6019L14.5375 15.8572ZM22.3217 21.8965L16.2822 15.8572L14.5375 17.6019L20.5769 23.6414L22.3217 21.8965ZM22.3217 21.8965L20.5769 23.6414C21.5405 24.6049 23.1028 24.6049 24.0664 23.6414L22.3217 21.8965ZM22.3217 21.8965L24.0664 23.6414C25.03 22.6777 25.03 21.1155 24.0664 20.1518L22.3217 21.8965ZM16.2822 15.8572L22.3217 21.8965L24.0664 20.1518L18.0269 14.1123L16.2822 15.8572ZM22.1388 8.25577L16.2822 14.1123L18.0269 15.8572L23.8835 10.0005L22.1388 8.25577ZM22.1388 8.25577L23.8835 10.0005C24.8471 9.03691 24.8471 7.47462 23.8835 6.51103L22.1388 8.25577ZM22.1388 8.25577L23.8835 6.51103C22.9199 5.54746 21.3577 5.54746 20.394 6.51103L22.1388 8.25577ZM16.2822 14.1123L22.1388 8.25577L20.394 6.51103L14.5375 12.3676L16.2822 14.1123ZM8.49796 8.07289L14.5375 14.1123L16.2822 12.3676L10.2427 6.32816L8.49796 8.07289Z"
          fill="#22242B"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_3311_28586">
        <rect
          width="29.6091"
          height="29.6091"
          fill="white"
          transform="translate(0.515625 0.271973)"
        />
      </clipPath>
      <clipPath id="clip1_3311_28586">
        <rect
          width="29.6091"
          height="29.6091"
          fill="white"
          transform="translate(0.515625 0.271973)"
        />
      </clipPath>
    </defs>
  </svg>
);
