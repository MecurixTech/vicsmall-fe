"use client";

import { cartItem } from "@/app/data/dummyTypes";
import {
  AddOutlined,
  DeleteOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import Image from "next/image";

const CartItem = ({ cartItemData }: { cartItemData: cartItem }) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4">
        <Image
          src={cartItemData.imgSrc}
          alt={cartItemData.name}
          height={64}
          width={64}
          className="rounded-xl"
        />
        <div>
          <p className="mb-1">{cartItemData.name}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="grid h-8 w-8 place-content-center rounded-xl bg-neutral-light-gray">
                <RemoveOutlined fontSize="inherit" />
              </button>
              <span className="font-medium text-gray-800">
                {cartItemData.quantity}
              </span>
              <button className="grid h-8 w-8 place-content-center rounded-xl bg-neutral-light-gray">
                <AddOutlined fontSize="inherit" />
              </button>
            </div>
            <span>|</span>
            <span className="font-semibold text-gray-800">
              &#8358;{cartItemData.price}
            </span>
          </div>
        </div>
      </div>
      <button>
        <DeleteOutlined color="error" />
      </button>
    </div>
  );
};

export default CartItem;
