import conf from "../conf/conf";
import { Client,ID,Account } from "appwrite";
import service from "./config";
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = this.account.create(ID.unique(),email,password,name);
            service.setUserDetails(userAccount.$id,email)
            if(userAccount)
            {
                return this.login({email,password});
            }
        } catch (error) {
            throw(error)
        }
    }

    async login({email,password}) {
          try {
             return this.account.createEmailPasswordSession(email.password);
          } catch (error) {
            throw(error);
          }
    }

    async getCurrentUser() {
        try{
            return this.account.get()
        }
        catch(error)
        {
            throw(error)
        }
        return null;
    }
     
    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            throw(error)
        }
    }
}

const authService = new AuthService();

export default authService