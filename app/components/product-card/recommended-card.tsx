"use client";

import { productData } from "@/app/data/dummyTypes";
import {
  AddShoppingCartOutlined,
  FlightTakeoffOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import Image from "next/image";

const RecommendSection = ({ product }: { product: productData }) => {
  return (
    <>
      <div className="col-span-1 min-w-20 w-[105px] h-[175px] rounded-xl bg-white p-2">
        <div className="relative w-full">
          <Image
            src={product.imgSrc}
            alt={product.name}
            height={100}
            width={100}
            className="mb-4 rounded-xl"
          />
        </div>

        <div className="">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="truncate text-xs">{product.name}</p>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <p className="font-bold text-gray-800">
              &#8358;{product.currentPrice}
            </p>
            <p className="text-red-500 line-through">
              &#8358;{product.originalPrice}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendSection;
