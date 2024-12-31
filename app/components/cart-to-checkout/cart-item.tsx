"use client";

import { cartItem } from "@/app/data/dummyTypes";
import { DeleteOutlined } from "@mui/icons-material";
import Image from "next/image";

const CartItem = ({
  item,
  updateQuantity,
  removeItem,
}: {
  item: cartItem;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeItem: (id: number) => void;
}) => {
  return (
    <div key={item.id} className="flex gap-4 rounded-lg border p-4">
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.variant}</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center rounded border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="m-1 h-6 w-6 rounded-sm bg-red-600 text-white hover:bg-red-200"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1 text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="m-1 h-6 w-6 rounded-sm bg-green-800 text-white hover:bg-green-200"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="text-xl font-bold">N {item.price.toLocaleString()}</p>
        </div>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-600"
        aria-label="Remove item"
      >
        <DeleteOutlined className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;
