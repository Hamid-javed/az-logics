import { SvgProps } from "@/types/svg";

const Lock = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.2922 6.07787V4.68614C3.2922 2.38282 3.98806 0.510947 7.46739 0.510947C10.9467 0.510947 11.6426 2.38282 11.6426 4.68614V6.07787"
        stroke="currentColor"
        strokeWidth="1.02189"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.46741 11.9922C6.50662 11.9922 5.72774 11.2134 5.72774 10.2526C5.72774 9.29177 6.50662 8.5129 7.46741 8.5129C8.4282 8.5129 9.20707 9.29177 9.20707 10.2526C9.20707 11.2134 8.4282 11.9922 7.46741 11.9922Z"
        stroke="currentColor"
        strokeWidth="1.02189"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.99027 14.4277C1.20681 14.4277 0.510947 13.7319 0.510947 10.9484V9.55668C0.510947 6.77322 1.20681 6.07735 3.99027 6.07735H10.9489C13.7324 6.07735 14.4283 6.77322 14.4283 9.55668V10.9484C14.4283 13.7319 13.7324 14.4277 10.9489 14.4277H3.99027Z"
        stroke="currentColor"
        strokeWidth="1.02189"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Lock;
