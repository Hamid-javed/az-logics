

export default function CloudStorage() {
  return (
    <section id="benefits" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-10 overflow-hidden">
      <div className="mx-auto">
        <div className="text-center ">
          <div className="flex justify-center mb-8">
          <img src="secure.svg" alt="" className="" />
          </div>
          {/* <h2 className="text-[24px] lg:text-[50px] leading-6 font-[800] tracking-normal text-[#1D203E] sm:text-4xl">
            
            Secure Cloud Storage,
            <br />
            Built for You
          </h2>
          <div className="absolute hidden lg:block">
            <img src="circle.svg" alt="" className="lg:ml-[535px] -mt-[85px] hidden lg:block" />
          </div> */}
          <p className="text-[12px] mx-auto mt-4 w-[70vw] lg:text-[16px] lg:w-[33vw] text-[#031B1D]">
            Neuro Drive ensures your files are fully encrypted at all times- whether stored or in transit.
          </p>
        </div>

        <div className="mt-1 flex flex-col justify-center gap-14 lg:grid lg:grid-cols-3 lg:ml-7">
         <img src="updated.svg" alt="" className="lg:mt-[175px] lg:ml-9 mt-[66px]"/>
         {/* <div className="relative mt-[75px] flex justify-center">
         <img src="encrypted.svg" alt="" className="absolute -mt-8 md:mx-[20px] bg-white"/>
         <img src="lock1.svg" alt="" className="absolute ml-[23px] mt-3 lg:mt-12 flex items-center justify-center lg:ml-[22px] z-50 w-6 h-6 bg-white" />
         
         
         </div> */}
         <img src="encrypted.svg" alt="" className="mt-[60px] mx-3 lg:mt-14 lg:mx-9" />
         <img src="p.svg" alt="" className=" hidden lg:flex mt-[66px] "/>
        <img src="hprivacy.svg" alt="" className="mt-[40px] lg:mt-0 lg:hidden"/>
        </div>
      </div>
    </section>
  )
}

