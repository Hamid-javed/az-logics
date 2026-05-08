import { useEffect, useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Authentication() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, emailData } = useAuth();

  const [page, setPage] = useState(
    location.pathname === "/register" ? "login" : "login"
  );

  useEffect(() => {
    setPage(location.pathname === "/register" ? "login" : "login");
  }, [location.pathname]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(newPage === "login" ? "/login" : "/login");
  };

  if (isAuthenticated && emailData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      <div className="flex-col gap-[20px] h-screen mq1100:gap-[20px] w-[100vw] justify-center items-center py-3 desktop-view-table authentication-page xs:hidden sm:hidden md:flex lg:flex ">
        <div className="flex justify-center h-[7%] mb-1 w-full">
          <img src="logoName.svg" className="h-[120%]" />
        </div>
        <div className="w-[90%] h-[90%] flex">
          <div
            className="h-full w-[50%] rounded-[14.13px] flex flex-col justify-center items-center"
            style={{
              backgroundImage: 'url("loginbg.svg")',
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <AuthSection page={page} />
          </div>
          <div className="bg-[#F1F5FA] h-full w-[50%] rounded-[14.13px] flex flex-col items-center justify-center">
            {page === "login" ? (
              <Login setPage={() => handlePageChange("register")} />
            ) : (
              <Register setPage={() => handlePageChange("login")} />
            )}
          </div>
        </div>
        <div className="flex flex-col text-[18px] text-center  h-[5%] mb-1 leading-[24px]">
          <h1 className="text-[#000000]">©Neuronus</h1>
          <p className="text-[#768EA7]">v2.23.21</p>
        </div>
      </div>

      <div className=" xs:flex  sm:flex md:hidden lg:hidden">
        <div
          className="w-[100vw] h-screen pt-20 pb-6 gap-[20px] flex flex-col items-center bg-cover bg-center"
          style={{
            backgroundImage: 'url("MobileBg.svg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img src="mobilelogo.svg" />
          <AuthSection page={page} />
          <div className="bg-[#F1F5FA] pb-[50px] w-[346px] rounded-[22px] flex flex-col items-center justify-start mt-7">
            {page === "login" ? (
              <Login setPage={() => handlePageChange("register")} />
            ) : (
              <Register setPage={() => handlePageChange("login")} />
            )}
          </div>
          <div className="flex flex-col text-center text-[12px] leading-[17px]">
            <h1 className="text-white">©Neuronus</h1>
            <p className="text-[#768EA7]">v2.23.21</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;

function AuthSection({ page }) {
  const isLogin = page === "login";
  return (
    <div className="w-[380px] mq1100:w-[486px] h-[68.71px] gap-[4.71px] flex flex-col text-center items-center md:text-start md:items-start">
      <p className="text-[18px] md:text-[28px] text-white leading-[37.69px]">
        {isLogin ? "Login Neuromail Account" : "Create Your Neuromail Account"}
      </p>
      <p className="w-[350px] md:w-[380px] mq1100:w-[486px] text-[12px] md:text-[18px] text-[#CBD5E2] font-sans leading-[14.52px] md:leading-[26px] font-[400]">
        {isLogin
          ? "Login to your account with seed, we do the heavy lifting in a no-nonsense, ad-free, tracker-free, and cloud-free manner. Free and open source."
          : "Register with seed"}
      </p>
    </div>
  );
}
