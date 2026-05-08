"use client";
import React from "react";

interface FlowCardClasses {
  root?: string;
  textarea?: string;
}

interface FlowCardProps {
  title: string;
  description: string;
  placeholder?: string;
  buttonText: string;
  classes?: FlowCardClasses;

  // Controlled textarea
  value?: string;
  onChange?: (v: string) => void;

  // Hide textarea entirely (e.g. signup card)
  hideTextarea?: boolean;

  // Clear button
  clearButton?: boolean;
  onClear?: () => void;

  // Button state
  buttonDisabled?: boolean;
  onButtonClick?: () => void;

  // Extra content rendered below the button
  extraContent?: React.ReactNode;
}

const FlowCard = ({
  title,
  description,
  placeholder,
  buttonText,
  classes = {},
  value,
  onChange,
  hideTextarea = false,
  clearButton = false,
  onClear,
  buttonDisabled = false,
  onButtonClick,
  extraContent,
}: FlowCardProps) => {
  return (
    <div
      className={`p-4 rounded-lg ${classes.root || "bg-gray-50 border border-gray-200"}`}
    >
      <h3 className="font-semibold text-gray-800 mb-2 text-sm">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>

      {!hideTextarea && (
        <textarea
          rows={3}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none ${
            classes.textarea || ""
          }`}
        />
      )}

      <div className={`flex gap-2 ${hideTextarea ? "" : "mt-3"}`}>
        <button
          onClick={onButtonClick}
          disabled={buttonDisabled}
          className="flex-1 bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF] font-NeueRegular text-white py-2.5 rounded-full  text-sm transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {buttonDisabled && buttonText.includes("…") ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {buttonText}
            </>
          ) : (
            buttonText
          )}
        </button>

        {clearButton && (
          <button
            onClick={onClear}
            className="px-4 bg-white text-gray-600 border border-gray-300 py-2 rounded-lg font-medium text-sm transition-all hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>

      {extraContent}
    </div>
  );
};

export default FlowCard;
