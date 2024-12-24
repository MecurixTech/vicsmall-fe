import { notification } from "@/app/data/dummyTypes";
import {
  CheckOutlined,
  ErrorOutlineOutlined,
  HourglassTopOutlined,
} from "@mui/icons-material";

const Notification = ({ notification }: { notification: notification }) => {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {notification.status === "delivered" ? (
            <div className="grid min-h-12 min-w-12 place-content-center rounded-full bg-green-500 text-white">
              <CheckOutlined fontSize="medium" />
            </div>
          ) : notification.status === "shipped" ? (
            <div className="grid min-h-12 min-w-12 place-content-center rounded-full bg-yellow-500 text-white">
              <HourglassTopOutlined fontSize="medium" />
            </div>
          ) : (
            <div className="grid min-h-12 min-w-12 place-content-center rounded-full bg-red-500 text-white">
              <ErrorOutlineOutlined fontSize="medium" />
            </div>
          )}
          <div>
            {notification.status === "delivered" ? (
              <p className="font-medium">Order delivered successfully</p>
            ) : notification.status === "shipped" ? (
              <p className="font-medium">Order shipped</p>
            ) : (
              <p className="font-medium">Order cancelled</p>
            )}
            <p className="max-w-[70ch] text-sm">{notification.message}</p>
          </div>
        </div>

        <span className="text-sm font-medium">{notification.time}</span>
      </div>

      <hr className="my-4 last:hidden" />
    </>
  );
};

export default Notification;
