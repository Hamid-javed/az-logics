import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function ShowOriginal() {
  const [details, setDetails] = useState({});
  const { emailData } = useAuth();
  // const location = useLocation();
  // const { id, created_at, subject, body, recipients } = location.state || {};
  useEffect(()=>{
    const detailsString = JSON.parse(localStorage.getItem('showOriginalMail'));
    setDetails(detailsString)
  },[])

  return (
    <div className="bg-[#f6f8fc] w-[100vw]  gap-4 h-[100vh] flex flex-col items-center justify-start">
      <div className="bg-[white] w-full mt-4 flex-wrap sm:mt-0 p-6 rounded-lg shadow-md flex flex-col items-start">
        <h1 className="font-sans text-[16px] sm:text-[22px] font-[500]">Original Message</h1>
        <div className="w-full mt-3">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 font-sans text-[12px] sm:text-[16px]">
            <div className="font-semibold text-gray-700">Message ID:</div>
            <div className="text-gray-900">&lt; {details?.id} &gt;</div>

            <div className="font-semibold text-gray-700">Created at:</div>
            <div className="text-gray-900">{details?.created_at}</div>

            <div className="font-semibold text-gray-700">From:</div>
            <div className="text-gray-900">
              {details?.recipients?.some((recip) => recip?.recipient_type === "from")
                ? details?.recipients?.find((recip) => recip?.recipient_type === "from")
                    ?.email
                : emailData?.email}
            </div>

            <div className="font-semibold text-gray-700">To:</div>
            <div className="text-gray-900">
              {details?.recipients?.length > 0 ? (
                details?.recipients
                  ?.filter((recip) => recip?.recipient_type === "to")
                  .map((recip, index) => (
                    <span key={index}>
                      {recip?.email || "No Email Provided"}
                    </span>
                  ))
              ) : (
                <span>No recipients available</span>
              )}
            </div>

            <div className="font-semibold text-gray-700">Subject:</div>
            <div className="text-gray-900">{details?.subject}</div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <button onClick={()=>window.print()} className="bg-blue-400 text-[14px] sm:text-[18px] hover:bg-blue-500 mt-2 hover:shadow-md px-4 h-[30px] rounded-md text-white">
            Click to Download
          </button>
        </div>
      </div>
      <div className="w-[80%] bg-white p-4 font-sans border-2 border-[#eaf1fc]">
        <h1 className="font-[600] text-[16px] sm:text-[22px] mb-2">Body:</h1>
        <p className="text-gray-900 text-[12px] sm:text-[16px]">
          {details?.body || 'No message to display. Keep shining!'}
        </p>
      </div>
    </div>
  );
}

export default ShowOriginal;
