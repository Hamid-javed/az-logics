import React, { useEffect, useState } from "react";
import {
  AngleBrackets,
  CurveBack,
  Delete,
  Forward,
  More,
  Reply,
  Smile,
  Restore,
} from "../Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetFile from "../hooks/useGetFile";
import { useAuth } from "../AuthContext";
import useDeleteMessage from "../hooks/useDeleteMessage";
import { toast } from "react-toastify";
import useRestoreMessage from "../hooks/useRestoreMessage";
import Tooltip from "../components/Tooltip";
import useDeleteFromTrash from "../hooks/useDeleteFromTrash";
import useIsStarredSeen from "../hooks/useIsStarredSeen";
import PrintEmail from "../components/PrintEmail";
import DownloadPDF from "../components/DownloadPDF";
import { fileTypeIcons } from "../components/Detail";
import { ThreeCircles } from "react-loader-spinner";

function MobileEmailDetail() {
  const navigate = useNavigate();
  const { queryParams, setSelectedMessage, messages } = useAuth();
  const details = messages?.results?.[localStorage.getItem("currentIndex")];
  const { mutate } = useDeleteMessage();
  const [isOpen, setIsOpen] = useState(false);

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

  const [isPending, setIsPending] = useState({});
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

  const handleReply = () => {
    navigate("/new-message");
    setSelectedMessage((prev) => ({
      ...prev,
      recipients: details.recipients
        .filter((recipient) => recipient.recipient_type === "from")
        .map((recipient) => ({
          ...recipient,
          recipient_type: "to",
        })),
    }));
  };

  const handleForward = () => {
    navigate("/new-message");
    const extractText = (html) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || "";
    };

    setSelectedMessage((prev) => ({
      ...prev,
      body: extractText(details.body), // Extract plain text
    }));
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
      <div className="flex flex-col px-2 py-11 gap-4 w-[100vw] bg-[#f6f8fc] h-[100vh]">
        <div className="flex  justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link to="/">
              <span className="btn-circle">
                <img src="/back.svg" className="h-5 w-4" />
              </span>
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            {/* <span className="btn-circle">
              <img src="/inbox2.svg" />
            </span> */}
            {/* <span className="btn-circle">
              <img src="/info.svg" />
            </span> */}
            <Tooltip message="Mark Unread" position="top">
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
        </div>
        <div className="mt-1 px-3 flex flex-col justify-between gap-3 w-full h-[70vh]">
          <div className="text-[#192839] font-sans w-full">
            <p className="text-[22px] min-h-[20px]">
              {details?.subject ? details.subject : "(No Subject)"}
              <span className="text-[#40566D] ml-2 text-[14px]">
                {formatDate(details?.created_at)}
              </span>
            </p>
            <div className="font-[300] text-[14px] mt-3 flex justify-between items-center">
              <div className="text-[10px] flex items-center gap-2 ">
                <p className="font-[500] text-[14px]">To</p>
                {details?.email_type === "inbox" ? (
                  <span className="ml-1 text-[12px]">me</span>
                ) : (
                  <button className="flex min-w-[80px] border border-slate-500 rounded-full py-[2px] px-[2px] max-w-[120px] gap-2 overflow-hidden items-center justify-between">
                    <span className="bg-[#3b6b3b] w-[18px] h-[18px] flex justify-center items-center rounded-full text-white">
                      {details?.recipients[0]?.name
                        ? details?.recipients[0]?.name[0]?.toUpperCase()
                        : details?.recipients[0]?.email[0]?.toUpperCase()}
                    </span>
                    {details?.recipients[0]?.name
                      ? details?.recipients[0]?.name
                      : details?.recipients[0]?.email.split("@")[0]}
                    <span>
                      <Arrow />
                    </span>
                  </button>
                )}
              </div>
              <p className="text-[#40566D] flex items-center relative ">
                {/* <span className="btn-circle">
                  <Smile color={"#40566D"} />
                </span> */}
                {/* <span className="btn-circle">
                  <CurveBack />
                </span> */}
                <span
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="btn-circle"
                >
                  <More className={"w-[18px] h-[18px]"} />
                </span>
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
                      className="flex whitespace-nowrap gap-3 cursor-pointer  my-[2px] items-center"
                    >
                      <AngleBrackets className={"w-5 h-5"} />
                      <span className="ml-[6px]">Show original</span>
                    </button>
                    <p className="flex whitespace-nowrap gap-3 cursor-pointer  items-center">
                      <img src="/mark-unread.svg" alt="" className="w-6 h-6" />
                      <span
                        onClick={() => {
                          handleMarkAsUnread(details.id, {
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
                          ? handleDeleteTrash()
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
              </p>
            </div>
            {details?.body ? (
              <p
                className="text-[14px] leading-[16.94px] mt-12"
                dangerouslySetInnerHTML={{ __html: details?.body }}
              ></p>
            ) : (
              <p className="text-[14px] leading-[16.94px] mt-12">
                No Content Available
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-5">
              {Array.isArray(details?.attachments) &&
                details.attachments.map((file, index) => (
                  <div
                    onClick={() => handleFileDownload(details.id, file.id)}
                    className="w-[155px] h-[42px] bg-white rounded-[6.4px] flex items-center mt-1"
                  >
                    <img src={icons[index]} alt="" className="h-[25px] ml-1" />
                    <div className="flex flex-col ml-2 mr-2">
                      <p className="font-[600] text-[9px] flex-wrap w-[85px] h-[30px] overflow-hidden flex items-center ">
                        {file.filename || "File Name"}
                      </p>
                      {/* <p className="text-[7px] text-[#40566D]">
                      File size 23.39KB
                    </p> */}
                    </div>
                    {isPending[file.id] ? (
                      <ThreeCircles height="16" width="16" color="black" />
                    ) : (
                      <img src="/download.svg" className="w-[14px] h-[14px]" />
                    )}
                  </div>
                ))}
            </div>
          </div>
          {details?.email_type === "inbox" && (
            <div className="flex gap-2 mt-16 ">
              <button
                onClick={handleReply}
                className="w-[139px] h-[36px] font-sans text-[14px] font-[600] text-[#305EFF] border-[1px] rounded-md border-[#305EFF] flex justify-center items-center gap-2"
              >
                <Reply />
                Reply
              </button>
              <button
                onClick={handleForward}
                className="w-[139px] h-[36px] font-sans text-[14px] font-[600] text-[#305EFF] border-[1px] rounded-md border-[#305EFF] flex justify-center items-center gap-2"
              >
                <Forward />
                Forward
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MobileEmailDetail;

const Arrow = () => (
  <svg
    width="7"
    height="4"
    viewBox="0 0 7 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.74987 0.832764L6.24023 1.27894L3.56776 3.70915C3.52494 3.74832 3.47402 3.77941 3.41792 3.80063C3.36183 3.82184 3.30168 3.83276 3.24093 3.83276C3.18018 3.83276 3.12002 3.82184 3.06393 3.80063C3.00784 3.77941 2.95692 3.74832 2.9141 3.70915L0.240234 1.27894L0.730597 0.833184L3.24023 3.11411L5.74987 0.832764Z"
      fill="#192839"
    />
  </svg>
);
