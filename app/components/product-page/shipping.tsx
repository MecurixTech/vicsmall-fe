import Image from "next/image";

const Shipping = () => {
  return (
    <>
      {/* Shipping Details */}
      <section className="mb-8 px-4 sm:px-8">
        <p className="mb-2 text-lg font-semibold text-gray-800">
          Shipping Details
        </p>
        <p className="mb-2 text-sm sm:text-base">
          Please pay more attention to your order address which MUST MATCH your
          shipping address. (If you are from Russia, Please leave your full
          name. It is very important). Items will be shipped within 3 business
          days after payment.
        </p>
        <p className="mb-4 text-sm sm:text-base">
          Please check items when delivered, if damaged, please kindly accept it
          and contact us immediately. We will make a confirmation and resend you
          a new one.
        </p>

        {/* Responsive Table */}
        <div className="overflow-auto">
          <table className="w-full text-center border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2 border border-gray-200 text-sm sm:text-base">
                  Shipping by
                </th>
                <th className="px-2 py-2 border border-gray-200 text-sm sm:text-base">
                  Shipping cost
                </th>
                <th className="px-2 py-2 border border-gray-200 text-sm sm:text-base">
                  Estimated delivery time
                </th>
                <th className="px-2 py-2 border border-gray-200 text-sm sm:text-base">
                  Tracking information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-2 border border-gray-200">
                  Thembay Express
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  Free shipping
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  12 - 20 days
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  Not available
                </td>
              </tr>
              <tr>
                <td className="px-2 py-2 border border-gray-200">LEX</td>
                <td className="px-2 py-2 border border-gray-200">
                  $20.00 - $50.00
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  04 - 12 days
                </td>
                <td className="px-2 py-2 border border-gray-200">Available</td>
              </tr>
              <tr>
                <td className="px-2 py-2 border border-gray-200">Lorem EX</td>
                <td className="px-2 py-2 border border-gray-200">
                  $26.00 - $70.00
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  03 - 17 days
                </td>
                <td className="px-2 py-2 border border-gray-200">Available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Packaging Details */}
      <section className="flex flex-col-reverse sm:flex-row items-center justify-between px-4 sm:px-8 gap-4">
        {/* Text Content */}
        <div className="text-sm sm:text-base">
          <p className="mb-2 font-semibold text-gray-800">Packaging Details</p>
          <p className="mb-2">Unit type: Piece</p>
          <p className="mb-2">
            Package Size: 25cm x 32cm x 5cm (9.84in x 12.60in x 1.97in)
          </p>
          <p className="mb-2">Package Weight: 0.56kg (1.23lb)</p>
        </div>

        {/* Responsive Image */}
        <div className="flex justify-center sm:justify-end">
          <Image
            src="/woman-with-boxes.jpg"
            alt="Woman with boxes"
            height={320}
            width={320}
            className="h-auto w-[240px] sm:w-[320px] object-cover rounded-lg"
            priority
          />
        </div>
      </section>
    </>
  );
};

export default Shipping;
