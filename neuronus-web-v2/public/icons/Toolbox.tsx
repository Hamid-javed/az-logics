import { SvgProps } from "@/types/svg";

const Toolbox = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.417 11.25H20.5837C22.7503 11.25 23.8337 10.125 23.8337 7.875V5.625C23.8337 3.375 22.7503 2.25 20.5837 2.25H18.417C16.2503 2.25 15.167 3.375 15.167 5.625V7.875C15.167 10.125 16.2503 11.25 18.417 11.25Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.41699 24.75H7.58366C9.75032 24.75 10.8337 23.625 10.8337 21.375V19.125C10.8337 16.875 9.75032 15.75 7.58366 15.75H5.41699C3.25033 15.75 2.16699 16.875 2.16699 19.125V21.375C2.16699 23.625 3.25033 24.75 5.41699 24.75Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50033 11.25C8.89356 11.25 10.8337 9.23528 10.8337 6.75C10.8337 4.26472 8.89356 2.25 6.50033 2.25C4.10709 2.25 2.16699 4.26472 2.16699 6.75C2.16699 9.23528 4.10709 11.25 6.50033 11.25Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5003 24.75C21.8936 24.75 23.8337 22.7353 23.8337 20.25C23.8337 17.7647 21.8936 15.75 19.5003 15.75C17.1071 15.75 15.167 17.7647 15.167 20.25C15.167 22.7353 17.1071 24.75 19.5003 24.75Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Toolbox;
