const Upload = () => {
  return (
    <svg
      width="38"
      height="39"
      viewBox="0 0 38 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[25px] h-[25px] md:w-[38px] md:h-[39px]"
    >
      <circle
        cx="18.6258"
        cy="19.4818"
        r="18.6024"
        fill="url(#paint0_linear_0_1)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.6267 14.062C18.7771 14.062 18.9214 14.1218 19.0277 14.2281C19.1341 14.3345 19.1939 14.4788 19.1939 14.6292V20.1118H24.6765C24.8269 20.1118 24.9712 20.1715 25.0775 20.2779C25.1839 20.3843 25.2436 20.5285 25.2436 20.6789C25.2436 20.8294 25.1839 20.9736 25.0775 21.08C24.9712 21.1864 24.8269 21.2461 24.6765 21.2461H19.1939V26.7287C19.1939 26.8791 19.1341 27.0234 19.0277 27.1298C18.9214 27.2361 18.7771 27.2959 18.6267 27.2959C18.4763 27.2959 18.332 27.2361 18.2257 27.1298C18.1193 27.0234 18.0595 26.8791 18.0595 26.7287V21.2461H12.5769C12.4265 21.2461 12.2822 21.1864 12.1759 21.08C12.0695 20.9736 12.0098 20.8294 12.0098 20.6789C12.0098 20.5285 12.0695 20.3843 12.1759 20.2779C12.2822 20.1715 12.4265 20.1118 12.5769 20.1118H18.0595V14.6292C18.0595 14.4788 18.1193 14.3345 18.2257 14.2281C18.332 14.1218 18.4763 14.062 18.6267 14.062Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_1"
          x1="18.6258"
          y1="0.879395"
          x2="18.6258"
          y2="38.0842"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3B82FF" />
          <stop offset="1" stop-color="#6761FE" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export const ImgIcon = () => {
  return (
    <svg
      width="64"
      height="63"
      viewBox="0 0 64 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.824219"
        y="0.101135"
        width="62.6094"
        height="62.6094"
        rx="12"
        fill="white"
      />
      <path
        d="M24.3789 41.7392H39.8789M32.1289 21.0725V36.5725M32.1289 36.5725L36.6497 32.0517M32.1289 36.5725L27.6081 32.0517"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const LogoIcon = () => {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.6841 16.4419L20.6971 19.8836C20.5115 20.2048 20.2508 20.4763 19.9373 20.6747C19.6238 20.8731 19.2669 20.9926 18.8971 21.0228L18.709 21.0308H5.46203C5.17523 21.03 4.90143 20.9792 4.64063 20.8782L4.45133 20.7956L6.96374 16.4419H22.6841ZM8.15915 0.769767L10.761 5.27719L2.90259 18.8901L0.824975 15.2947C0.623596 14.9459 0.517578 14.5502 0.517578 14.1475C0.517578 13.7447 0.623596 13.3491 0.824975 13.0003L7.44902 1.52808C7.62798 1.21833 7.87234 0.961353 8.15915 0.769767ZM14.735 0.38086C15.106 0.380671 15.4715 0.47044 15.8002 0.642473C16.1288 0.814507 16.4109 1.06367 16.6222 1.36862L16.7208 1.52808L23.3449 13.0003C23.5158 13.2963 23.6156 13.6198 23.6432 13.9502L23.6523 14.1475H18.5312L10.5832 0.38086H14.735ZM12.0861 7.57163L15.8834 14.1475H8.28878L12.0861 7.57163Z"
        fill="url(#paint0_linear_2382_99817)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2382_99817"
          x1="12.085"
          y1="0.380859"
          x2="12.085"
          y2="21.0308"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C441F4" />
          <stop offset="1" stop-color="#00DAEA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Copy = ({ filled = false }) => {
  return (
    <svg
      width="58"
      height="49"
      viewBox="0 0 58 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[45px] h-[37px] md:w-[58px] md:h-[49px]"
    >
      {/* Background */}
      <rect
        x="0.4"
        y="1"
        width="56.7"
        height="47.8"
        rx="9.07"
        fill={filled ? "url(#paintFilled)" : "url(#paintOutline)"}
      />

      {/* Inner Copy Shapes */}
      <path
        d="M23.8 23.9C23.8 21 23.8 19.6 24.6 18.8C25.5 17.9 26.9 17.9 29.8 17.9H32.8C35.6 17.9 37 17.9 37.9 18.8C38.8 19.6 38.8 21 38.8 23.9V28.9C38.8 31.7 38.8 33.1 37.9 34C37 34.9 35.6 34.9 32.8 34.9H29.8C26.9 34.9 25.5 34.9 24.6 34C23.8 33.1 23.8 31.7 23.8 28.9V23.9Z"
        stroke="white"
        strokeWidth="1.5"
        fill={filled ? "white" : "none"}
      />
      <path
        d="M23.8 31.9C23 31.9 22.2 31.6 21.6 31C21.1 30.4 20.8 29.7 20.8 28.9V22.9C20.8 19.1 20.8 17.2 21.9 16C23.1 14.9 25 14.9 28.8 14.9H32.8C33.6 14.9 34.3 15.2 34.9 15.8C35.4 16.3 35.8 17.1 35.8 17.9"
        stroke="white"
        strokeWidth="1.5"
        fill={filled ? "white" : "none"}
      />

      <defs>
        <linearGradient
          id="paintOutline"
          x1="28.8"
          y1="1"
          x2="28.8"
          y2="48.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#77AAFF" />
          <stop offset="1" stopColor="#3E85FF" />
        </linearGradient>

        <linearGradient
          id="paintFilled"
          x1="28.8"
          y1="1"
          x2="28.8"
          y2="48.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3E85FF" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Upload;
