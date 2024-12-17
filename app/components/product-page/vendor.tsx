import { products } from "@/app/data/dummyData";
import { vendorData } from "@/app/data/dummyTypes";
import Image from "next/image";
import Link from "next/link";
import ProductCardV2 from "../product-card/product-card-v2";
import { Star } from "@mui/icons-material";

const Vendor = ({ vendor }: { vendor: vendorData }) => {
  return (
    <>
      {/* Vendor Info Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-4 py-4">
          <Image
            src="https://utfs.io/f/wLDjZbdcJHpRwUxnbJdcJHpRXbA30unyQodDaS1eNV2Cxwmk"
            alt="Hozier Hactor"
            height={72}
            width={72}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-gray-800 text-center md:text-left">
              {vendor.name}
            </p>
            <p className="text-center md:text-left">
              {vendor.numberOfProducts} products posted
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2">
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

        {/* Website Link */}
        <Link
          href="https://google.com"
          className="button button-secondary px-4 py-2 w-full md:w-auto text-center"
        >
          Visit website
        </Link>
      </section>

      <hr className="mb-4" />

      {/* Product Grid Section */}
      <section>
        <p className="mb-4 font-medium text-gray-800 text-center md:text-left">
          Products listed
        </p>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCardV2 key={product.id} productData={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Vendor;
