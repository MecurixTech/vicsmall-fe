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
    <div className="bg-white rounded-xl p-2 col-span-1">
      <div className="relative w-full">
        <Image
          src={data.imgSrc}
          alt="Butterfly on my necklace"
          height={120}
          width={120}
          className="rounded-xl w-full mb-4"
        />
        <button
          title="Add to cart"
          className="absolute top-2 right-2 bg-neutral-light-gray grid rounded-full place-content-center h-9 w-9"
        >
          <AddShoppingCartOutlined fontSize="inherit" className="mt-[1px]" />
        </button>
        {data.colorVariants.length !== 0 && (
          <div className="flex bg-neutral-light-gray absolute bottom-2 right-2 rounded-full p-1 gap-1">
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
            <button className={`h-4 w-4 rounded-full bg-gray-600`} />
          </div>
        )}
      </div>

      <div className="px-2">
        <div className="flex items-center justify-between mb-2 gap-4">
          <p className="text-sm truncate">{data.name}</p>
          {data.isShippedFromAbroad && (
            <div className="relative">
              <FlightTakeoffOutlined className="peer" fontSize="inherit" />
              <div className="absolute top-0 left-[200%] p-2 rounded-lg hidden peer-hover:block text-xs w-32 bg-gray-800 text-neutral-light-gray">
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
