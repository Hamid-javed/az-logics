import { ThreeDots } from "react-loader-spinner";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Account from "../components/Account";
import MyWallet from "../components/MyWallet";
import OtherApps from "../components/OtherApps";
import EmailList from "../components/EmailList";
import NewMessage from "../components/NewMessage";

import { useAuth } from "../AuthContext";
import useGetMessages from "../hooks/useGetMessages";
import useGetProfile from "../hooks/useGetProfile";

import { Cross, Delete, Draft, Inbox, Sent, Spam, Star } from "../Icons";
import { debounce } from "lodash";
import Tooltip from "../components/Tooltip";

function Home() {
  const navigate = useNavigate();
  const [isWallet, setIsWallet] = useState(false);
  const [isAppModal, setAppsModal] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [isLeftBar, setLeftBar] = useState(false);

  const {
    search,
    setSearch,
    emailData,
    setEmailData,
    setMessagesData,
    activeButton,
    userMailBox,
    queryParams,
    handleButtonClick,
    userProfile,
    isNewMessage,
    currentPage,
    loading,
    setLoading,
  } = useAuth();

  const menuRef = useRef(null);
  const leftBarRef = useRef(null);
  const location = useLocation();
  const { mutate: getProfile } = useGetProfile();

  const {
    data: messageData,
    refetch,
    isLoading,
  } = useGetMessages(
    queryParams.type,
    queryParams.seen,
    queryParams.starred,
    search,
    currentPage
  );

  useEffect(() => {
    setLoading(true);
  }, [
    search,
    currentPage,
    queryParams.type,
    queryParams.seen,
    queryParams.starred,
  ]);

  const debouncedRefetch = debounce(() => {
    refetch();
  }, 500);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  useEffect(() => {
    if (search) {
      debouncedRefetch();
    } else {
      refetch();
    }
    return () => {
      debouncedRefetch.cancel();
    };
  }, [search, debouncedRefetch]);
  const [emailCounts, setEmailCounts] = useState({
    inbox: 0,
    starred: 0,
  });

  useEffect(() => {
    if (messageData) {
      setMessagesData(messageData);
    }
  }, [messageData, handleButtonClick]);

  useEffect(() => {
    if (messageData?.results) {
      const counts = {
        inbox: messageData.results.filter(
          (message) =>
            message.is_seen === false && message.email_type === "inbox"
        ).length,
        starred: messageData.results.filter(
          (message) =>
            message.is_seen === false && message.is_starred === "true"
        ).length,
      };
      setEmailCounts(counts);
    }
  }, [messageData]);

  useEffect(() => {
    if (userMailBox) {
      const data = userMailBox?.results?.find(
        (m) => m.id === localStorage.getItem("email_id")
      );
      setEmailData(data);
    }
  }, [userMailBox]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setAppsModal(false);
    }
    if (leftBarRef.current && !leftBarRef.current.contains(event.target)) {
      setLeftBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // // Handle cases where userMailBox is still loading or empty
  // if (userMailBox === undefined || Object.keys(userMailBox).length === 0)
  //   return <div>Loading mailboxes...</div>; // Show a loading indicator until mailboxes are fetched

  if (userMailBox?.count === 0)
    return <Navigate to="/create-mail" state={{ from: location }} replace />;

  return (
    <>
      <div className="flex w-[100vw] relative bg-[#f6f8fc] h-dvh">
        <div className="absolute text-center w-full z-50 top-1">
          {isLoading ||
            (loading && (
              <div className="inline-flex items-center bg-[#305eff] text-white px-3 py-1 font-sans font-[600] rounded-sm">
                Loading
                <span className="ml-2">
                  <ThreeDots height="20" width="20" color="white" />
                </span>
              </div>
            ))}
        </div>

        {/* left side bar  */}
        <div className="bg-[#F1F5FA] rounded-br-2xl rounded-tr-2xl overflow-hidden flex-[0.2] desktop-view-table hidden md:flex flex-col justify-between">
          <LeftBar
            handleClick={handleButtonClick}
            isActive={activeButton}
            count={emailCounts}
            refetch={refetch}
            setLeftBar={setLeftBar}
            setProfile={setProfile}
          />
        </div>
        {/* content main  */}
        <div className="desktop-view-table hidden md:flex flex-col flex-[0.8] items-center max-h-[938px] overflow-auto ">
          {/* starting bar  */}
          <div className="w-[96%] h-[10%] py-4 mb-3 px-3 bg-white rounded-[12px] flex justify-between items-center">
            <div
              onClick={() => navigate("/")}
              className="relative flex-1 hidden md:block"
            >
              <Search />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-sans mq1100:w-[400px] h-[36px]  pl-9 pr-3 rounded-[4px] outline-none bg-[#6C849D1F]  placeholder:text-[#6C849D52] text-[#6c849d] text-[12px] "
                placeholder="Search messages"
              />
            </div>
            <div className="flex gap-4 items-center">
              {/* <div className="relative">
                <button
                  onClick={() => setIsWallet((prev) => !prev)}
                  className="text-[#768EA7] hover:shadow-md shadow-slate-800 text-[9.91px] font-sans bg-[#F8FAFC] flex items-center gap-2 pr-1 rounded-[6px]"
                >
                  <Wallet /> My wallets <Arrow />
                </button>
                {isWallet && (
                  <MyWallet close={() => setIsWallet((prev) => !prev)} />
                )}
              </div> */}
              <div className="relative" ref={menuRef}>
                <span
                  className="cursor-pointer"
                  onClick={() => setAppsModal((prev) => !prev)}
                >
                  <img src="/icons.svg" />
                </span>
                {isAppModal && <OtherApps />}
              </div>
              <Tooltip message="Setting" position="top">
                <Setting className={"cursor-pointer"} />
              </Tooltip>
              <div className="relative flex items-center gap-2">
                <span className="flex flex-col">
                  <p className="text-[#40566D] text-[12px] font-[600] font-sans text-right leading-[18px]">
                    {emailData?.email?.split("@")[0]}
                  </p>
                  <p className="text-[#768EA7] text-[12px] font-sans">
                    {emailData?.email}
                  </p>
                </span>
                <div className="relative">
                  <div
                    onClick={() => setProfile((prev) => !prev)}
                    className=" h-[35px] w-[35px] rounded-full cursor-pointer  overflow-hidden"
                  >
                    <p className="bg-[#EB417A] w-full h-full text-[white] flex justify-center items-center text-[17px] font-bold font-sans">
                      {userProfile?.url ? (
                        <img
                          src={userProfile.url}
                          className="w-full h-full object-cover "
                        />
                      ) : (
                        emailData?.email && emailData.email[0]?.toUpperCase()
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Outlet context={refetch} />
        </div>

        <div className="mobile-view-table w-full flex flex-col items-center mt-3 md:hidden">
          <div className="flex justify-between items-center py-1 pl-4 pr-2 w-[92vw] h-[49px] mb-4 rounded-[99px] bg-[white] ">
            <div className="flex items-center">
              <span onClick={() => setLeftBar((prev) => !prev)}>
                <img src="/bar.svg" />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-sans w-[200px] h-[36px] ml-3  outline-none placeholder:text-[#6C849D52] text-[#647b93] text-[12px] "
                placeholder="Search in neuromail"
              />
            </div>
            <div className="flex items-center relative gap-3">
              <span
                className="cursor-pointer"
                onClick={() => setAppsModal((prev) => !prev)}
              >
                <img src="/icons.svg" className="w-[17px] h-[17px]" />{" "}
              </span>
              <div
                onClick={() => setProfile((prev) => !prev)}
                className=" h-[35px] w-[35px] rounded-full cursor-pointer overflow-hidden"
              >
                {/* <img
                  src="https://s3-alpha-sig.figma.com/img/5298/20ef/398885b3c44f2931c974eeab97452589?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LbV6IEdtt9vlJGwrps7NNrhoRRi6Vb0TkA2bqwazqax9FclsMTNpeem2Ak1SPi58c5SdyAKPpvu295p0R6CeJ29GOA1es6BqHkNrCGKcgaU6P-XNxWRvM01pwRNHsrHglZSfSYFbeHrOGLDqVMP3mdPP8HE3VnRAa2PUiKxLJjB8O5Zl8mGimUIzmFr-8HF1pnUA-qKAbQKxEVi8r~PK~IK5Sf5cM3vtVNUh8Swf6iLMeE-9rO7RIkEO6HOvUskG17Z7iXrP58Un5-PF7hSsxM1maAdWKTXC0OYMr~Y5Y8U11Fl-3so~Q5OYHUzcWBeZGByg9f4J2EDq3BBrSkigCw__"
                  className="w-full h-full object-cover "
                /> */}
                <p className="bg-[#EB417A] w-full h-full text-[white] flex justify-center items-center text-[17px] font-bold font-sans">
                  {userProfile?.url ? (
                    <img
                      src={userProfile.url}
                      className="w-full h-full object-cover "
                    />
                  ) : (
                    emailData?.email && emailData.email[0]?.toUpperCase()
                  )}
                </p>
              </div>
              {isAppModal && <OtherApps />}
            </div>
          </div>
          <EmailList refetchFun={refetch} />
        </div>

        {isLeftBar && (
          <section className="fixed inset-0 md:hidden flex justify-start items-center bg-[#00000091] md:bg-[#F8FAFC] z-50 px-0 ">
            <section
              ref={leftBarRef}
              className={`relative w-[75vw] pt-3 h-[100vh] items-start bg-[#F8FAFC] overflow-hidden Mobile-view-table flex flex-col justify-between navbar ${
                isLeftBar ? "open" : "closed"
              }`}
            >
              <span
                className="absolute right-[17px] text-lg top-[17px] cursor-pointer"
                onClick={() => setLeftBar((prev) => !prev)}
              >
                <Cross className={"h-[14px] w-[14px]"} />
              </span>
              <LeftBar
                setIsWallet={setIsWallet}
                setLeftBar={setLeftBar}
                handleClick={handleButtonClick}
                isActive={activeButton}
                count={emailCounts}
                setProfile={setProfile}
              />
            </section>
          </section>
        )}

        {isNewMessage && <NewMessage />}
        <Account
          visible={isProfile}
          setProfile={setProfile}
          userMailBox={userMailBox}
          refetch={refetch}
        />
      </div>

      {isWallet && <MyWallet close={() => setIsWallet((prev) => !prev)} />}
    </>
  );
}

export default Home;

function LeftBar({
  setIsWallet,
  setProfile,
  setLeftBar,
  handleClick,
  isActive,
  count,
  refetch,
}) {
  const navigate = useNavigate();
  const {
    setSelectedIds,
    userProfile,
    setIsNewMessage,
    setSelectedMessage,
    setCurrentPage,
    setSelected,
    Selected,
  } = useAuth();
  // const [Selected, setSelected] = useState("classic");
  const handleState = () => {
    setLeftBar((prev) => !prev);
    navigate("/");
    setSelectedIds([]);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-start md:items-center pt-3 gap-2">
        <span
          onClick={() => {
            navigate("/");
            setIsNewMessage(false);
            handleClick({ type: "inbox", seen: "", starred: "" });
            setSelectedIds([]);
            setProfile(false);
            setLeftBar(false);
          }}
          className="cursor-pointer"
        >
          <img
            src="/logoName.svg"
            className="w-[150px] ml-9 md:mb-0 md:ml-0 mq1500:w-[200px] mq1500:mb-2"
          />
        </span>
        {Selected === "classic" && (
          <>
            <button
              onClick={() => {
                setSelectedMessage("");
                setIsNewMessage((prev) => !prev);
                setLeftBar((prev) => !prev);
              }}
              className="w-[85%] h-[36px] mq1500:h-[45px] bg-[#305EFF] hidden md:block hover:shadow-md shadow-slate-800 rounded-md text-white text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]"
            >
              New Message
            </button>
            <div>
              <Link to="/new-message">
                <button
                  onClick={() => setSelectedMessage("")}
                  className="w-[224px] h-[32px] bg-[#305EFF] ml-5 md:hidden block hover:shadow-md shadow-slate-800 rounded-md text-white text-[14px] font-sans font-[600] leading-[20px]"
                >
                  New Message
                </button>
              </Link>
            </div>

            <Line className={"my-1 md:hidden block"} />
            <div className="flex flex-col items-left md:items-center gap-[3px] w-full md:pl-0 pl-5">
              <div
                onClick={() => {
                  setCurrentPage(1);
                  handleClick({ type: "inbox", seen: "", starred: "" });
                  handleState();
                }}
                className={` ${
                  isActive.type === "inbox"
                    ? "bg-[#FFFFFF] hover:bg-[#ffffff]"
                    : "hover:bg-[#e4e7ea]"
                } cursor-pointer w-[72%] md:w-[85%] pl-2 pr-1 h-[32px] mq1500:h-[45px] rounded-md flex justify-between items-center`}
              >
                <div className="flex items-center gap-2">
                  <Inbox
                    className={
                      "w-[20px] h-[21px] mq1500:w-[25px] mq1500:h-[27px]"
                    }
                    color={isActive.type === "inbox" ? "#305EFF" : "#40566D"}
                  />
                  <p className="text-[#192839] text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]">
                    Inbox
                  </p>
                </div>
                {isActive.type === "inbox" && (
                  <div className="flex items-center gap-[6px]">
                    <span onClick={() => refetch()}>
                      <img src="/refresh.svg" className="w-[20px] h-[20px]" />
                    </span>
                    {count.inbox > 0 && (
                      <div className="bg-[#305EFF] flex justify-center items-center min-w-[15px] h-[28px] text-white text-[14px] font-sans font-[600] leading-[20px] rounded-md">
                        {count.inbox}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setCurrentPage(1);
                  handleClick({ type: "draft", seen: "", starred: "" });
                  handleState();
                }}
                className={` ${
                  isActive.type === "draft"
                    ? "bg-[#FFFFFF] hover:bg-[#ffffff]"
                    : "hover:bg-[#e4e7ea]"
                } cursor-pointer w-[72%] md:w-[85%] pl-2 pr-1 h-[32px] mq1500:h-[45px] mq1500:text-[18px] rounded-md flex justify-between items-center`}
              >
                <div className="flex items-center gap-2">
                  <Draft
                    className={
                      "w-[20px] h-[21px] mq1500:w-[25px] mq1500:h-[27px]"
                    }
                    color={isActive.type === "draft" ? "#305EFF" : "#40566D"}
                  />
                  <p className="text-[#40566D] text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]">
                    Drafts
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setCurrentPage(1);
                  handleClick({ type: "sent", seen: "", starred: "" });
                  handleState();
                }}
                className={` ${
                  isActive.type === "sent"
                    ? "bg-[#FFFFFF] hover:bg-[#ffffff]"
                    : "hover:bg-[#e4e7ea]"
                } cursor-pointer w-[72%] md:w-[85%] pl-2 pr-1 h-[32px] mq1500:h-[45px] rounded-md flex justify-between items-center`}
              >
                <div className="flex items-center gap-2">
                  <Sent
                    className={
                      "w-[20px] h-[21px] mq1500:w-[25px] mq1500:h-[27px]"
                    }
                    color={isActive.type === "sent" ? "#305EFF" : "#40566D"}
                  />
                  <p className="text-[#40566D] text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]">
                    Sent
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setCurrentPage(1);
                  handleClick({ type: "", seen: "", starred: "true" });
                  handleState();
                }}
                className={` ${
                  isActive.starred === "true"
                    ? "bg-[#FFFFFF] hover:bg-[#ffffff]"
                    : "hover:bg-[#e4e7ea]"
                } cursor-pointer w-[72%] md:w-[85%] pl-2 pr-1 h-[32px] mq1500:h-[45px] rounded-md flex justify-between items-center`}
              >
                <div className="flex items-center gap-2">
                  <Star
                    className={
                      "w-[20px] h-[21px] mq1500:w-[25px] mq1500:h-[27px]"
                    }
                    color={isActive.starred === "true" ? "#305EFF" : "#40566D"}
                  />
                  <p className="text-[#40566D] text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]">
                    Starred
                  </p>
                </div>
                {isActive.starred === "true" && (
                  <div className="flex items-center gap-[6px]">
                    <span onClick={() => refetch()}>
                      <img src="/refresh.svg" className="w-[20px] h-[20px]" />
                    </span>
                    {count.inbox > 0 && (
                      <div className="bg-[#305EFF] flex justify-center items-center min-w-[15px] h-[28px] text-white text-[14px] font-sans font-[600] leading-[20px] rounded-md">
                        {count.inbox}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setCurrentPage(1);
                  handleClick({ type: "Junk", seen: "", starred: "" });
                  handleState();
                }}
                className={` ${
                  isActive.type === "Junk"
                    ? "bg-[#FFFFFF] hover:bg-[#ffffff]"
                    : "hover:bg-[#e4e7ea]"
                } cursor-pointer w-[72%] md:w-[85%] pl-2 pr-1 h-[32px] mq1500:h-[45px] rounded-md flex justify-between items-center`}
              >
                <div className="flex items-center gap-2">
                  <Spam
                    className={
                      "w-[19px] h-[20px] mq1500:w-[25px] mq1500:h-[24px]"
                    }
                    color={isActive.type === "Junk" ? "#305EFF" : "#40566D"}
                  />
                  <p className="text-[#40566D] text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]">
                    Spam
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setCurrentPage(1);
                  handleClick({ type: "trash", seen: "", starred: "" });
                  handleState();
                }}
                className={` ${
                  isActive.type === "trash"
                    ? "bg-[#FFFFFF] hover:bg-[#ffffff]"
                    : "hover:bg-[#e4e7ea]"
                } w-[72%] md:w-[85%] gap-2 mt-1 flex items-center cursor-pointer pl-2 pr-1 h-[32px] mq1500:h-[45px] rounded-md`}
              >
                <Delete
                  className={
                    "w-[19px] h-[19px] mq1500:w-[25px] mq1500:h-[27px]"
                  }
                  color={isActive.type === "trash" ? "#305EFF" : "#40566D"}
                />
                <p className="text-[#40566D] text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]">
                  Delete
                </p>
              </div>
            </div>
          </>
        )}
        <Line className={"mt-1 md:hidden block"} />
      </div>
      <div className="mx-4 flex flex-col gap-2 my-1">
        <div
          onClick={() => {
            setSelected("classic");
            setLeftBar((prev) => !prev);
          }}
          className={`group relative flex gap-4 md:gap-0 mq960:gap-4 ${
            Selected === "classic" ? "bg-white" : "md:bg-[#F1F5FA] bg-[#F8FAFC]"
          } p-1 rounded-md cursor-pointer hover:bg-[#e4e7ea]`}
        >
          <img className="w-[60px] md:w-[50px] mq960:w-[60px] md:h-12" src="classicMail.png" alt="" />
          <span className="text-[#333333]">
            <h1 className="text-[14px] md:text-[12px] mq960:text-[14px]">Classic Mail</h1>
            <p className="text-[8px] md:text-[6px] mq960:text-[8px] font-sans text-wrap">
              Send personalized one-on-one messages with a traditional touch.
            </p>
          </span>

          {/* Tooltip */}
          {/* <span className="absolute left-11  -top-8 -translate-x-1/2 w-max bg-gray-700 text-white text-[10px] px-2 py-1 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Tooltip text here
          </span> */}
        </div>

        <div
          onClick={() => {
            setSelected("gost");
            setLeftBar((prev) => !prev);
            setIsNewMessage(false);
          }}
          className={`flex gap-4 md:gap-0 mq960:gap-3  ${
            Selected === "gost" ? "bg-white" : "md:bg-[#F1F5FA] bg-[#F8FAFC]"
          } p-1 rounded-md cursor-pointer hover:bg-[#e4e7ea]`}
        >
          <img className="w-[60px] md:w-[50px] mq960:w-[60px] md:h-14" src="gostMail.png" alt="" />
          <span className="text-[#333333]">
            <h1 className="text-[14px] md:text-[12px] mq960:!text-[14px]">Ghost Mail</h1>
            <p className="text-[8px] md:text-[6px] mq960:text-[8px] font-sans text-wrap">
              Deliver mysterious, time-limited, or secretive messages with a
              spooky flair.
            </p>
          </span>
        </div>
        <div
          onClick={() => {
            setSelected("bulk");
            setLeftBar((prev) => !prev);
            setIsNewMessage(false);
          }}
          className={`flex gap-[18px] md:gap-0 mq960:gap-[15px]  items-center ${
            Selected === "bulk" ? "bg-white" : "md:bg-[#F1F5FA] bg-[#F8FAFC]"
          } p-1 rounded-md cursor-pointer hover:bg-[#e4e7ea]`}
        >
          <img className="w-[58px] md:w-[50px] mq960:w-[58px] md:h-14" src="bulkMail.png" alt="" />
          <span className="text-[#333333]">
            <h1 className="text-[14px] md:text-[12px] mq960:text-[14px]">Bulk Mail</h1>
            <p className="text-[8px] md:text-[6px] mq960:text-[8px] font-sans text-wrap">
              Effortlessly distribute messages to a large audience at once.
            </p>
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        {/* <div
          onClick={() => {
            setLeftBar((prev) => !prev);
            setIsWallet((prev) => !prev);
          }}
          className="text-[#40566D] text-[14px] pl-4 pr-4 flex font-sans justify-between md:hidden items-start w-full"
        >
          <span className="flex items-center  gap-2">
            <MobileWallet />
            My Wallets
          </span>
          <Arrow className={"w-[8px] h-[22px]"} />
        </div> */}
        {/* <div className="text-[#40566D] mt-3 text-[14px] pl-4 flex gap-2 font-sans md:hidden items-start w-full">
          <Setting className={"cursor-pointer h-[23px] w-[23px]"} />
          Setting
        </div> */}
        <button className=" w-[250px] md:w-[85%] hover:shadow-md shadow-slate-500 h-[35px] md:h-[36px] mq1500:h-[45px] bg-[#6C849D1F] rounded-md text-[#192839] text-[14px] mq1500:text-[18px] font-sans font-[600] leading-[20px]">
          Subscribe
        </button>
        <div className="w-[75vw]  md:w-full h-[86px] bg-[#FFFFFF] rounded-tr-2xl rounded-tl-2xl flex flex-col justify-center items-center">
          <div className="flex justify-between w-[90%] md:w-[85%]">
            <p className="text-[#305EFF] text-[14px] mq1500:text-[18px] font-sans font-[600]">
              Your Email Space
            </p>
            <p className="text-[#768EA7] text-[12px] mq1500:text-[16px] font-sans">
              {userProfile?.features_data?.total_size}/
              {userProfile?.features_data?.size_allowed} GB
            </p>
          </div>
          <progress
            value={(
              (userProfile?.features_data?.total_size /
                userProfile?.features_data?.size_allowed) *
              100
            ).toFixed(2)}
            max="100"
            className=" w-[90%] md:w-[85%] mt-2 h-[4px]"
          ></progress>
          <div className="flex justify-between w-[90%] md:w-[85%] mt-2">
            <p className="text-[#768EA7] text-[12px] mq1500:text-[14px] font-sans">
              {userProfile?.features_data?.total_mailbox}/
              {userProfile?.features_data?.mailbox_allowed}
            </p>
            <p className="text-[#768EA7] text-[12px] mq1500:text-[14px] font-sans">
              Already created emails
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const Line = ({ className }) => (
  <svg
    width="318"
    height="2"
    viewBox="0 0 318 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M-12 1L317 0.999971" stroke="#EEEEEE" stroke-linecap="round" />
  </svg>
);

const MobileWallet = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.2497 11.4006C19.2497 11.8818 18.8647 12.2756 18.3747 12.2931H16.6597C15.7147 12.2931 14.8485 11.6018 14.7697 10.6568C14.7172 10.1056 14.9272 9.58932 15.2947 9.23057C15.6185 8.89807 16.0647 8.70557 16.5547 8.70557H18.3747C18.8647 8.72307 19.2497 9.11682 19.2497 9.59807V11.4006Z"
      fill="#40566D"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.66 13.6062C14.9975 13.6062 13.5975 12.355 13.4575 10.7625C13.3788 9.8525 13.7113 8.9425 14.3763 8.295C14.9363 7.7175 15.715 7.39375 16.555 7.39375H17.9112C18.165 7.39375 18.375 7.18375 18.3487 6.93C18.1562 4.80375 16.7475 3.35125 14.6562 3.10625C14.4462 3.07125 14.2275 3.0625 14 3.0625H6.125C5.88 3.0625 5.64375 3.08 5.41625 3.115C3.185 3.395 1.75 5.0575 1.75 7.4375V13.5625C1.75 15.9775 3.71 17.9375 6.125 17.9375H14C16.45 17.9375 18.1388 16.4062 18.3487 14.07C18.375 13.8162 18.165 13.6062 17.9112 13.6062H16.66ZM6.125 8.53125C5.76625 8.53125 5.46875 8.23375 5.46875 7.875C5.46875 7.51625 5.76625 7.21875 6.125 7.21875H11.375C11.7338 7.21875 12.0312 7.51625 12.0312 7.875C12.0312 8.23375 11.7338 8.53125 11.375 8.53125H6.125Z"
      fill="#AEB9C3"
    />
  </svg>
);

const Setting = ({ className }) => (
  <svg
    width="28"
    height="26"
    viewBox="0 0 28 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      opacity="0.4"
      d="M0.666016 14.1736V11.8269C0.666016 10.4402 1.79935 9.29358 3.19935 9.29358C5.61268 9.29358 6.59935 7.58691 5.38602 5.49357C4.69268 4.29357 5.10602 2.73357 6.31935 2.04024L8.62602 0.720241C9.67935 0.0935741 11.0393 0.466908 11.666 1.52024L11.8127 1.77357C13.0127 3.86691 14.986 3.86691 16.1993 1.77357L16.346 1.52024C16.9727 0.466908 18.3327 0.0935741 19.386 0.720241L21.6927 2.04024C22.906 2.73357 23.3193 4.29357 22.626 5.49357C21.4127 7.58691 22.3994 9.29358 24.8127 9.29358C26.1994 9.29358 27.346 10.4269 27.346 11.8269V14.1736C27.346 15.5602 26.2127 16.7069 24.8127 16.7069C22.3994 16.7069 21.4127 18.4136 22.626 20.5069C23.3193 21.7202 22.906 23.2669 21.6927 23.9602L19.386 25.2802C18.3327 25.9069 16.9727 25.5336 16.346 24.4802L16.1993 24.2269C14.9993 22.1336 13.026 22.1336 11.8127 24.2269L11.666 24.4802C11.0393 25.5336 9.67935 25.9069 8.62602 25.2802L6.31935 23.9602C5.10602 23.2669 4.69268 21.7069 5.38602 20.5069C6.59935 18.4136 5.61268 16.7069 3.19935 16.7069C1.79935 16.7069 0.666016 15.5602 0.666016 14.1736Z"
      fill="#768EA7"
    />
    <path
      d="M13.9993 17.3332C16.3926 17.3332 18.3327 15.3931 18.3327 12.9998C18.3327 10.6066 16.3926 8.6665 13.9993 8.6665C11.6061 8.6665 9.66602 10.6066 9.66602 12.9998C9.66602 15.3931 11.6061 17.3332 13.9993 17.3332Z"
      fill="#768EA7"
    />
  </svg>
);

const Arrow = ({ className }) => (
  <svg
    width="5"
    height="3"
    viewBox="0 0 5 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2.48219 2.0475L3.05677 1.47292L3.99302 0.536667C4.18844 0.338333 4.04844 0 3.76844 0L1.95135 0L0.315103 0C0.0351024 0 -0.104897 0.338333 0.0934358 0.536667L1.60427 2.0475C1.84344 2.28958 2.2401 2.28958 2.48219 2.0475Z"
      fill="#768EA7"
    />
  </svg>
);

const Wallet = () => (
  <svg
    width="46"
    height="40"
    viewBox="0 0 46 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 6C0 2.68629 2.68629 0 6 0H46V40H6C2.68629 40 0 37.3137 0 34V6Z"
      fill="#305EFF"
    />
    <path
      d="M33.0002 21.0292C33.0002 21.5792 32.5602 22.0292 32.0002 22.0492H30.0402C28.9602 22.0492 27.9702 21.2592 27.8802 20.1792C27.8202 19.5492 28.0602 18.9592 28.4802 18.5492C28.8502 18.1692 29.3602 17.9492 29.9202 17.9492H32.0002C32.5602 17.9692 33.0002 18.4192 33.0002 18.9692V21.0292Z"
      fill="#F8FAFC"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M30.04 23.55C28.14 23.55 26.54 22.12 26.38 20.3C26.29 19.26 26.67 18.22 27.43 17.48C28.07 16.82 28.96 16.45 29.92 16.45H31.47C31.76 16.45 32 16.21 31.97 15.92C31.75 13.49 30.14 11.83 27.75 11.55C27.51 11.51 27.26 11.5 27 11.5H18C17.72 11.5 17.45 11.52 17.19 11.56C14.64 11.88 13 13.78 13 16.5V23.5C13 26.26 15.24 28.5 18 28.5H27C29.8 28.5 31.73 26.75 31.97 24.08C32 23.79 31.76 23.55 31.47 23.55H30.04ZM18 17.75C17.59 17.75 17.25 17.41 17.25 17C17.25 16.59 17.59 16.25 18 16.25H24C24.41 16.25 24.75 16.59 24.75 17C24.75 17.41 24.41 17.75 24 17.75H18Z"
      fill="#F8FAFC"
    />
  </svg>
);

const Search = () => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-[50%] left-[13px] translate-y-[-50%]"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.0781 14.0214C10.0517 14.8425 8.74968 15.3335 7.33301 15.3335C4.0193 15.3335 1.33301 12.6472 1.33301 9.3335C1.33301 6.01979 4.0193 3.3335 7.33301 3.3335C10.6467 3.3335 13.333 6.01979 13.333 9.3335C13.333 10.7502 12.842 12.0522 12.0209 13.0786L14.4711 15.5288C14.7314 15.7891 14.7314 16.2112 14.4711 16.4716C14.2107 16.7319 13.7886 16.7319 13.5283 16.4716L11.0781 14.0214ZM2.66634 9.3335C2.66634 6.75617 4.75568 4.66683 7.33301 4.66683C9.91034 4.66683 11.9997 6.75617 11.9997 9.3335C11.9997 10.5908 11.5024 11.732 10.6939 12.5711C10.6711 12.5887 10.6492 12.6079 10.6283 12.6288C10.6074 12.6497 10.5882 12.6716 10.5706 12.6944C9.7315 13.5029 8.59032 14.0002 7.33301 14.0002C4.75568 14.0002 2.66634 11.9108 2.66634 9.3335Z"
      fill="#40566D"
    />
  </svg>
);
