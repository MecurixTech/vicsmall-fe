import Navbar from "./components/navbar";
import Banner from "./components/home/banner";
import Link from "next/link";
import { ArrowForwardOutlined } from "@mui/icons-material";
import MensShoesSlider from "./components/home/mens-shoes-slider";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />

      <section className="mx-auto mt-14 w-[90%]">
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
        <MensShoesSlider />
      </section>
    </>
  );
};

export default Home;
