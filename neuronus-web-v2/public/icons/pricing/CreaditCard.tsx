import { SvgProps } from "@/types/svg";

const CreaditCard = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      className={className}
    >
      <path
        d="M7.5625 13.125H13.0625M2.0625 8.53125H19.9375M15.8125 13.125H17.1875M3.4375 4.59375C2.75 4.59375 2.0625 5.25 2.0625 5.90625V15.0938C2.0625 15.75 2.75 16.4062 3.4375 16.4062H18.5625C19.25 16.4062 19.9375 15.75 19.9375 15.0938V5.90625C19.9375 5.25 19.25 4.59375 18.5625 4.59375H3.4375Z"
        stroke="black"
        strokeOpacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CreaditCard;
