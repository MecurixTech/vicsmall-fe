"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors?: string[];
  rating: number;
  hasShipping?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Elegant Watch",
    price: 34500,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#FFD700", "#8B4513"],
    rating: 4,
  },
  {
    id: 2,
    name: "Diamond Ring",
    price: 55000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#FFD700", "#C0C0C0", "#FFFFFF"],
    rating: 5,
  },
  {
    id: 3,
    name: "Gold Anklet",
    price: 28000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#FFD700", "#FFA500"],
    rating: 3,
  },
  {
    id: 4,
    name: "Silver Wrist Stud",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 5,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 6,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 7,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 8,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 9,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 10,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 11,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 12,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 13,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 14,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
  {
    id: 15,
    name: "Silver",
    price: 15000,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#C0C0C0", "#000000", "#FFFFFF"],
    rating: 4,
  },
];

// Fill the rest of the array with the existing placeholder products
while (products.length < 16) {
  products.push({
    id: products.length + 1,
    name: "Product Name",
    price: 34500,
    image: "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    rating: Math.floor(Math.random() * 4) + 1,
  });
}

const categories = [
  "All Accessories",
  "Watches",
  "Rings",
  "Anklets",
  "Wrist Studs",
];

export default function AccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Accessories");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All Accessories" ||
      product.name.toLowerCase().includes(selectedCategory.toLowerCase());
    const priceMatch =
      (!minPrice || product.price >= parseInt(minPrice)) &&
      (!maxPrice || product.price <= parseInt(maxPrice));
    const ratingMatch =
      selectedRating === 0 || product.rating >= selectedRating;
    return categoryMatch && priceMatch && ratingMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-700">Accessories</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
          <div>
            <h2 className="mb-4 text-lg font-semibold">Accessories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`w-full rounded-md px-4 py-2 text-left ${
                      selectedCategory === category ? "bg-gray-100" : ""
                    } transition-colors hover:bg-gray-100`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Sort By Price</h2>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 rounded-md border px-2 py-1"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 rounded-md border px-2 py-1"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Sort By Rating</h2>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className={`w-full rounded-md px-4 py-2 text-left ${selectedRating === rating ? "bg-gray-100" : ""} transition-colors hover:bg-gray-100`}
                  onClick={() => setSelectedRating(rating)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {rating} Stars
                    </span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-[#B6B6B6] text-gray-300"}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="sr-only">Add to cart</span>
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {product.colors?.map((color, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-full border shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-sm font-semibold">
                  ₦{product.price.toLocaleString()}
                </p>
                <div className="flex items-center">
                  {/* {Array.from({ length: 5 }).map((_, i) => (
                    // <svg
                    //   key={i}
                    //   className={`w-4 h-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    //   viewBox="0 0 24 24"
                    // >
                    //   <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    // </svg>
                  ))} */}
                </div>
              </div>
              {product.hasShipping && (
                <div className="absolute left-2 top-2">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
