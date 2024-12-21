import CardDetails from "@/app/components/payment-methods/card-details";
import { paymentMethods } from "@/app/data/dummyData";

const PaymentMethodsPage = () => {
  return (
    <>
      <h1 className="mb-4">Payment methods</h1>

      {paymentMethods.map((card) => (
        <CardDetails key={card.id} card={card} />
      ))}

      <button className="button button-accent px-4 py-2">Add new card</button>
    </>
  );
};

export default PaymentMethodsPage;
