import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

/*lot off things to do */
export default function NotificationForm(notification) {
  const [post, setPost] = useState(null);
  const [isaccepted , setIsAccepted] = useState(false); /* to show acceptance from owner to tenant*/
  const [isOwner, setIsOwner] = useState(false);
  const [otherUserDetails, setOtherUserDetails] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    async function handleNotification() {
      if (notification) {
        setPost(notification.post_id);
        setIsAccepted(notification.post.isAccepted);
  
        if (userData.$id === notification.owner) {
          setIsOwner(true);
          // Fetch tenant details if the current user is the owner
          const tenantDetails = await service.getUserDetails(notification.tenant);
          setOtherUserDetails(tenantDetails);
        } else if (userData.$id === notification.tenant) {
          // Fetch owner details if the current user is the tenant
          const ownerDetails = await service.getUserDetails(notification.owner);
          setOtherUserDetails(ownerDetails);
        }
  
        // Update notification if it's unread
        if (!notification.isRead) {
          try {
            const updatedNotification = await service.updateNotification({
              ...notification,
              isRead: true,
            });
            console.log("Notification updated:", updatedNotification);
          } catch (error) {
            console.error("Failed to update notification:", error);
          }
        }
      } else {
        navigate("/");
      }
    }
  
    handleNotification();
  }, [notification, userData, navigate]);
  

  // const updateNotification = () => {
  //   /*query.....*/ /*if(true)...setvalue*/
  // };

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.image); // Deletes the associated image file
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        {/* Image Section */}
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.image)} // Displaying the uploaded image
            alt={post.title}
            className="rounded-xl"
          />
          {isOwner ? (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Accept
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Decline
              </Button>
            </div>
          ) : (
            <div className="absolute right-6 top-6">
              <Button bgColor="bg-red-500" disabled >
                {isaccepted? "Accepted" : "Requested"}
              </Button>
            </div>
          )}
        </div>

        {/* Post Details */}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-600">Model: {post.model}</p>
          <p className="text-gray-600">
            From: {new Date(post.from).toLocaleString()}
          </p>
          <p className="text-gray-600">
            To: {new Date(post.to).toLocaleString()}
          </p>
          <p className="text-gray-600">Price: ${post.price}</p>
        </div>

        {isaccepted && otherUserDetails && (
          <div className="w-full mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Other User Details</h2>
            <p className="text-gray-600">Name: {otherUserDetails.name}</p>
            <p className="text-gray-600">Email: {otherUserDetails.email}</p>
            {/*<p className="text-gray-600">
              Phone: {otherUserDetails.phone || "N/A"}
            </p>*/}
          </div>
        )}
      </Container>
    </div>
  ) : null;
}
