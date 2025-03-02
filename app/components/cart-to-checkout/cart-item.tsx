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
    <div key={item.id} className="flex flex-col sm:flex-row gap-4 rounded-lg border p-4">
      {/* Product Image */}
      <div className="flex justify-center sm:block">
        <Image
          src={item.image}
          alt={item.name}
          width={70}
          height={70}
          className="rounded-lg object-cover sm:w-20 sm:h-20"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{item.variant}</p>

        {/* Quantity & Price */}
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center border rounded">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="m-1 h-8 w-8 flex items-center justify-center rounded-sm bg-red-600 text-white hover:bg-red-700 transition"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1 text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="m-1 h-8 w-8 flex items-center justify-center rounded-sm bg-green-700 text-white hover:bg-green-800 transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="text-lg sm:text-xl font-bold">N {item.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-600 self-center sm:self-start"
        aria-label="Remove item"
      >
        <DeleteOutlined className="h-6 w-6" />
      </button>
    </div>
  );
};

export default CartItem;
