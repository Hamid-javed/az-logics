import Link from "next/link";
import { SideLine } from "../../public/assets/Icons";

const MiddleSliderBox = ({ searchParams }: any) => {
  const sections = [
    {
      title: "Your data, only yours",
      link: "your-data-only-yours",
      description:
        "All files are end-to-end encrypted – even the administrator has no access. Store your most sensitive information with confidence.",
      image: "/sliderimg1.png",
    },
    {
      title: "Secure your data with a password",
      link: "secure-your-data-with-a-password",
      description:
        "We never share or sell your data to third parties, and we don’t use it for targeted ads—your data stays yours.",
      image: "/sliderimg2.png",
    },
    {
      title: "Work together, stay private",
      link: "work-together-stay-private",
      description:
        "Edit and share files without a trace. Our proprietary solutions enable anonymous collaboration on documents and spreadsheets – no login, no tracking, no compromises on privacy.",
      image: "/sliderimg3.png",
    },
  ];

  const activeIndex = (() => {
    const slugs = sections.map((s) =>
      s.link.startsWith("/") ? s.link.slice(1) : s.link,
    );
    const idxFromKey = slugs.findIndex((slug) =>
      Object.prototype.hasOwnProperty.call(searchParams ?? {}, slug),
    );
    if (idxFromKey >= 0) return idxFromKey;
    const raw = (searchParams && (searchParams as any).activeIndex) as
      | string
      | string[]
      | undefined;
    const first = Array.isArray(raw) ? raw[0] : raw;
    const parsed = Number(first);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  })();

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 z-10 px-4">
      {/* Text Box */}
      <div className="w-full md:w-[45%] bg-white py-4 md:py-6 flex flex-col items-center rounded-[24px] md:rounded-[33px]">
        {sections.map((section, index) => (
          <Link
            key={index}
            href={{
              pathname: "/",
              query: {
                [section.link]: "",
              },
            }}
            scroll={false}
            className={`w-[90%] flex flex-col justify-center px-4 relative rounded-[12px] transition-all duration-500 ease-in-out mb-3 ${
              activeIndex === index ? "bg-[#6860FE1A] shadow-lg" : "bg-white"
            }`}
          >
            {index === activeIndex && (
              <span className="absolute left-[-2px] transition-all duration-500 ease-in-out opacity-100">
                <SideLine className="transition-opacity duration-500 ease-in-out opacity-100" />
              </span>
            )}
            <p
              className={`text-[16px] lg:text-[22px] leading-[30px] lg:leading-[54px] ${
                activeIndex === index
                  ? "bg-gradient bg-clip-text text-transparent"
                  : "text-black"
              }`}
            >
              {section.title}
            </p>
            <p className="text-[13px] lg:text-[14px] leading-[20px] font-inter min-h-[60px] text-black">
              {section.description}
            </p>
          </Link>
        ))}
        <div className="flex items-start justify-start w-[88%] mt-1">
          <Link
            href="https://storage.neurodrive.me/"
            scroll={false}
            className="text-[11px] md:text-[13px] font-inter flex justify-center items-center w-[117px] h-[30px] md:w-[163px] md:h-[42px] bg-btn border border-btn px-5 py-2 rounded-[6px] md:rounded-[12px] text-white"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="w-full md:w-[40%] h-[350px] md:h-[469px] flex flex-col justify-between items-center overflow-hidden relative">
        {/* Sliding Container */}
        <div
          className="flex transition-transform duration-700 ease-in-out w-full h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="w-full h-full flex justify-center items-center shrink-0"
            >
              <img
                src={section.image}
                alt={`Slide ${idx + 1}`}
                className={`rounded-[20px] object-contain ${
                  section.image === "/sliderimg2.png"
                    ? "lg:h-[80%] h-[90%]"
                    : "w-full h-full"
                }`}
              />
            </div>
          ))}

          {/* Dots Indicator */}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 md:bottom-0 flex gap-2">
          {sections.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === activeIndex ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleSliderBox;
