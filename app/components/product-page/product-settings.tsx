"use client";

import {
  AddOutlined,
  AssignmentReturnOutlined,
  FacebookOutlined,
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

const ProductSettings = () => {
  return (
    <div className="flex-1 rounded-xl bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-accent-900 px-4 py-2 text-sm font-medium text-neutral-dark-blue">
          <span>Shipped from abroad</span>
          <FlightTakeoffOutlined fontSize="inherit" />
        </div>

        <button>
          <FavoriteBorderOutlined />
        </button>
      </div>

      <h1 className="mb-2 text-3xl">
        Fashion Front Classic Men Leather Multilayer Bracelet Brown
      </h1>
      <div className="mb-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <StarRating rating={3} size="inherit" />
        </div>
        <span className="text-gray-400">3.0 (Based on 250 ratings)</span>
        <span>|</span>
        <span>45 items sold</span>
      </div>

      <div className="mb-4 rounded-xl bg-neutral-light-gray p-4 shadow-inner">
        <div className="mb-4 flex items-center justify-between">
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

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-xl border-2 border-green-600 bg-green-50 p-2 font-medium text-green-600">
            <GppGoodOutlined />
            <span>Guaranteed Safe Checkout</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShareOutlined fontSize="inherit" />
              <span>Share:</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="https://x.com">
                <Twitter />
              </Link>
              <Link href="https://facebook.com">
                <FacebookOutlined />
              </Link>
              <Link href="https://youtube.com">
                <YouTube />
              </Link>
              <Link href="https://instagram.com">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-1">
        <ColorSelector />
      </div>
      <VariantSelector />

      <hr className="my-2" />

      <p className="mb-2">Estimated delivery on March 16, 2024</p>

      <div className="mb-2 flex items-center gap-4 text-2xl font-semibold">
        <p className="text-gray-800">&#8358;25,000</p>
        <p className="text-gray-400 line-through">&#8358;350,000</p>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <button className="grid h-8 w-8 place-content-center rounded-xl bg-neutral-light-gray">
          <RemoveOutlined fontSize="inherit" />
        </button>
        <span className="font-medium text-gray-800">1</span>
        <button className="grid h-8 w-8 place-content-center rounded-xl bg-neutral-light-gray">
          <AddOutlined fontSize="inherit" />
        </button>
      </div>

      <div className="flex gap-2">
        <Link
          href="https://spotify.com"
          className="button button-accent grid flex-1 place-content-center px-4 py-2"
        >
          Buy now
        </Link>
        <Link
          href="https://spotify.com"
          className="button button-primary grid flex-1 place-content-center px-4 py-2"
        >
          Add to cart
        </Link>
        <Link
          href="https://spotify.com"
          className="button button-secondary grid flex-1 place-content-center px-4 py-2"
        >
          Part payment
        </Link>
      </div>
    </div>
  );
};

export default ProductSettings;
