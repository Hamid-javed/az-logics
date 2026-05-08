import dynamic from "next/dynamic";
import HeaderWatchDemo from "@/components/watch-demo/Header";

const Encryption = dynamic(() => import("@/components/watch-demo/encryption"), {
  ssr: true,
});
const UnderstandingTech = dynamic(
  () => import("@/components/watch-demo/understanding-tech"),
  { ssr: true }
);
const TechnicalArchitecture = dynamic(
  () => import("@/components/watch-demo/technicalArchitecture"),
  { ssr: true }
);
const Transparency = dynamic(
  () => import("@/components/watch-demo/transparency"),
  { ssr: true }
);
const FAQ = dynamic(() => import("@/components/watch-demo/faq"), {
  ssr: true,
});
const PoweredByNuronus = dynamic(
  () => import("@/components/home/PoweredByNuronus"),
  { ssr: true }
);

export default function Page() {
  return (
    <>
      <HeaderWatchDemo />
      <Encryption />
      <UnderstandingTech />
      <TechnicalArchitecture />
      <Transparency />
      <FAQ />
      <PoweredByNuronus />
    </>
  );
}
