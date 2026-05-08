import { SvgProps } from "@/types/svg";

const Shield = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2L4 5.5V12C4 15.5 7.5 20 12 22C16.5 21 20 15.5 20 12V5.5L12 2Z"
        stroke="#7388FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Shield;
