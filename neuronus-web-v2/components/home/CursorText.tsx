import Cursor from "@/public/icons/home/Cursor";

const CursorText = ({ text }: { text: string }) => {
  return (
    <div className="relative p-1.25 bg-white/50 backdrop-blur-[20px] rounded-full w-fit">
      <div className="bg-linear-to-r from-[#526BFF] to-[#243C93] text-xs px-2.5 py-1.25 rounded-full text-white">
        <p className="whitespace-nowrap">{text}</p>
        <Cursor className="absolute -top-2 -left-3" />
      </div>
    </div>
  );
};

export default CursorText;
