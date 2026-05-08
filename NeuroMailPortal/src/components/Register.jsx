import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

import { useAuth } from "../AuthContext";
import useGenerateToken from "../hooks/useGenerateToken";
import {
  deriveSeedsHash,
  generateSeedPhrase,
  performSignup,
  handleSuccessfulLogin,
} from "../utils/cryptoOperations";
import useRegisterSeeds from "../hooks/useRegisterSeeds";

function Register({ setPage }) {
  const [isAgree, setIsAgree] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      {isAgree ? (
        <RegisterSeeds setPage={setPage} setIsAgree={setIsAgree} />
      ) : (
        <RegisterInstruction setIsAgree={setIsAgree} setPage={setPage} />
      )}
    </>
  );
}

export default Register;

function RegisterInstruction({ setIsAgree, setPage }) {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-[8px] md:gap-[15px] register  md:pt-0">
      <div className="h-[20%]">
        <img src="/note.svg" className="hidden md:block h-[110%]" />
      </div>
      <img src="/notemobile.svg" className="block md:hidden" />
      <p className="text-[20px] md:text-[32px]  leading-[64px] text-[#2B2B2B] mt-3">
        Important Note
      </p>
      <p className="text-[12px] md:text-[16px] w-[314px] md:w-[410px] mq1100:w-[491px] leading-[14.52px] md:leading-[26px] text-[black] font-sans">
        On the next page you will see a series of 16 words. This is your unique
        and private seed and it is the ONLY way to recover your wallet in case
        of loss or manifestation. It is your responsibility to write it down and
        store it in a safe place outside of the password manager app
      </p>
      <button
        onClick={() => setIsAgree(true)}
        className="w-[310px] md:w-[400px] mq1100:w-[451px] mt-3 h-[41px] text-[16px] font-sans rounded-[9px] bg-[#305EFF] text-white flex py-2 justify-center items-center"
      >
        I understand, show me my seed
      </button>
      <p className="text-[12px] md:text-[14px] leading-[32px] mb-4 justify-center flex gap-1 font-sans font-[400]">
        Already have account?
        <button onClick={() => setPage()} className="text-[#75A3FF]">
          Login here
        </button>
      </p>
    </div>
  );
}

