import { SvgProps } from "@/types/svg";

const Passwords = ({ className = "" }: SvgProps) => {
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
        d="M19.7906 14.9303C17.7306 16.9803 14.7806 17.6103 12.1906 16.8003L7.48063 21.5003C7.14063 21.8503 6.47063 22.0603 5.99063 21.9903L3.81063 21.6903C3.09063 21.5903 2.42063 20.9103 2.31063 20.1903L2.01063 18.0103C1.94063 17.5303 2.17063 16.8603 2.50063 16.5203L7.20063 11.8203C6.40063 9.22031 7.02063 6.27031 9.08063 4.22031C12.0306 1.27031 16.8206 1.27031 19.7806 4.22031C22.7406 7.17031 22.7406 11.9803 19.7906 14.9303Z"
        stroke="#4C67FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.89062 17.4902L9.19062 19.7902"
        stroke="#4C67FF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z"
        stroke="#4C67FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Passwords;
