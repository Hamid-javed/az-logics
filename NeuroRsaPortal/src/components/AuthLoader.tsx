export const AuthLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-[#36F]/20 animate-spin"
          style={{ animationDuration: "3s" }}
        />
        <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-[#36F] border-r-[#36F]/40 animate-spin"
          style={{ animationDuration: "1s" }}
        />
       
      </div>

      {/* Text */}
      <p className="text-[15px] font-semibold text-gray-800 tracking-wide">
        Securing your vault...
      </p>
      <p className="text-[12px] text-gray-400 mt-1 tracking-widest uppercase">
        Powered by Neuronus
      </p>

      {/* Animated dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#36F]/60 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};