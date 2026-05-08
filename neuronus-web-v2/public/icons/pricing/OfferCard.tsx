import { SvgProps } from "@/types/svg";

const OfferCard = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="681"
      height="625"
      viewBox="0 0 681 625"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_f_12_63)">
        <ellipse
          cx="171.908"
          cy="151.617"
          rx="82.3112"
          ry="62.0205"
          fill="#4C67FF"
        />
      </g>
      <path
        d="M648.155 0.563614C665.829 0.563614 680.155 14.8905 680.155 32.5636V592.561C680.155 610.234 665.828 624.561 648.155 624.561H100.357C82.6835 624.561 68.3566 610.234 68.3566 592.561V187.088C68.3566 162.788 88.056 143.088 112.357 143.088H151.403C170.733 143.088 186.403 127.418 186.403 108.088V58.964C186.403 39.634 170.733 23.964 151.403 23.964H111.09C90.202 23.964 79.4688 0.563614 100.357 0.563614H648.155Z"
        fill="#00113E"
      />
      <mask
        id="mask0_12_63"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="68"
        y="0"
        width="613"
        height="625"
      >
        <path
          d="M648.155 0.563614C665.829 0.563614 680.155 14.8905 680.155 32.5636V592.561C680.155 610.234 665.828 624.561 648.155 624.561H100.357C82.6835 624.561 68.3566 610.234 68.3566 592.561V187.088C68.3566 162.788 88.056 143.088 112.357 143.088H151.403C170.733 143.088 186.403 127.418 186.403 108.088V58.964C186.403 39.634 170.733 23.964 151.403 23.964H111.09C90.202 23.964 79.4688 0.563614 100.357 0.563614H648.155Z"
          fill="#00113E"
        />
      </mask>
      <g mask="url(#mask0_12_63)">
        <g filter="url(#filter1_f_12_63)">
          <ellipse
            cx="416.22"
            cy="632.059"
            rx="359.076"
            ry="270.56"
            fill="#4C67FF"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_12_63"
          x="-1.52588e-05"
          y="0"
          width="343.816"
          height="303.235"
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
            stdDeviation="44.7984"
            result="effect1_foregroundBlur_12_63"
          />
        </filter>
        <filter
          id="filter1_f_12_63"
          x="-142.856"
          y="161.499"
          width="1118.15"
          height="941.119"
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
            stdDeviation="100"
            result="effect1_foregroundBlur_12_63"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default OfferCard;
