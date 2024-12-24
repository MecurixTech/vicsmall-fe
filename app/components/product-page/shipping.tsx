import Image from "next/image";

const Shipping = () => {
  return (
    <>
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

        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-200 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-2 py-2 text-sm sm:text-base">
                  Shipping by
                </th>
                <th className="border border-gray-200 px-2 py-2 text-sm sm:text-base">
                  Shipping cost
                </th>
                <th className="border border-gray-200 px-2 py-2 text-sm sm:text-base">
                  Estimated delivery time
                </th>
                <th className="border border-gray-200 px-2 py-2 text-sm sm:text-base">
                  Tracking information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-2 py-2">
                  Thembay Express
                </td>
                <td className="border border-gray-200 px-2 py-2">
                  Free shipping
                </td>
                <td className="border border-gray-200 px-2 py-2">
                  12 - 20 days
                </td>
                <td className="border border-gray-200 px-2 py-2">
                  Not available
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-2 py-2">LEX</td>
                <td className="border border-gray-200 px-2 py-2">
                  $20.00 - $50.00
                </td>
                <td className="border border-gray-200 px-2 py-2">
                  04 - 12 days
                </td>
                <td className="border border-gray-200 px-2 py-2">Available</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-2 py-2">Lorem EX</td>
                <td className="border border-gray-200 px-2 py-2">
                  $26.00 - $70.00
                </td>
                <td className="border border-gray-200 px-2 py-2">
                  03 - 17 days
                </td>
                <td className="border border-gray-200 px-2 py-2">Available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col-reverse items-center justify-between gap-4 px-4 sm:flex-row sm:px-8">
        <div className="text-sm sm:text-base">
          <p className="mb-2 font-semibold text-gray-800">Packaging Details</p>
          <p className="mb-2">Unit type: Piece</p>
          <p className="mb-2">
            Package Size: 25cm x 32cm x 5cm (9.84in x 12.60in x 1.97in)
          </p>
          <p className="mb-2">Package Weight: 0.56kg (1.23lb)</p>
        </div>
        
        <div className="flex justify-center sm:justify-end">
          <Image
            src="https://utfs.io/f/wLDjZbdcJHpROdJwKYhJGvZCKhNsX5DTR0yukSmjMFE2Aezw"
            alt="Woman with boxes"
            height={320}
            width={320}
            className="h-auto w-[240px] rounded-lg object-cover sm:w-[320px]"
            priority
          />
        </div>
      </section>
    </>
  );
};

export default Shipping;
