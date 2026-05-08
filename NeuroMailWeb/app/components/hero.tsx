import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-white text-center px-4 lg:h-[calc(100vw*0.578)]  h-[calc(100vw*1.79)] w-[100vw] "
      style={{
        backgroundImage: `url('hero.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Mobile-Specific Background */}
      <div
        className="absolute inset-0 w-full lg:hidden h-full"
        style={{
          backgroundImage: `url('mbhero1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center -mt-16">
        {/* Hero Box Image */}
        <img
          src="herobox.svg"
          alt="Hero Box"
          className="mb-6 w-[150px] sm:w-[170px] lg:w-[190px]"
        />

        {/* Title */}
        <h1 className="text-xl font-bold tracking-wide lg:leading-9 leading-6 w-[90%] max-w-[700px] sm:text-[30px] lg:text-[40px]">
          A secure email service that respects your privacy.
        </h1>

        {/* Description */}
        <p className="py-4 text-[10px] sm:text-[12px] lg:text-[14px] w-[75%] max-w-[500px] leading-relaxed">
          NeuroMail offers encrypted communication, full control over your data,
          and AI-powered smart features. Privacy has never been this simple.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center items-center mt-6 gap-4">
        <Link href="https://mailing.neuromail.cloud">
          <button className="flex items-center justify-center gap-2 bg-[#305EFF] text-white px-3 py-2 text-[10px] lg:text-[14px] lg:px-6 lg:py-3 rounded-[6px] lg:rounded-[9px] cursor-pointer">
            <img src="mail.svg" alt="" className="w-4 h-4 lg:w-6 lg:h-6" />
            Get Free Email
          </button>
          </Link>
          <button className="px-3 text-[10px] lg:text-[14px] lg:px-6">
            Compare Our Plans
          </button>
        </div>
      </div>
    </section>
  );
}
