import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CurveBack, Next, Prev } from "../Icons";
import { useAuth } from "../AuthContext";
import useGetDetails from "../hooks/useGetDetails";
import useIsStarredSeen from "../hooks/useIsStarredSeen";

import NotFound from "../assets/notFound.json";
import useDeleteMessage from "../hooks/useDeleteMessage";
import useRestoreMessage from "../hooks/useRestoreMessage";
import { toast } from "react-toastify";
import useDeleteFromTrash from "../hooks/useDeleteFromTrash";
import Tooltip from "./Tooltip";
import TempMail from "./TempMail";

function EmailList({ refetchFun }) {
  const [active, setActive] = useState("All");
  const [hoveredRow, setHoveredRow] = useState(null);
  const {
    loading,
    messages,
    setQueryParams,
    queryParams,
    isDesktop,
    selectedIds,
    setSelectedIds,
    setIsNewMessage,
    currentPage,
    Selected,
    setCurrentPage,
    setSelectedMessage,
  } = useAuth();
  const refetch = useOutletContext();
  const navigate = useNavigate();
  const { mutate: getDetails } = useGetDetails();
  const { mutate: updateEmail } = useIsStarredSeen();

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, messages.count);

  const toggleStarredSeen = (message_id, data) => {
    updateEmail(
      { message_id, data },
      {
        onSuccess: () => {
          {
            isDesktop ? refetch() : refetchFun();
          }
        },
        onError: () => {
          if ("is_starred" in data) {
            setFilteredMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === message_id
                  ? { ...msg, is_starred: !data.is_starred }
                  : msg
              )
            );
          }
        },
      }
    );
  };

  const handleClick = (newParams) => {
    setQueryParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();

    const isToday =
      messageDate.getUTCDate() === today.getUTCDate() &&
      messageDate.getUTCMonth() === today.getUTCMonth() &&
      messageDate.getUTCFullYear() === today.getUTCFullYear();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  const [areAllSelected, setAreAllSelected] = useState(false);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setAreAllSelected(checked);

    if (checked) {
      const allIds = messages?.results.map((item) => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((selectedId) => selectedId !== id) // Deselect
          : [...prevSelected, id] // Select
    );
  };

  const isChecked = (id) => selectedIds.includes(id);

  useEffect(() => {
    const allIds = messages?.results?.map((item) => item.id) || [];

    if (selectedIds.length === allIds.length && allIds.length > 0) {
      setAreAllSelected(true);
    } else {
      setAreAllSelected(false);
    }
  }, [selectedIds, messages]);

  const { mutate: deleteMessages } = useDeleteMessage();
  const { mutate: restoreMessages } = useRestoreMessage();
  const { mutate: deleteTrash } = useDeleteFromTrash();

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      const payload = {
        emails: selectedIds,
      };
      deleteMessages(payload, {
        onSuccess: (res) => {
          toast.success(res?.data?.message);
          {
            isDesktop ? refetch() : refetchFun();
          }
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.detail || "An unexpected error occurred."
          );
        },
      });
    }
  };

  const handleRestore = () => {
    if (selectedIds.length > 0) {
      const payload = {
        emails: selectedIds,
      };
      restoreMessages(payload, {
        onSuccess: (res) => {
          toast.success(res?.data?.message);
          {
            isDesktop ? refetch() : refetchFun();
          }
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.detail || "An unexpected error occurred."
          );
        },
      });
    }
  };

  const handleDeleteTrash = (id) => {
    const payload = {
      emails: id ? [id] : selectedIds,
    };
    deleteTrash(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        {
          isDesktop ? refetch() : refetchFun();
        }
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.detail || "An unexpected error occurred."
        );
      },
    });
  };

  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (messages?.results) {
      if (active === "has-file") {
        const filtered = messages.results.filter(
          (message) => message.attachments?.length > 0
        );
        setFilteredMessages(filtered);
      } else {
        setFilteredMessages(messages.results);
      }
    }
  }, [messages, active]);

  const sanitizeEmailBody = (html) => {
    if (!html) return "";
    // Remove tracking pixels from the body preview
    return html.replace(/<img[^>]*track[^>]*>/gi, "");
  };

  return (
    <>
      {Selected === "gost" && <TempMail />}
      {Selected === "classic" && (
        <>
          {queryParams.type === "inbox" ||
          queryParams.starred === "true" ||
          queryParams.type === "Junk"
            ? Selected === "classic" && (
                <div className=" w-[96%] font-sans px-5  md:py-4 mb-3 rounded-xl bg-white desktop-view-table flex justify-between items-center">
                  <div className="hidden md:flex items-center gap-3 relative">
                    <input
                      type="checkbox"
                      id="checkbox"
                      checked={areAllSelected}
                      onChange={handleSelectAllChange}
                      className="w-5 h-5 appearance-none cursor-pointer rounded-md border-[2px] border-[#B1C1D2] focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500 relative"
                    />
                    {areAllSelected && (
                      <label
                        htmlFor="checkbox"
                        className="absolute top-0 right-[46px] flex items-center justify-center w-full h-full pointer-events-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[17px] h-[17px] text-white"
                          viewBox="0 0 20 20"
                          fill="white"
                          stroke="white"
                          strokeWidth="1"
                        >
                          <path
                            d="M16.707 6.293a1 1 0 00-1.414-1.414L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                    )}

                    <label htmlFor="checkbox" className="text-[14px]">
                      {queryParams.type === "Junk" ? "Spam" : "Inbox"}
                    </label>
                    {selectedIds.length > 0 && (
                      <Tooltip message="Delete" position="top">
                        <span onClick={handleDelete} className="btn-circle-sm">
                          <Bin className={"w-[19px] h-[19px]"} />
                        </span>
                      </Tooltip>
                    )}
                  </div>
                  {(messages.previous != null || messages.next != null) && (
                    <div className="flex gap-2 items-center justify-center w-full md:w-auto h-[35px] md:h-[20px]">
                      <p className="font-sans text-[14px] leading-[18px] text-[#000000]">
                        {startIndex}-{endIndex} of {messages.count}
                      </p>
                      <button
                        disabled={currentPage <= 1 || loading}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="btn-circle-sm cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Prev
                          className="w-3 h-3"
                          color={
                            currentPage <= 1 || loading ? "#747474" : "black"
                          }
                        />
                      </button>
                      <button
                        disabled={
                          currentPage >= Math.ceil(messages?.count / 10) ||
                          loading
                        }
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="btn-circle-sm cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Next
                          className="w-3 h-3"
                          color={
                            currentPage >= Math.ceil(messages?.count / 10) ||
                            loading
                              ? "#747474"
                              : "black"
                          }
                        />
                      </button>
                    </div>
                  )}
                  <div className="text-[14px] hidden md:flex items-center gap-3 text-[#40566D]">
                    <p
                      onClick={() => {
                        handleClick({ seen: "" });
                        setActive("All");
                      }}
                      className={`${
                        active === "All" ? "bg-[#305EFF17]" : ""
                      } px-1 cursor-pointer rounded-md flex justify-center items-center font-[600]`}
                    >
                      All
                    </p>
                    <p
                      onClick={() => {
                        handleClick({ seen: "true" });
                        setActive("Read");
                      }}
                      className={`${
                        active === "Read" ? "bg-[#305EFF17]" : ""
                      } px-1 cursor-pointer rounded-md flex justify-center items-center font-[600]`}
                    >
                      Read
                    </p>
                    <p
                      onClick={() => {
                        handleClick({ seen: "false" });
                        setActive("Unread");
                      }}
                      className={`${
                        active === "Unread" ? "bg-[#305EFF17]" : ""
                      } px-1 cursor-pointer rounded-md flex justify-center items-center font-[600]`}
                    >
                      Unread
                    </p>
                    <p
                      onClick={() => {
                        setActive("has-file");
                        handleClick({ seen: "" });
                      }}
                      className={`${
                        active === "has-file" ? "bg-[#305EFF17]" : ""
                      } px-1 cursor-pointer rounded-md flex justify-center items-center font-[600]`}
                    >
                      Has File
                    </p>
                  </div>
                </div>
              )
            : // <div className=""></div>
              messages.count > 0 && (
                <div className=" w-[96%] font-sans px-5 md:py-4 mb-3 rounded-xl bg-white desktop-view-table flex justify-between items-center ">
                  <div className="hidden md:flex items-center gap-3 relative">
                    <input
                      type="checkbox"
                      id="checkbox"
                      checked={areAllSelected}
                      onChange={handleSelectAllChange}
                      className="w-5 h-5 appearance-none cursor-pointer rounded-md border-[2px] border-[#B1C1D2] focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500 relative"
                    />
                    {areAllSelected && (
                      <label
                        htmlFor="checkbox"
                        className={`${
                          messages &&
                          messages?.results[0]?.email_type === "trash" &&
                          "right-[26.1px]"
                        }  ${
                          messages &&
                          messages?.results[0]?.email_type === "sent" &&
                          "right-[20.5px]"
                        }   absolute top-0 right-[23px] flex items-center justify-center w-full h-full pointer-events-none`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[17px] h-[17px] text-white"
                          viewBox="0 0 20 20"
                          fill="white"
                          stroke="white"
                          strokeWidth="1"
                        >
                          <path
                            d="M16.707 6.293a1 1 0 00-1.414-1.414L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                    )}
                    {messages &&
                      messages?.results[0]?.email_type === "draft" && (
                        <label htmlFor="checkbox" className="text-[14px]">
                          Draft
                        </label>
                      )}
                    {messages &&
                      messages?.results[0]?.email_type === "sent" && (
                        <label htmlFor="checkbox" className="text-[14px]">
                          Sent
                        </label>
                      )}
                    {messages &&
                      messages?.results[0]?.email_type === "trash" && (
                        <label htmlFor="checkbox" className="text-[14px]">
                          Trash
                        </label>
                      )}
                  </div>
                  {(messages.previous != null || messages.next != null) && (
                    <div className="flex gap-2 items-center justify-center w-full md:w-auto h-[35px] md:h-[20px]">
                      <p className="font-sans text-[14px] leading-[18px] text-[#000000]">
                        {startIndex}-{endIndex} of {messages.count}
                      </p>
                      <button
                        disabled={messages?.previous === null}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="btn-circle-sm cursor-pointer disabled:cursor-default"
                      >
                        <Prev
                          className="w-3 h-3"
                          color={
                            messages?.previous === null ? "#747474" : "black"
                          }
                        />
                      </button>
                      <button
                        disabled={messages?.next === null}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="btn-circle-sm cursor-pointer disabled:cursor-default"
                      >
                        <Next
                          className="w-3 h-3"
                          color={messages?.next === null ? "#747474" : "black"}
                        />
                      </button>
                    </div>
                  )}
                  <div className="hidden md:flex items-center gap-5">
                    <Tooltip
                      message={
                        queryParams.type === "trash"
                          ? "Delete Forever"
                          : " Delete"
                      }
                      position="top"
                    >
                      <span
                        onClick={() =>
                          queryParams.type === "trash"
                            ? handleDeleteTrash()
                            : handleDelete()
                        }
                        className="btn-circle-sm"
                      >
                        <Bin className={"w-[19px] h-[19px]"} />
                      </span>
                    </Tooltip>
                    {queryParams.type === "trash" && (
                      <Tooltip message="Move Back" position="top">
                        <p
                          onClick={handleRestore}
                          className="cursor-pointer hover:fill-blue-500"
                        >
                          <CurveBack />
                        </p>
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}
          <div className="h-full w-full overflow-auto relative flex flex-col items-center gap-1 md:pt-2 ">
            {" "}
            {filteredMessages?.length > 0
              ? filteredMessages.map((message, index) => (
                  <div
                    onMouseEnter={() => setHoveredRow(message.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => {
                      // toggleStarredSeen(message.id, {
                      //   is_seen: true,
                      // });

                      if (message.email_type === "draft") {
                        if (isDesktop) {
                          setSelectedMessage(message);
                          setIsNewMessage((prev) => !prev);
                          handleDeleteTrash(message.id);
                        } else {
                          navigate("/new-message");
                        }
                      } else {
                        localStorage.setItem("currentIndex", index);
                        navigate("/email-detail");
                      }
                      if (message.email_type === "inbox") {
                        setSelectedMessage("");
                      }
                      getDetails(
                        { id: message.id, markAsRead: true },
                        {
                          onSuccess: (res) => {
                            localStorage.setItem(
                              "currentEmailDetails",
                              JSON.stringify(res)
                            );
                            navigate("/email-detail", {
                              state: { details: res },
                            });
                          },
                          onError: (error) => {
                            console.error("Error loading email:", error);
                            // Fallback to basic navigation
                            navigate("/email-detail?id=" + message.id);
                          },
                        }
                      );
                    }}
                    key={message.id}
                    className={`md:w-[96%] z-0 cursor-pointer w-[92vw] my-[1px] px-1 h-[86px] md:h-[60px] rounded-[12px] md:rounded-xl flex justify-between items-center  ${
                      !message.is_seen
                        ? "bg-white font-[600] text-black"
                        : "bg-[#F1F5FA] font-sans font-[500] text-[#383838]"
                    }`}
                  >
                    <div className="w-[96%] px-3 h-[60px] rounded-xl desktop-view-table hidden md:flex justify-between items-center  ">
                      <div className="flex items-center flex-[0.4] gap-3">
                        <div className="relative ">
                          <input
                            id={`checkbox-${message.id}`}
                            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                            onChange={() => handleCheckboxChange(message.id)}
                            checked={isChecked(message.id)}
                            type="checkbox"
                            className=" h-[28px] w-[28px] rounded-[8px] bg-[#D9D9D9] cursor-pointer appearance-none  focus:ring-black checked:bg-[#0000ff00] border font-sans text-[20px] checked:border-black flex items-center justify-center "
                          />
                          {isChecked(message.id) && (
                            <label
                              htmlFor={`checkbox-${message.id}`}
                              className="absolute top-0 right-0 flex items-center  justify-center w-full h-full pointer-events-none"
                            >
                              <svg
                                width="13"
                                height="10"
                                viewBox="0 0 13 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[14px] h-[14px]"
                              >
                                <path
                                  d="M1 5L4.5 8.5L11.5 1"
                                  stroke="#444746"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </label>
                          )}
                        </div>

                        <div className="grid grid-cols-[10%_55%_35%]  items-center w-[20vw] pr-2 gap-3  ">
                          {message.email_type === "trash" ? (
                            <span></span>
                          ) : (
                            <span
                              className="cursor-pointer z-10"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setFilteredMessages((prevMessages) =>
                                  prevMessages.map((msg) =>
                                    msg.id === message.id
                                      ? {
                                          ...msg,
                                          is_starred: !message.is_starred,
                                        }
                                      : msg
                                  )
                                );
                                toggleStarredSeen(message.id, {
                                  is_starred: !message.is_starred,
                                });
                              }}
                            >
                              {message.is_starred ? (
                                <Star color={"#305eff"} border={"#305eff"} />
                              ) : (
                                <Star color={"none"} border={"#6C849D"} />
                              )}
                            </span>
                          )}

                          <div className="font-sans text-[12px] mq1100:text-[14px] leading-[20px] truncate">
                            {message.recipients.some(
                              (recip) => recip?.recipient_type === "from"
                            )
                              ? message.recipients.find(
                                  (recip) => recip?.recipient_type === "from"
                                )?.name
                              : message.recipients.find(
                                  (recip) => recip?.recipient_type === "to"
                                )?.name}
                          </div>

                          <div
                            className={`relative z-10 group flex items-center justify-center min-w-[40px]  max-w-[53px] `}
                          >
                            <div
                              className={`capitalize flex justify-center items-center bg-[#305EFF17] w-full border overflow-hidden whitespace-nowrap rounded-md text-[12px] font-[600] font-sans max-h-[18px]
                              ${
                                message.email_type === "sent"
                                  ? message?.is_sent_success
                                    ? "text-[#305EFF] bg-[#305EFF17] "
                                    : "text-[#db3939] bg-[#ff303017] "
                                  : "text-[#305EFF] bg-[#305EFF17] "
                              }`}
                            >
                              {message.email_type === "sent"
                                ? message?.is_sent_success
                                  ? "Sent"
                                  : "Unsent"
                                : message.email_type}
                            </div>
                            {message.email_type === "sent" &&
                              hoveredRow === message.id && (
                                <CustomToolTip
                                  message={
                                    message?.is_sent_success
                                      ? "Email Sent Successfully"
                                      : "Failed to send email"
                                  }
                                />
                              )}
                          </div>
                        </div>
                      </div>
                      <p className="flex-[0.7] overflow-hidden whitespace-nowrap h-5 flex justify-start items-start font-sans text-[12px] mq1100:text-[14px] leading-[20px]">
                        {message.subject || "(no Subject)"}-
                        {message?.body ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: sanitizeEmailBody(message?.body),
                            }}
                          ></p>
                        ) : (
                          "No Content Available"
                        )}
                      </p>
                      {message.email_type === "sent" && (
                        <div className="flex-[0.9] group relative h-5 flex justify-center items-start font-sans text-[12px] mq1100:text-[14px] leading-[20px]">
                          <div
                            className={`whitespace-nowrap rounded-md px-[5px] text-[12px] ${
                              message?.is_read_by_recipient
                                ? "text-[#43c22d] bg-[#72eb2223]"
                                : "text-[#db3939] bg-[#ff303017]"
                            }`}
                          >
                            {message?.is_read_by_recipient ? "Read" : "Unread"}
                          </div>
                          {message?.read_at && (
                            <CustomToolTip
                              message={new Date(
                                message?.read_at
                              ).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            />
                          )}
                        </div>
                      )}

                      <p className=" w-[70px] text-end font-sans text-[12px] mq1100:text-[14px] leading-[20px]">
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                    <div className="mobile-view-table w-[92vw] h-[86px] overflow-hidden px-1 rounded-[12px] flex items-center  md:hidden font-sans">
                      <span className="flex-[0.1]">
                        <Neuro />
                      </span>
                      <div className="flex flex-col w-full py-2 h-full items-start justify-center  ml-2">
                        <p className="font-[600] text-[22px] h-[42px] whitespace-nowrap  w-[50vw]  overflow-hidden">
                          {message.recipients.some(
                            (recip) => recip?.recipient_type === "from"
                          )
                            ? message.recipients.find(
                                (recip) => recip?.recipient_type === "from"
                              )?.name
                            : message.recipients.find(
                                (recip) => recip?.recipient_type === "to"
                              )?.name}
                        </p>
                        <p className="text-[14px] flex w-[50vw] h-[24px] overflow-hidden whitespace-nowrap">
                          {message.subject}-
                          {message?.body ? (
                            <p
                              dangerouslySetInnerHTML={{ __html: message.body }}
                            ></p>
                          ) : (
                            "No Content Available"
                          )}
                        </p>
                        <p></p>
                      </div>
                      <div className="w-full flex flex-col justify-end items-end gap-2">
                        <span
                          className="cursor-pointer z-10 mt-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFilteredMessages((prevMessages) =>
                              prevMessages.map((msg) =>
                                msg.id === message.id
                                  ? { ...msg, is_starred: !message.is_starred }
                                  : msg
                              )
                            );
                            toggleStarredSeen(message.id, {
                              is_starred: !message.is_starred,
                            });
                          }}
                        >
                          {message.is_starred ? (
                            <Star color={"#305eff"} border={"#305eff"} />
                          ) : (
                            <Star color={"none"} border={"#6C849D"} />
                          )}
                        </span>
                        <p className="text-[14px]">
                          {formatDate(message.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : Selected === "classic" && (
                  <div className="text-[#000000ca] text-[16px] flex items-center justify-center h-full border-slate-300 font-sans w-full">
                    <Lottie
                      animationData={NotFound}
                      loop={true}
                      style={{ width: "250px", height: "250px" }}
                    />
                  </div>
                )}
          </div>
          {/* {activeButton.type === "sent" && <p>No conversations in sent</p>}
    {activeButton.type === "draft" && <p>No conversations in draft</p>}
    {activeButton.starred === "true" && (
      <p>No conversations in starred</p>
    )}
    {activeButton.type === "trash" && <p>No conversations in Trash</p>} */}
        </>
      )}
      {Selected === "bulk" && <></>}
    </>
  );
}

export default EmailList;

const CustomToolTip = ({ message, className }) => {
  return (
    <div
      className={`absolute z-40 bottom-full mb-[0px] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition ${className}`}
    >
      <div className=" bg-white whitespace-nowrap text-black text-xs px-3 py-1 rounded border border-gray-300 shadow-md">
        {message}
      </div>
      <div className="w-2 h-2 bg-white border-gray-300 rotate-45 -mt-1 shadow-md"></div>{" "}
    </div>
  );
};

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
const Neuro = () => (
  <svg
    width="39"
    height="39"
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="19.5" cy="19.5" r="19.5" fill="#305EFF" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.31152 15.0702C8.31152 13.456 9.62007 12.1475 11.2342 12.1475H27.3092C28.9234 12.1475 30.2319 13.456 30.2319 15.0702V23.8383C30.2319 25.4525 28.9234 26.761 27.3092 26.761H11.2342C9.62007 26.761 8.31152 25.4525 8.31152 23.8383V15.0702ZM15.6173 21.6464V15.1603H18.2547V16.7938C18.7312 15.8239 19.548 14.9901 20.9773 14.9901C22.5258 14.9901 23.819 15.943 23.819 18.1891V23.6683H21.0964V18.5635C21.0964 17.6957 20.637 17.2192 19.7862 17.2192C18.8843 17.2192 18.3398 17.7467 18.3398 18.9889V23.6683H17.4442V24.5691H14.5215V21.6464H15.6173Z"
      fill="#F8FAFC"
    />
  </svg>
);

const Star = ({ color, border }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.15327 2.33977L10.3266 4.68643C10.4866 5.0131 10.9133 5.32643 11.2733 5.38643L13.3999 5.73977C14.7599 5.96643 15.0799 6.9531 14.0999 7.92643L12.4466 9.57977C12.1666 9.85977 12.0133 10.3998 12.0999 10.7864L12.5733 12.8331C12.9466 14.4531 12.0866 15.0798 10.6533 14.2331L8.65994 13.0531C8.29994 12.8398 7.70661 12.8398 7.33994 13.0531L5.34661 14.2331C3.91994 15.0798 3.05327 14.4464 3.42661 12.8331L3.89994 10.7864C3.98661 10.3998 3.83327 9.85977 3.55327 9.57977L1.89994 7.92643C0.926606 6.9531 1.23994 5.96643 2.59994 5.73977L4.72661 5.38643C5.07994 5.32643 5.50661 5.0131 5.66661 4.68643L6.83994 2.33977C7.47994 1.06643 8.51994 1.06643 9.15327 2.33977Z"
      stroke={border}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
