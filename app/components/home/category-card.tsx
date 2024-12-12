import { categoryData } from "@/app/data/dummyTypes";
import { ArrowForwardOutlined } from "@mui/icons-material";
import Link from "next/link";

const CategoryCard = ({ category }: { category: categoryData }) => {
  const cardStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 100)), url(${category.imgSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div
      style={cardStyle}
      className="relative flex h-[98px] sm:h-56 w-[100px] sm:w-full items-end rounded-md text-neutral-light-gray"
    >
      <div className=" hidden sm:block">
        <div className="pl-6 sm:px-6 py-4">
          <p className="mb-2 max-w-[80%] text-2xl font-bold leading-tight">
            {category.name}
          </p>
          <p>{category.numberOfProducts}+ products</p>
        </div>
      </div>



      <div className=" block sm:hidden">
        <div className="sm:px-6 py-4 text-center">
          <p className="mb-2 mx-auto max-w-[90%] sm:max-w-[80%] sm:text-2xl text-base sm:font-bold sm:leading-tight font-medium leading-snug">
            {category.name}
          </p>
          <p className="text-xs font-normal leading-none text-white sm:text-[10px] px-2">
            {category.numberOfProducts}+ products
          </p>
        </div>
      </div>

      <div className=" hidden sm:block">
        <div className=" absolute -bottom-2 -right-2 grid h-16 w-16 place-content-center rounded-full bg-neutral-light-gray text-gray-800">

          <Link
            href="/product-details"
            className="grid  h-12 w-12 place-content-center rounded-full bg-white shadow-lg"
          >
            <ArrowForwardOutlined />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CategoryCard;
