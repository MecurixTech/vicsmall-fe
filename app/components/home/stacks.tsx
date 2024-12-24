"use client";
import React from "react";
import ProductCardv3 from "../product-card/product-card-v3";
import { products } from "@/app/data/dummyData";

const Stacks = () => {
  const cards = products.map((product) => (
    <ProductCardv3 key={product.id} product={product} />
  ));

  return (
    <div className="block sm:hidden py-4">
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 mx-[10px] max-w-[90%]">
        {cards}
      </div>
    </div>
  );
};

export default Stacks;
