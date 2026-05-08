import Heading from "../../Heading";
import Description from "../../Description";
import { CommunicationProducts } from "@/data/productCatalog";
import ProductCatalog from "../../ProductCatalog";
import thunder from "@/public/images/home/data-security/thunder.avif";
import Image from "next/image";
import Slider from "./Slider";
import Container from "../../Container";

const Communication = () => {
  return (
    <div className="relative overflow-hidden">
      <Image
        src={thunder}
        alt="thunder"
        width={500}
        height={500}
        className="absolute w-2/5 lg:w-1/3 h-auto object-contain top-[-10%] right-[-20%] hidden lg:block"
      />

      <div className="bg-white lg:w-[95%] relative lg:rounded-r-[62px] py-24">
        <Heading className="text-center mb-3">Communication</Heading>
        <Description
          className="text-center mb-10 md:mb-20"
          text="Information exchange without witnesses."
        />
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] xl:grid-cols-2 gap-20 lg:gap-0">
          <div className="lg:pr-8 xl:pr-10 2xl:pr-20 order-2 lg:order-1">
            <Slider />
          </div>

          <Container className="lg:w-full! flex flex-col 2xl:justify-between mt-8 gap-14 2xl:gap-0 pe-8 order-1 lg:order-2">
            {CommunicationProducts.map((product) => (
              <ProductCatalog
                {...product}
                key={`access-network-product-${product.title}`}
              />
            ))}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Communication;
