import { vendorDetails } from "@/app/data/dummyData";
import { review } from "@/app/data/dummyTypes";
import { ArrowDownwardOutlined, Star } from "@mui/icons-material";
import ReviewList from "./review-list";

const Reviews = ({ reviews }: { reviews: review[] }) => {
  const stars = 4;
  return (
    <>
      <section className="flex items-center justify-between">
        <div className="text-gray-800">
          <div className="mb-2 flex items-center gap-4">
            <span className="text-8xl font-bold">4.0</span>
            <div>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <Star
                    fontSize="large"
                    key={index}
                    className={`${currentRating > stars ? "text-gray-300" : "text-accent-900"} text-9xl`}
                  />
                );
              })}
            </div>
          </div>
          <p className="text-lg">
            Based on {vendorDetails.reviews.numberOfReviews} verified ratings
          </p>
        </div>

        <div>
          {vendorDetails.reviews.reviewDistribution.map((review, index) => (
            <div key={review.id} className="mb-4 flex items-center gap-2">
              <span className="font-medium text-gray-800">
                {index + 1} star
              </span>
              <span className="relative h-3 w-72 rounded-full bg-gray-100">
                <span className="absolute left-0 top-0 h-full w-4/5 rounded-full bg-accent-900" />
              </span>
              <span>{review.amount} reviews</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8" />

      <ReviewList />

      <button className="button button-secondary mx-auto flex items-center gap-2 px-4 py-2">
        <span>View more</span>
        <ArrowDownwardOutlined fontSize="inherit" />
      </button>
    </>
  );
};

export default Reviews;
