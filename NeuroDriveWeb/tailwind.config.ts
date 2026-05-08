import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      chakra: ["var(--font-chakra)", "sans-serif"],
      inter: ["var(--font-inter)", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
         },
      backgroundImage: {
        "btn": "linear-gradient(180deg, #77AAFF 0%, #3E85FF 100%)",
        "background": "linear-gradient(180deg, #1D203E 0%, #4D55A4 100%)",
        "sideimagebg": "linear-gradient(143.97deg, #1D203E 14.84%, #4D55A4 103.34%)",
        "image": "url('/bg.svg')",
        "image1": "url('/dots.svg')",
        "image2": "url('/bg1.png')",
        "image3": "url('/bg3.png')",
        "gradient": "linear-gradient(89.75deg, #6860FE 0.22%, #8C44FD 14.65%, #B325FC 26.02%, #3984FF 35.76%)",
        "gradient1": "linear-gradient(90deg, #3983FF 0%, #6860FE 30%, #8C44FD 70%, #B325FC 100%)",
        "cardsbg": "linear-gradient(169.43deg, #1D203E 10.31%, #4D55A4 90.36%)",
      },
      borderColor:{
        "btn": "linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)",
      }
    },
  },
  plugins: [],
} satisfies Config;
