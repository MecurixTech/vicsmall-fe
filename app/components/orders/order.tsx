import { order } from "@/app/data/dummyTypes";
import Image from "next/image";

const Order = ({ order }: { order: order }) => {
  return (
    <>
      <div className="flex items-start gap-4">
        <Image
          src={order.productDetails.imgSrc}
          alt={order.productDetails.productName}
          height={128}
          width={128}
          className="rounded-xl"
        />

        <div className="w-full">
          <p>{order.productDetails.productName}</p>
          <p className="mb-2 text-lg font-semibold text-gray-800">
            &#8358;{order.productDetails.price}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span
              className={`${order.status === "delivered" ? "bg-green-100 text-green-600" : order.status === "in transit" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"} mr-auto rounded-xl p-2 text-xs font-medium capitalize`}
            >
              {order.status}
            </span>

            <div className="flex flex-wrap gap-2">
              <button className="button button-accent px-4 py-2">
                Details
              </button>

              {order.status === "in transit" ? (
                <button className="button border-2 border-red-600 px-4 py-2 text-red-600">
                  Cancel order
                </button>
              ) : (
                order.status === "delivered" && (
                  <button className="button button-secondary px-4 py-2">
                    Tracking
                  </button>
                )
              )}

              {order.status !== "cancelled" && (
                <button className="button button-primary px-4 py-2">
                  Write review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 last:hidden" />
    </>
  );
};

export default Order;
