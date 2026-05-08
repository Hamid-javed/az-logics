import { SvgProps } from "@/types/svg";

const LinkedIn = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.473944 25.277H5.21339V7.74109H0.473944V25.277ZM2.84367 0C1.26385 0 0 1.26385 0 2.84367C0 4.42348 1.26385 5.68733 2.84367 5.68733C4.42348 5.68733 5.68733 4.42348 5.68733 2.84367C5.68733 1.26385 4.42348 0 2.84367 0ZM13.2704 10.4268V7.74109H8.531V25.277H13.2704V16.2721C13.2704 11.2167 19.7477 10.9007 19.7477 16.2721V25.277H24.4871V14.5343C24.4871 6.00329 15.4822 6.31926 13.2704 10.4268Z"
        fill="white"
      />
    </svg>
  );
};

export default LinkedIn;
