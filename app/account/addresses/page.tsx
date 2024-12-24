import AddressCard from "@/app/components/addresses/address-card";
import { addresses } from "@/app/data/dummyData";

const AddressesPage = () => {
  return (
    <>
      <h1 className="mb-4">Addresses</h1>

      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}

      <button className="button button-accent px-4 py-2">
        Add new address
      </button>
    </>
  );
};

export default AddressesPage;
