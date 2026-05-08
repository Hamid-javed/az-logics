
import Link from "next/link";
import Animation from "./animation";


export default function EmailTracking() {
  return (
    <>
    <section id="get-products" className="hidden lg:flex relative h-[590px] justify-between items-center px-4 mx-5 mt-12 mb-9 bg-white py-16 sm:px-6 rounded-[33px]">
  
  {/* Background Image */}
  <div className="absolute inset-0 rounded-[33px] overflow-hidden">
    <img 
      src="email2.svg" 
      alt="Mobile background" 
      className="w-full h-full object-cover rounded-[33px]"
    />
  </div>


  {/* Text Content */}
  <div className="relative z-10 flex flex-col text-start max-w-[35%] pl-8">
    <h1 className="text-[44px] text-[#1D203E] font-extrabold leading-tight">
      Know Exactly Who&apos;s Read Your Email
    </h1>
    
    <p className="mt-4 text-[16px] sm:text-[14px] text-[#031B1D]">
      Stay in the loop with real-time email tracking! Neuro Mail lets you see exactly who&apos;s opened your email, keeping you informed and in control.
    </p>
    <Link href="https://mailing.neuromail.cloud">
    <button className="mt-11 bg-[#305EFF] text-white text-[14px] w-[159px] h-[47px] rounded-[9px] shadow-md">
      Get Started
    </button>
    </Link>
  </div>
  <div className="w-[60px] h-[60px] mt-[300px] ml-[90px]"><Animation className={"-mt-[340px] -ml-[100px]"} size={"w-[300px] h-[300px]"}/></div>
  {/* Floating Image */}
  <div className="relative z-50 flex justify-end w-full mt-5 ">
    <img src="email1.svg" alt="Email graphic" className="" />
  </div>
  
  <div className="absolute -mt-[300px] mx-[470px]">
  <img src="mini.svg" alt="" />
</div>
</section>

<section className="relative h-[560px] left-30  flex flex-col justify-center px-6 mx-auto mt-7  mb-2 max-w-[369px] lg:hidden bg-white py-16 sm:px-6 rounded-[17px] ">
  
  {/* Background Image */}
  <div className="absolute inset-0 rounded-[17px] flex-col  ">
    <img 
      src="/mbemail.svg" 
      alt="Mobile background" 
      className="w-[110%] h-full object-cover object-center rounded-[17px] ml-3"
    />
    {/* Dark Overlay for Better Readability */}
    <div className="absolute inset-6 w-[7vw] rounded-[73px]">
      <img src="mbviews.png" alt="" className="rounded-[63px]" />
      <div className="w-[20px] h-[20px] mt-[500px] ml-[40px]"><Animation className={"-mt-[340px] -ml-[100px]"} size={"w-[300px] h-[300px]"}/></div>
    </div>
  </div>


  {/* Text Content */}
  <div className="relative flex flex-col -mt-[150px] text-white px-2 max-w-[80%] ">
  <Link href="https://mailing.neuromail.cloud">
    <button className="mt-4 bg-[#305EFF] text-white text-[10px] w-[119px] h-[35px] rounded-[6px] shadow-md">
      Get Started
    </button>
  </Link>
  </div>
</section>

  
  




   
    </>

  )
}



