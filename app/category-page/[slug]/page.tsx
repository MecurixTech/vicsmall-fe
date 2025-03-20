"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import NavbarWrapper from "@/app/components/Navbarwrapper";
import Footer from "@/app/components/footer";
import CategorySidebar from "@/app/components/category/category-sidebar";
import ProductGrid from "@/app/components/category/product-grid";
import CategoryEmptyState from "@/app/components/category/category-empty-state";
import type { productData } from "@/app/data/dummyTypes";

export default function CategoryPage() {
  const { slug } = useParams();
  const categoryName = slug ? decodeURIComponent(slug as string) : "";

  const [products, setProducts] = useState<productData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/products?category=${encodeURIComponent(categoryName)}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${categoryName} products`);
        }

        const data = await response.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error(`Error fetching ${categoryName} products:`, err);
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]);

  const filteredProducts = products.filter((product) => {
    const subcategoryMatch =
      selectedSubcategory === "All" ||
      product.name.toLowerCase().includes(selectedSubcategory.toLowerCase());

    const priceMatch =
      (!minPrice || product.currentPrice >= Number.parseInt(minPrice)) &&
      (!maxPrice || product.currentPrice <= Number.parseInt(maxPrice));

    const ratingMatch =
      selectedRating === 0 || product.rating >= selectedRating;

    return subcategoryMatch && priceMatch && ratingMatch;
  });

  const subcategories = [
    "All",
    ...new Set(products.map((p) => p.category || p.name.split(" ")[0])),
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavbarWrapper />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex animate-pulse gap-2 text-sm text-gray-500">
            <div className="h-4 w-10 rounded bg-gray-200"></div>
            <div className="h-4 w-2 rounded bg-gray-200"></div>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            <div className="z-[-1] h-[600px] animate-pulse space-y-6 rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 rounded bg-gray-200"></div>
                ))}
              </div>
              <div className="mb-4 mt-6 h-6 w-32 rounded bg-gray-200"></div>
              <div className="flex gap-2">
                <div className="h-8 w-20 rounded bg-gray-200"></div>
                <div className="h-8 w-4 rounded bg-gray-200"></div>
                <div className="h-8 w-20 rounded bg-gray-200"></div>
              </div>
            </div>

            <div className="z-[-1] grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg bg-white shadow-md"
                >
                  <div className="aspect-square rounded-t-lg bg-gray-200"></div>
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                    <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (error || !products || products.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavbarWrapper />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-700">{categoryName}</span>
          </div>

          <CategoryEmptyState
            title={`No ${categoryName} Available`}
            description={
              error ||
              `We couldn't find any products in the ${categoryName} category.`
            }
          />
        </div>

        <Footer />
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
          <span className="text-gray-700">{categoryName}</span>
        </div>

        <div className="z-[-1] grid gap-8 lg:grid-cols-[250px_1fr]">
          <CategorySidebar
            categoryName={categoryName}
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
