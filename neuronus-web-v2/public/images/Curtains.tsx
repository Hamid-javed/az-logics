import { SvgProps } from "@/types/svg";

const Curtains = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="1506"
      height="228"
      viewBox="0 0 1506 228"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto scale-150 md:scale-100 ${className}`}
    >
      <g filter="url(#filter0_f_91_35)">
        <path
          d="M796.528 36.1875H706.395C706.395 36.1875 670.84 65.193 643.439 81.309C600.985 106.278 572.513 118.234 519.497 134.776C457.964 153.975 417.482 157.184 350.167 167.678C222.296 187.615 15 196.468 15 196.468H1490.92C1472.24 196.45 1170.21 195.314 1008.28 140.945C914.461 109.444 796.528 36.1875 796.528 36.1875Z"
          fill="#4864FF"
          fillOpacity="0.26"
        />
      </g>
      <g filter="url(#filter1_f_91_35)">
        <path
          d="M639.741 117.07C679.68 83.6431 721.95 19 721.95 19H790.21C790.21 19 824.717 75.0775 857.662 105.841C881.318 127.932 895.145 140.795 926.151 157.497C964.797 178.313 992.107 184.741 1038.22 194.928C1096.63 207.83 1191.2 208.385 1203.03 208.403H1204.26C1204.26 208.403 1203.84 208.405 1203.03 208.403H442.574C442.574 208.403 579.998 167.072 639.741 117.07Z"
          fill="url(#paint0_linear_91_35)"
        />
      </g>
      <g filter="url(#filter2_f_91_35)">
        <path
          d="M783.037 90.8477H722.35C722.35 90.8477 691.746 130.158 670.332 154.328C651.16 175.968 619.037 208.404 619.037 208.404H887.794C887.794 208.404 853.385 176.316 833.609 154.328C812.166 130.487 783.037 90.8477 783.037 90.8477Z"
          fill="url(#paint1_linear_91_35)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_91_35"
          x="0"
          y="21.1875"
          width="1505.92"
          height="190.281"
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
            stdDeviation="7.5"
            result="effect1_foregroundBlur_91_35"
          />
        </filter>
        <filter
          id="filter1_f_91_35"
          x="423.574"
          y="0"
          width="799.685"
          height="227.404"
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
            stdDeviation="9.5"
            result="effect1_foregroundBlur_91_35"
          />
        </filter>
        <filter
          id="filter2_f_91_35"
          x="613.037"
          y="84.8477"
          width="280.757"
          height="129.556"
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
            stdDeviation="3"
            result="effect1_foregroundBlur_91_35"
          />
        </filter>
        <linearGradient
          id="paint0_linear_91_35"
          x1="823.417"
          y1="19"
          x2="823.417"
          y2="208.404"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#445CE7" />
          <stop offset="1" stopColor="#192DA0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_91_35"
          x1="753.415"
          y1="90.8477"
          x2="753.415"
          y2="154.258"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#324ACB" />
          <stop offset="1" stopColor="#1D32A8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Curtains;
