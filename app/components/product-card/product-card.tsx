"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { productData } from "@/app/data/dummyTypes";
import { ShoppingCart, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { toast } from "react-hot-toast";
import { fetchProductDetails } from "@/utils/product-client";

const ProductCard = ({ product }: { product: productData }) => {
  const { addToCart, isLoading: cartIsLoading, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    product.imgSrc ||
      "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLZmWv7R2vxIKbf5HP786CAD3UTizeLcunXgQ1",
  );
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const result = await fetchProductDetails(product.id);

        if (result.data) {
          Object.entries(result.data).forEach(([key, value]) => {});
        } else {
        }

        if (result.success && result.data && result.data.imgSrc) {
          setImageUrl(result.data.imgSrc);
        }
      } catch (error) {}
    };

    getDetails();
  }, [product.id]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding || cartIsLoading) {
      return;
    }

    const isInCart = items.some((item) => item.product_id === product.id);
    if (isInCart) {
      toast.error("This item is already in your cart");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageUrl(
      "https://is7tai1wim.ufs.sh/f/QVO6Qx1nmSgLZmWv7R2vxIKbf5HP786CAD3UTizeLcunXgQ1",
    );
  };

  return (
    <div className="relative col-span-1 min-w-60 rounded-xl bg-white p-2">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden rounded-xl">
          {imageError ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center text-gray-400">
                <ImageOff size={32} />
                <p className="mt-2 text-xs">Image not available</p>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={handleImageError}
            />
          )}

          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/80 p-1">
              {product.colorVariants.map((colorVariant, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full ${colorVariant}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 px-2">
          <div className="mb-2">
            <p className="truncate text-sm font-medium">{product.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">
              ₦{product.currentPrice?.toLocaleString()}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-red-500 line-through">
                ₦{product.originalPrice?.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Cart button outside the Link component */}
      <button
        onClick={handleAddToCart}
        title="Add to cart"
        aria-label="Add to cart"
        className="absolute right-2 top-2 z-30 grid h-12 w-12 cursor-pointer place-content-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100"
      >
        {isAdding ? (
          <span className="h-5 w-5 animate-spin rounded-full border-t-2 border-gray-900"></span>
        ) : (
          <ShoppingCart size={20} />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
