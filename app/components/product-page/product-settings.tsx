"use client";

import {
  AddOutlined,
  AssignmentReturnOutlined,
  FacebookOutlined,
  Favorite,
  FavoriteBorderOutlined,
  FlightTakeoffOutlined,
  GppGoodOutlined,
  HelpOutlineOutlined,
  Instagram,
  RemoveOutlined,
  ShareOutlined,
  StraightenOutlined,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import StarRating from "../star-rating";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ColorSelector from "./color-selector";
import VariantSelector from "./variant-selector";
import { useState, useEffect } from "react";
import ProductGallery from "./product-gallery";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { useSavedProducts } from "@/context/saved-products-context";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import type { ProductDetails } from "@/lib/product-details-actions";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const hoverButton = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

interface ProductSettingsProps {
  product: ProductDetails;
}

const ProductSettings = ({ product }: ProductSettingsProps) => {
  const router = useRouter();
  const { addToCart, isLoading: cartIsLoading, items } = useCart();
  const {
    isProductSaved,
    saveProduct,
    removeSavedProduct,
    getSavedProductId,
    savedProducts,
    isLoading: savedProductsLoading,
  } = useSavedProducts();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<
    "black" | "red" | "orange" | "gray" | null
  >(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsFavorite(isProductSaved(product.id));
  }, [isProductSaved, product.id, savedProducts]);

  const handleColorSelect = (color: "black" | "red" | "orange" | "gray") => {
    setSelectedColor(color);
  };

  const price = product.currentPrice;
  const originalPrice = product.originalPrice;
  const totalPrice = price * quantity;
  const hasDiscount = originalPrice > price;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = async () => {
    if (isAdding || cartIsLoading) return;

    const isInCart = items.some((item) => item.product_id === product.id);

    if (isInCart) {
      toast.error("This item is already in your cart");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product.id, quantity);
      // toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    }
  };

  const handleBuyNow = async () => {
    if (isBuying || cartIsLoading) return;

    setIsBuying(true);
    try {
      const result = await addToCart(product.id, quantity);

      if (!result.success) {
        throw new Error(result.error || "Failed to add item to cart");
      }
      const checkoutData = {
        items: [
          {
            id: product.id,
            product_id: product.id,
            cart_id: Date.now(),
            name: product.name,
            price: product.currentPrice,
            originalPrice: product.originalPrice,
            quantity: quantity,
            image: product.imgSrc,
            variant: product.variant,
            added_at: new Date().toISOString(),
          },
        ],
        subtotal: product.currentPrice * quantity,
        deliveryFee: 1500,
        discount: 0,
        grandTotal: product.currentPrice * quantity + 1500,
        paymentMode: "full",
        partPayment: 0,
        partPaymentPercentage: 0,
      };

      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));

      router.push("/checkout");
    } catch (error) {
      console.error("Error processing buy now:", error);
      toast.error("Failed to process your order");
    } finally {
      setIsBuying(false);
    }
  };
  const toggleFavorite = async () => {
    if (isSaving || savedProductsLoading) return;

    setIsSaving(true);
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    try {
      if (newFavoriteState) {
        await saveProduct(product.id);
      } else {
        const savedProductId = getSavedProductId(product.id);
        if (savedProductId) {
          await removeSavedProduct(savedProductId);
        } else {
          console.error(
            `[ProductSettings] Cannot find saved product ID for product: ${product.id}`,
          );
          throw new Error("Cannot find saved product ID");
        }
      }

      toast.success(
        newFavoriteState
          ? "Product saved to favorites"
          : "Product removed from favorites",
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);

      setIsFavorite(!newFavoriteState);
      toast.error("Failed to update saved status");
    } finally {
      setIsSaving(false);
    }
  };
  useEffect(() => {
    const saved = isProductSaved(product.id);
    setIsFavorite(saved);
  }, [product.id, isProductSaved, savedProducts, savedProductsLoading]);

  return (
    <motion.div
      className="flex w-full flex-col gap-6 rounded-xl bg-gray-50 p-4 shadow-lg md:flex-row md:p-6"
      initial="initial"
      animate="animate"
    >
      <motion.div className="w-full md:w-1/2" variants={fadeIn}>
        <ProductGallery
          selectedColor={selectedColor}
          productImages={product.imgSrc}
        />
      </motion.div>

      <motion.div
        className="flex-1 rounded-xl bg-white p-4 shadow-lg"
        variants={fadeIn}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <motion.div
            className="flex items-center gap-2 rounded-full bg-accent-900 px-4 py-2 text-sm font-medium text-neutral-dark-blue"
            whileHover={{ scale: 1.05 }}
          >
            <span>
              {product.isShippedFromAbroad
                ? "Shipped from abroad"
                : "Local shipping"}
            </span>
            <FlightTakeoffOutlined fontSize="inherit" />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFavorite}
            disabled={isSaving || savedProductsLoading}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={`p-1 transition-all duration-300 ${isFavorite ? "text-red-500" : "text-gray-700"} ${isSaving || savedProductsLoading ? "opacity-50" : ""}`}
          >
            {isSaving || savedProductsLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : isFavorite ? (
              <Favorite />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </motion.button>
        </div>

        <motion.h1
          className="mb-2 text-xl font-bold sm:text-2xl md:text-3xl"
          whileHover={{ scale: 1.02 }}
        >
          {product.name}
        </motion.h1>
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
          <StarRating rating={product.rating || 3} size="inherit" />
          <span className="text-gray-400">
            {product.rating || 3}.0 (Based on 250 ratings)
          </span>
          <span>|</span>
          <span>45 items sold</span>
        </div>

        <div className="mb-4 rounded-xl bg-neutral-light-gray p-4 shadow-inner">
          <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <StraightenOutlined />
              <span>Size guide</span>
            </div>

            <div className="flex items-center gap-2">
              <AssignmentReturnOutlined />
              <span>Delivery return</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpOutlineOutlined />
              <span>Ask a question</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 rounded-lg border-2 border-green-600 bg-green-50 p-2 font-medium text-green-600">
              <GppGoodOutlined />
              <span>Guaranteed Safe Checkout</span>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <ShareOutlined fontSize="inherit" />
                <span>Share:</span>
              </div>

              <div className="flex items-center gap-4">
                <Link href="https://x.com">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full p-2 text-gray-700 hover:text-blue-500"
                  >
                    <Twitter fontSize="inherit" />
                  </motion.div>
                </Link>

                <Link href="https://facebook.com">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full p-2 text-gray-700 hover:text-blue-700"
                  >
                    <FacebookOutlined fontSize="inherit" />
                  </motion.div>
                </Link>

                <Link href="https://youtube.com">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full p-2 text-gray-700 hover:text-red-500"
                  >
                    <YouTube fontSize="inherit" />
                  </motion.div>
                </Link>

                <Link href="https://instagram.com">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full p-2 text-gray-700 hover:text-pink-600"
                  >
                    <Instagram fontSize="inherit" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ColorSelector onColorSelect={handleColorSelect} />
        <VariantSelector variant={product.variant} />

        <hr className="my-2" />
        <p className="mb-2 text-sm">
          Estimated delivery on{" "}
          {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </p>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-2xl font-semibold">
          <p className="text-gray-800">&#8358;{totalPrice.toLocaleString()}</p>
          {hasDiscount && (
            <p className="text-lg text-gray-400 line-through">
              &#8358;{originalPrice.toLocaleString()}
            </p>
          )}
        </div>
        <div className="mb-4 flex w-max items-center gap-2 rounded-xl border border-gray-500 p-2">
          <motion.button
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            className="rounded-xl bg-red-500 p-1 text-white"
            variants={hoverButton}
            whileHover="hover"
          >
            <RemoveOutlined />
          </motion.button>
          <span className="font-bold text-gray-800">{quantity}</span>
          <motion.button
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="rounded-xl bg-green-500 p-1 text-white"
            variants={hoverButton}
            whileHover="hover"
          >
            <AddOutlined />
          </motion.button>
        </div>

        <section>
          <div className="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 shadow-lg sm:hidden">
            <div className="flex flex-wrap gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-1"
              >
                <button
                  onClick={handleBuyNow}
                  disabled={isBuying || cartIsLoading}
                  className="flex w-full items-center justify-center rounded-md bg-[#FF8C48] py-3 text-center font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-500"
                >
                  {isBuying ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-1"
              >
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || cartIsLoading}
                  className="flex w-full items-center justify-center rounded-md bg-[#030359] py-3 text-center font-semibold text-white shadow-md transition-all duration-300"
                >
                  {isAdding ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-1"
              >
                <Link
                  href={`/part-payment/${product.id}`}
                  className="flex items-center justify-center rounded-md border border-[#030359] bg-none py-3 text-center text-[0.9rem] font-semibold text-[#030359] shadow-md transition-all duration-300"
                >
                  Part Payment
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="hidden flex-col gap-2 sm:flex lg:flex-row">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-1"
            >
              <button
                onClick={handleBuyNow}
                disabled={isBuying || cartIsLoading}
                className="flex w-full items-center justify-center rounded-md bg-[#FF8C48] py-3 text-center font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-500"
              >
                {isBuying ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Buy Now"
                )}
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-1"
            >
              <button
                onClick={handleAddToCart}
                disabled={isAdding || cartIsLoading}
                className="flex w-full items-center justify-center rounded-md bg-[#030359] py-3 text-center font-semibold text-white shadow-md transition-all duration-300"
              >
                {isAdding ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Add to Cart"
                )}
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-1"
            >
              <Link
                href={`/part-payment/${product.id}`}
                className="flex items-center justify-center rounded-md border border-[#030359] bg-none py-3 text-center text-[0.9rem] font-semibold text-[#030359] shadow-md transition-all duration-300"
              >
                Part Payment
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default ProductSettings;
