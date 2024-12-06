"use client";

import { reviews } from "@/app/data/dummyData";
import { useState } from "react";
import Review from "./review";

const ReviewList = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  return (
    <section>
      <div className="mb-8 flex gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`${activeTab === "all" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          All reviews (2000)
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`${activeTab === "images" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          With images (340)
        </button>
        <button
          onClick={() => setActiveTab("1-star")}
          className={`${activeTab === "1-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          1 star (0)
        </button>
        <button
          onClick={() => setActiveTab("2-star")}
          className={`${activeTab === "2-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          2 stars (200)
        </button>
        <button
          onClick={() => setActiveTab("3-star")}
          className={`${activeTab === "3-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          3 stars (500)
        </button>
        <button
          onClick={() => setActiveTab("4-star")}
          className={`${activeTab === "4-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          4 stars (100)
        </button>
        <button
          onClick={() => setActiveTab("5-star")}
          className={`${activeTab === "5-star" ? "border-accent-900 bg-accent-100 font-medium text-accent-900" : "border-gray-600"} rounded-full border px-4 py-2 text-sm`}
        >
          5 stars (1200)
        </button>
      </div>

      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </section>
  );
};

export default ReviewList;
