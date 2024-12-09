import { productData } from "@/app/data/dummyTypes";
import Image from "next/image";

const ProductCardV2 = ({ productData }: { productData: productData }) => {
  return (
    <div className="col-span-1 rounded-xl border border-gray-200 bg-neutral-light-gray p-2">
      <Image
        src={productData.imgSrc}
        alt={productData.name}
        height={120}
        width={120}
        className="mb-4 w-full rounded-xl"
      />
      <p className="mb-2 truncate text-sm">{productData.name}</p>
      <div className="flex items-center justify-between">
        <p className="font-bold text-gray-800">
          &#8358;{productData.currentPrice}
        </p>
        <p className="text-red-500 line-through">
          &#8358;{productData.originalPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCardV2;
