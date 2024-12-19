import { products } from "@/app/data/dummyData";
import { vendorData } from "@/app/data/dummyTypes";
import Image from "next/image";
import Link from "next/link";
import ProductCardV2 from "../product-card/product-card-v2";
import { Star } from "@mui/icons-material";

const Vendor = ({ vendor }: { vendor: vendorData }) => {
  return (
    <>
      <section className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
        <div className="flex items-center gap-4 py-4">
          <Image
            src="https://utfs.io/f/wLDjZbdcJHpRwUxnbJdcJHpRXbA30unyQodDaS1eNV2Cxwmk"
            alt="Hozier Hactor"
            height={72}
            width={72}
            className="rounded-full"
          />
          <div>
            <p className="text-center font-medium text-gray-800 md:text-left">
              {vendor.name}
            </p>
            <p className="text-center md:text-left">
              {vendor.numberOfProducts} products posted
            </p>
            <div className="flex items-center justify-center gap-2 md:justify-start">
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
          className="button button-secondary w-full px-4 py-2 text-center md:w-auto"
        >
          Visit website
        </Link>
      </section>

      <hr className="mb-4" />

      <section>
        <p className="mb-4 text-center font-medium text-gray-800 md:text-left">
          Products listed
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCardV2 key={product.id} productData={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Vendor;
