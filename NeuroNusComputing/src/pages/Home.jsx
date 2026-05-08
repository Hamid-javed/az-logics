import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#101A53] relative overflow-hidden flex flex-col items-center pt-32 ">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-[40%] opacity-40 pointer-events-none select-none z-0">
        <Image
          src="/dots.png"
          alt="Dots"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Neural patterns left/right */}
      <div className="absolute top-0 left-0 w-[40%] h-[60%]  pointer-events-none select-none z-0">
        <Image
          src="/homeLeft.png"
          alt="Neural Pattern Left"
          fill
          className="object-contain object-top-left"
        />
      </div>
      <div className="absolute top-[30%] md:top-0 right-0 w-[60%] h-[70%] md:w-[40%] md:h-[60%]  pointer-events-none select-none z-0">
        <Image
          src="/homeRight.png"
          alt="Neural Pattern Right"
          fill
          className="object-contain object-top-right"
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-8 md:mt-12 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 leading-[1.2] md:leading-[1.1]">
          Encrypted tools that <br className="hidden sm:block" />
          <span className="text-white/90">protect your identity.</span>
        </h1>
        <p className="text-sm md:text-base text-white/60 mb-10 max-w-2xl font-light tracking-wide px-4">
          Your online life stays hidden — safe, private, and in your control
        </p>

        {/* CTA Button with Glow */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-[#4F6EF7] rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
          <button className="relative px-12 py-4 bg-[#4B6BFF] text-white rounded-full text-[15px] font-semibold  border-t-2 border-white/90 shadow-[0_0_20px_rgba(79,110,247,0.4)] hover:bg-[#5a78ff] transition-all duration-300 transform hover:scale-105 active:scale-95">
            Create a free account
          </button>
        </div>

        <button className="mt-6 text-white/50 text-xs font-medium hover:text-white transition-colors">
          Compare plans
        </button>
      </div>

      {/* Feature Showcase (HomeBottom) */}
      <div className="relative z-10 mt-20 w-[80%] md:w-full max-w-7xl px-4 group ">
        <div className="h-[500px] w-full rounded-3xl  border border-white/5 shadow-2xl">
          <Image
            src="/HomeBottom.png"
            alt="Feature Showcase"
            fill
            className="object-fill"
          />
        </div>
      </div>

      {/* Stats/Info Bar */}
      <div className="relative z-10 mt-16 w-full max-w-5xl px-4">
        <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="text-black font-semibold text-sm underline border-black">
              Check Value
            </span>
            <span className="text-gray-500 text-sm font-medium">
              flow for the neuronus project
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="text-gray-900 font-medium text-sm">
              1 NCNC = <span className="font-bold text-gray-900">$0.02</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#4BFF693B] text-[#00BD1E] px-4 py-1.5 rounded-lg border-2 border-[#00B23E] font-bold text-sm flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                  <path d="M16 7h6v6" />
                </svg>
                +25% Growth
              </div>
              <span className="text-gray-900 font-bold text-sm whitespace-nowrap">
                vs. last period
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
