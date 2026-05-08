import { vaultProducts } from "@/data/productCatalog";
import RightSlider from "../right-slider";
import StorageCard from "./StorageCard";
import ManagerCard from "./ManagerCard";
import AnonymousNotes from "./anonymous-notes";
import HideAssets from "./hide-assets";

const Vault = () => {
  return (
    <>
      <RightSlider
        title="Vault & Storage"
        description="A secure safe for files and passwords."
        products={vaultProducts}
        slides={[
          <StorageCard key="storage-card-slide" />,
          <ManagerCard key="manager-card-slide" />,
          <AnonymousNotes key="anonymous-notes-slide" />,
          <HideAssets key="hide-assets-slide" />,
        ]}
      />
    </>
  );
};

export default Vault;
