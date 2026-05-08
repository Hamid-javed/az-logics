const PulseAnimation = () => {
  const elems = ["w-2/3", "w-3/4", "w-4/5", "w-1/2", "w-[70%]", "w-1/3"];

  return (
    <div className="space-y-2 w-full animate-pulse">
      {elems.map((elem) => (
        <div
          key={elem}
          className={`rounded-full h-2.5 xs:h-3 sm:h-4 bg-[#F0F0F0] ${elem}`}
        />
      ))}
    </div>
  );
};

export default PulseAnimation;
