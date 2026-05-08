import { SvgProps } from "@/types/svg";

const Cursor = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      className={className}
    >
      <path
        d="M0.229986 3.95612C-0.624905 1.94013 1.02316 -0.24531 3.1965 0.0223248L17.0424 1.72737C19.6791 2.05207 20.4711 5.49311 18.2417 6.93782L13.7519 9.8472C13.1897 10.2116 12.7741 10.7627 12.5784 11.4035L11.0157 16.5199C10.2396 19.0606 6.71346 19.2453 5.6763 16.7995L0.229986 3.95612Z"
        fill="url(#paint0_linear_114_5)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_114_5"
          x1="5.88512"
          y1="4.18881"
          x2="14.9672"
          y2="13.6594"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C67FF" />
          <stop offset="1" stopColor="#112762" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Cursor;
