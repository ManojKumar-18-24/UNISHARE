import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import service from "../appwrite/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function NotificationPage() {
  const [post, setPost] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [tenantDetails, setTenantDetails] = useState(null);
  const { userData } = useSelector((state) => state.userData);
  const { id } = useParams(); // Get notification ID from URL params
  const [notification,setNotification] = useState(null)
  const [status, setStatus] = useState(notification?.isAccepted); // Track status locally

  useEffect(() => {
    console.log(id)
    async function fetchNotification() {
      const notification = await service.getNotification(id);
      setNotification(notification)
      console.log(notification)
    }

    async function fetchPostDetails() {
      if (notification?.post_id) {
        const post_id = notification.post_id;
        const fetchedPost = await service.getPost(post_id);
        setPost(fetchedPost);
      }
    }

    async function fetchUserDetails() {
      if (notification?.owner && notification?.tenant) {

        const owner = await service.getUserDetails(notification.owner);
        const tenant = await service.getUserDetails(notification.tenant);
        setOwnerDetails(owner);
        setTenantDetails(tenant);
      }
    }
    
    fetchNotification();
    fetchPostDetails();
    fetchUserDetails();

    if(notification && userData.$id === ownerDetails.$id){
      service.updateNotification({...notification,isRead:true})
    }
  },);

  if (!post || !ownerDetails || !tenantDetails) {
    {console.log('post:',post,'owner:',ownerDetails,'tenant:',tenantDetails)}
    return <div>Loading...</div>;
  }

  // Owner Action: Accept or Decline Request
  const handleAccept = async () => {
    await service.updateNotificationStatus({...notification,isAccepted:true}); // Mark as accepted in the database
    setStatus(true); // Update local state
  };

  const handleDecline = async () => {
    await service.updateNotificationStatus({...notification,isAccepted:false}); // Mark as declined in the database
    setStatus(false); // Update local state
  };

  return (
    <Link to={`/notification/${notification.$id}`}>
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
                From: {new Date(post.starting_time).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-1">
                To: {new Date(post.ending_time).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-4">Price: ${post.price}</p>

              {/* User Details */}
              <div className="mt-4">
                <h2 className="text-lg font-bold">User Details</h2>
                <p className="text-gray-700 font-medium">
                  Owner: {ownerDetails.email}
                </p>
                <p className="text-gray-700 font-medium">
                  Tenant: {tenantDetails.email}
                </p>

                {/* Status for Owner */}
                {userData.$id === ownerDetails.$id && (
                  <div className="mt-4">
                    {status === null ? (
                      <>
                        <button
                          onClick={handleAccept}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={handleDecline}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                          Decline
                        </button>
                      </>
                    ) : status ? (
                      <p className="text-green-500 font-medium">Accepted</p>
                    ) : (
                      <p className="text-red-500 font-medium">Declined</p>
                    )}
                  </div>
                )}

                {/* Status for Tenant */}
                {userData.$id === tenantDetails.$id && (
                  <div className="mt-4">
                    {status === null ? (
                      <p className="text-yellow-500 font-medium">
                        Waiting for Owner
                      </p>
                    ) : status ? (
                      <p className="text-green-500 font-medium">Accepted</p>
                    ) : (
                      <p className="text-red-500 font-medium">Declined</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Link>
  );
}

export default NotificationPage;
