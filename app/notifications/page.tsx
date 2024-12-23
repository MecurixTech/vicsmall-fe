import Footer from "../components/footer";
import Notification from "../components/notifications/notification";
import { notifications } from "../data/dummyData";

const NotificationsPage = () => {
  return (
    <>
      <h1 className="my-8 text-center text-3xl">Notifications</h1>

      <div className="mx-auto mb-16 w-[95%] rounded-xl bg-white p-8 shadow-lg sm:w-4/5">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default NotificationsPage;
