import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { setIsAuthHubVisible } = useAuth();
  return (
    <header className="z-1000 relative bg-[linear-gradient(352deg,_rgba(14, 26, 96, 0.00)_4.12%,_#0E1A60_72.05%)]">
      <section>
        <nav className="pt-[14px] mq2000:pt-[28px] pb-[11px] px-[10px] sm:px-[35px] gradient-border flex sm:justify-between sm:items-center ">
          <Link to="/" className="flex items-center gap-[6px] md:gap-[15px]">
            <img
              src="/newLogo.svg"
              className="cursor-pointer mq2000:w-[100px] w-10 md:w-full ml-4 md:ml-0"
            />
            <h2 className="md:text-[20px] mq2000:text-[35px] xs:font-medium xs:pb-2 text-[15px] md:font-normal text-white whitespace-nowrap">
              Password Manager
            </h2>
          </Link>
          <div className="justify-end w-full md:items-center md:gap-[95px] flex">
            {/* <button className="dm-sans outline-none cursor-pointer border-none text-[20px] leading-[26px] font-[400] text-white">
              Download
            </button> */}
            <div className="flex items-center gap-[20px]">
              <div
                onClick={() => setIsAuthHubVisible(true)}
                className="w-[157px] h-[54.99px]  mq2000:w-[250px] mq2000:h-[100px] bg-white cursor-pointer hover:bg-[#e7e7e7] text-[#002550] border-[0.8px] border-[#FFFFFF] rounded-[14px] hidden md:flex justify-center items-center"
              >
                <button
                  // to="/auth/register"
                  className="dm-sans outline-none text-[20px] mq2000:text-[38px] whitespace-nowrap leading-[26px] font-[400]"
                >
                  Sign Up
                </button>
              </div>

              <div onClick={() => setIsAuthHubVisible(true)} className="w-[90px] md:w-[157px] cursor-pointer h-[40px] md:h-[54.99px] bg-white md:bg-transparent mq2000:w-[250px] mq2000:h-[100px] border-white md:hover:bg-[#0e1a6163] border-[1px] border-[linear-gradient(175.15deg, #FFFFFF 10.76%, rgba(255, 255, 255, 0) 55.66%, rgba(255, 255, 255, 0.28) 95.49%)] rounded-[14px] flex justify-center items-center">
                <button
                  // to="/auth/login"
                  className="dm-sans outline-none cursor-pointer text-[18px] md:text-[20px] mq2000:text-[38px] leading-[26px] font-[400] text-[#050e45]  md:text-white"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          {/*
            <img
              src="/hamburger.svg"
              className="sm:block md:hidden cursor-pointer"
              onClick={toggleMenu}
              alt="Menu"
            />
           "1px solid white", borderRadius: "5px" }}
            >
            */}

        </nav>
      </section>
    </header>
  );
}

export default Navbar;
