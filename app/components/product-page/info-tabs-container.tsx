"use client";

import { useState } from "react";
import Overview from "./overview";
import Reviews from "./reviews";
import Vendor from "./vendor";
import Shipping from "./shipping";

const InfoTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  return (
    <section className="rounded-xl bg-white px-4 py-2 shadow-lg">
      <div className="mb-4 flex items-center rounded-lg text-gray-400">
        <button
          onClick={() => setActiveTab("overview")}
          className={`${activeTab === "overview" ? "bg-white font-medium text-gray-600" : "bg-neutral-light-gray text-gray-400"} rounded-l-xl border px-4 py-2`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`${activeTab === "reviews" ? "bg-white font-medium text-gray-600" : "bg-neutral-light-gray text-gray-400"} border px-4 py-2`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("vendor")}
          className={`${activeTab === "vendor" ? "bg-white font-medium text-gray-600" : "bg-neutral-light-gray text-gray-400"} border px-4 py-2`}
        >
          Vendor info
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`${activeTab === "shipping" ? "bg-white font-medium text-gray-600" : "bg-neutral-light-gray text-gray-400"} rounded-r-xl border px-4 py-2`}
        >
          Shipping
        </button>
      </div>

      {activeTab === "overview" && <Overview />}
      {activeTab === "reviews" && <Reviews />}
      {activeTab === "vendor" && <Vendor />}
      {activeTab === "shipping" && <Shipping />}
    </section>
  );
};

export default InfoTabs;
