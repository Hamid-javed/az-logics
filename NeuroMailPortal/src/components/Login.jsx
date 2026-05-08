import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import Words from "../assets/Seeds";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";
import useGenerateToken from "../hooks/useGenerateToken";
import { deriveSeedsHash, handleSuccessfulLogin } from "../utils/cryptoOperations";
import { LoginWithNeuroNus } from "./LoginWithNeuroNus";

function Login({ setPage }) {
  return <LoginSeeds setPage={setPage} />;
}

export default Login;

function LoginSeeds({ setPage }) {
  const { login, isAuthenticated } = useAuth();
  const { mutate, isPending } = useGenerateToken();

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [seedsValue, setSeedsValue] = useState([]);

  const handleSubmit = async () => {
    const seeds = seedsValue.join(" ");
    const seedsHash = await deriveSeedsHash(seeds);
    const payload = {
      pass_phrase: seedsHash.loginHash,
    };
    mutate(payload, {
      onSuccess: async (response) => {
        await handleSuccessfulLogin(response, seedsValue);
        login();
        toast.success("Logged In Successfully.");
      },
      onError: (error) => {
        toast.error(
          error.response.data.detail ||
            "Login failed. Please check your credentials.",
          { className: "toast-message" }
        );
      },
    });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        const filteredSuggestions = Words.filter((word) =>
          word.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setInputValue("");
        setSuggestions([]);
        if (filteredSuggestions.length <= 0) {
          return;
        }
        setSeedsValue([...seedsValue, filteredSuggestions[0]]);
        break;
      case "Backspace":
        if (inputValue === "") {
          setSeedsValue(seedsValue.slice(0, seedsValue.length - 1));
        }
        break;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value.split(" ").length > 1) {
      setSeedsValue(value.split(" "));
      setInputValue("");
    }
    if (value.length > 0) {
      const filteredSuggestions = Words.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue("");
    setSeedsValue([...seedsValue, suggestion]);
    setSuggestions([]);
  };
  const removeSeed = (indexToRemove) => {
    setSeedsValue(seedsValue.filter((_, index) => index !== indexToRemove));
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <>
    {/* <div className=" flex flex-col text-start gap-[10px] pt-8 md:pt-0">
      <p className="text-[14.13px] font-[600] text-[black] font-sans">
        Key Seed
      </p>
      <div className="w-[310px] h-[153px] md:w-[400px] mq1100:w-[451px] md:h-[153px] flex items-start flex-wrap bg-white gap-[5px] md:gap-[9.42px] overflow-auto rounded-lg px-2 md:px-3 py-3 ">
        {seedsValue?.map((seed, index) => (
          <span
            key={index}
            className="group min-w-[50px] cursor-pointer  md:min-w-[69px] h-[20px] px-1 md:h-[27px] text-[12px] md:text-[16px] border-[1px] border-[#4D7FFF] flex justify-center items-center rounded-[4px] md:rounded-[6px] font-sans"
          >
            {seed}
            <span
              className="cursor-pointer ml-1  text-[#ab1c1c] text-xl hidden group-hover:inline"
              onClick={() => removeSeed(index)}
            >
              x
            </span>
          </span>
        ))}
        {seedsValue.length < 16 && (
          <input
            placeholder="Enter your Key Seeds..."
            className=" pb-24 w-[100%] h-[100%] outline-none font-sans text-[12px] md:text-[14px]"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
      <div className="flex w-[310px] md:w-[400px] mq1100:w-[451px] gap-[8px] mt-[11px] flex-wrap">
        {suggestions.map((seed, index) => (
          <span
            onClick={() => handleSuggestionClick(seed)}
            key={index}
            className="min-w-[50px] cursor-pointer md:min-w-[69px] h-[20px] px-1 md:h-[27px] text-[12px] md:text-[16px] border-[1px] border-[#4D7FFF] flex justify-center rounded-[4px] md:rounded-[6px] font-sans"
          >
            {seed}
          </span>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isPending || seedsValue.length < 16} // Disable the button when the mutation is in progress
        className={`w-[310px] md:w-[400px] mq1100:w-[451px] mt-2 md:mt-3 h-[41px] rounded-[9px] bg-[#305EFF] text-white flex justify-center items-center ${
          isPending || seedsValue.length < 16 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#254BCC]"
        }`}
      >
        <span className="flex items-center">
          Next
          {isPending && (
            <span className="ml-2">
              <ThreeDots height="25" width="25" color="white" />
            </span>
          )}
        </span>
      </button>
      <p className="text-[12px] md:text-[14px] leading-[32px] justify-center flex gap-1 font-sans font-[400]">
        Don’t have your seed?
        <button onClick={() => setPage()} className="text-[#75A3FF]">
          Register
        </button>
      </p>
    </div> */}
    <LoginWithNeuroNus/>
    </>
  );
}

function VerifyCode() {
  return (
    <div className="flex flex-col justify-center items-center gap-[16px] pt-8 md:pt-0">
      <p className="text-[20px] md:text-[28.27px] w-[242px] md:w-[342px] text-[#2B2B2B] leading-[37.69px]">
        Two-factor authentication
      </p>
      <p className="text-[12px] md:text-[16px] leading-[14.52px] md:leading-[27px] w-[271px] md:w-[381px] h-[30px] md:h-[68px] font-sans">
        Please enter 6-digit code that appears in your authentication app.
      </p>
      <div className="text-start mt-1">
        <p className="text-[12px] md:text-[14px] leading-[28.27px] font-sans">
          Enter Phone Number or email
        </p>
        <input
          placeholder="Email or phone number"
          className="outline-none w-[320px] md:w-[400px] mq1100:w-[451.07px] bg-white h-[36px] font-sans rounded-[6.33px] md:rounded-lg px-3"
        />
      </div>
      <div className="text-start mt-1">
        <p className="text-[12px] md:text-[14px] leading-[28.27px] font-sans">
          Enter Code
        </p>
        <input
          placeholder="Verification code"
          className="outline-none w-[320px] md:w-[400px] mq1100:w-[451.07px] bg-white h-[36px] font-sans rounded-[6.33px] md:rounded-lg px-3"
        />
      </div>
      <button className="w-[310px] md:w-[400px] mq1100:w-[451px] mt-4 h-[41px] text-[16px] font-sans rounded-[9px] bg-[#305EFF] text-white flex justify-center items-center">
        Verify Code
      </button>
    </div>
  );
}
