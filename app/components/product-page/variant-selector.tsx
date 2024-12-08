"use client";

import { useState } from "react";

const VariantSelector = () => {
  const [variant, setVariant] = useState<number>(10);
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-gray-800">Select variant:</span>
      <div className="flex gap-1 rounded-sm bg-neutral-light-gray/80 p-1">
        <button
          onClick={() => setVariant(10)}
          className={`${variant === 10 ? "border border-gray-800 bg-white" : "bg-gray-300"} grid h-6 w-6 place-content-center rounded-sm text-xs font-medium text-gray-800 hover:bg-gray-200`}
        >
          10
        </button>
        <button
          onClick={() => setVariant(20)}
          className={`${variant === 20 ? "border border-gray-800 bg-white" : "bg-gray-300"} grid h-6 w-6 place-content-center rounded-sm text-xs font-medium text-gray-800 hover:bg-gray-200`}
        >
          20
        </button>
        <button
          onClick={() => setVariant(30)}
          className={`${variant === 30 ? "border border-gray-800 bg-white" : "bg-gray-300"} grid h-6 w-6 place-content-center rounded-sm text-xs font-medium text-gray-800 hover:bg-gray-200`}
        >
          30
        </button>
        <button
          onClick={() => setVariant(40)}
          className={`${variant === 40 ? "border border-gray-800 bg-white" : "bg-gray-300"} grid h-6 w-6 place-content-center rounded-sm text-xs font-medium text-gray-800 hover:bg-gray-200`}
        >
          40
        </button>
        <button
          onClick={() => setVariant(50)}
          className={`${variant === 50 ? "border border-gray-800 bg-white" : "bg-gray-300"} grid h-6 w-6 place-content-center rounded-sm text-xs font-medium text-gray-800 hover:bg-gray-200`}
        >
          50
        </button>
      </div>
    </div>
  );
};

export default VariantSelector;
