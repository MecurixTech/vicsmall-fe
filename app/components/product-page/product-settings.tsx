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
import ColorSelector from "./color-selector";
import VariantSelector from "./variant-selector";
import { useState } from "react";
import ProductGallery from "./product-gallery";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const hoverButton = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const ProductSettings = () => {
  const [quantity, setQuantity] = useState(1);
  const [price] = useState(25000);
  const [selectedColor, setSelectedColor] = useState<
    "black" | "red" | "orange" | "gray" | null
  >(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev); // Toggle state
  };

  const handleColorSelect = (color: "black" | "red" | "orange" | "gray") => {
    setSelectedColor(color);
  };

  const totalPrice = price * quantity;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-gray-50 rounded-xl shadow-lg w-full"
      initial="initial"
      animate="animate"
    >
      {/* Product Gallery */}
      <motion.div className="w-full md:w-1/2" variants={fadeIn}>
        <ProductGallery selectedColor={selectedColor} />
      </motion.div>

      {/* Product Details */}
      <motion.div
        className="flex-1 rounded-xl bg-white p-4 shadow-lg"
        variants={fadeIn}
      >
        {/* Top Section */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <motion.div
            className="flex items-center gap-2 rounded-full bg-accent-900 px-4 py-2 text-sm font-medium text-neutral-dark-blue"
            whileHover={{ scale: 1.05 }}
          >
            <span>Shipped from abroad</span>
            <FlightTakeoffOutlined fontSize="inherit" />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFavorite}
            aria-label="Add to favorites"
            className={`p-1 transition-all duration-300 ${isFavorite ? "text-red-500" : "text-gray-700"
              }`}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
          </motion.button>
        </div>

        {/* Title and Rating */}
        <motion.h1
          className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold"
          whileHover={{ scale: 1.02 }}
        >
          Fashion Front Classic Men Leather Multilayer Bracelet Brown
        </motion.h1>
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
          <StarRating rating={3} size="inherit" />
          <span className="text-gray-400">3.0 (Based on 250 ratings)</span>
          <span>|</span>
          <span>45 items sold</span>
        </div>

        {/* Info Section */}
        <div className="mb-4 rounded-xl bg-neutral-light-gray p-4 shadow-inner">
  <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
    {/* Size Guide */}
    <div className="flex items-center gap-2">
      <StraightenOutlined />
      <span>Size guide</span>
    </div>
    {/* Delivery Return */}
    <div className="flex items-center gap-2">
      <AssignmentReturnOutlined />
      <span>Delivery return</span>
    </div>
    {/* Ask a Question */}
    <div className="flex items-center gap-2">
      <HelpOutlineOutlined />
      <span>Ask a question</span>
    </div>
  </div>

  {/* Guaranteed Safe Checkout and Share Section */}
  <div className="flex flex-col sm:flex-row justify-between gap-4">
    {/* Guaranteed Safe Checkout */}
    <div className="flex items-center gap-2 border-2 border-green-600 bg-green-50 p-2 font-medium text-green-600 rounded-lg">
      <GppGoodOutlined />
      <span>Guaranteed Safe Checkout</span>
    </div>

    {/* Share Section */}
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Share Text */}
      <div className="flex items-center gap-2">
        <ShareOutlined fontSize="inherit" />
        <span>Share:</span>
      </div>

      {/* Social Media Icons */}
      <div className="flex items-center gap-4">
        {/* Twitter */}
        <Link href="https://x.com">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full text-gray-700 hover:text-blue-500"
          >
            <Twitter fontSize="inherit" />
          </motion.div>
        </Link>

        {/* Facebook */}
        <Link href="https://facebook.com">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full text-gray-700 hover:text-blue-700"
          >
            <FacebookOutlined fontSize="inherit" />
          </motion.div>
        </Link>

        {/* YouTube */}
        <Link href="https://youtube.com">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full text-gray-700 hover:text-red-500"
          >
            <YouTube fontSize="inherit" />
          </motion.div>
        </Link>

        {/* Instagram */}
        <Link href="https://instagram.com">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full text-gray-700 hover:text-pink-600"
          >
            <Instagram fontSize="inherit" />
          </motion.div>
        </Link>
      </div>
    </div>
  </div>
</div>


        {/* Color and Variant Selectors */}
        <ColorSelector onColorSelect={handleColorSelect} />
        <VariantSelector />

        {/* Pricing */}
        <hr className="my-2" />
        <p className="mb-2 text-sm">Estimated delivery on March 16, 2024</p>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-2xl font-semibold">
          <p className="text-gray-800">&#8358;{totalPrice.toLocaleString()}</p>
          <p className="text-gray-400 line-through text-lg">&#8358;350,000</p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4 flex items-center gap-2 border border-gray-500 rounded-xl w-max p-2">
          <motion.button
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            className="p-1 bg-red-500 text-white rounded-xl"
            variants={hoverButton}
            whileHover="hover"
          >
            <RemoveOutlined />
          </motion.button>
          <span className="font-bold text-gray-800">{quantity}</span>
          <motion.button
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="p-1 bg-green-500 text-white rounded-xl"
            variants={hoverButton}
            whileHover="hover"
          >
            <AddOutlined />
          </motion.button>
        </div>

        {/* Buttons */}
        <section>
          {/* Mobile */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white p-4 shadow-lg sm:hidden">
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="flex-1">
                <Link href="https://spotify.com" className="flex items-center justify-center rounded-md bg-[#FF8C48] py-3 text-center font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-500">
                  Buy Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="flex-1">
                <Link href="https://spotify.com" className="flex items-center justify-center rounded-md bg-[#030359] py-3 text-center font-semibold text-white shadow-md transition-all duration-300">
                  Add to Cart
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="flex-1">
                <Link href="https://spotify.com" className="flex items-center justify-center rounded-md border border-[#030359] bg-none py-3 text-center font-semibold text-[#030359] text-[0.9rem] shadow-md transition-all duration-300">
                  Part Payment
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex flex-col lg:flex-row gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="flex-1">
              <Link href="https://spotify.com" className="flex items-center justify-center rounded-md bg-[#FF8C48] py-3 text-center font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-500">
                Buy Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="flex-1">
              <Link href="https://spotify.com" className="flex items-center justify-center rounded-md bg-[#030359] py-3 text-center font-semibold text-white shadow-md transition-all duration-300">
                Add to Cart
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="flex-1">
              <Link href="https://spotify.com" className="flex items-center justify-center rounded-md border border-[#030359] bg-none py-3 text-center font-semibold text-[#030359] text-[0.9rem] shadow-md transition-all duration-300">
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
