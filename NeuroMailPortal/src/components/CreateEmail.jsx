import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Cross } from "../Icons";
import { useAuth } from "../AuthContext";

function CreateEmail() {
  const { isFromRegister, setEmailDetails, extensions } = useAuth();

  const navigate = useNavigate();
  const [mailValue, setMailValue] = useState({
    local_part: "",
    domain: "",
  });

  useEffect(() => {
    // setting up the default domain id
    setMailValue((prev) => ({
      ...prev,
      domain: extensions?.results?.[0]?.id || "",
    }));
  }, [extensions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMailValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const extension = extensions.results.find(
      (domain) => domain.id === mailValue.domain
    );
    if (extension) {
      setEmailDetails({
        local_part: mailValue.local_part,
        domain: extension.id,
      });
      navigate("/verify-email");
    }
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#000000c1] md:bg-[#F8FAFC] z-50 px-0 md:px-[20px]">
      <section className="bg-[#FFFFFF] relative w-[100vw]  md:max-w-[852px] h-[600px] md:h-[510px] rounded-[22px] md:rounded-[5px] flex flex-col justify-start md:justify-center items-center">
        {!isFromRegister && (
          <span
            className="absolute hidden md:block right-[17px] text-lg top-[17px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Cross />
          </span>
        )}
        <section className="flex flex-col justify-center items-center gap-4 mt-14 md:mt-0">
          <img
            src="/logoName.svg"
            className="md:w-[210px] md:h-[42.07px] w-[171px] h-[34px]"
          />
          <h1 className="text-black leading-[20px] md:leading-[64px] text-[16px] md:text-[26px] mb-4">
            Create your first email address for free
          </h1>
          <div className="flex flex-col md:flex-row gap-6 mt-3 md:mt-0 md:gap-4">
            <div className="flex flex-col justify-start items-start">
              <label
                htmlFor="options"
                className=" md:text-[#40566D] text-[#2B2B2B] text-[12px] md:text-[14px] font-sans"
              >
                Enter Name
              </label>
              <input
                name="local_part"
                type="text"
                placeholder="Email here"
                value={mailValue.local_part}
                onChange={handleChange}
                className="bg-[#6C849D1F] placeholder:text-[#6C849D52] text-[#40566D] px-3 text-[14px] font-sans w-[325px] h-[34px] md:w-[398px] md:h-[49px]  rounded-[8.21px]  focus:outline-none"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label
                htmlFor="options"
                className="md:text-[#40566D] flex items-center gap-2 text-[#2B2B2B] text-[12px] md:text-[14px] font-sans"
              >
                Choose extension
              </label>
              <select
                id="options"
                name="domain"
                onChange={handleChange}
                value={mailValue.domain}
                className="bg-[#6C849D1F] text-black px-3 text-[10px] md:text-[14px] font-sans md:w-[320px] md:h-[49px] w-[325px] h-[34px] rounded-[8.21px] focus:outline-none"
              >
                {extensions?.results?.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-20 md:gap-32 mt-6 md:mt-0">
            {/* <p
              onClick={() => navigate("/")}
              className="text-[12px] block md:hidden font-sans text-[#305EFF]"
            >
              Go Back
            </p> */}
            <button
              type="submit"
              className={`w-[180px] md:w-[400px] mq1100:w-[451px] mt-0 md:mt-3 h-[41px] rounded-[9px] bg-[#305EFF] text-white flex justify-center items-center ${
                mailValue.local_part === ""
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#254BCC]"
              }`}
              onClick={handleSubmit}
              disabled={mailValue.local_part === ""}
            >
              Next
            </button>
          </div>

          <p className=" w-[296px] text-[10px] md:text-[14px] leading-[16.94px] mt-3 md:mt-0 font-sans text-[#929292] md:w-[435px]">
            Note: This email is free, your next email address will cost 10 USD
            per domain, that will charge from your primary wallet.
          </p>
        </section>
      </section>
    </section>
  );
}

export default CreateEmail;
