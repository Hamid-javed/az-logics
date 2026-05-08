import { toast } from "react-toastify";
import { useEffect } from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Cross } from "../Icons";
import { useAuth } from "../AuthContext";
import useCreateMail from "../hooks/useCreateMail";
import useVerifyMail from "../hooks/useVerifyMail";

function VerifyEmail() {
  const {
    extensions,
    emailDetails,
    setEmailData,
    isFromRegister,
    setUserMailBox,
  } = useAuth();
  const { mutate: create, isPending } = useCreateMail();
  const { mutate: verify, isPending: verifyLoading, isError } = useVerifyMail();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    verify(emailDetails, {});
  }, [emailDetails, verify]);

  const handleSubmit = () => {
    create(emailDetails, {
      onSuccess: (data) => {
        navigate("/");
        toast.success("Mailbox Created Successfully.");
        localStorage.setItem("email_id", data.id);
        setEmailData(data);
        setUserMailBox((prevState) => ({
          ...prevState,
          count: prevState.count + 1,
          results: [...prevState.results, data],
        }));
      },
      onError: (error) => {
        Object.values(error.response.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
      },
    });
  };
  if (!emailDetails?.local_part || !emailDetails?.domain) {
    return <Navigate to="/create-mail" state={{ from: location }} replace />;
  }
  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#000000c1] md:bg-[#F8FAFC] z-50 px-0 md:px-[20px]">
      <section className="bg-[#FFFFFF] relative w-full md:max-w-[560px] h-[400px] md:h-[473px] rounded-[22px] md:rounded-[32px] flex flex-col justify-center items-center">
        {!isFromRegister && (
          <span
            className="absolute hidden md:block right-[17px] text-lg top-[17px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Cross />
          </span>
        )}
        <section className="flex flex-col justify-center items-center gap-2">
          <img
            src="/logoName.svg"
            className="md:w-[210px] md:h-[42.07px] w-[171px] h-[34px]"
          />
          <h1 className="text-black leading-[20px] md:leading-[64px] text-[16px] md:text-[26px] mb-4">
            {!verifyLoading &&
              `Your address is ${
                !isError && !verifyLoading ? "" : "not "
              }available`}
          </h1>
          <div className="flex gap-4 mt-5">
            <div className="flex flex-col justify-start items-start">
              <label
                htmlFor="options"
                className=" md:text-[#40566D] text-[#2B2B2B] text-[12px] md:text-[14px] font-sans"
              >
                Enter Email Address
              </label>
              <div className="bg-[#6C849D1F] px-3 w-[325px] h-[34px] md:w-[463px] md:h-[49px] rounded-[8.21px] flex items-center justify-between">
                <p className="bg-[#6c849d00]  text-[#40566D] text-[12px] font-sans">
                  {`${emailDetails?.local_part}@${
                    extensions?.results.find(
                      (domain) => domain.id === emailDetails?.domain
                    ).name || ""
                  }`}
                </p>
                {!isError && !verifyLoading && (
                  <img
                    src="/tick-icon.svg"
                    className="w-[23px] h-[23px] md:w-[33px] md:h-[33px]"
                  />
                )}
                {isError && !verifyLoading && (
                  <img
                    src="/tryagain.svg"
                    className="w-[23px] h-[23px] md:w-[33px] md:h-[33px]"
                  />
                )}
                {verifyLoading && (
                  <ThreeCircles height="30" width="30" color="black" />
                )}
              </div>

              {isError && !verifyLoading && (
                <p className="font-sans text-[12px] text-[#FF6250] text-start mt-1">
                  * This email is already taken, try other email.
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-20 md:gap-32 mt-11 md:mt-0">
              <p
                onClick={() => navigate("/")}
                className="text-[12px] block md:hidden font-sans text-[#305EFF]"
              >
                Go Back
              </p>
              <button
                onClick={
                  !isError && !verifyLoading
                    ? handleSubmit
                    : () => navigate("/create-mail")
                }
                type="submit"
                disabled={isPending || verifyLoading}
                className={`w-[180px] md:w-[400px] mq1100:w-[451px] mt-0 md:mt-3 h-[41px] rounded-[9px] bg-[#305EFF] text-white flex justify-center items-center ${
                  (isPending || verifyLoading)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#254BCC]"
                }`}
              >
                {!isError && !verifyLoading  ? "Add Email" : "Try Again"}
                {isPending && (
                  <span className="ml-2">
                    <ThreeDots height="20" width="20" color="white" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default VerifyEmail;
