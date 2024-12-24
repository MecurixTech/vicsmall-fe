import Navbar from "./components/navbar";
import Banner from "./components/home/banner";
import Link from "next/link";
import { ArrowForwardOutlined } from "@mui/icons-material";
import Slider from "./components/home/slider";
import CountdownTimer from "./components/home/countdown-timer";
import { categories, products, vendorDetails } from "./data/dummyData";
import ProductCard from "./components/product-card/product-card";
import CategoryCard from "./components/home/category-card";
import VendorCard from "./components/home/vendors";
import Footer from "./components/footer";
import Stacks from "./components/home/stacks";
import RecommendSection from "./components/product-card/recommended-card";
import DescriptionSection from "./components/home/description";

const Home = () => {
  return (
    <>
      <Banner />
      <section className="mx-auto my-12 w-[90%] block sm:hidden">
        <h2 className="mb-12 text-center text-xl font-medium text-black">Explore our Top Categories</h2>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>



      <section
        style={{
          backgroundImage:
            "linear-gradient(to right, #FF4040, #FF0202), url('https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP')",
        }}
        className="relative my-12 w-full overflow-hidden block sm:hidden"
      >
        <div className="relative z-10 flex flex-col items-center justify-evenly px-4 py-8 lg:flex-row lg:items-center lg:py-12">
          <div className="flex flex-col items-center text-center lg:items-center lg:text-left">
            <h2 className="text-[32px] font-black leading-[47px] text-neutral-light-gray lg:text-[47px]">
              Flash Sales
            </h2>

            <p className="mt-4 max-w-[500px] text-[16px] font-normal leading-[23px] text-neutral-light-gray lg:text-[18px]">
              Use coupon code <span className="font-bold">#VICSMALLSHIP</span>{" "}
              to get up to 90% off!!
            </p>
          </div>

          <CountdownTimer hours={3} minutes={36} seconds={14} />
        </div>

        <div className="scrollbar-hide relative z-10 mb-11 mt-5 flex gap-6 overflow-x-auto px-4 lg:px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <div className=" block sm:hidden">
        <Banner />
      </div>






      <section
        style={{
          backgroundImage:
            "linear-gradient(to right, #FF4040, #FF0202), url('https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP')",
        }}
        className="relative my-12 w-full overflow-hidden hidden sm:block"
      >
        <div className="relative z-10 flex flex-col items-center justify-evenly px-4 py-8 lg:flex-row lg:items-center lg:py-12">
          <div className="flex flex-col items-center text-center lg:items-center lg:text-left">
            <h2 className="text-[32px] font-black leading-[47px] text-neutral-light-gray lg:text-[47px]">
              Flash Sales
            </h2>

            <p className="mt-4 max-w-[500px] text-[16px] font-normal leading-[23px] text-neutral-light-gray lg:text-[18px]">
              Use coupon code <span className="font-bold">#VICSMALLSHIP</span>{" "}
              to get up to 90% off!!
            </p>
          </div>

          <CountdownTimer hours={3} minutes={36} seconds={14} />
        </div>

        <div className="scrollbar-hide relative z-10 mb-11 mt-5 flex gap-6 overflow-x-auto px-4 lg:px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto my-14 w-[95%]">
        <div className="flex items-center justify-between">
          <h3 className="mb-4">Male Shirts</h3>
          <Link
            href="/male-shirts"
            className="flex items-center gap-1 font-medium text-neutral-dark-blue"
          >
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>
        <div className=" hidden sm:block">
          <Slider />
        </div>
        <div className=" block sm:hidden">
          <Stacks />
        </div>
      </section>

      <section className="mx-auto my-14 w-[95%]">
        <div className="flex items-center justify-between">
          <h3 className="mb-4">Watches</h3>
          <Link
            href="/watches"
            className="flex items-center gap-1 font-medium text-neutral-dark-blue"
          >
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>
        <Slider />
      </section>

      <section className="my-12 w-full overflow-hidden bg-[#1E1E1E] py-16">
        <h2 className="mb-12 text-center text-neutral-light-gray">
          For the Ladies
        </h2>
        <div >

          <div className=" hidden sm:block">
            <div className="scrollbar-hide relative z-10 mb-11 mt-5 flex gap-6 overflow-x-auto px-4 lg:px-8 ">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>


          <div className=" block sm:hidden">
            <Stacks />
          </div>
          <div className=" justify-items-center">
            <button className="mt-6 flex items-center px-8 py-3 border text-white border-white text-[16px] sm:text-[18px] font-medium rounded-[8px] hover:bg-opacity-90 transition-all">
              View more{"  "}
              <ArrowForwardOutlined fontSize="inherit" />
            </button>
          </div>

        </div>


      </section>

      <section className="mx-auto my-12 w-[90%] block sm:hidden">
        <div className="flex justify-between">
          <h2 className="mb-12 text-left text-xl font-medium text-black">
            Vendors
          </h2>
          <Link
            href="/vendors"
            className="items-right justify-end text-right gap-1 font-medium text-neutral-dark-blue"
          >
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>


        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendorDetails.map((vendor) => (
            <VendorCard key={vendor.name} vendor={vendor} />
          ))}
        </div>
      </section>


      <section className="mx-auto my-14 w-[95%]">
        <div className="flex items-center justify-between">
          <h3 className="mb-4">Male Shoes</h3>
          <Link
            href="/mens-shoes"
            className="flex items-center gap-1 font-medium text-neutral-dark-blue"
          >
            <span>View more</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>
        <div className=" hidden sm:block">
          <Slider />
        </div>
        <div className=" block sm:hidden">
          <Stacks />
        </div>

      </section>

      <section className="mx-auto my-14 w-[95%] hidden sm:block">
        <h3 className="mb-4">Recommended items</h3>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="mx-auto my-14 w-[95%] block sm:hidden">
        <h3 className="mb-4">Recommended items</h3>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <RecommendSection key={product.id} product={product} />
          ))}
        </div>
      </section>
      <div className=" block sm:hidden">
        <DescriptionSection />
      </div>

      <Footer />
    </>
  );
};

export default Home;
