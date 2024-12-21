import { order } from "@/app/data/dummyTypes";
import Image from "next/image";

const PartPaymentDetails = ({ order }: { order: order }) => {
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
          <p className="mb-2">{order.productDetails.productName}</p>

          <div className="flex flex-wrap justify-between gap-8">
            <div className="w-1/2 rounded-xl bg-neutral-light-gray p-4">
              <div className="flex flex-wrap items-center justify-between">
                <span>Total cost:</span>
                <span className="font-semibold text-gray-800">
                  {order.productDetails.price}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <span>Payment made:</span>
                <span className="font-semibold text-gray-800">
                  {order.paymentMade}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <span>Balance:</span>
                <span className="font-semibold text-gray-800">
                  {order.balance}
                </span>
              </div>
            </div>

            {order.balance === "0" ? (
              <p className="font-semibold text-green-600">Payment complete</p>
            ) : (
              <div>
                <p className="mb-4 font-semibold text-red-600">
                  Payment incomplete
                </p>
                <div className="flex gap-2">
                  <button className="button button-secondary px-4 py-2">
                    Pay part
                  </button>
                  <button className="button button-accent px-4 py-2">
                    Pay full
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-4" />
    </>
  );
};

export default PartPaymentDetails;
