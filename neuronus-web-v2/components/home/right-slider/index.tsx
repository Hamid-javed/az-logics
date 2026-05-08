import Container from "@/components/Container";
import Description from "@/components/Description";
import Heading from "@/components/Heading";
import ProductCatalog from "@/components/ProductCatalog";
import { ProductCatalog as ProductCatalogType } from "@/types/productCatalog";
import Slider from "./Slider";

interface RightSliderProps {
  title: string;
  description: string;
  products: ProductCatalogType[];
  slides: React.ReactNode[];
  classes?: { root?: string };
}

const RightSlider = ({
  description,
  products,
  slides,
  title,
  classes = {},
}: RightSliderProps) => {
  return (
    <section className={`pb-20 pt-26 sm:py-32 lg:py-40 ${classes.root || ""}`}>
      <Heading className="text-center mb-3">{title}</Heading>
      <Description
        className="text-center mb-16 sm:mb-20 lg:mb-32"
        text={description}
      />
      <Container
        left
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center mb-16 sm:mb-20 lg:mb-0"
      >
        <div className="flex flex-col gap-10 sm:gap-12 lg:pe-10">
          {products.map((product) => (
            <ProductCatalog
              {...product}
              key={`${title}-product-${product.title}`}
            />
          ))}
        </div>
        <div className="hidden lg:block">
          <Slider slides={slides} title={title} />
        </div>
      </Container>
      <div className="lg:hidden">
        <Slider slides={slides} title={title} />
      </div>
    </section>
  );
};

export default RightSlider;
