"use client";

import { productData } from "@/app/data/dummyTypes";
import Image from "next/image";

const ProductCardv3 = ({ product }: { product: productData }) => {
  return (
    <>
      <div className="col-span-1 min-w-20 w-[105px] h-[175px] rounded-xl bg-white p-2 block sm:hidden">
        <div className="relative w-full">
          <Image
            src={product.imgSrc}
            alt={product.name}
            height={100}
            width={100}
            className="mb-4 rounded-xl"
          />
        </div>
        <div className="px-2">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="truncate text-sm">{product.name}</p>

          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">
              &#8358;{product.currentPrice}
            </p>

          </div>
        </div>
      </div>
    </>

  );
};

export default ProductCardv3;
