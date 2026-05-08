import {Cross} from "../Icons"
function MyWallet({ close }) {
  return (
    <section className="fixed inset-0 md:inset-auto flex md:block justify-center items-center bg-[#00000099] md:bg-[#00000000] z-50">
      <div className="bg-[#EAEEF5] text-[#333333] z-20 shadow-[#FFFFFF1A] md:shadow-lg p-3 w-[340px] md:w-[233px] max-h-[475px] md:max-h-[324px] font-sans overflow-y-auto rounded-[15.39px] absolute md:left-[-50px] md:top-[12px]">
        <div className="flex justify-between border-b pb-2 border-[#F1F5FA] items-center">
          <p className="text-[16px] md:text-[11px] font-[700] md:font-[600]">
            My Wallets
          </p>
          <button onClick={close} className="text-gray-500 hover:text-gray-700">
            <Cross className={"w-[11px] h-[12px]"}/>
          </button>
        </div>
        <div className="w-[300px] md:w-[200px] h-[77px] md:h-[53px] border-b border-[#F1F5FA]  flex items-center justify-start">
          <div className="md:w-[43px] md:h-[43px] w-[63px] h-[63px] bg-white rounded-full flex justify-center items-center">
            <img
              src="/image.svg"
              className="md:w-[33px] md:h-[33px] w-[49px] h-[49px] rounded-full object-cover"
            />
          </div>
          <span className="text-start ml-3">
            <p className="text-[14px] md:text-[9px] font-[700] md:font-[600]">
              Wallet Name here
            </p>
            <p className="text-[#7A7A7A] text-[14px] md:text-[8px]">0 ETH</p>
          </span>
        </div>
        <div className="w-[300px] md:w-[200px] h-[77px] md:h-[53px] border-b border-[#F1F5FA]  flex items-center justify-start">
          <div className="md:w-[43px] md:h-[43px] w-[63px] h-[63px] bg-white rounded-full flex justify-center items-center">
            <img
              src="/image.svg"
              className="md:w-[33px] md:h-[33px] w-[49px] h-[49px] rounded-full object-cover"
            />
          </div>
          <span className="text-start ml-3">
            <p className="text-[14px] md:text-[9px] font-[700] md:font-[600]">
              Wallet Name here
            </p>
            <p className="text-[#7A7A7A] text-[14px] md:text-[8px]">0 ETH</p>
          </span>
        </div>
        <div className="w-[300px] md:w-[200px] h-[77px] md:h-[53px] border-b border-[#F1F5FA]  flex items-center justify-start">
          <div className="md:w-[43px] md:h-[43px] w-[63px] h-[63px] bg-white rounded-full flex justify-center items-center">
            <img
              src="/image.svg"
              className="md:w-[33px] md:h-[33px] w-[49px] h-[49px] rounded-full object-cover"
            />
          </div>
          <span className="text-start ml-3">
            <p className="text-[14px] md:text-[9px] font-[700] md:font-[600]">
              Wallet Name here
            </p>
            <p className="text-[#7A7A7A] text-[14px] md:text-[8px]">0 ETH</p>
          </span>
        </div>
        <div className="w-[300px] md:w-[200px] h-[77px] md:h-[53px] border-b border-[#F1F5FA]  flex items-center justify-start">
          <div className="md:w-[43px] md:h-[43px] w-[63px] h-[63px] bg-white rounded-full flex justify-center items-center">
            <img
              src="/image.svg"
              className="md:w-[33px] md:h-[33px] w-[49px] h-[49px] rounded-full object-cover"
            />
          </div>
          <span className="text-start ml-3">
            <p className="text-[14px] md:text-[9px] font-[700] md:font-[600]">
              Wallet Name here
            </p>
            <p className="text-[#7A7A7A] text-[14px] md:text-[8px]">0 ETH</p>
          </span>
        </div>

        <div className="flex gap-3 items-center mt-2">
          <Newwallet className={"w-[24px] h-[24px] md:w-[17px] md:h-[17px]"} />
          <p className="text-[14px] md:text-[8px]">Add New Wallet</p>
        </div>
      </div>
    </section>
  );
}

export default MyWallet;

const Newwallet = ({ className }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="8.39042" cy="8.46842" r="8.3964" fill="#F8FBFD" />
    <path
      d="M8.05656 10.9149V5.66711H8.94708V10.9149H8.05656ZM5.87795 8.73625V7.84572H11.1257V8.73625H5.87795Z"
      fill="#0173D2"
    />
  </svg>
);

const Line = () => (
  <svg
    width="233"
    height="1"
    viewBox="0 0 233 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.699707 0.585693L233 0.585673"
      stroke="#F1F5FA"
      stroke-width="0.6997"
      stroke-linecap="round"
    />
  </svg>
);
