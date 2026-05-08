import { accessNetworkProducts } from "@/data/productCatalog";
import RightSlider from "../right-slider";
import SecureBrowserCard from "./SecureBrowserCard";
import NeuroSPNCard from "./NeuroSPNCard";

const AccessNetwork = () => {
  return (
    <>
      <RightSlider
        classes={{ root: "pt-10! xl:pt-0!" }}
        title="Access & Network"
        description="The Foundation. Tools that guarantee connection anonymity."
        products={accessNetworkProducts}
        slides={[
          <SecureBrowserCard key="secure-browser-slide" />,
          <NeuroSPNCard key="neuro-spn-card-slide" />,
        ]}
      />
    </>
  );
};

export default AccessNetwork;
