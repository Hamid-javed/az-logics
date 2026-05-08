import { SvgProps } from "@/types/svg";

const EncryptLocally = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="60"
      viewBox="0 0 62 60"
      fill="none"
      className={className}
    >
      <path
        d="M20.6667 24.375C18.8842 24.375 17.4375 25.775 17.4375 27.5V30.125C17.515 30.1 17.5667 30.075 17.6442 30.05C17.9542 29.9 18.29 29.8 18.6258 29.7C18.7808 29.65 18.9358 29.6 19.1167 29.55C19.6333 29.45 20.15 29.375 20.6925 29.375H41.3592C41.9017 29.375 42.4183 29.45 42.935 29.55C43.09 29.575 43.245 29.65 43.4258 29.7C43.7617 29.8 44.0975 29.9 44.4075 30.05C44.485 30.075 44.5625 30.1 44.6142 30.125V27.5C44.5625 25.775 43.1158 24.375 41.3333 24.375H20.6667Z"
        fill="url(#paint0_radial_39_2889)"
      />
      <path
        d="M20.6667 33.125C18.8842 33.125 17.4375 34.525 17.4375 36.25V37.5H24.5417C25.6008 37.5 26.4792 38.35 26.4792 39.375C26.4792 41.775 28.52 43.75 31 43.75C33.48 43.75 35.5208 41.775 35.5208 39.375C35.5208 38.35 36.3992 37.5 37.4583 37.5H44.5625V36.25C44.5625 34.525 43.1158 33.125 41.3333 33.125H20.6667Z"
        fill="url(#paint1_radial_39_2889)"
      />
      <path
        d="M20.6667 16.25C18.8842 16.25 17.4375 17.65 17.4375 19.375V21.4C18.4192 20.925 19.5042 20.625 20.6667 20.625H41.3333C42.4958 20.625 43.5808 20.925 44.5625 21.4V19.375C44.5625 17.65 43.1158 16.25 41.3333 16.25H20.6667Z"
        fill="url(#paint2_radial_39_2889)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1752 5C10.7718 5 5.16602 10.425 5.16602 19.525V40.45C5.16602 49.575 10.7718 55 20.1752 55H41.7977C51.201 55 56.8069 49.575 56.8069 40.475V19.525C56.8327 10.425 51.2269 5 41.8235 5H20.1752ZM46.4994 41.25H39.1627C38.2844 44.825 34.9519 47.5 30.9994 47.5C27.0469 47.5 23.7144 44.825 22.836 41.25H15.4993H12.916C11.8568 41.25 10.9785 40.4 10.9785 39.375C10.9785 38.35 11.8568 37.5 12.916 37.5H13.5618V36.25V35V27.5V19.375C13.5618 15.575 16.7393 12.5 20.666 12.5H41.3327C45.2594 12.5 48.4369 15.575 48.4369 19.375V27.5V35V36.25V37.5H49.0827C50.1419 37.5 51.0202 38.35 51.0202 39.375C51.0202 40.4 50.1419 41.25 49.0827 41.25H46.4994Z"
        fill="url(#paint3_radial_39_2889)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_39_2889"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31.0258 27.25) rotate(90) scale(2.875 13.5883)"
        >
          <stop offset="0.365385" stopColor="#3142A1" />
          <stop offset="1" stopColor="#5B73FF" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_39_2889"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31 38.4375) rotate(90) scale(5.3125 13.5625)"
        >
          <stop offset="0.365385" stopColor="#3142A1" />
          <stop offset="1" stopColor="#5B73FF" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_39_2889"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31 18.825) rotate(90) scale(2.575 13.5625)"
        >
          <stop offset="0.365385" stopColor="#3142A1" />
          <stop offset="1" stopColor="#5B73FF" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_39_2889"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(30.9865 30) rotate(90) scale(25 25.8205)"
        >
          <stop offset="0.365385" stopColor="#3142A1" />
          <stop offset="1" stopColor="#5B73FF" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default EncryptLocally;
