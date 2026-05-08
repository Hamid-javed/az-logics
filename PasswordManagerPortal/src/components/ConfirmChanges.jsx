import React, { useState, useEffect } from "react";
import { Cross } from "../assets/icons";
import { useAuth } from "../AuthContext";
import useUpdatePassword from "../hooks/useUpdatePassword";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function ConfirmChanges({ hideModal }) {
  const { setGeneratorPassword, data, setData } = useAuth();
  const { mutate, isPending, isError, error, isSuccess } = useUpdatePassword();
  const navigate = useNavigate();

  const clickToConfirm = () => {
    mutate(data, {
      onSuccess: () => {
        setGeneratorPassword("");
        toast.success(`Password updated successfully.`, {
          className: "toast-message",
        });
        hideModal();
        navigate("/dashboard/folders");
      },

      onError: (error) => {
        if (error.response?.data) {
          Object.values(error.response.data).forEach((errorArray) => {
            if (Array.isArray(errorArray)) {
              toast.error(errorArray[0], {
                className: "toast-message",
              });
            } else if (typeof errorArray === 'string') {
              toast.error(errorArray, {
                className: "toast-message",
              });
            }
          });
        } else if (error.message) {
          toast.error(error.message, {
            className: "toast-message",
          });
        } else {
          toast.error("Failed to update password", {
            className: "toast-message",
          });
        }
        
        // Don't hide modal on error - let user try again
        // hideModal(); // Remove this if present
      },
    });
  };

  // Determine button content
  const getButtonContent = () => {
    if (isPending) {
      return (
        <>
          <ThreeDots
            color="white"
            height={20}
            width={40}
            ariaLabel="loading"
          />
        </>
      );
    }
    return "Okay";
  };

  // Determine button styles based on state
  const getButtonStyles = () => {
    if (isPending) {
      return {
        background: "#0E1956",
        cursor: "not-allowed",
        opacity: 0.7
      };
    }
    return {
      background: "linear-gradient(90deg, #A143FF 0%, #5003DB 100%)",
      cursor: "pointer"
    };
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-[#0000006B] z-50 px-[20px]">
      <section className="bg-[#101E71] relative w-full max-w-[591px] h-[280px] sm:h-[318px] rounded-[5px] flex flex-col justify-center items-center">
        <span
          className="absolute right-[17px] top-[17px] cursor-pointer"
          onClick={hideModal}
        >
          <Cross />
        </span>
        
        <section className="flex flex-col max-w-[450px] mx-5 justify-center text-center mb-5">
          <h1 className="text-white leading-[20px] sm:leading-[44.7px] text-[20px] sm:text-[32px] mb-4">
            Would you like to save changes to this entry?
          </h1>
        </section>

        <section className="mt-[0px] sm:mt-[20px] w-full flex items-center justify-center gap-[9px] sm:gap-[36px] flex-wrap">
          <button
            className="dm-sans bg-[#0E1956] w-[125px] h-[40px] sm:w-[141px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none border-none flex items-center justify-center text-[12px] sm:text-[15.5px] font-[400] text-white"
            onClick={hideModal}
            disabled={isPending}
          >
            Cancel
          </button>
          
          <button
            onClick={clickToConfirm}
            style={getButtonStyles()}
            disabled={isPending}
            className="dm-sans w-[125px] h-[40px] sm:w-[141px] sm:h-[50px] rounded-[6.23px] sm:rounded-[15px] outline-none border-none flex items-center justify-center text-[12px] sm:text-[15.5px] text-white"
          >
            {getButtonContent()}
          </button>
        </section>
      </section>
    </section>
  );
}

export default ConfirmChanges;