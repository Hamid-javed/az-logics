"use client"
import Previous from "@/public/icons/Previous";
import Button from "./Button";
import Description from "./Description";
import { ProductCatalog as ProductCatalogType } from "@/types/productCatalog";

interface ProductCatalogProps extends ProductCatalogType {
  classes?: {
    root?: string;
    iconWrapper?: string;
    title?: string;
    link?: string;
    description?: string;
  };
}

const ProductCatalog = ({
  description,
  productIcon,
  title,
  link,
  classes = {},
}: ProductCatalogProps) => {
  const {
    description: descriptionClass = "",
    iconWrapper = "",
    root = "",
    title: titleClass = "",
  } = classes;

  return (
    <div className={`flex gap-2 sm:gap-3 xl:gap-4 ${root}`}>
      <div
        className={`flex border-[0.75px] border-[#BBBBBB]/66 items-center justify-center bg-white size-10 sm:size-12 md:size-16 xl:size-18 2xl:size-20 rounded-xl md:rounded-2xl xl:rounded-[23px] backdrop-blur-[1.3px] px-2.5 sm:px-3 md:px-3.5 xl:px-4 2xl:px-5 ${iconWrapper}`}
      >
        {productIcon}
      </div>

      <div className="flex-1">
        <h1
          className={`text-xl md:text-2xl 2xl:text-[30px] font-semibold ${titleClass}`}
        >
          {title}
        </h1>
        <p
          className={`mb-6 sm:mb-8.5 text-black text-sm sm:text-base xl:text-lg 2xl:text-[22px] ${descriptionClass}`}
        >
          {description}
        </p>

        <div className="flex items-center gap-3 sm:gap-4">
           <Button
            text="Try Now"
            className="text-sm! sm:text-base! 2xl:text-lg! w-22 xs:w-26 sm:w-32 2xl:w-39.25 py-3! xl:py-4!"
            onClick={() => window.open(link, "_blank")}  // ← add this
          />
          <p className="text-xs xs:text-sm sm:text-base 2xl:text-lg">
            Explore {title}
          </p>
          <Previous className="w-1.5 h-auto stroke-black -scale-x-100 translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
