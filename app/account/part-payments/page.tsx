import PartPaymentDetails from "@/app/components/part-payments/part-payment-details";
import { orders } from "@/app/data/dummyData";
import { SearchOutlined, TuneOutlined } from "@mui/icons-material";

const PartPaymentsPage = () => {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h1>Part payments</h1>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              placeholder="Search part payments"
              className="pl-10"
            />
          </div>
          <button className="button button-secondary flex items-center gap-2 px-4">
            <span>Filter</span>
            <TuneOutlined fontSize="inherit" />
          </button>
        </div>
      </div>

      {orders.map((order) => (
        <PartPaymentDetails key={order.id} order={order} />
      ))}
    </>
  );
};

export default PartPaymentsPage;
