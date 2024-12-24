import { review } from "@/app/data/dummyTypes";
import { Star } from "@mui/icons-material";
import Image from "next/image";

const Review = ({ review }: { review: review }) => {
  return (
    <>
      <div className="flex flex-wrap items-start gap-4 sm:gap-6">
        <Image
          src={review.user.avatar}
          alt={review.user.fullName}
          height={56}
          width={56}
          className="rounded-full"
        />

        <div className="flex-1">
          <p className="font-medium text-sm text-gray-800 sm:text-base">{review.user.fullName}</p>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <Star
                    fontSize="inherit"
                    key={index}
                    className={
                      currentRating > Number(review.rating)
                        ? "text-gray-300"
                        : "text-accent-900"
                    }
                  />
                );
              })}
            </div>
            <span>•</span>
            <span>{review.rating} rating</span>
            <span>•</span>
            <span>{review.date}</span>
          </div>

          <p className="text-sm text-gray-700 sm:text-base">{review.message}</p>
          {review.images && review.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
            {review.images?.map((image) => (
              <Image
                key={image.id}
                src={image.imgSrc}
                alt={image.alt}
                height={240}
                width={240}
                className="rounded-xl"
              />
            ))}
          </div>
          )}
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default Review;
