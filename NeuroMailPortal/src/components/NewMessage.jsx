import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../AuthContext";
import WrittingStyle from "./WrittingStyle";
import Quantumography from "./Quantumography";
import useNewMessage from "../hooks/useNewMessage";
import { Attach, Cross, Icon, Lock, Media, Quantu } from "../Icons";
import ProgressBar from "./ProgressBar";
import Tooltip from "./Tooltip";

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

function NewMessage() {
  const {
    emailData,
    setIsNewMessage,
    selectedMessage,
    setSelectedMessage,
    progressValue,
  } = useAuth();
  const fileInputRef = useRef(null);
  const [emailBody, setEmailBody] = useState("");

  const { mutate, isPending } = useNewMessage();

  const [isOpen, setIsOpen] = useState(false);
  const [isProgressStart, setIsProgressStart] = useState(false);
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

  useEffect(() => {
    setMessageData((prev) => {
      return {
        ...prev,
        ...selectedMessage,
      };
    });
  }, [selectedMessage]);

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

    event.target.value = null;
  };

  const handleFileRemove = (indexToRemove) => {
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

  // console.log(messageData);

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
  const hasAttachments =
    messageData.attachments && messageData.attachments.length > 0;
  const handleSubmit = (type) => {
    const formData = new FormData();
    formData.append("email_type", type);
    formData.append("body", composedEmail ? composedEmail : messageData.body);
    formData.append("subject", messageData.subject);
    formData.append("recipients", JSON.stringify(messageData.recipients));
    messageData.attachments.forEach((file) => {
      formData.append("attachments", file);
    });
    setIsProgressStart(true);
    mutate(formData, {
      onSuccess: (res) => {
        setIsProgressStart(false);
        {
          type === "sent"
            ? toast.success("Message Sent Successfully.")
            : toast.success("Message Added to Draft");
        }
        setSelectedMessage("");
        setIsNewMessage((prev) => !prev);
      },
      onError: (error) => {
        setIsProgressStart(false);
        Object.values(error.response.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
      },
    });
  };

  useEffect(() => {
    if (selectedMessage?.body) {
      setEmailBody(selectedMessage?.body);
    }
  }, [selectedMessage]);

  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Optional: handle draft logic if needed
        if (messageData.body?.trim() !== "") handleSubmit("draft");
        localStorage.removeItem("original");
        setIsNewMessage((prev) => !prev);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [messageData, setIsNewMessage, handleSubmit]);

  return (
    <div
      ref={popupRef}
      className="absolute bottom-0 right-3 w-[43vw] hidden md:flex flex-col justify-between h-[80vh] text-[#192839] rounded-tl-2xl font-sans p-4 rounded-tr-2xl shadow-highRaised bg-white"
    >
      <div className="relative flex-1 flex flex-col overflow-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-[600] text-[15px]">New Message</h3>
          <button
            onClick={() => {
              if (messageData.body?.trim() != "") handleSubmit("draft");
              localStorage.removeItem("original");
              setIsNewMessage((prev) => !prev);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <p className="text-[10px] text-[#40566D] mt-1">
          From {emailData?.email?.split("@")[0].toUpperCase()} &lt;
          {emailData?.email}&gt;
        </p>
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
              onClick={() => setCurrentType("to")}
              onKeyDown={(e) => {
                setCurrentType("to");
                handleKeyDown(e);
              }}
              className="w-full outline-none text-[14px] "
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
                value={inputValue.cc}
                onClick={() => setCurrentType("cc")}
                onChange={(e) => handleInputChange(e, "cc")}
                onBlur={(e) => handleKeyDown(e, true)}
                onKeyDown={(e) => {
                  setCurrentType("cc");
                  handleKeyDown(e);
                }}
                className="w-full outline-none text-[14px] "
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
                value={inputValue.bcc}
                onClick={() => setCurrentType("bcc")}
                onChange={(e) => handleInputChange(e, "bcc")}
                onBlur={(e) => handleKeyDown(e, true)}
                onKeyDown={(e) => {
                  setCurrentType("bcc");
                  handleKeyDown(e);
                }}
                className="w-full outline-none text-[14px] "
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
          className="w-full border-b text-[16px] py-2 text-[#40566D] outline-none mt-2"
        />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div
            // contentEditable
            // onInput={handleChange}
            // suppressContentEditableWarning
            className="flex-1 resize-none flex flex-col justify-between py-2 outline-none text-[14px] font-sans text-[#40566D] bg-white"
          >
            {/* <div
              className="resize-none outline-none"
              id="body"
              contentEditable
              onInput={handleChange}
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: selectedMessage?.body }}></div> */}
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

        {isOpen && (
          <Quantumography
            setIsOpen={setIsOpen}
            setMessageData={setMessageData}
          />
        )}
        {isComposedEmail && (
          <WrittingStyle
            messageData={messageData}
            setComposedEmail={setComposedEmail}
            setEmailBody={setEmailBody}
          />
        )}
      </div>

      <div className="flex flex-col gap-2 relative">
        {/* {isOpen && <Quantumography />}
        {isComposedEmail && (
          <WrittingStyle
            messageData={messageData}
            setComposedEmail={setComposedEmail}
          />
        )} */}
        <div className="flex justify-between items-center pt-1 bg-white">
          <div className="flex items-center">
            <button
              onClick={() => handleSubmit("sent")}
              className="flex items-center justify-between mr-1 h-[33px] w-[95px] pr-2 pl-3 py-2 bg-[#0E57CB] text-white  rounded-[200px] font-[500] text-[14px] shadow-md hover:bg-[#1765c1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8] transition duration-150"
            >
              Send
              {isPending && (
                <>
                  ing
                  <span className="ml-1">
                    <ThreeDots height="19" width="19" color="white" />
                  </span>
                </>
              )}
              <Option className={"w-[25px] h-[25px]"} />
            </button>
            <Tooltip message="Attachments" position="top">
              <span className="btn-small-circle" onClick={handleBrowseClick}>
                <Attach className={"w-[21px] h-[21px]"} />
              </span>
            </Tooltip>
            <span className="btn-small-circle">
              <Media className={"w-[21px] h-[21px]"} />
            </span>
            {/* <span className="btn-small-circle">
              <Lock className={"w-[21px] h-[21px]"} />
            </span> */}
            <Tooltip message="Writting Styles" position="top">
              <span
                className="btn-small-circle"
                onClick={() => setIsComposedEmail((prev) => !prev)}
              >
                <Icon
                  color={isComposedEmail ? "#0E57CB" : "#4A4A4A"}
                  className={"w-[21px] h-[21px]"}
                />
              </span>
            </Tooltip>
            <span
              className="btn-small-circle"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Quantu
                color={isOpen ? "#0E57CB" : "#4A4A4A"}
                className={"w-[21px] h-[21px]"}
              />
            </span>
            {/* {isOpen && <Quantumography />} */}
            {/* <span className="btn-small-circle">
              <More className={"w-[21px] h-[21px]"} />
            </span> */}
          </div>
          <div>
            <Tooltip message="Delete" position="top">
              <span
                onClick={() => {
                  setSelectedMessage("");
                  setIsNewMessage((prev) => !prev);
                }}
                className="btn-small-circle"
              >
                <Bin className={"w-[21px] h-[21px]"} />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
      {isProgressStart && (
        <ProgressBar progress={progressValue} hasAttachments={hasAttachments} />
      )}
    </div>
  );
}

export default NewMessage;

const Bin = ({ className }) => (
  <svg
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10.0083 2.12942H8.09181V1.4906C8.09181 1.09527 7.93476 0.716127 7.65522 0.436586C7.37568 0.157045 6.99654 0 6.60121 0H4.0459C3.65057 0 3.27143 0.157045 2.99189 0.436586C2.71235 0.716127 2.55531 1.09527 2.55531 1.4906V2.12942H0.638827C0.4694 2.12942 0.306911 2.19673 0.187108 2.31653C0.0673048 2.43633 0 2.59882 0 2.76825C0 2.93768 0.0673048 3.10017 0.187108 3.21997C0.306911 3.33977 0.4694 3.40708 0.638827 3.40708H0.851769V11.6471C0.851769 11.9295 0.963944 12.2003 1.16362 12.4C1.36329 12.5997 1.6341 12.7118 1.91648 12.7118H8.73064C9.01301 12.7118 9.28383 12.5997 9.4835 12.4C9.68317 12.2003 9.79535 11.9295 9.79535 11.6471V3.40708H10.0083C10.1777 3.40708 10.3402 3.33977 10.46 3.21997C10.5798 3.10017 10.6471 2.93768 10.6471 2.76825C10.6471 2.59882 10.5798 2.43633 10.46 2.31653C10.3402 2.19673 10.1777 2.12942 10.0083 2.12942ZM3.83296 1.4906C3.83296 1.43412 3.8554 1.37996 3.89533 1.34002C3.93527 1.30009 3.98943 1.27765 4.0459 1.27765H6.60121C6.65769 1.27765 6.71185 1.30009 6.75179 1.34002C6.79172 1.37996 6.81415 1.43412 6.81415 1.4906V2.12942H3.83296V1.4906ZM8.51769 11.4342H2.12942V3.40708H8.51769V11.4342ZM4.68473 5.11062V9.51769C4.68473 9.68712 4.61743 9.84961 4.49762 9.96941C4.37782 10.0892 4.21533 10.1565 4.0459 10.1565C3.87648 10.1565 3.71399 10.0892 3.59419 9.96941C3.47438 9.84961 3.40708 9.68712 3.40708 9.51769V5.11062C3.40708 4.94119 3.47438 4.7787 3.59419 4.6589C3.71399 4.53909 3.87648 4.47179 4.0459 4.47179C4.21533 4.47179 4.37782 4.53909 4.49762 4.6589C4.61743 4.7787 4.68473 4.94119 4.68473 5.11062ZM7.24004 5.11062V9.51769C7.24004 9.68712 7.17273 9.84961 7.05293 9.96941C6.93313 10.0892 6.77064 10.1565 6.60121 10.1565C6.43179 10.1565 6.2693 10.0892 6.14949 9.96941C6.02969 9.84961 5.96239 9.68712 5.96239 9.51769V5.11062C5.96239 4.94119 6.02969 4.7787 6.14949 4.6589C6.2693 4.53909 6.43179 4.47179 6.60121 4.47179C6.77064 4.47179 6.93313 4.53909 7.05293 4.6589C7.17273 4.7787 7.24004 4.94119 7.24004 5.11062Z"
      fill="black"
    />
  </svg>
);
const More = ({ className }) => (
  <svg
    width="3"
    height="11"
    viewBox="0 0 3 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.16355 2.3272C0.854941 2.3272 0.558974 2.20461 0.340757 1.98639C0.122539 1.76817 -5.44238e-05 1.47221 -5.44103e-05 1.1636C-5.43968e-05 0.854995 0.122539 0.559028 0.340757 0.340811C0.558974 0.122593 0.854941 -6.43522e-08 1.16355 -5.08626e-08C1.47215 -3.7373e-08 1.76812 0.122593 1.98634 0.340811C2.20455 0.559029 2.32715 0.854995 2.32715 1.1636C2.32715 1.47221 2.20455 1.76817 1.98634 1.98639C1.76812 2.20461 1.47215 2.3272 1.16355 2.3272ZM1.16355 6.39981C0.85494 6.39981 0.558974 6.27721 0.340757 6.059C0.122539 5.84078 -5.46018e-05 5.54481 -5.45883e-05 5.23621C-5.45748e-05 4.9276 0.122539 4.63163 0.340757 4.41342C0.558974 4.1952 0.854941 4.07261 1.16355 4.07261C1.47215 4.07261 1.76812 4.1952 1.98634 4.41342C2.20455 4.63163 2.32715 4.9276 2.32715 5.23621C2.32715 5.54481 2.20455 5.84078 1.98634 6.059C1.76812 6.27721 1.47215 6.39981 1.16355 6.39981ZM1.16355 10.4724C0.85494 10.4724 0.558974 10.3498 0.340756 10.1316C0.122539 9.91338 -5.47798e-05 9.61742 -5.47663e-05 9.30881C-5.47528e-05 9.0002 0.122539 8.70424 0.340756 8.48602C0.558974 8.2678 0.85494 8.14521 1.16355 8.14521C1.47215 8.14521 1.76812 8.2678 1.98634 8.48602C2.20455 8.70424 2.32715 9.00021 2.32715 9.30881C2.32715 9.61742 2.20455 9.91338 1.98634 10.1316C1.76812 10.3498 1.47215 10.4724 1.16355 10.4724Z"
      fill="#4A4A4A"
    />
  </svg>
);

const Option = ({ className }) => (
  <svg
    width="18"
    height="30"
    viewBox="0 0 18 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line
      x1="0.25"
      y1="0.724609"
      x2="0.249999"
      y2="29.2756"
      stroke="#90A5BB"
      stroke-width="0.5"
    />
    <path d="M11 13.5L14.5 16.5L18 13.5H11Z" fill="white" />
  </svg>
);
