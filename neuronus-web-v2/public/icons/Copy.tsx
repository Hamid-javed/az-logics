import { SvgProps } from "@/types/svg";

const Copy = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      className={className}
    >
      <path
        d="M16.0648 3.93066H6.41124C5.04234 3.93066 3.93262 5.04038 3.93262 6.40929V16.0629C3.93262 17.4318 5.04234 18.5415 6.41124 18.5415H16.0648C17.4338 18.5415 18.5435 17.4318 18.5435 16.0629V6.40929C18.5435 5.04038 17.4338 3.93066 16.0648 3.93066Z"
        stroke="currentColor"
        strokeWidth="0.904519"
        strokeLinejoin="round"
      />
      <path
        d="M15.0413 3.93092L15.063 2.88729C15.0612 2.24202 14.804 1.62369 14.3477 1.16741C13.8915 0.711133 13.2731 0.453984 12.6279 0.452148H3.23517C2.49774 0.454328 1.79113 0.748238 1.26968 1.26968C0.748238 1.79113 0.454328 2.49774 0.452148 3.23517V12.6279C0.453984 13.2731 0.711133 13.8915 1.16741 14.3477C1.62369 14.804 2.24202 15.0612 2.88729 15.063H3.93092"
        stroke="currentColor"
        strokeWidth="0.904519"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Copy;
