import { useEffect, useState } from "react";
import {
  More,
  Forward,
  Reply,
  Delete,
  AngleBrackets,
  Restore,
  Next,
  Prev,
} from "../Icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import useDeleteMessage from "../hooks/useDeleteMessage";
import { toast } from "react-toastify";
import useGetFile from "../hooks/useGetFile";
import useRestoreMessage from "../hooks/useRestoreMessage";
import PrintEmail from "./PrintEmail";
import useIsStarredSeen from "../hooks/useIsStarredSeen";
import DownloadPDF from "./DownloadPDF";
import Tooltip from "./Tooltip";
import { ThreeCircles } from "react-loader-spinner";
import useDeleteFromTrash from "../hooks/useDeleteFromTrash";

export const fileTypeIcons = {
  pdf: "/pdf.png",
  zip: "/zip.png",
  rar: "/zip.png",
  doc: "/word.png",
  txt: "/text.png",
  rtf: "/text.png",
  docx: "/word.png",
  xls: "/excel.png",
  csv: "/excel.png",
  mp3: "/audio.png",
  wav: "/audio.png",
  m4a: "/audio.png",
  mp4: "/video.png",
  mov: "/video.png",
  xlsx: "/excel.png",
  jpg: "/image-icon.png",
  png: "/image-icon.png",
  gif: "/image-icon.png",
  ppt: "/powerpoint.png",
  webp: "/image-icon.png",
  pptx: "/powerpoint.png",
};

