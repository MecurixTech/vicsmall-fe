"use client"

import { vendorDetails } from "@/app/data/dummyData";
import { review } from "@/app/data/dummyTypes";
import { ArrowBackOutlined, ArrowDownwardOutlined, Star } from "@mui/icons-material";
import ReviewList from "../components/product-page/reviews-tab/review-list";

const Reviews = ({ reviews }: { reviews: review[] }) => {
  const stars = 4;

  return (
    <>
      {/* Back Button and Title */}
      <div className="flex items-center gap-2 mb-4">
        <ArrowBackOutlined fontSize="large" className="text-gray-800 cursor-pointer" />
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Reviews</h1>
      </div>

      {/* Overall Review Section */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-8">
        {/* Left Section - Overall Rating */}
        <div className="text-gray-800 flex flex-col items-center sm:items-start text-center sm:text-left mb-8 sm:mb-0">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-6xl sm:text-7xl md:text-8xl font-bold">4.0</span>
            <div className="flex">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <Star
                    fontSize="inherit"
                    key={index}
                    className={`${
                      currentRating > stars ? "text-gray-300" : "text-accent-900"
                    } text-4xl sm:text-5xl`}
                  />
                );
              })}
            </div>
          </div>
          <p className="text-sm sm:text-lg">
            Based on {vendorDetails[0].reviews.numberOfReviews} verified ratings
          </p>
        </div>

        {/* Right Section - Review Distribution */}
        <div className="w-full sm:w-1/2">
          {vendorDetails[0].reviews.reviewDistribution.map((review, index) => (
            <div
              key={review.id}
              className="mb-4 flex items-center gap-2 text-sm sm:text-base"
            >
              <span className="font-medium text-gray-800">{index + 1} star</span>
              <span className="relative h-3 w-full sm:w-64 md:w-72 rounded-full bg-gray-100">
                <span
                  className="absolute left-0 top-0 h-full rounded-full bg-accent-900"
                  style={{
                    width: `${(review.amount / vendorDetails[0].reviews.numberOfReviews) * 100}%`,
                  }}
                />
              </span>
              <span className="whitespace-nowrap">{review.amount} reviews</span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr className="my-8" />

      {/* Review List Section */}
      <ReviewList />
    </>
  );
};

export default Reviews;
