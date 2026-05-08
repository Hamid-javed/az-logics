import { Cross } from "../Icons";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { setLoggingOut } from "../services/apiClient";

function Account({ visible, setProfile, userMailBox, refetch }) {
  const wrapperRef = useRef(null);
  const {
    setIsFromRegister,
    logout,
    setEmailData,
    handleButtonClick,
    setUserProfile,
    userProfile,
  } = useAuth();

  const navigate = useNavigate();
  const [copytext, setCopyText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = userMailBox?.results?.find(
    (mail) => mail.id === localStorage.getItem("email_id")
  );

  const copyToClipBoard = () => {
    setCopyText(true);
    navigator.clipboard.writeText(userEmail?.email);
    setTimeout(() => {
      setCopyText(false);
    }, [700]);
  };

  const needUpgrade = () => {
    return (
      userProfile?.features_data?.total_mailbox ===
      userProfile?.features_data?.mailbox_allowed
    );
  };

  const { mutate: uploadImage } = useUpdateProfile();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsLoading(true);

    uploadImage(formData, {
      onSuccess: (response) => {
        setUserProfile((prev) => ({ ...prev, url: response.data.url }));
        toast("Profile image updated successfully!");
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        toast.error("Failed to update profile image.");
      },
    });
  };

 useEffect(() => {
  if (!visible) return;

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setTimeout(() => {
        setProfile(false);
      }, 0);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [visible, setProfile]);


  return (
    <div
      className={`${visible ? "flex" : "hidden"} 
        absolute bg-[#EAEEF5] flex-col z-20 gap-2 md:gap-9 font-sans text-[#333333] shadow-md shadow-[#00000040] p-4 w-[256px] md:w-[333px] max-h-[358px] md:max-h-[464px] rounded-[16px] md:rounded-[22px] top-[55px] md:top-[70px] right-[20px] `}
      ref={wrapperRef}
    >
      <div className="flex justify-end">
        <button onClick={() => setProfile(false)}>
          <Cross className={"w-[12px] h-[14px]"} />
        </button>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
        <div className="w-[110px] h-[110px] relative bg-white rounded-full flex justify-center items-center">
          <div className=" h-[84px] w-[84px] rounded-full cursor-pointer  overflow-hidden">
            {/* <img
              src="https://s3-alpha-sig.figma.com/img/5298/20ef/398885b3c44f2931c974eeab97452589?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LbV6IEdtt9vlJGwrps7NNrhoRRi6Vb0TkA2bqwazqax9FclsMTNpeem2Ak1SPi58c5SdyAKPpvu295p0R6CeJ29GOA1es6BqHkNrCGKcgaU6P-XNxWRvM01pwRNHsrHglZSfSYFbeHrOGLDqVMP3mdPP8HE3VnRAa2PUiKxLJjB8O5Zl8mGimUIzmFr-8HF1pnUA-qKAbQKxEVi8r~PK~IK5Sf5cM3vtVNUh8Swf6iLMeE-9rO7RIkEO6HOvUskG17Z7iXrP58Un5-PF7hSsxM1maAdWKTXC0OYMr~Y5Y8U11Fl-3so~Q5OYHUzcWBeZGByg9f4J2EDq3BBrSkigCw__"
              className="w-full h-full object-cover "
            /> */}
            <p className="bg-[#EB417A] w-full h-full text-[white] flex justify-center items-center text-[40px]">
              {userProfile?.url ? (
                <img
                  src={userProfile.url}
                  className="w-full h-full object-cover "
                />
              ) : (
                userEmail?.email[0]?.toUpperCase()
              )}
              {}
            </p>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <ThreeCircles height="40" width="40" color="white" />
              </div>
            )}
          </div>
          <div className="absolute right-1 cursor-pointer bottom-[2px]">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="gallery-button"
            />
            <label htmlFor="gallery-button" className="cursor-pointer">
              <Edit />
            </label>
          </div>
        </div>
        <p className="text-[10px] md:text-[14px] flex items-center">
          {userEmail?.email}
          <span
            onClick={copyToClipBoard}
            className="ml-3 cursor-pointer transform hover:scale-110 duration-100"
          >
            {copytext ? <TickIcon /> : <Copy className="w-[9px] h-[10px]" />}
          </span>
        </p>
        <div className="w-[226px] md:w-[293px] h-[40px] md:h-[52px] bg-[#F8FBFD] rounded-[99px] pl-2 md:pl-3 mb-3 flex items-center justify-between">
          {
            <p
              onClick={() => {
                if (!needUpgrade()) {
                  navigate("/create-mail");
                  setIsFromRegister(false);
                } else {
                }
              }}
              className="text-[9px] md:text-[11px] cursor-pointer flex items-center w-[55%] md:w-[50%] "
            >
              <span className="mr-1">
                <img
                  src="/newwallet.svg"
                  className="h-[18.52px] w-[18.52px] md:h-[24px] md:w-[24px]"
                />
              </span>
              {!needUpgrade() && "Add email address"}
              {needUpgrade() && "Upgrade Plan"}
            </p>
          }
          <Line />
          <p
            onClick={() => {
              logout();
              setLoggingOut(true);
            }}
            className="text-[9px] md:text-[11px] cursor-pointer  flex items-center w-[45%] md:w-[50%] ml-4"
          >
            <span className="mr-2">
              <Signout className={"h-[11px] w-[12px]"} />
            </span>
            Sign out
          </p>
        </div>
      </div>
      {userMailBox?.count > 1 && (
        <div className="flex flex-col justify-start relative overflow-y-auto gap-2 mt-2 md:mt-0 ">
          <p className="text-[10px] md:text-[12px] font-[500] fixed top-[287px] md:top-[377px]">
            Other Email Address
          </p>
          {userMailBox?.results
            ?.filter((mail) => mail.id !== userEmail?.id)
            ?.map((mail, index) => (
              <p
                onClick={() => {
                  refetch();
                  setEmailData(mail);
                  localStorage.setItem("email_id", mail.id);
                  handleButtonClick({ type: "inbox", seen: "", starred: "" });
                  navigate("/");
                }}
                key={index}
                className="text-[9px] cursor-pointer md:text-[11px] flex items-center gap-2"
              >
                <span className="w-[26px] h-[26px] md:h-[34px] md:w-[34px] rounded-full bg-[#305EFF] flex items-center justify-center text-white">
                  {mail.email[0].toUpperCase()}
                </span>
                {mail.email}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}

export default Account;

const Copy = () => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.84615 0.5H5.35015C4.21908 0.5 3.32308 0.5 2.62215 0.592512C1.90092 0.688047 1.31692 0.888791 0.856 1.34107C0.395692 1.79395 0.191385 2.36777 0.094154 3.07642C1.19209e-07 3.76572 4.65975e-08 4.64549 4.65975e-08 5.75684V9.4186C-0.000110394 9.95884 0.196098 10.4814 0.553291 10.8921C0.910483 11.3028 1.40519 11.5747 1.94831 11.6588C2.03262 12.1208 2.19569 12.515 2.52185 12.8361C2.89231 13.2001 3.35877 13.3561 3.91262 13.4299C4.44615 13.5 5.12492 13.5 5.96615 13.5H7.88C8.72123 13.5 9.4 13.5 9.93354 13.4299C10.4874 13.3561 10.9538 13.2001 11.3243 12.8361C11.6948 12.4721 11.8535 12.0138 11.9286 11.4696C12 10.9453 12 10.2784 12 9.45186V6.36209C12 5.53553 12 4.8686 11.9286 4.34437C11.8535 3.80019 11.6948 3.34186 11.3243 2.97786C10.9975 2.6574 10.5963 2.49716 10.1262 2.41433C10.0405 1.88068 9.76379 1.3946 9.34579 1.04364C8.92779 0.692678 8.39598 0.499892 7.84615 0.5ZM9.15692 2.32665C9.06335 2.05819 8.88668 1.82519 8.65164 1.66028C8.4166 1.49537 8.13496 1.4068 7.84615 1.40698H5.38462C4.21108 1.40698 3.37785 1.40819 2.74462 1.49163C2.12615 1.57326 1.76923 1.72684 1.50892 1.9826C1.24862 2.23837 1.09231 2.58907 1.00923 3.19674C0.924308 3.81893 0.923077 4.63763 0.923077 5.7907V9.4186C0.922901 9.70238 1.01304 9.9791 1.18088 10.21C1.34871 10.441 1.58585 10.6146 1.85908 10.7065C1.84615 10.3377 1.84615 9.92047 1.84615 9.45186V6.36209C1.84615 5.53553 1.84615 4.8686 1.91815 4.34437C1.992 3.80019 2.152 3.34186 2.52185 2.97786C2.89231 2.61386 3.35877 2.45786 3.91262 2.3847C4.44615 2.31395 5.12492 2.31395 5.96615 2.31395H7.88C8.35692 2.31395 8.78154 2.31395 9.15692 2.32665ZM3.17415 3.62C3.34462 3.45251 3.58338 3.34367 4.03569 3.28381C4.49969 3.22274 5.11631 3.22153 5.99938 3.22153H7.84554C8.72862 3.22153 9.34462 3.22274 9.80985 3.28381C10.2615 3.34367 10.5003 3.45312 10.6708 3.62C10.8412 3.78749 10.952 4.02209 11.0129 4.46651C11.0751 4.92242 11.0763 5.52828 11.0763 6.39595V9.41921C11.0763 10.2869 11.0751 10.8921 11.0129 11.3493C10.952 11.7931 10.8406 12.0277 10.6708 12.1952C10.5003 12.3627 10.2615 12.4715 9.80923 12.5313C9.34462 12.5924 8.72862 12.5936 7.84554 12.5936H5.99938C5.11631 12.5936 4.49969 12.5924 4.03508 12.5313C3.58338 12.4715 3.34462 12.362 3.17415 12.1952C3.00369 12.0277 2.89292 11.7931 2.832 11.3487C2.76985 10.8921 2.76862 10.2869 2.76862 9.41921V6.39595C2.76862 5.52828 2.76985 4.92242 2.832 4.46591C2.89292 4.02209 3.00431 3.78749 3.17415 3.62Z"
      fill="black"
    />
  </svg>
);

const TickIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Line = () => (
  <svg
    width="2"
    height="66"
    viewBox="0 0 2 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.06934V64.661"
      stroke="#EAEEF5"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const Signout = ({ className }) => (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.5973 0H8.78513C9.20876 0 9.61504 0.168286 9.91459 0.467837C10.2141 0.767389 10.3824 1.17367 10.3824 1.5973V3.19459H8.78513V1.5973H1.5973V14.3757H8.78513V12.7784H10.3824V14.3757C10.3824 14.7993 10.2141 15.2056 9.91459 15.5051C9.61504 15.8047 9.20876 15.973 8.78513 15.973H1.5973C1.17367 15.973 0.767389 15.8047 0.467837 15.5051C0.168286 15.2056 0 14.7993 0 14.3757V1.5973C0 1.17367 0.168286 0.767389 0.467837 0.467837C0.767389 0.168286 1.17367 0 1.5973 0Z"
      fill="#444846"
    />
    <path
      d="M9.65558 10.8536L10.7817 11.9797L14.7749 7.98641L10.7817 3.99316L9.65558 5.11926L11.7161 7.18776H3.99316V8.78506H11.7161L9.65558 10.8536Z"
      fill="#444846"
    />
  </svg>
);

const Edit = () => (
  <svg
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="15.5"
      cy="15.5"
      r="14"
      fill="white"
      stroke="#EAEEF5"
      stroke-width="3"
    />
    <path
      d="M10.7393 17.1167L10.018 20.2293C9.99317 20.3431 9.99402 20.461 10.0205 20.5744C10.0471 20.6878 10.0986 20.7939 10.1714 20.8848C10.2441 20.9758 10.3363 21.0493 10.4411 21.1001C10.5459 21.1509 10.6608 21.1776 10.7772 21.1783C10.8315 21.1842 10.8862 21.1842 10.9405 21.1783L14.0721 20.4571L20.0848 14.4671L16.7292 11.1191L10.7393 17.1167Z"
      fill="black"
    />
    <path
      d="M21.9759 11.4683L19.7363 9.22874C19.589 9.08224 19.3898 9 19.1821 9C18.9744 9 18.7751 9.08224 18.6279 9.22874L17.3828 10.4738L20.7346 13.8256L21.9797 12.5805C22.0525 12.5073 22.1102 12.4204 22.1495 12.3249C22.1887 12.2293 22.2087 12.1269 22.2084 12.0236C22.208 11.9203 22.1873 11.8181 22.1474 11.7228C22.1075 11.6275 22.0492 11.5411 21.9759 11.4683Z"
      fill="black"
    />
  </svg>
);
