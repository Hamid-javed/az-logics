import Image from "next/image";

export default function DataSecurityPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center">
      {/* Background Layer */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"> */}


        {/* Scaled Background Video */}
        {/* <div className="relative w-full max-w-7xl aspect-video opacity-30 overflow-hidden z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/dataPage/bgcenter.mp4" type="video/mp4" />
          </video>
        </div> */}
      {/* </div> */}

      {/* Top Curve (Dark Blue to White) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[120px]"
        >
          <path d="M0,120 Q600,0 1200,120 V0 H0 Z" fill="#101A53" />
        </svg>
      </div>

      {/* Content Area */}
      <div className="relative z-20 w-full max-w-7xl px-4 py-32 md:py-48 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="bg-gray-100/80 backdrop-blur-sm  px-6 py-2 rounded-full text-xs font-semibold text-gray-700 mb-8 mt-10 md:mt-0">
          Data security
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-6xl font-semibold text-black tracking-tight mb-8 max-w-5xl leading-[1.15]">
          End-to-end encryption with <br className="hidden md:block" />
          AES-256-GCM, PBKDF2 & RSA protection
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-[15px] font-medium max-w-4xl mb-20 leading-relaxed px-4">
          Your data is secured by default with SEED-based key derivation, local
          private key encryption, HKDF, and Zero-Knowledge
          protocols—guaranteeing true privacy and trust for every user.
        </p>

        {/* Comparison Section */}
        <div
          className="relative w-full min-h-[600px] flex flex-col lg:flex-row items-center justify-center gap-24 lg:gap-12 mt-10 rounded-3xl overflow-hidden  border border-white/40"
          style={{
            backgroundImage: 'url("/Neuronus components/2nd section.gif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Content can be added here if needed; background is the focal point */}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-8 mt-24">
          <button className="bg-[#4B6BFF] text-white px-10 py-4 rounded-full text-base font-bold shadow-[0_8px_30px_rgba(75,107,255,0.4)] hover:shadow-[0_12px_40px_rgba(75,107,255,0.6)] hover:-translate-y-1 transition-all duration-300 active:scale-95 leading-none">
            Watch Demo →
          </button>
          <a
            href="#"
            className="w-12 h-12 flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-300"
          >
            <Image
              src="/dataPage/github.png"
              alt="GitHub"
              width={36}
              height={36}
            />
          </a>
        </div>
      </div>

      {/* Bottom Curve (White to Dark Blue)
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[120px]"
        >
          <path d="M0,0 Q600,120 1200,0 V120 H0 Z" fill="#101A53" />
        </svg>
      </div> */}
    </main>
  );
}
