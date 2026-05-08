function OtherApps() {
  const Apps = [
    { name: "neurons" },
    { name: "passwordmanager" },
    { name: "Quantumography" },
    { name: "PassWordmanager1" },
    { name: "textpass" },
    { name: "vpn" },
    { name: "neuromail" },
    { name: "app1" },
    { name: "app2" },
    { name: "app3" },
    { name: "app4" },
    { name: "app5" },
    { name: "app6" },
    { name: "app5" },
    { name: "app5" },
  ];

  return (
    <section className="fixed inset-0 md:inset-auto flex md:block justify-center items-center bg-[#00000099] md:bg-[#00000000] z-50">
      <div className="absolute bg-[#FFFFFF] justify-center flex z-20 flex-wrap gap-[24px] shadow-md md:shadow-[#BDBDBD8C] p-3 w-[295px] h-[465px] rounded-[12px] md:left-[-130px] md:top-[21px]">
        {Apps.map((app, index) => (
          <img src={`/${app.name}.svg`} className="w-[65px] h-[65px]" />
        ))}
      </div>
    </section>
  );
}

export default OtherApps;
