import Image from "next/image";

const Shipping = () => {
  return (
    <>
      <section className="mb-8">
        <p className="mb-2 font-semibold text-gray-800">Shipping Details</p>
        <p className="mb-2">
          Please pay more attention to your order address which MUST MATCH your
          shipping address. (If you are from Russia, Please leave your full
          name. It is very important). Items will be shipped within 3 business
          days after payment.
        </p>
        <p className="mb-4">
          Please check items when delivered, if damaged, please kindly accept it
          and contact us immediately. We will make a confirmation and resend you
          a new one.
        </p>

        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Shipping by</th>
              <th>Shipping cost</th>
              <th>Estimated delivery time</th>
              <th>Tracking information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Thembay Express</td>
              <td>Free shipping</td>
              <td>12 - 20 days</td>
              <td>Not available</td>
            </tr>
            <tr>
              <td>LEX</td>
              <td>$20.00 - $50.00</td>
              <td>04 - 12 days</td>
              <td>Available</td>
            </tr>
            <tr>
              <td>Lorem EX</td>
              <td>$26.00 - $70.00</td>
              <td>03 - 17 days</td>
              <td>Available</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="flex items-center justify-between">
        <div>
          <p className="mb-2 font-semibold text-gray-800">Packaging Details</p>
          <p className="mb-2">Unit type: Piece</p>
          <p className="mb-2">
            Package Size: 25cm x 32cm x 5cm (9.84in x 12.60in x 1.97in)
          </p>
          <p className="mb-2">Package Weight: 0.56kg (1.23lb)</p>
        </div>

        <Image
          src="https://utfs.io/f/wLDjZbdcJHpROdJwKYhJGvZCKhNsX5DTR0yukSmjMFE2Aezw"
          alt="Woman with boxes"
          height={320}
          width={320}
        />
      </section>
    </>
  );
};

export default Shipping;
