import { review } from "@/app/data/dummyTypes";
import { Star } from "@mui/icons-material";
import Image from "next/image";

const Review = ({ review }: { review: review }) => {
  return (
    <>
      <div className="flex items-start gap-4">
        <Image
          src={review.user.avatar}
          alt={review.user.fullName}
          height={56}
          width={56}
          className="rounded-full"
        />

        <div>
          <p className="font-medium text-gray-800">{review.user.fullName}</p>
          <div className="mb-2 flex items-center gap-2">
            <div>
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

          <p>{review.message}</p>

          <div className="mt-4 flex flex-wrap gap-4">
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
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default Review;
