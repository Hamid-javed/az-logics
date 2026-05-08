import { SvgProps } from "@/types/svg";

const Enter = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.14236 7.71573L0.56897 4.14234L4.14236 0.568947"
        stroke="black"
        strokeWidth="1.13789"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.56897 4.14317H10.3958C11.3435 4.14317 12.2524 4.51965 12.9226 5.18979C13.5927 5.85993 13.9692 6.76884 13.9692 7.71656C13.9692 8.66428 13.5927 9.57319 12.9226 10.2433C12.2524 10.9135 11.3435 11.29 10.3958 11.29H9.50245"
        stroke="black"
        strokeWidth="1.13789"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Enter;
