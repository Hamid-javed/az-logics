import { SvgProps } from "@/types/svg";

const XFile = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.3909 0H2.24077C1.01444 0 0 1.00922 0 2.23555V17.6479C0 18.8742 1.01444 19.8834 2.24077 19.8834H13.3028C14.5291 19.8834 15.5433 18.8742 15.5433 17.6479V5.40484L10.3909 0Z"
        fill="#4C67FF"
      />
      <path
        d="M10.4199 0.0136719L15.5523 5.40832H12.1357C11.187 5.40832 10.4199 4.64133 10.4199 3.69267V0.0136719Z"
        fill="#C1CAFF"
      />
      <path
        d="M6.06484 7.18388L7.63563 9.86447L9.20643 7.18388H10.3674L8.25029 10.4621L10.3674 13.7402H9.20643L7.63563 11.1962L6.06484 13.7402H4.90382L6.98683 10.4621L4.90382 7.18388H6.06484Z"
        fill="white"
      />
    </svg>
  );
};

export default XFile;
