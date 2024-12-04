import { products } from "@/app/data/dummyData";
import Image from "next/image";
import Link from "next/link";
import ProductCardV2 from "../product-card/product-card-v2";

const Vendor = () => {
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
            <p className="font-medium text-gray-800">Hozier Hactor</p>
            <p>40 products posted</p>
            <div className="flex items-center gap-2">
              <span>stars</span>
              <span>•</span>
              <span>4.0 overall rating</span>
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
