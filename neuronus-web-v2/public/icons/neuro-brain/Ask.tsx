import { SvgProps } from "@/types/svg";

const Ask = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      className={className}
    >
      <path
        d="M16.5 29.3346C24.0941 29.3346 30.25 23.3653 30.25 16.0013C30.25 8.6373 24.0941 2.66797 16.5 2.66797C8.90588 2.66797 2.75 8.6373 2.75 16.0013C2.75 23.3653 8.90588 29.3346 16.5 29.3346Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.375 12C12.375 7.33333 19.9375 7.33333 19.9375 12C19.9375 15.3333 16.5 14.6667 16.5 18.6667M16.5 24.0133L16.5138 23.9987"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Ask;
