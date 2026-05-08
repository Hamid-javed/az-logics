import { SvgProps } from "@/types/svg";

const X = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={className}
    >
      <path
        d="M8.55762 8.55762L0.5 0.5M8.55762 0.5L0.5 8.55762"
        stroke="#FF592C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default X;
