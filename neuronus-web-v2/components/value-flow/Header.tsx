import ProductValuationCard from "@/components/ProductValuationCard";
import { productValuationData } from "@/data/productValuation";
import Pool from "@/components/value-flow/Pool";
import NeuroCoinWorth from "@/components/value-flow/NeuroCoinWorth";
import Header from "@/components/Header";

const HeaderValueFlow = () => {
  return (
    <Header
      title={
        <span>
          How Your <br /> Neurons Generate <br /> Real Value
        </span>
      }
      description="Every transaction feeds the pool. Watch revenue flow from products to your token value."
      classes={{
        desc: "mb-14 md:mb-20",
        leftImg: "lg:hidden top-1/4!",
        rightImg: "top-0!",
      }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 xs:gap-x-3 sm:gap-x-5 xl:gap-x-8 gap-y-12 xl:gap-y-14 pb-12 xs:pb-20 lg:pb-50">
        {productValuationData.map((product, index) => (
          <ProductValuationCard
            key={`${product.name}-valuation-${index}`}
            {...product}
          />
        ))}
      </div>
      <Pool />
      <NeuroCoinWorth />
    </Header>
  );
};

export default HeaderValueFlow;
