"use client";

import { productData } from "@/dummyTypes";
import {
  AddShoppingCartOutlined,
  FlightTakeoffOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import Image from "next/image";

const ProductCard = (data: productData) => {
  return (
    <div className="col-span-1 rounded-xl bg-white p-2">
      <div className="relative w-full">
        <Image
          src={data.imgSrc}
          alt="Butterfly on my necklace"
          height={120}
          width={120}
          className="mb-4 w-full rounded-xl"
        />
        <button
          title="Add to cart"
          className="absolute right-2 top-2 grid h-9 w-9 place-content-center rounded-full bg-neutral-light-gray"
        >
          <AddShoppingCartOutlined fontSize="inherit" className="mt-[1px]" />
        </button>
        {data.colorVariants.length !== 0 && (
          <div className="absolute bottom-2 right-2 flex gap-1 rounded-full bg-neutral-light-gray p-1">
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
          </div>
        )}
      </div>

      <div className="px-2">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="truncate text-sm">{data.name}</p>
          {data.isShippedFromAbroad && (
            <div className="relative">
              <FlightTakeoffOutlined className="peer" fontSize="inherit" />
              <div className="absolute left-[200%] top-0 hidden w-32 rounded-lg bg-gray-800 p-2 text-xs text-neutral-light-gray peer-hover:block">
                <InfoOutlined fontSize="small" className="mb-1" />
                <p>This item is shipped from abroad</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800">&#8358;{data.currentPrice}</p>
          <p className="text-red-500 line-through">
            &#8358;{data.originalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
