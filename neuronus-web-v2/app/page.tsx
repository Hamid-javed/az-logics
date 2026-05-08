import dynamic from "next/dynamic";
import HeaderHome from "@/components/home/HeaderHome";
import CheckValue from "@/components/home/CheckValue";

const DataSecurity = dynamic(
  () => import("@/components/home/data-security"),
  { ssr: true }
);
const NeuronusProtects = dynamic(
  () => import("@/components/home/neuronus-protects"),
  { ssr: true }
);
const AccessNetwork = dynamic(
  () => import("@/components/home/access-network"),
  { ssr: true }
);
const Communication = dynamic(
  () => import("@/components/home/communication"),
  { ssr: true }
);
const Vault = dynamic(
  () => import("@/components/home/vault-&-storage"),
  { ssr: true }
);
const WorkSpace = dynamic(
  () => import("@/components/home/workspace"),
  { ssr: true }
);
const Finance = dynamic(
  () => import("@/components/home/finance"),
  { ssr: true }
);
const BasicRules = dynamic(
  () => import("@/components/home/basic-rules"),
  { ssr: true }
);
const NextGenEncryption = dynamic(
  () => import("@/components/home/next-gen-encryption"),
  { ssr: true }
);
const PoweredByNuronus = dynamic(
  () => import("@/components/home/PoweredByNuronus"),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <HeaderHome />
      <CheckValue />
      <DataSecurity />
      <NeuronusProtects />
      <AccessNetwork />
      <Communication />
      <Vault />
      <WorkSpace />
      <Finance />
      <BasicRules />
      <NextGenEncryption />
      <PoweredByNuronus />
    </>
  );
}
