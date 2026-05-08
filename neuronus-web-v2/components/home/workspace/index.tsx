import Heading from "../../Heading";
import Description from "../../Description";
import { WorkSpaceProducts } from "@/data/productCatalog";
import ProductCatalog from "../../ProductCatalog";
import Container from "@/components/Container";
import Slider from "./Slider";

const WorkSpace = () => {
  return (
    <div className="bg-white lg:w-[95%] relative lg:rounded-r-[62px] pb-20 pt-26 md:py-32 lg:py-40">
      <Heading className="text-center mb-3 ">Workspace</Heading>
      <Description
        className="text-center mb-16 md:mb-20  lg:mb-32"
        text="A cloud office that doesn’t look over your shoulder."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-10 xl:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <Slider />
        </div>
        <Container className="flex flex-col gap-14 lg:w-full! lg:pe-10 order-1 lg:order-2">
          {WorkSpaceProducts.map((product) => (
            <ProductCatalog
              {...product}
              key={`workspace-product-${product.title}`}
            />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default WorkSpace;
