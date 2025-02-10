import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    model,
    starting_time,
    ending_time,
    image,
    price,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsId,
        ID.unique(),
        {
          title,
          model,
          starting_time,
          ending_time,
          image,
          price : parseInt(price),
          userId,
        }
      );
    } catch (error) {
      console.log("error in createPost::", error);
    }
  }

  async updatePost({
    id,
    title,
    model,
    starting_time,
    ending_time,
    image,
    price,
    userId,
  }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsId,
        id,
        {
          title,
          model,
          starting_time,
          ending_time,
          image,
          price,
          userId,
        }
      );
    } catch (error) {
      console.log("error in updatePost::", error);
    }
  }

  async deletePost(post_id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsId,
        post_id
      );
      return true;
    } catch (error) {
      console.log("error in updatePost::", error);
      return true;
    }
  }

  async getPost(post_id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsId,
        post_id
      );
    } catch (error) {
      console.log("error in getPost::", error);
      return false;
    }
  }

  async getPosts(queries = []) {
    try {
      // Get the current time in ISO 8601 format
      const currentTimeISO = new Date().toISOString();

      // Add a query to filter posts with starting_time > current time
      queries.push(Query.greaterThan("starting_time", currentTimeISO));

      // Fetch documents with the updated query
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsId,
        queries
      );
    } catch (error) {
      console.log("error in getPosts::", error);
      return false;
    }
  }

  async deletePosts() {
    try {
      // Get the current time in ISO 8601 format
      const currentTimeISO = new Date().toISOString();

      // Fetch all documents where ending_time is less than the current time
      const postsToDelete = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsId,
        [Query.less("ending_time", currentTimeISO)]
      );

      // Loop through each document and delete it
      for (const post of postsToDelete.documents) {
        await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwritePostsId,
          post.$id // Document ID to delete
        );
      }

      console.log(
        `${postsToDelete.documents.length} posts deleted successfully.`
      );
      return true;
    } catch (error) {
      console.log("error in deletePosts::", error);
      return false;
    }
  }

  //notification service

  async createNotification({ owner, tenant, post_id }) {
    console.log('in create notifi:',owner,tenant,post_id)
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNotificationsId,
        ID.unique(),
        {
          owner,
          post_id,
          tenant,
        }
      );
    } catch (error) {
      console.log("error in createNotification::", error);
    }
  }

  async updateNotification({ id, owner, tenant, post_id, isRead, isAccepted }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNotificationsId,
        id,
        {
          owner,
          post_id,
          tenant,
          isRead,
          isAccepted,
        }
      );
    } catch (error) {
      console.log("error in createPost::", error);
    }
  }

  async getNotifications(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteNotificationsId,
        [Query.or([Query.equal("owner", userId), Query.equal("tenant", userId)])]
      );
    } catch (error) {
      console.log("error in getall Notifications:", error);
      throw error;
    }
  }

  async findNotification(userId,postId)
  {   console.log("userId:", userId, "postId:", postId);

    const queries = [
      Query.equal("tenant", userId),
      Query.equal("post_id", postId)
  ];
     try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteNotificationsId,
        queries 
      )
     } catch (error) {
      console.log("error in finding Notifications:", error);
      throw error;      
     }
  }

  //file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error in uploadFile::", error);
      return false;
    }
  }

  async delteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("error in deleteDile::", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    if (fileId.fileId) fileId = fileId.fileId;
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  //get user details...

  async setUserDetails( user_id, email ) {
    console.log(user_id , email)
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserDataId,
        user_id,
        {
          email,
        }
      );
    } catch (error) {
      console.log("error in setUserdetails::", error);
    }
  }

  async getUserDetails(user_id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserDataId,
        user_id
      );
    } catch (error) {
      console.log("error in getPost::", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
