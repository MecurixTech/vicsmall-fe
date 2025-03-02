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
      className="relative flex h-[100px] sm:h-56 w-full sm:w-full items-end rounded-md text-neutral-light-gray"
    >
      {/* Desktop View */}
      <div className="hidden sm:block p-4">
        <p className="text-2xl font-bold leading-tight">{category.name}</p>
        <p className="text-sm">{category.numberOfProducts}+ products</p>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden w-full text-center p-2 bg-black bg-opacity-40 rounded-md">
        <p className="text-sm font-medium">{category.name}</p>
        <p className="text-xs">{category.numberOfProducts}+ products</p>
      </div>

      {/* CTA Button - Visible Only on Desktop */}
      <div className="hidden sm:block absolute -bottom-2 -right-2">
        <Link
          href="/product-details"
          className="grid h-12 w-12 place-content-center rounded-full bg-white shadow-lg"
        >
          <ArrowForwardOutlined className="text-gray-800" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
