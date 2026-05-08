import { SvgProps } from "@/types/svg";

const Clock = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.96229 17.5425C3.84917 17.5425 0.510986 14.2043 0.510986 10.0912C0.510986 5.97804 3.84917 2.63985 7.96229 2.63985C12.0754 2.63985 15.4136 5.97804 15.4136 10.0912C15.4136 14.2043 12.0754 17.5425 7.96229 17.5425Z"
        stroke="black"
        strokeWidth="1.02189"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.96216 5.62032V9.87821"
        stroke="black"
        strokeWidth="1.02189"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.40747 0.510948H10.5169"
        stroke="black"
        strokeWidth="1.02189"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Clock;
