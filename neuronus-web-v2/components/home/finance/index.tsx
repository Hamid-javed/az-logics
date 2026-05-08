import RightSlider from "../right-slider";
import { FinanceProducts } from "@/data/productCatalog";
import CryptoCard from "./CryptoCard";
import PayCard from "./PayCard";

const Finance = () => {
  return (
    <RightSlider
      title="Finance"
      description="The ecosystem’s bloodstream."
      products={FinanceProducts}
      slides={[
        <CryptoCard key="crypto-slide" />,
        <PayCard key="paycard-slide" />,
      ]}
    />
  );
};

export default Finance;
