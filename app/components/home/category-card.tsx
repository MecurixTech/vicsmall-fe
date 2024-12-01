import { categoryData } from "@/app/data/dummyTypes";
import { ArrowForwardOutlined } from "@mui/icons-material";
import Link from "next/link";

const CategoryCard = (data: categoryData) => {
  const cardStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 100)), url(${data.imgSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div
      style={cardStyle}
      className="relative flex h-56 w-full items-end rounded-md text-neutral-light-gray"
    >
      <div className="px-6 py-4">
        <p className="mb-2 max-w-[80%] text-2xl font-bold leading-tight">
          {data.name}
        </p>
        <p>{data.numberOfProducts}+ products</p>
      </div>

      <div className="absolute -bottom-2 -right-2 grid h-16 w-16 place-content-center rounded-full bg-neutral-light-gray text-gray-800">
        <Link
          href="/product-details"
          className="grid h-12 w-12 place-content-center rounded-full bg-white shadow-lg"
        >
          <ArrowForwardOutlined />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
