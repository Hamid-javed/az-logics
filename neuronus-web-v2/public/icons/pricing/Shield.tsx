import { SvgProps } from "@/types/svg";
import React from "react";

const Shield = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="45"
      viewBox="0 0 44 45"
      fill="none"
      className={className}
    >
      <path
        d="M23.0229 5.59255C22.3558 5.36166 21.633 5.36166 20.9659 5.59255L8.54325 9.89568C8.13862 10.0301 7.78126 10.2826 7.51513 10.622C7.24901 10.9615 7.08573 11.3732 7.04541 11.8063C6.42758 19.7301 7.50008 25.5894 10.0466 30.0163C12.5106 34.3007 16.4522 37.415 21.9944 39.7363C27.5421 37.415 31.4874 34.3007 33.9514 30.0163C36.4997 25.5913 37.5722 19.7301 36.9544 11.8063C36.9141 11.3732 36.7508 10.9615 36.4847 10.622C36.2186 10.2826 35.8612 10.0301 35.4566 9.89568L23.0229 5.59255ZM20.0841 2.93005C21.3229 2.50052 22.6655 2.49986 23.9047 2.92818L36.3384 7.2313C37.2517 7.54238 38.056 8.12001 38.6522 8.89299C39.2484 9.66596 39.6103 10.6005 39.6934 11.5813C40.3406 19.8501 39.2534 26.3488 36.3219 31.4432C33.3812 36.5525 28.6934 40.0644 22.4986 42.5601C22.1746 42.6906 21.8142 42.6906 21.4902 42.5601C15.3009 40.0644 10.6149 36.5525 7.67608 31.4432C4.74641 26.3488 3.65925 19.8482 4.30458 11.5813C4.38767 10.6005 4.74961 9.66596 5.34578 8.89299C5.94195 8.12001 6.74627 7.54238 7.65958 7.2313L20.0841 2.93005Z"
        fill="url(#paint0_linear_4_50952)"
      />
      <path
        opacity="0.5"
        d="M22 37.4998C31.2253 33.6748 35.5777 26.966 34.7288 14.3116C34.6335 12.8735 33.6728 11.6566 32.34 11.1823L23.5033 8.03602C23.02 7.8639 22.5118 7.77581 22 7.77539V37.4998Z"
        fill="url(#paint1_linear_4_50952)"
      />
      <path
        d="M41.7656 1.79102L3.7832 41.9153"
        stroke="url(#paint2_linear_4_50952)"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4_50952"
          x1="21.9994"
          y1="2.60742"
          x2="21.9994"
          y2="42.658"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C67FF" />
          <stop offset="1" stopColor="#2E3E99" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4_50952"
          x1="28.4165"
          y1="7.77539"
          x2="28.4165"
          y2="37.4998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C67FF" />
          <stop offset="1" stopColor="#2E3E99" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4_50952"
          x1="22.7744"
          y1="1.79102"
          x2="22.7744"
          y2="41.9153"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C67FF" />
          <stop offset="1" stopColor="#2E3E99" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Shield;
