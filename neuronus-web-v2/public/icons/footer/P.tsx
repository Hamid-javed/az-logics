import { SvgProps } from "@/types/svg";

const P = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5356 33.0713C25.6683 33.0713 33.0713 25.6683 33.0713 16.5356C33.0713 7.40301 25.6683 0 16.5356 0C7.40301 0 0 7.40301 0 16.5356C0 25.6683 7.40301 33.0713 16.5356 33.0713Z"
        fill="#F7F7F7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4004 9.92188V23.1504H14.8807V19.0165H18.6343C21.1271 18.9503 23.1486 16.9289 23.1486 14.4692C23.1486 11.9434 21.1271 9.92188 18.6343 9.92188H12.4004ZM18.6649 16.5361H14.8807V12.4022H18.6649C19.7712 12.4022 20.6682 13.3282 20.6682 14.4692C20.6682 15.6101 19.7712 16.5361 18.6649 16.5361Z"
        fill="#4C67FF"
      />
    </svg>
  );
};

export default P;
