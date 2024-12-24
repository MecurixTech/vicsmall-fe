import { vendorData } from "@/app/data/dummyTypes";
import { ArrowForwardOutlined } from "@mui/icons-material";
import Link from "next/link";

const VendorCard = ({ vendor }: { vendor: vendorData }) => {
    const cardStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${vendor.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div
            style={cardStyle}
            className="relative flex flex-wrap justify-end items-center h-[98px] sm:h-64 w-[100px] sm:w-full rounded-md text-neutral-light-gray shadow-lg"
        >

            <div className="hidden sm:block w-full">
                <div className="sm:px-6 py-4 text-center">
                    <p className="mb-2 text-2xl font-bold leading-tight">{vendor.name}</p>
                    <p>{vendor.numberOfProducts}+ products</p>
                    <p className="text-sm">
                        {vendor.reviews.averageRating} stars | {vendor.reviews.numberOfReviews} reviews
                    </p>
                </div>
            </div>


            <div className="block sm:hidden w-full">
                <div className="sm:px-6 py-4 text-center">
                    <p className="mb-2 text-base font-medium leading-snug sm:text-2xl sm:font-bold sm:leading-tight">
                        {vendor.name}
                    </p>
                </div>
            </div>


            <div className="hidden sm:block">
                <div className="absolute -bottom-2 -right-2 grid h-16 w-16 place-content-center rounded-full bg-neutral-light-gray text-gray-800">
                    <Link
                        href="/vendor-details"
                        className="grid h-12 w-12 place-content-center rounded-full bg-white shadow-lg"
                    >
                        <ArrowForwardOutlined />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VendorCard;
