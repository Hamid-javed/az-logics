import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Attach, Cross, Icon, Lock, Media, More, Quantu } from "../Icons";
import { Link, useNavigate } from "react-router-dom";
import useNewMessage from "../hooks/useNewMessage";
import { useAuth } from "../AuthContext";
import { ThreeDots } from "react-loader-spinner";
import WrittingStyle from "../components/WrittingStyle";
import { toast } from "react-toastify";
import Quantumography from "../components/Quantumography";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link"],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }]["clean"],
  ],
};

function MobileNewMessage() {
  const navigate = useNavigate();
  const { emailData, selectedMessage } = useAuth();
  const fileInputRef = useRef(null);
  const [emailBody, setEmailBody] = useState("");

  const { mutate, isPending } = useNewMessage();
  const [submittingType, setSubmittingType] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [progressValue, setProgressValue] = useState(10);
  const [composedEmail, setComposedEmail] = useState("");
  const [isComposedEmail, setIsComposedEmail] = useState(false);
  const [messageData, setMessageData] = useState({
    body: "",
    subject: "",
    email_type: "",
    recipients: [],
    attachments: [],
    ...selectedMessage,
  });
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setMessageData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }));
    }
    const totalTime = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    const stepTime = totalTime / 100;

    let currentProgress = 0;

    const intervalId = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += 1;
        setProgressValue(currentProgress);
      } else {
        clearInterval(intervalId);
      }
    }, stepTime);

    return () => clearInterval(intervalId);
  };

  const handleFileRemove = (indexToRemove) => {
    setProgressValue(0);
    setMessageData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleChange = (e) => {
    const { name, value, innerText, id } = e.target;
    const inputValue = innerText || value;
    const inputTitle = name || id;
    setMessageData((prevValues) => ({
      ...prevValues,
      [inputTitle]: inputValue,
    }));
  };

  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const [inputValue, setInputValue] = useState({ to: "", cc: "", bcc: "" });
  const [currentType, setCurrentType] = useState("to");

  const handleInputChange = (e, type) => {
    const { value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e, blur = false) => {
    const email = inputValue[currentType].trim();
    if (e.key === "Enter" || e.key === " " || blur) {
      if (validateEmail(email)) {
        setMessageData((prev) => ({
          ...prev,
          recipients: [
            ...prev.recipients,
            {
              email: email,
              recipient_type: currentType,
              name: email.split("@")[0],
            },
          ],
        }));
      }
      setInputValue((prevState) => ({
        ...prevState,
        [currentType]: "",
      }));
    } else if (
      e.key === "Backspace" &&
      inputValue[currentType]?.trim() === ""
    ) {
      const lastRecipientIndex = [...messageData.recipients]
        .reverse()
        .findIndex((recipient) => recipient.recipient_type === currentType);

      if (lastRecipientIndex !== -1) {
        const actualIndex =
          messageData.recipients.length - 1 - lastRecipientIndex;

        setMessageData((prev) => ({
          ...prev,
          recipients: prev.recipients.filter((_, i) => i !== actualIndex),
        }));
      }
    }
  };

  const removeRecipient = (type, index) => {
    setMessageData((prev) => {
      const filteredRecipients = prev.recipients.filter(
        (recipient) => recipient.recipient_type === type
      );

      return {
        ...prev,
        recipients: prev.recipients.filter(
          (recipient) => recipient !== filteredRecipients[index]
        ),
      };
    });
  };

  const handleSubmit = (type) => {
    setSubmittingType(type);
    const formData = new FormData();
    formData.append("email_type", type);
    formData.append("body", composedEmail ? composedEmail : messageData.body);
    formData.append("subject", messageData.subject);
    formData.append("recipients", JSON.stringify(messageData.recipients));
    messageData.attachments.forEach((file) => {
      formData.append("attachments", file);
    });
    mutate(formData, {
      onSuccess: (res) => {
        {
          type === "sent"
            ? toast.success("Message Sent Successfully.")
            : toast.success("Message Added to Draft");
        }
        navigate("/");
        setSubmittingType(null);
      },
      onError: (error) => {
        Object.values(error.response.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
        setSubmittingType(null);
      },
    });
  };

  useEffect(() => {
    if (selectedMessage?.body) {
      setEmailBody(selectedMessage?.body);
    }
  }, [selectedMessage]);

  return (
    <div className="flex flex-col px-2  py-3 gap-4 w-[100vw] font-sans bg-[#f6f8fc] h-dvh">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              if (messageData.body?.trim() !== "") {
                handleSubmit("draft");
              } else {
                navigate("/");
              }
            }}
          >
            <span className="btn-circle">
              <img src="/back.svg" />
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* <Edit /> */}
          <Media />
          {/* <Lock /> */}
          <span onClick={() => setIsComposedEmail((prev) => !prev)}>
            <Icon color={"#4A4A4A"} />
          </span>
          <span onClick={() => setIsOpen((prev) => !prev)}>
            {" "}
            <Quantu color={isOpen ? "#0E57CB" : "#4A4A4A"} />
          </span>
          <div className="absolute z-40 bottom-0 left-0">
            {" "}
            {isOpen && (
              <Quantumography
                setIsOpen={setIsOpen}
                setMessageData={setMessageData}
              />
            )}
          </div>
          <span onClick={handleBrowseClick}>
            <Attach />
          </span>
          <button
            onClick={() => handleSubmit("sent")}
            className="flex items-center font-sans h-[28px] min-w-[55px] pr-2 pl-3 py-2 bg-[#0E57CB] text-white  rounded-[200px] font-[500] text-[12px] shadow-md hover:bg-[#1765c1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8] transition duration-150"
          >
            Send
            {isPending && submittingType === "sent" && (
              <>
                ing
                <span className="ml-1">
                  <ThreeDots height="15" width="15" color="white" />
                </span>
              </>
            )}
          </button>

          {/* <More className={"w-[16px] h-[16px]"} /> */}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center ">
          <h3 className="font-[600] text-[14px]">New Message</h3>
        </div>
        <div className="flex border-b relative items-center text-[14px] gap-2 py-3 mt-3">
          <p className="text-[14px] text-[#656565] flex-nowrap">From</p>
          {emailData?.email}
        </div>
        <div className="relative border-b">
          <div className="flex items-center text-[14px] gap-2 py-2 mt-3">
            <p className="font-[500] text-[14px] flex-nowrap">To</p>
            {messageData.recipients
              .filter((recipient) => recipient.recipient_type === "to")
              .map((recipient, index) => (
                <button
                  key={index}
                  className="flex items-center h-[22px] border-[1.36px] border-[#DDDFE3] rounded-[136.36px] justify-between pr-2 pl-[1px]"
                >
                  <span className="bg-[#3b6b3b] w-[19px] h-[19px] flex justify-center items-center rounded-full text-white text-[12px]">
                    {recipient.email[0]?.toUpperCase()}{" "}
                    {/* Display first letter */}
                  </span>
                  <p className="font-[600] text-[10px] min-w-[40px] whitespace-nowrap mx-[2px]">
                    {recipient.email.split("@")[0]}
                  </p>
                  <span onClick={() => removeRecipient("to", index)}>
                    <Cross className={"w-[9px] h-[9px]"} />
                  </span>
                </button>
              ))}
            <input
              name="to"
              type="email"
              value={inputValue.to} // Use inputValue for "to"
              onChange={(e) => handleInputChange(e, "to")}
              onBlur={(e) => handleKeyDown(e, true)}
              onKeyDown={(e) => {
                setCurrentType("to");
                handleKeyDown(e);
              }}
              className="w-[76vw] outline-none text-[14px] bg-[#F6F8FC]"
            />
          </div>
          {showCc && (
            <div className="flex relative items-center text-[14px] gap-2">
              <p className="font-[500] text-[13px] flex-nowrap">Cc</p>
              {messageData.recipients
                .filter((recipient) => recipient.recipient_type === "cc")
                .map((recipient, index) => (
                  <button
                    key={index}
                    className="flex items-center h-[22px] border-[1.36px] border-[#DDDFE3] rounded-[136.36px] justify-between pr-2 pl-[1px]"
                  >
                    <span className="bg-[#3b6b3b] w-[19px] h-[19px] flex justify-center items-center rounded-full text-white text-[12px]">
                      {recipient.email[0]?.toUpperCase()}{" "}
                      {/* Display first letter */}
                    </span>
                    <p className="font-[600] text-[10px] min-w-[60px] whitespace-nowrap mx-[2px]">
                      {recipient.email.split("@")[0]}
                    </p>
                    <span onClick={() => removeRecipient("cc", index)}>
                      <Cross className={"w-[9px] h-[9px]"} />
                    </span>
                  </button>
                ))}
              <input
                name="cc"
                type="email"
                value={inputValue.cc} // Use inputValue for "to"
                onBlur={(e) => handleKeyDown(e, true)}
                onChange={(e) => handleInputChange(e, "cc")}
                onKeyDown={(e) => {
                  setCurrentType("cc");
                  handleKeyDown(e);
                }}
                className="w-full outline-none text-[14px] bg-[#F6F8FC]"
              />
            </div>
          )}
          {showBcc && (
            <div className="flex relative items-center text-[14px] gap-2 mt-2">
              <p className="font-[500] text-[13px] flex-nowrap">Bcc</p>
              {messageData.recipients
                .filter((recipient) => recipient.recipient_type === "bcc")
                .map((recipient, index) => (
                  <button
                    key={index}
                    className="flex items-center h-[22px] border-[1.36px] border-[#DDDFE3] rounded-[136.36px] justify-between pr-2 pl-[1px]"
                  >
                    <span className="bg-[#3b6b3b] w-[19px] h-[19px] flex justify-center items-center rounded-full text-white text-[12px]">
                      {recipient.email[0]?.toUpperCase()}{" "}
                      {/* Display first letter */}
                    </span>
                    <p className="font-[600] text-[10px] min-w-[60px] whitespace-nowrap mx-[2px]">
                      {recipient.email.split("@")[0]}
                    </p>
                    <span onClick={() => removeRecipient("bcc", index)}>
                      <Cross className={"w-[9px] h-[9px]"} />
                    </span>
                  </button>
                ))}
              <input
                name="bcc"
                type="email"
                value={inputValue.bcc} // Use inputValue for "to"
                onBlur={(e) => handleKeyDown(e, true)}
                onChange={(e) => handleInputChange(e, "bcc")}
                onKeyDown={(e) => {
                  setCurrentType("bcc");
                  handleKeyDown(e);
                }}
                className="w-[80vw] outline-none text-[14px] bg-[#F6F8FC]"
              />
            </div>
          )}
          <p className="text-[14px] text-[#747789] absolute right-1 bottom-1">
            {!showCc && (
              <span
                onClick={() => setShowCc(true)}
                className="hover:border-b-[1.5px] hover:border-[#66697a] cursor-pointer mr-1"
              >
                Cc
              </span>
            )}
            {!showBcc && (
              <span
                onClick={() => setShowBcc(true)}
                className="hover:border-b-[1.5px] hover:border-[#66697a] cursor-pointer"
              >
                Bcc
              </span>
            )}
          </p>
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={messageData.subject}
          onChange={handleChange}
          className="w-full border-b text-[16px] bg-[#fff0] py-2 text-[#40566D] outline-none mt-2"
        />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div
            // id="body"
            // contentEditable
            // onInput={handleChange}
            // suppressContentEditableWarning
            className="resize-none flex-1 flex flex-col justify-between py-2 outline-none mt-2 text-[14px] font-sans text-[#40566D]"
          >
            {/* <div className="resize-none outline-none" id="body"
            contentEditable
            onInput={handleChange}
            suppressContentEditableWarning
            ></div> */}
            <ReactQuill
              id="body"
              modules={modules}
              className="flex flex-col flex-1"
              theme="snow"
              value={emailBody}
              onChange={(e) => {
                setEmailBody(e);
                handleChange({
                  target: {
                    innerText: e,
                    id: "body",
                  },
                });
              }}
            />
            <div>
              {messageData.attachments.length > 0 &&
                messageData.attachments.map((file, index) => (
                  <div
                    contentEditable="false"
                    key={index}
                    className="w-[100%] mt-2 rounded-sm bg-[#e7e7e7] cursor-pointer flex items-center justify-between p-2 mb-2"
                  >
                    <p className="text-[12px] flex items-center truncate text-[#305EFF] font-[500] font-sans">
                      {file.name}
                      <span className="text-[#000000e2]">
                        {file.size > 0 &&
                          ` (${(file.size / 1024).toFixed(0)} KB)`}
                      </span>
                      <progress
                        value={progressValue}
                        max="100"
                        className="w-[150px] h-[5px] mt-[2px] ml-2"
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                        }}
                      ></progress>
                    </p>
                    <span
                      onClick={() => handleFileRemove(index)}
                      className="cursor-pointer"
                    >
                      X
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {isComposedEmail && (
          <WrittingStyle
            messageData={messageData}
            setComposedEmail={setComposedEmail}
            setEmailBody={setEmailBody}
          />
        )}
      </div>
    </div>
  );
}

