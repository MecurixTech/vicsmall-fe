import { review } from "@/app/data/dummyTypes";
import { Star } from "@mui/icons-material";
import Image from "next/image";

const Review = ({ review }: { review: review }) => {
  return (
    <>
      {/* Review Container */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* User Avatar */}
        <Image
          src={review.user.avatar}
          alt={review.user.fullName}
          height={56}
          width={56}
          className="rounded-full w-16 h-16 sm:w-14 sm:h-14"
        />

        {/* Review Content */}
        <div className="flex-1">
          {/* User Name and Rating */}
          <p className="font-medium text-gray-800">{review.user.fullName}</p>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
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

          {/* Review Message */}
          <p className="text-sm sm:text-base">{review.message}</p>

          {/* Images */}
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
            {review.images?.map((image) => (
              <Image
                key={image.id}
                src={image.imgSrc}
                alt={image.alt}
                height={120}
                width={120}
                className="rounded-lg w-20 h-20 sm:w-32 sm:h-32 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default Review;
