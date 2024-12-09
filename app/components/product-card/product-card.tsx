"use client";

import { productData } from "@/app/data/dummyTypes";
import {
  AddShoppingCartOutlined,
  FlightTakeoffOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import Image from "next/image";

const ProductCard = ({ product }: { product: productData }) => {
  return (
    <div className="col-span-1 min-w-64 rounded-xl bg-white p-2">
      <div className="relative w-full">
        <Image
          src={product.imgSrc}
          alt={product.name}
          height={120}
          width={120}
          className="mb-4 w-full rounded-xl"
        />
        <button
          title="Add to cart"
          aria-label="Add to cart"
          className="absolute right-2 top-2 grid h-12 w-12 place-content-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-neutral-light-gray"
        >
          <AddShoppingCartOutlined fontSize="small" className="mt-[1px]" />
        </button>
        {product.colorVariants && product.colorVariants.length !== 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-neutral-light-gray/80 p-1">
            {product.colorVariants?.map((colorVariant, index) => (
              <div
                key={index}
                className={`h-4 w-4 rounded-full ${colorVariant}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-2">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="truncate text-sm">{product.name}</p>
          {product.isShippedFromAbroad && (
            <div className="relative">
              <FlightTakeoffOutlined className="peer" fontSize="inherit" />
              <div className="absolute bottom-[120%] right-0 hidden w-32 rounded-lg bg-gray-800 p-2 text-xs text-neutral-light-gray peer-hover:block">
                <InfoOutlined fontSize="small" className="mb-1" />
                <p>This item is shipped from abroad</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800">
            &#8358;{product.currentPrice}
          </p>
          <p className="text-red-500 line-through">
            &#8358;{product.originalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
