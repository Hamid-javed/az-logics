import { SvgProps } from "@/types/svg";

const Tick = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      className={className}
    >
      <path
        d="M0.462402 5.08608L2.61989 7.24357L9.09236 0.462891"
        stroke="#4CA154"
        strokeWidth="0.924638"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Tick;
