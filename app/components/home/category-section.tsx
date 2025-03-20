"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowForwardOutlined } from "@mui/icons-material";
import Slider from "./slider";
import Stacks from "./stacks";
import type { productData } from "@/app/data/dummyTypes";
import EmptyState from "../ui/empty-state";
import {
  getProductsByCategory,
  getFlashProducts,
  getRecommendedProducts,
} from "@/lib/product-actions";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
  ></div>
);

interface CategorySectionProps {
  title: string;
  category: string;
  viewMoreLink?: string;
  darkMode?: boolean;
}

const CategorySection = ({
  title,
  category,
  viewMoreLink,
  darkMode = false,
}: CategorySectionProps) => {
  const [products, setProducts] = useState<productData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dynamicViewMoreLink =
    viewMoreLink ||
    `/category-page/${encodeURIComponent(category.toLowerCase())}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let result;

        if (category.toLowerCase() === "flash sale") {
          result = await getFlashProducts();
        } else if (category.toLowerCase() === "recommended") {
          result = await getRecommendedProducts();
        } else {
          result = await getProductsByCategory(category);
        }

        if (!result.success) {
          throw new Error(
            result.error || `Failed to load ${category} products`,
          );
        }

        setProducts(result.data || []);

        if (result.data && result.data.length > 0) {
        }
      } catch (err) {
        console.error(
          `[CategorySection] Error fetching ${category} products:`,
          err,
        );
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, title]);

  if (loading) {
    return (
      <motion.div
        className={`mx-auto my-14 w-[95%] ${darkMode ? "text-white" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="mb-0">{title}</h3>
          <Link
            href={dynamicViewMoreLink}
            className={`flex items-center gap-1 font-medium ${darkMode ? "text-white" : "text-neutral-dark-blue"}`}
          >
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 sm:hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error || !products || products.length === 0) {
    return (
      <motion.div
        className={`mx-auto my-14 w-[95%] ${darkMode ? "text-white" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="mb-4">{title}</h3>
          <Link
            href={dynamicViewMoreLink}
            className={`flex items-center gap-1 font-medium ${darkMode ? "text-white" : "text-neutral-dark-blue"}`}
          >
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyState
            title={`No ${title} Available`}
            description={
              error || `We couldn't find any products in the ${title} category.`
            }
            darkMode={darkMode}
            showRefreshButton={true}
            refreshAction={() => {
              window.location.reload();
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.section
      className={`mx-auto my-14 w-[95%] ${darkMode ? "text-white" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="mb-4">{title}</h3>
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href={dynamicViewMoreLink}
            className={`flex items-center gap-1 font-medium ${darkMode ? "text-white" : "text-neutral-dark-blue"}`}
          >
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </motion.div>
      </div>
      <div className="hidden sm:block">
        <Slider products={products} />
      </div>
      <div className="block sm:hidden">
        <Stacks products={products} />
      </div>
    </motion.section>
  );
};

export default CategorySection;
