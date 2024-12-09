"use client";
import React, { useRef } from "react";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import ProductCard from "../product-card/product-card";
import { products } from "@/app/data/dummyData";

const MensShoesSlider = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const cards = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <div className="relative mb-12">
      <div className="relative flex items-center">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 grid h-10 w-10 place-content-center rounded-full bg-white shadow-md hover:bg-neutral-light-gray"
          aria-label="Scroll Left"
        >
          <ArrowBackIosOutlined />
        </button>
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex w-full gap-4 overflow-x-auto px-8 py-4"
        >
          {cards}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 grid h-10 w-10 place-content-center rounded-full bg-white shadow-md hover:bg-neutral-light-gray"
          aria-label="Scroll Right"
        >
          <ArrowForwardIosOutlined />
        </button>

        <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-12 bg-gradient-to-l from-neutral-light-gray to-transparent"></div>
      </div>
    </div>
  );
};

export default MensShoesSlider;
