import { SvgProps } from "@/types/svg";

const LockSwitch = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="78"
      height="54"
      viewBox="0 0 78 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="13.4121"
        y="7.61816"
        width="63.7695"
        height="25.5088"
        rx="12.7544"
        fill="#D9E1FF"
      />
      <g filter="url(#filter0_f_4_32527)">
        <circle cx="26.5073" cy="26.5073" r="16.5073" fill="#697FFF" />
      </g>
      <circle cx="26.5073" cy="20.3726" r="16.0073" fill="#D9D9D9" />
      <circle
        cx="26.5073"
        cy="20.3726"
        r="16.0073"
        fill="url(#paint0_radial_4_32527)"
      />
      <circle
        cx="26.5073"
        cy="20.3726"
        r="16.0073"
        stroke="url(#paint1_linear_4_32527)"
      />
      <path
        d="M21.3203 18.6432V16.9146C21.3203 14.0536 22.1847 11.7285 26.5063 11.7285C30.828 11.7285 31.6924 14.0536 31.6924 16.9146V18.6432"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.5066 25.9906C25.3131 25.9906 24.3457 25.0232 24.3457 23.8298C24.3457 22.6364 25.3131 21.6689 26.5066 21.6689C27.7 21.6689 28.6674 22.6364 28.6674 23.8298C28.6674 25.0232 27.7 25.9906 26.5066 25.9906Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.185 29.0156C18.7276 29.0156 17.8633 28.1513 17.8633 24.6939V22.9653C17.8633 19.5079 18.7276 18.6436 22.185 18.6436H30.8284C34.2857 18.6436 35.1501 19.5079 35.1501 22.9653V24.6939C35.1501 28.1513 34.2857 29.0156 30.8284 29.0156H22.185Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_f_4_32527"
          x="0"
          y="0"
          width="53.0146"
          height="53.0146"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="5"
            result="effect1_foregroundBlur_4_32527"
          />
        </filter>
        <radialGradient
          id="paint0_radial_4_32527"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(14.3419 3.10867 -0.238519 14.3419 28.6727 10.6866)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2E3E99" />
          <stop offset="1" stopColor="#4C67FF" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_4_32527"
          x1="26.5073"
          y1="3.86523"
          x2="26.5073"
          y2="36.8799"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.519231" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LockSwitch;
