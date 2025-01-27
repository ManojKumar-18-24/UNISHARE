const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritePostsId : String(import.meta.env.VITE_APPWRITE_POSTS_ID),
    appwriteNotificationsId : String(import.meta.env.VITE_APPWRITE_NOTIFICATIONS_ID),
    appwriteUserDataId : String(import.meta.env.VITE_APPWRITE_USERDATA_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteImageId : String(import.meta.env.VITE_PLACEHOLDER_IMAGE_ID)
}

console.log('conf = ',conf);
export default conf