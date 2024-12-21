"use client";

import React from "react";
import Reviews from "../components/product-page/reviews-tab/reviews";
import { review } from "../data/dummyTypes";
import { ArrowLeft } from "@mui/icons-material";

const ReviewSection = ({ reviews }: { reviews: review[] }) => {
  return (
    <div className="pt-4">
  
      <div className="sticky top-0 z-10 bg-slate-100 mb-4 flex items-center gap-2 px-4">
     
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="text-4xl" />
        </button>

   
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Reviews</h1>
        </div>
      </div>

     
      <div className="px-4">
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewSection;
