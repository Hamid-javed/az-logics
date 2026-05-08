"use client";

interface CardButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CardButton = ({ text, className = "", onClick, disabled }: CardButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-orange-600 text-white py-2.5 px-4 rounded-full font-NeueRegular text-sm transition-all hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
};

export default CardButton;
