import { SvgProps } from "@/types/svg";

const Hamburger = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="23"
      viewBox="0 0 30 23"
      fill="none"
      className={className}
    >
      <path d="M0.5 0.5H29.2623" stroke="white" strokeLinecap="round" />
      <path d="M0.5 11.2012H29.2623" stroke="white" strokeLinecap="round" />
      <path d="M0.5 21.9023H29.2623" stroke="white" strokeLinecap="round" />
    </svg>
  );
};

export default Hamburger;