export default MobileNewMessage;

const Edit = () => (
  <svg
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.58176 5.24458L6.13993 5.86455L9.41356 2.22853L8.85538 1.60856L5.58176 5.24458ZM1.20687 10.7237H1.76504L5.28004 6.81963L4.72187 6.19966L1.20687 10.1038V10.7237ZM6.56234 7.28879L4.29946 4.77542L6.8188 1.97719L6.38131 1.49127L3.49991 4.69164C3.37923 4.82568 3.23843 4.89271 3.07751 4.89271C2.91659 4.89271 2.77579 4.82568 2.65511 4.69164C2.53442 4.55759 2.47408 4.39852 2.47408 4.21443C2.47408 4.03034 2.53442 3.87105 2.65511 3.73655L5.52141 0.552943C5.76279 0.284849 6.047 0.150803 6.37407 0.150803C6.70113 0.150803 6.98514 0.284849 7.22611 0.552943L7.6636 1.03886L8.41789 0.20107C8.53858 0.0670234 8.682 0 8.84814 0C9.01429 0 9.1575 0.0670234 9.27779 0.20107L10.6808 1.75936C10.8015 1.89341 10.8618 2.05248 10.8618 2.23657C10.8618 2.42066 10.8015 2.57995 10.6808 2.71445L6.56234 7.28879ZM0.603433 12.0642C0.43246 12.0642 0.289246 11.9999 0.173789 11.8712C0.0583319 11.7425 0.000402289 11.5834 0 11.394V10.1038C0 9.92505 0.0301717 9.75458 0.090515 9.59239C0.150858 9.43019 0.236345 9.28788 0.346974 9.16545L4.29946 4.77542L6.56234 7.28879L2.60985 11.6788C2.49922 11.8017 2.37089 11.8967 2.22486 11.9637C2.07883 12.0307 1.92556 12.0642 1.76504 12.0642H0.603433Z"
      fill="#4A4A4A"
    />
  </svg>
);

const Dropdown = () => (
  <svg
    width="8"
    height="4"
    viewBox="0 0 8 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.34618 0L8 0.594902L4.4367 3.83518C4.3796 3.88741 4.31171 3.92887 4.23692 3.95715C4.16213 3.98544 4.08193 4 4.00093 4C3.91992 4 3.83972 3.98544 3.76493 3.95715C3.69014 3.92887 3.62225 3.88741 3.56515 3.83518L0 0.594902L0.653817 0.00056076L4 3.04179L7.34618 0Z"
      fill="black"
    />
  </svg>
);