function Detail() {
  const navigate = useNavigate();
  const {
    loading,
    emailData,
    queryParams,
    messages,
    setIsNewMessage,
    setSelectedMessage,
    currentPage,
    setCurrentPage,
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState({});
  const { mutate: markAsUnread } = useIsStarredSeen();
  const handleMarkAsUnread = (message_id, data) => {
    markAsUnread(
      { message_id, data },
      {
        onSuccess: () => {
          {
            navigate("/");
          }
        },
      }
    );
  };

  const [currentIndex, setCurrentIndex] = useState(
    parseInt(localStorage.getItem("currentIndex")) || 0
  );

  useEffect(() => {
    localStorage.setItem("currentIndex", currentIndex);
  }, [currentIndex]);

  const details = messages?.results?.[currentIndex];
  const currentEmailNumber = (currentPage - 1) * 10 + currentIndex + 1;

  const handleNext = () => {
    if (currentIndex < messages.results.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (messages.next != null) {
      setCurrentPage(currentPage + 1);
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (messages.previous != null) {
      setCurrentPage(currentPage - 1);
      setCurrentIndex(9);
    }
  };

  const { mutate } = useDeleteMessage();
  const handleDelete = () => {
    const payload = {
      emails: [details.id],
    };
    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        navigate("/");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.detail || "An unexpected error occurred."
        );
      },
    });
  };

  const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();

    const isToday =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const { mutate: getFile } = useGetFile();
  const handleFileDownload = (message_id, fileID) => {
    setIsPending((prevState) => ({
      ...prevState,
      [fileID]: true,
    }));
    getFile(
      { message_id, fileID },
      {
        onSuccess: (res) => {
          setIsPending((prevState) => ({
            ...prevState,
            [fileID]: false,
          }));
        },
        onError: () => {
          setIsPending((prevState) => ({
            ...prevState,
            [fileID]: false,
          }));
        },
      }
    );
  };

  const { mutate: restoreMessages } = useRestoreMessage();
  const handleRestore = () => {
    const payload = {
      emails: [details.id],
    };
    restoreMessages(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        {
          navigate("/");
        }
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.detail || "An unexpected error occurred."
        );
      },
    });
  };

  const extractText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerHTML || "";
  };

  function getForwardBody(email) {
    const from = email.recipients.find(
      (r) => r.recipient_type === "from"
    ).email;
    const to = email.recipients.find((r) => r.recipient_type === "to").email;
    const cc = email.recipients
      .filter((r) => r.recipient_type === "cc")
      .map((r) => r.email)
      .join(", ");
    const subject = email.subject;
    const date = new Date(email.created_at).toLocaleString();

    const forwardBody = `
    <p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        ---------- Forwarded message ---------
        From: ${from}
        Date: ${date}
        Subject: ${subject}
        To: ${to}
        ${cc ? `Cc: ${cc}` : ""}
            
        On ${date} at ${date} ${from} wrote:
        ${email.body}
            </p>`;
    return forwardBody;
  }

  function getReplyBody(email) {
    const from = email.recipients.find(
      (r) => r.recipient_type === "from"
    )?.email;
    const to = email.recipients.find((r) => r.recipient_type === "to")?.email;
    const date = new Date(email.created_at).toLocaleString();

    const replyBody = `
    <p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

    On ${date} at ${date} ${from} wrote:

        ${email.body}
            </p>`;
    return replyBody;
  }

  const handleReply = () => {
    setIsNewMessage(true);
    setSelectedMessage((prev) => ({
      ...prev,
      recipients: details.recipients
        ?.filter((recipient) => recipient.recipient_type === "from")
        ?.map((recipient) => ({
          ...recipient,
          recipient_type: "to",
        })),
      body: extractText(getReplyBody(details)),
      subject: details.subject,
    }));
  };

  const handleForward = () => {
    setIsNewMessage(true);
    setSelectedMessage((prev) => ({
      ...prev,
      recipients: [],
      body: extractText(getForwardBody(details)), // Extract plain text
    }));
  };

  const { mutate: deleteTrash } = useDeleteFromTrash();
  const handleDeleteTrash = (id) => {
    const payload = {
      emails: [id],
    };
    deleteTrash(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        {
          navigate("/");
        }
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.detail || "An unexpected error occurred."
        );
      },
    });
  };

  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const updatedIcons = details?.attachments.map((files) => {
      const extension = files.filename.split(".").pop().toLowerCase();
      return fileTypeIcons[extension] || "/file.svg";
    });
    setIcons(updatedIcons);
  }, [details?.attachments]);

  return (
    <>
      <div className="w-[98%]  flex flex-col gap-7 h-screen px-1">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Tooltip message="Back" position="top">
              <Link to="/">
                <span className="btn-circle">
                  <img src="/back.svg" />
                </span>
              </Link>
            </Tooltip>
            <Tooltip message="Mark as unread" position="top">
              <span
                onClick={() => {
                  handleMarkAsUnread(details.id, {
                    is_seen: false,
                  });
                }}
                className="btn-circle"
              >
                <img src="/mark-unread.svg" className="h-7 w-7" />
              </span>
            </Tooltip>
            {/* <span className="btn-circle">
              <img src="/info.svg" />
            </span> */}
            <Tooltip
              message={
                queryParams.type === "trash" ? "Delete forever" : "Delete"
              }
              position="top"
            >
              <span
                onClick={() =>
                  queryParams.type === "trash"
                    ? handleDeleteTrash(details.id)
                    : handleDelete()
                }
                className="btn-circle"
              >
                <Delete color={"#40566D"} />
              </span>
            </Tooltip>
            {queryParams.type === "trash" && (
              <Tooltip message="Restore" position="top">
                <span onClick={handleRestore} className="btn-circle">
                  <Restore className={"w-6 h-6"} />
                </span>
              </Tooltip>
            )}
          </div>
          <div className="flex gap-7 items-center mr-3">
            <p className="font-sans text-[20px] leading-[18px] text-[#000000]">
              {currentEmailNumber} of {messages.count}
            </p>
            <button
              disabled={currentEmailNumber === 1 || loading}
              onClick={handlePrevious}
              className="btn-circle cursor-pointer disabled:cursor-not-allowed"
            >
              <Prev
                className="w-[14px] h-[14px]"
                color={currentEmailNumber === 1 ? "#747474" : "black"}
              />
            </button>
            <button
              disabled={currentEmailNumber === messages.count || loading}
              onClick={handleNext}
              className="ml-2 btn-circle cursor-pointer disabled:cursor-not-allowed"
            >
              <Next
                className="w-[14px] h-[14px]"
                color={
                  currentEmailNumber === messages.count ? "#747474" : "black"
                }
              />
            </button>
          </div>
        </div>
        <h1 className="text-[22px] text-[#192839] leading-[20px] font-sans">
          {details?.subject ? details.subject : "(No Subject)"}
        </h1>
        <div className="mt-1 flex gap-3">
          <span>
            <Profile />
          </span>
          <div className="text-[#192839] w-full font-sans pr-8">
            <p className="font-[600] text-[22px] h-[28px]">Neuromail</p>
            <div className="font-[300] text-[14px] w-full flex justify-between items-center">
              <p>
                From &ensp;
                {details?.recipients?.find(
                  (r) => r.recipient_type === "from"
                ) ? (
                  <span>
                    {details.recipients.find((r) => r.recipient_type === "from")
                      ?.name || "Unknown Name"}
                    &lt;
                    {details.recipients.find((r) => r.recipient_type === "from")
                      ?.email || "No Email"}
                    &gt;
                  </span>
                ) : (
                  <span>
                    {emailData?.email?.split("@")[0]} &lt;
                    {emailData?.email}
                    &gt;
                  </span>
                )}
              </p>
              <p className="text-[#40566D] flex gap-3 items-center">
                {formatDate(details?.created_at)}
                {/* <span className="btn-circle">
                  <Smile color={"black"} className={"w-[20px] h-[20px]"} />
                </span> */}

                <div className="relative">
                  <Tooltip message="More Options" position="top">
                    <span
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="btn-circle"
                    >
                      <More className={"w-[20px] h-[20px]"} />
                    </span>
                  </Tooltip>
                  {isOpen && (
                    <div className="bg-[#ffffff] p-3 absolute top-[35px] w-[200px] -right-1  flex flex-col items-left justify-center gap-2 shadow-lg rounded-md border border-[#f6f8fc]">
                      <PrintEmail details={details} setIsOpen={setIsOpen} />

                      <button
                        onClick={() => {
                          localStorage.setItem(
                            "showOriginalMail",
                            JSON.stringify(details)
                          );
                          window.open(
                            "/show-original",
                            "_blank",
                            "noopener,noreferrer"
                          );
                          // navigate("/show-original", { state: details })
                        }}
                        className="flex whitespace-nowrap gap-3 cursor-pointer border-none outline-none my-[2px] items-center"
                      >
                        <AngleBrackets className={"w-5 h-5"} />
                        <span className="ml-[6px]">Show original</span>
                      </button>
                      <p className="flex whitespace-nowrap gap-3 cursor-pointer  items-center">
                        <img
                          src="/mark-unread.svg"
                          alt=""
                          className="w-6 h-6"
                        />
                        <span
                          onClick={() => {
                            handleMarkAsUnread(details?.id, {
                              is_seen: false,
                            });
                          }}
                          className="ml-[2px]"
                        >
                          Mark as unread
                        </span>
                      </p>
                      <DownloadPDF details={details} setIsOpen={setIsOpen} />
                      <p
                        onClick={() =>
                          queryParams.type === "trash"
                            ? handleDeleteTrash(details?.id)
                            : handleDelete()
                        }
                        className="flex whitespace-nowrap gap-3 cursor-pointer mt-1 items-center"
                      >
                        <Delete
                          color={"#40566D"}
                          className={"w-[18px] h-[18px]"}
                        />
                        <span className="ml-2">Delete this message</span>
                      </p>
                    </div>
                  )}
                </div>
              </p>
            </div>
            <div className=" text-[14px] flex items-center gap-2">
              <p className="font-[500]">To</p>
              {details?.email_type === "inbox" ? (
                "me"
              ) : (
                <div className="min-w-[100px] flex items-center h-[30px] border-[1.36px] border-[#DDDFE3] rounded-[136.36px] justify-arround pr-2 pl-[2px]">
                  <>
                    <span className="bg-[#3b6b3b] mr-1 w-[25px] h-[25px] flex justify-center items-center rounded-full text-white">
                      {details?.recipients[0]?.name
                        ? details?.recipients[0]?.name[0]?.toUpperCase()
                        : details?.recipients[0]?.email[0]?.toUpperCase()}
                    </span>
                    {details?.recipients[0]?.name
                      ? details?.recipients[0]?.name
                      : details?.recipients[0]?.email.split("@")[0]}
                  </>
                </div>
              )}
            </div>
            {!loading &&
              (details?.body ? (
                <p
                  className="text-[14px] leading-[16.94px] mt-4"
                  dangerouslySetInnerHTML={{ __html: details?.body }}
                ></p>
              ) : (
                <p className="text-[14px] leading-[16.94px] mt-4">
                  No Content Available
                </p>
              ))}
            <div className="flex flex-wrap w-full  gap-3 mt-8">
              {Array.isArray(details?.attachments) &&
                details?.attachments.map((file, index) => (
                  <div
                    key={index}
                    onClick={() => handleFileDownload(details?.id, file.id)}
                    className="w-[324px] h-[74px] bg-white hover:shadow-lg cursor-pointer border border-[#e7e7e7] rounded-[11.27px] flex items-center mt-1"
                  >
                    <img
                      src={icons?.[index]}
                      alt=""
                      className="h-[48px] ml-3"
                    />
                    <div className="w-[183px] h-[49px] flex ml-4 items-center">
                      <p className="font-[600] text-[15px] flex-wrap h-full flex items-center w-[150px] overflow-hidden">
                        {file.filename || "File Name"}
                      </p>
                      {/* <p className="text-[12px] text-[#40566D]">
                      File size
                      {file.size ? (file.size / 1024).toFixed(2) : "0.00"} KB
                    </p> */}
                    </div>
                    {isPending[file.id] ? (
                      <ThreeCircles height="25" width="25" color="black" />
                    ) : (
                      <img src="/download.svg" className="w-[22px] h-[22px]" />
                    )}
                  </div>
                ))}
            </div>
            <div className="flex gap-4 my-11 ">
              {details?.email_type === "inbox" && (
                <>
                  <button
                    onClick={handleReply}
                    className="w-[224px] h-[36px] hover:shadow-md hover:border-[1.5px] text-[14px] font-[600] text-[#305EFF] border-[1px] rounded-md border-[#305EFF] flex justify-center items-center gap-2"
                  >
                    <Reply />
                    Reply
                  </button>
                  <button
                    onClick={handleForward}
                    className="w-[224px] h-[36px] text-[14px] hover:shadow-md hover:border-[1.5px] font-[600] text-[#305EFF] border-[1px] rounded-md border-[#305EFF] flex justify-center items-center gap-2"
                  >
                    <Forward />
                    Forward
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;

const Profile = () => (
  <svg
    width="61"
    height="61"
    viewBox="0 0 61 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="30.5" cy="30.5" r="30.5" fill="#305EFF" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13 23.5714C13 21.0467 15.0467 19 17.5714 19H42.7143C45.239 19 47.2857 21.0467 47.2857 23.5714V37.2857C47.2857 39.8104 45.239 41.8571 42.7143 41.8571H17.5714C15.0467 41.8571 13 39.8104 13 37.2857V23.5714ZM24.4286 33.8571V23.712H28.5539V26.267C29.2991 24.75 30.5766 23.4459 32.8123 23.4459C35.2342 23.4459 37.2569 24.9363 37.2569 28.4495V37.0194H32.9986V29.035C32.9986 27.6776 32.28 26.9324 30.9492 26.9324C29.5386 26.9324 28.6869 27.7575 28.6869 29.7004V37.0194H27.2857V38.4286H22.7143V33.8571H24.4286Z"
      fill="#F8FAFC"
    />
  </svg>
);
