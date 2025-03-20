"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import NavbarWrapper from "@/app/components/Navbarwrapper";
import Footer from "@/app/components/footer";
import FilterModal from "../../filter-modal";
import MobileProductCard from "../../mobile-product-card";
import { getSubcategoryProducts, type Product } from "@/lib/api";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SubcategoryPage() {
  const { categoryId, subcategoryId } = useParams() as {
    categoryId: string;
    subcategoryId: string;
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All Accessories");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getSubcategoryProducts(categoryId, subcategoryId);
        setProducts(data.products);
        setCategoryName(data.categoryName);
        setSubcategoryName(data.subcategoryName);
      } catch (error) {
        console.error(
          `Error fetching data for subcategory ${subcategoryId}:`,
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId && subcategoryId) {
      fetchData();
    }
  }, [categoryId, subcategoryId]);

  const filteredProducts = products.filter((product) => {
    const priceMatch =
      (!minPrice || product.price >= Number.parseInt(minPrice)) &&
      (!maxPrice || product.price <= Number.parseInt(maxPrice));

    const ratingMatch =
      selectedRating === 0 || (product.rating || 0) >= selectedRating;

    return priceMatch && ratingMatch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <NavbarWrapper />
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#030359]"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] pb-24">
        <NavbarWrapper />

        <div className="flex h-[47px] items-center justify-between bg-[#1E1E1E] px-6">
          <span className="font-poppins text-sm font-semibold text-white">
            Filter
          </span>
          <button onClick={() => setShowFilterModal(true)}>
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 1H1.5L6.5 7.26V14L9.5 16V7.26L14.5 1Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 px-[22px] py-4">
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-[20px] font-bold text-[#1E1E1E]">
              {subcategoryName}
            </h2>
            <p className="text-sm text-gray-600">{categoryName}</p>
          </div>

          <div className="flex flex-col gap-[21px]">
            {Array.from({ length: Math.ceil(filteredProducts.length / 2) }).map(
              (_, rowIndex) => (
                <div key={rowIndex} className="flex gap-[18px]">
                  {filteredProducts
                    .slice(rowIndex * 2, rowIndex * 2 + 2)
                    .map((product, index) => (
                      <MobileProductCard
                        key={product.id}
                        product={product}
                        showHeart={(rowIndex * 2 + index) % 4 === 3}
                      />
                    ))}
                </div>
              ),
            )}
          </div>
        </div>

        <FilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarWrapper />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-gray-700">
            Categories
          </Link>
          <span>/</span>
          <Link
            href={`/category/${categoryId}`}
            className="hover:text-gray-700"
          >
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{subcategoryName}</span>
        </div>

        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {subcategoryName}
          </h2>
          <p className="text-gray-600">{categoryName}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100">
                    <ShoppingCart className="h-4 w-4" />
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
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#CD011C] line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
