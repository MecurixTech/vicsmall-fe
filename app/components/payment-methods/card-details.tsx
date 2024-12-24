import { card } from "@/app/data/dummyTypes";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import Image from "next/image";

const CardDetails = ({ card }: { card: card }) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={card.cardType.imgSrc}
            alt={card.cardType.name}
            height={64}
            width={64}
          />
          <div>
            <p>{card.nameOnCard}</p>
            <p className="font-bold text-gray-800">{card.cardNumber}</p>
            <p>{card.cardType.name}</p>
          </div>
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

export default CardDetails;
