import { Link } from "react-router-dom";
import Container from "./index";
import service from "../appwrite/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function NotificationCard({ notification }) {
  const [post, setPost] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [tenantDetails, setTenantDetails] = useState(null);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    // Fetch post details based on notification.post_id
    async function fetchPostDetails() {
      const fetchedPost = await service.getPostById(notification?.post_id);
      setPost(fetchedPost);
    }

    // Fetch user details for owner and tenant
    async function fetchUserDetails() {
      //const owner = await service.getUserById(notification?.owner);
      //const tenant = await service.getUserById(notification?.tenant);
      setOwnerDetails(notification.owner);
      setTenantDetails(notification.tenant);
    }

    if (notification?.post_id) {
      fetchPostDetails();
    }
    if (notification?.owner && notification?.tenant) {
      fetchUserDetails();
    }
  }, [notification]);

  if (!post || !ownerDetails || !tenantDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/notification/${notification.post_id}`}>
      <div className="py-8">
        <Container>
          <div className="w-full flex border rounded-xl p-4 shadow-lg">
            {/* Image Section */}
            <div className="w-1/3 flex justify-center items-center">
              <img
                src={service.getFilePreview(post.image)}
                alt={post.title}
                className="rounded-xl max-h-40 object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="w-2/3 pl-4">
              <h1 className="text-xl font-bold mb-2">{post.title}</h1>
              <p className="text-gray-700 font-medium mb-1">
                Model: {post.model}
              </p>
              <p className="text-gray-600 mb-1">
                From: {new Date(post.from).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-1">
                To: {new Date(post.to).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-4">Price: ${post.price}</p>

              {/* User Details */}
              <div className="mt-4">
                <h2 className="text-lg font-bold">User Details</h2>
                <p className="text-gray-700 font-medium">
                  Owner: {ownerDetails.name}
                </p>
                <p className="text-gray-600">
                  Rating: {ownerDetails.rating}/5
                </p>
                <p className="text-gray-700 font-medium">
                  Tenant: {tenantDetails.name}
                </p>
                <p className="text-gray-600">
                  Rating: {tenantDetails.rating}/5
                </p>
                {userData.id === ownerDetails.id && (
                  <p className="text-green-500 font-medium">You are the Owner</p>
                )}
                {userData.id === tenantDetails.id && (
                  <p className="text-blue-500 font-medium">You are the Tenant</p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Link>
  );
}

export default NotificationCard;