function RegisterSeeds({ setIsAgree, setPage }) {
  const navigate = useNavigate();
  const retryAttempt = useRef(0);
  const { mutate: createToken, isPending: isCreatingToken } =
    useGenerateToken();
  const {
    mutate: registerSeeds,
    isPending: isRegistering,
    isError,
  } = useRegisterSeeds();
  const { signup, setIsFromRegister } = useAuth();

  const errorToastShown = useRef(false);
  const [copytext, setCopyText] = useState(false);
  const [seedsData, setSeedsData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [triggerReload, setTriggerReload] = useState(0);

  // Effect to generate seed phrase and crypto payload

  useEffect(() => {
    async function registerCryptoData() {
      setIsGenerating(true);
      try {
        const seedPhrase = await generateSeedPhrase();

        const cryptoData = await performSignup(seedPhrase);
        const payload = {
          enc_salt: cryptoData.encSalt,
          encrypted_private_key: cryptoData.encryptedPrivateKey,
          encrypted_private_key_iv: cryptoData.encryptedPrivateKeyIV,
          encrypted_private_key_tag: cryptoData.encryptedPrivateKeyTag,
          pass_phrase: cryptoData.loginHash,
          public_key: cryptoData.publicKey,
        };

        registerSeeds(payload, {
          onSuccess: () => {
            setSeedsData(seedPhrase);
            setIsGenerating(false);
          },
          onError: (error) => {
            const errorMessage =
              error.response.data[0] || "Registration failed.Please try again.";
            if (retryAttempt.current === 0) {
              retryAttempt.current = 1;
              registerCryptoData();
            } else {
              toast.error(errorMessage);
              setIsGenerating(false);
            }
          },
        });
      } catch (error) {
        if (retryAttempt.current === 0) {
          retryAttempt.current = 1;
          registerCryptoData();
        } else {
          toast.error("Failed to generate credentials. Please refresh.");
          setIsGenerating(false);
        }
      }
    }

    registerCryptoData();
  }, [triggerReload]);

  const copyToClipBoard = () => {
    setCopyText(true);
    navigator.clipboard.writeText(seedsData);
    setTimeout(() => {
      setCopyText(false);
    }, [700]);
  };

  if (isError && !errorToastShown.current) {
    toast.error("Seed generation failed please try again.");
    errorToastShown.current = true;
    setIsAgree(false);
  }

  const handleSubmit = async () => {
    const seedsHash = await deriveSeedsHash(seedsData);
    const payload = {
      pass_phrase: seedsHash.loginHash,
    };
    createToken(payload, {
      onSuccess: async (response) => {
        await handleSuccessfulLogin(response, seedsData);
        toast.success("Logged In Successfully.");
        signup();
        navigate("/create-mail");
        setIsFromRegister(true);
        localStorage.removeItem("email_id");
      },
      onError: (error) => {
        toast.error(error.response.data.detail);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-0 md:gap-[10px] pt-5 pb-2 register md:pt-0">
      <img src="/seed.svg" className="hidden md:block" />
      <img src="/mobileseed.svg" className="block md:hidden" />
      <p className="text-[20px] md:text-[32px] leading-[64px] text-[#2B2B2B]">
        Your Seed
      </p>
      <div className="flex flex-col text-start gap-[2px] md:gap-[10px]">
        <p className="text-[14.13px] font-[600] text-[black] font-sans flex items-center">
          Key Seed{" "}
          {(isGenerating || isRegistering) && (
            <>
              Loading
              <span className="ml-2">
                <ThreeCircles height="20" width="20" color="black" />
              </span>
            </>
          )}
        </p>

        <div className="w-[310px] relative md:w-[400px] mq1100:w-[451px] h-[130px] md:h-[153px] flex flex-wrap bg-white gap-[5px] md:gap-[9.42px] overflow-auto rounded-lg px-2 md:px-3 py-3 ">
          {seedsData?.split(" ").map((seed, index) => (
            <div
              key={index}
              className="min-w-[50px]  md:min-w-[69px] h-[20px] px-1 md:h-[27px] text-[12px] md:text-[16px] border-[1px] border-[#4D7FFF] flex justify-center rounded-[4px] md:rounded-[6px] font-sans"
            >
              {seed}
            </div>
          ))}
          <div className="absolute right-3 bottom-1 bg-white">
            <span onClick={copyToClipBoard} className="cursor-pointer">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[16px] h-[16px] md:w-[22px] md:h-[22px]"
              >
                {copytext ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11L8 17L20 3"
                      stroke="black"
                      strokeOpacity="0.63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </svg>
                ) : (
                  <>
                    <path
                      d="M18.2606 4.84595H7.58793C6.07452 4.84595 4.84766 6.07281 4.84766 7.58622V18.2589C4.84766 19.7723 6.07452 20.9991 7.58793 20.9991H18.2606C19.774 20.9991 21.0008 19.7723 21.0008 18.2589V7.58622C21.0008 6.07281 19.774 4.84595 18.2606 4.84595Z"
                      stroke="black"
                      strokeWidth={2}
                      strokeOpacity="0.63"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1291 4.84599L17.1532 3.6922C17.1511 2.97881 16.8669 2.29521 16.3624 1.79077C15.858 1.28632 15.1744 1.00203 14.461 1H4.0768C3.26152 1.00241 2.48032 1.32734 1.90383 1.90383C1.32734 2.48032 1.00241 3.26152 1 4.0768V14.461C1.00203 15.1744 1.28632 15.858 1.79077 16.3624C2.29521 16.8669 2.97881 17.1511 3.6922 17.1532H4.84599"
                      stroke="black"
                      strokeWidth={2}
                      strokeOpacity="0.63"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
            </span>
          </div>
        </div>
        <p className="text-[10px] md:text-[14.13px] font-[400] text-[black] font-sans">
          Please write these down incase you lose your seed
        </p>
        <button
          onClick={handleSubmit}
          disabled={isCreatingToken || isRegistering || seedsData === "" || isGenerating} // Disable the button when the mutation is in progress
          className={`w-[310px] md:w-[400px] mq1100:w-[451px] mt-2 md:mt-3 h-[41px] rounded-[9px] bg-[#305EFF] text-white flex justify-center items-center ${
            isCreatingToken || isRegistering || seedsData === "" || isGenerating
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#254BCC]"
          }`}
        >
          <span className="flex items-center">
            Next
            {isCreatingToken && (
              <span className="ml-2">
                <ThreeDots height="20" width="20" color="white" />
              </span>
            )}
          </span>
        </button>

        <p className="text-[12px] md:text-[14px] leading-[32px] justify-center flex gap-1 font-sans font-[400]">
          Already have account?
          <button onClick={() => setPage()} className="text-[#75A3FF]">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
