import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Circles } from "react-loader-spinner";

import useEmailRephrase from "../hooks/useEmailRephrase";
import { toast } from "react-toastify";

function WrittingStyle({ setComposedEmail, messageData, setEmailBody }) {
  const { aiTemplates } = useAuth();
  const body = document.getElementById("body");
  const { mutate, isPending } = useEmailRephrase();
  const [selectedStyle, setSelectedStyle] = useState();

  const handleStyleSelection = (templateId) => {
    setSelectedStyle(templateId);
    localStorage.setItem("original", messageData.body);
    const data = JSON.stringify({
      email_text: messageData.body,
      template: templateId,
    });

    mutate(data, {
      onSuccess: (res) => {
        const formattedText = res.email_text.replace(/\n/g, '<br/>')
        setEmailBody(formattedText)
        // body.innerText = res.email_text;
        setComposedEmail(res.email_text);
      },
      onError: (error) => {
        Object.values(error.response.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
      },
    });
  };

  return (
    <div className="w-full mq1100:min-w-[455px] p-3 z-50 text-[#192839] bg-[#ffffff] flex flex-col gap-3 justify-start font-sans">
      <p className="text-[11px] font-[600] ">Choose person Style of writing</p>
      <div className="flex gap-2 flex-wrap">
        {aiTemplates?.map((item, index) => (
          <button
            disabled={isPending}
            key={index}
            onClick={() => {
              if (item.name === "Original") {
                setComposedEmail(false);
                let emailBody = localStorage.getItem("original") || ""
                setEmailBody(emailBody)
                // body.innerText = localStorage.getItem("original") || "";
                setSelectedStyle("original");
              } else {
                handleStyleSelection(item.id);
              }
            }}
            className={`px-2 h-[27px] ${
              selectedStyle === item.id
                ? "bg-[#ffffff] border border-[#4D7FFF] "
                : isPending
                ? "bg-[#F3F9FF] text-[#A9B7D0] cursor-not-allowed" // Disabled color and cursor
                : "bg-[#F3F9FF] text-[#4D7FFF]" // Normal color when not pending
            } rounded-[6px] text-[13px] text-[#4D7FFF] flex justify-center items-center gap-1 transition-all duration-200 ease-in-out`}
          >
            {item.name === "Original" && <CurveArrow />}
            {item.name}
            {isPending && selectedStyle === item.id && (
              <span className="ml-1">
                <Circles height="12" width="12" color="black" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WrittingStyle;

const CurveArrow = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mb-[2px]"
  >
    <path
      d="M6.63356 2.816H1.52175L3.70803 0.673608C3.7826 0.599608 3.82449 0.499242 3.82449 0.39459C3.82449 0.289939 3.7826 0.189573 3.70803 0.115573C3.63347 0.0415727 3.53233 7.79718e-10 3.42688 0C3.32143 -7.79718e-10 3.2203 0.0415727 3.14573 0.115573L0 3.20233L3.14573 6.27347C3.21978 6.34644 3.31999 6.38722 3.42434 6.38686C3.52868 6.38649 3.62861 6.34501 3.70213 6.27152C3.77566 6.19804 3.81675 6.09858 3.81638 5.99503C3.81602 5.89147 3.77421 5.79231 3.70017 5.71934L1.51782 3.59646H6.62963C7.57453 3.59126 8.48298 3.95801 9.15592 4.61633C9.82885 5.27465 10.2114 6.17086 10.2197 7.10857C10.2152 7.75853 10.029 8.39448 9.68185 8.94565C9.33474 9.49683 8.84031 9.94159 8.25361 10.2305C8.15662 10.2791 8.08308 10.364 8.04916 10.4664C8.03236 10.5172 8.0258 10.5707 8.02985 10.6239C8.03389 10.6772 8.04846 10.7291 8.07273 10.7768C8.097 10.8244 8.13049 10.8669 8.17129 10.9017C8.21209 10.9365 8.2594 10.963 8.31052 10.9797C8.41376 11.0133 8.52625 11.0049 8.62324 10.9563C9.49505 10.5197 10.1923 9.80316 10.6017 8.92329C11.011 8.04341 11.1083 7.05196 10.8776 6.11025C10.647 5.16854 10.1021 4.33199 9.33152 3.73669C8.56093 3.1414 7.61005 2.82241 6.63356 2.8316V2.816Z"
      fill="#4D7FFF"
    />
  </svg>
);
