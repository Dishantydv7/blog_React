import config from "../config/config";
import {Client  , Account , ID } from "appwrite";



export class AuthService {
    client = new Client() ;
    account;

    constructor() {
        this.client
                .setEndpoint(config.AppwriteUrl)
                .setProject(config.AppwriteProjectId)
        this.account = new Account(this.client)  
    }

    async createAccount ({email , name , password}){
        try {
         const userAccount =  await this.account.create(ID.unique()  , mail , name , password);
            if (userAccount) {
                //call another method
                return this.login({email , password})
            } else {
                return userAccount ; 
            }

        } catch (error) {
            throw error;
        }
    }
    async login ({email , password}) {
        try {
         return   await this.account.createEmailSession(email , password);
        } catch (error) {
            throw error ; 
        }
    }

    async getCurrentUser() {
           try {
            return  await this.account.get();
           } catch (error) {
            throw error ;
           }
           return null ;
    }

    async logout({}) {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService()

export default authService