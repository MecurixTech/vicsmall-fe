import { products } from "@/app/data/dummyData";
import { vendor } from "@/app/data/dummyTypes";
import Image from "next/image";
import Link from "next/link";
import ProductCardV2 from "../product-card/product-card-v2";
import { Star } from "@mui/icons-material";

const Vendor = ({ vendor }: { vendor: vendor }) => {
  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4 py-4">
          <Image
            src="https://utfs.io/f/wLDjZbdcJHpRwUxnbJdcJHpRXbA30unyQodDaS1eNV2Cxwmk"
            alt="Hozier Hactor"
            height={72}
            width={72}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-gray-800">{vendor.name}</p>
            <p>{vendor.numberOfProducts} products posted</p>
            <div className="flex items-center gap-2">
              <div>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <Star
                      fontSize="inherit"
                      key={index}
                      className={
                        currentRating > Number(vendor.reviews.averageRating)
                          ? "text-gray-300"
                          : "text-accent-900"
                      }
                    />
                  );
                })}
              </div>
              <span>•</span>
              <span>{vendor.reviews.averageRating} overall rating</span>
            </div>
          </div>
        </div>

        <Link
          href="https://google.com"
          className="button button-secondary px-4 py-2"
        >
          Visit website
        </Link>
      </section>

      <hr className="mb-4" />

      <section>
        <p className="mb-4 font-medium text-gray-800">Products listed</p>
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCardV2 key={product.id} productData={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Vendor;
