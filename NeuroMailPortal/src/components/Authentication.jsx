import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Authentication() {
  const [page, setPage] = useState("login");
  return (
    <>
      <div className="w-[1206px] flex">
        <div
          className="h-[627.73px] w-[50%] rounded-[14.13px] flex flex-col justify-center items-center"
          style={{
            backgroundImage: 'url("loginbg.svg")',
            backgroundPosition: "center",
          }}
        >
          <AuthSection page={page} />
        </div>
        <div className="bg-[#F1F5FA] h-[627.73px] w-[50%] rounded-[14.13px] flex flex-col items-center justify-center">
          {page === "login" ? (
            <Login setPage={setPage} />
          ) : (
            <Register setPage={setPage} />
          )}
        </div>
      </div>
    </>
  );
}

export default Authentication;

function AuthSection({ page }) {
  const isLogin = page === "login";
  return (
    <div className="w-[486px] h-[68.71px] gap-[4.71px] flex flex-col text-start">
      <p className="text-[28px] text-white leading-[37.69px]">
        {isLogin
          ? "Login to Neuromail Account"
          : "Create Your Neuromail Account"}
      </p>
      <p className="text-[18px] text-[#CBD5E2] font-sans leading-[26px] font-[400]">
        {isLogin
          ? "Login to your account with seed, we do the heavy lifting in a no-nonsense, ad-free, tracker-free, and cloud-free manner. Free and open source."
          : "Register with seed"}
      </p>
    </div>
  );
}
