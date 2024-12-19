import { vendorDetails } from "@/app/data/dummyData";
import { review } from "@/app/data/dummyTypes";
import { ArrowDownwardOutlined, Star } from "@mui/icons-material";
import ReviewList from "./review-list";
import Link from "next/link";

const Reviews = ({ reviews }: { reviews: review[] }) => {
  const stars = 4;
  return (
    <>
      <section className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center text-center text-gray-800 md:items-start md:text-left">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-6xl font-bold sm:text-7xl md:text-8xl">
              4.0
            </span>
            <div className="flex">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <Star
                    fontSize="inherit"
                    key={index}
                    className={`${
                      currentRating > stars
                        ? "text-gray-300"
                        : "text-accent-900"
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

        <div className="w-full md:w-1/2">
          {vendorDetails[0].reviews.reviewDistribution.map((review, index) => (
            <div
              key={review.id}
              className="mb-4 flex items-center gap-2 text-sm sm:text-base"
            >
              <span className="font-medium text-gray-800">
                {index + 1} star
              </span>
              <span className="relative h-3 w-full rounded-full bg-gray-100 sm:w-64 md:w-72">
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

      <hr className="my-8" />

      <ReviewList />

      <Link href="#">
        <button className="button button-secondary mx-auto flex items-center gap-2 px-4 py-2">
          <span>View more</span>
          <ArrowDownwardOutlined fontSize="inherit" />
        </button>
      </Link>
    </>
  );
};

export default Reviews;
