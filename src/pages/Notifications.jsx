import { useEffect, useState } from "react";
import {NotificationCard} from "../components/index";
import service from "../appwrite/config"; // Service to interact with the backend
import { useSelector } from "react-redux";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.userData); // Get user data from Redux

  useEffect(() => {
    // Fetch notifications for the logged-in user
    async function fetchNotifications() {
      try {
        setLoading(true);
        const fetchedNotifications = await service.getNotifications(
          userData.id
        );
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userData?.id) {
      fetchNotifications();
    }
  }, [userData]);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (notifications.length === 0) {
    return <div>No notifications to display</div>;
  }

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default Notification;
