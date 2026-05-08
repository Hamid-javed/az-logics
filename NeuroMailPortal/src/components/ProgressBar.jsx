
const ProgressBar = ({ progress ,hasAttachments }) => {
  const dashArray = `${(progress / 100) * 75} 100`; // Adjusted for the desired ratio (e.g., 75 for the full circle)
  return (
    <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-[#00000068] z-50 px-0 rounded-tl-2xl rounded-tr-2xl">
    <div className="top-[20vh] px-4 right-[10vw] z-50 bg-[white]  w-[20vw] h-[45vh] flex flex-col justify-center items-center rounded-3xl shadow-lg drop-shadow-lg">
      <div className="relative size-40">
        <svg
          className="rotate-[135deg] size-full"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-gray-200"
            strokeWidth="1.5"
            strokeDasharray="75 100" // Static background
            strokeLinecap="round"
          ></circle>

          {/* Progress circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-[#0E57CB]"
            strokeWidth="1.5"
            strokeDasharray={dashArray} // Dynamic progress
            strokeLinecap="round"
          ></circle>
        </svg>
        {/* Progress percentage in the center */}
        <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-4xl font-bold text-[#0E57CB]">{progress}%</span>
        </div>
      </div>
      <p className="text-[#0E57CB] text-[14px]">
        Just a moment! We’re {hasAttachments ? "handling your attachments..." : "sending your email..."}</p>
    </div>
    </div>
  );
};

export default ProgressBar;
