import { SvgProps } from "@/types/svg";

const Views = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="19"
      height="8"
      viewBox="0 0 19 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.65492 7.42829C1.29783 7.42829 0.510986 5.69895 0.510986 3.96962C0.510986 2.24028 1.29783 0.510948 3.65492 0.510948C6.79971 0.510948 11.5156 7.42829 14.6604 7.42829C17.0175 7.42829 17.8043 5.69895 17.8043 3.96962C17.8043 2.24028 17.0175 0.510948 14.6604 0.510948C11.5156 0.510948 6.79971 7.42829 3.65492 7.42829Z"
        stroke="black"
        strokeWidth="1.02189"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Views;
