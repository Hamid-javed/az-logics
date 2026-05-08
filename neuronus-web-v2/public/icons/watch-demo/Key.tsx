import { SvgProps } from "@/types/svg";

const Key = ({ className = "" }: SvgProps) => {
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
        d="M17.2793 10.4498L20.9993 6.72974L17.2793 3.00977"
        stroke="#4C67FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6.73047H21"
        stroke="#4C67FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.71997 13.5488L3 17.2689L6.71997 20.9888"
        stroke="#4C67FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 17.2695H3"
        stroke="#4C67FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Key;
