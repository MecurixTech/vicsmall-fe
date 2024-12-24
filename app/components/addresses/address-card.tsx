import { address } from "@/app/data/dummyTypes";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

const AddressCard = ({ address }: { address: address }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{address.fullName}</p>
          <p className="font-bold text-gray-800">{address.address}</p>
          <p>{address.state}</p>
          <p>{address.phoneNumber}</p>
        </div>

        <div className="flex flex-col gap-4">
          <button>
            <DeleteOutlined color="error" />
          </button>
          <button>
            <EditOutlined />
          </button>
        </div>
      </div>

      <hr className="my-4 last:hidden" />
    </>
  );
};

export default AddressCard;
