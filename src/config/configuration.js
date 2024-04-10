import config from "../config/config";
import {Client, ID, Databases, Storage , Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor() {
         this.client
                .setEndpoint(config.AppwriteUrl)
                .setProject(config.AppwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title , slug , content , featuredImage , status , userId}) {
            try {
                return await this.databases.createDocument(
                    config.AppwriteDatabaseId ,
                    config.AppwriteCollectionId ,
                    slug , 
                    {
                        title , 
                        content , 
                        featuredImage ,
                        status , 
                        userId
                    })
            } catch (error) {
                throw error;
            }
    }
    async updatePost ( slug , {title  , content , featuredImage , status , userId}){
        try {
            return await this.databases.updateDocument(
                config.AppwriteDatabaseId ,
                config.AppwriteCollectionId , 
                slug  , 
                {
                    title ,
                    content , 
                    featuredImage , 
                    status
                }
            )
        } catch (error) {
            throw error ;
        }
    }

    async deletePost(slug ){
        try {
             await this.databases.deleteDocument(
                config.AppwriteDatabaseId, 
                config.AppwriteCollectionId ,
                slug
             )
             return true
        } catch (error) {
            throw error ;
            return false
        }
    }

    async getPost(slug) {
        try {
             await this.databases.getDocument(
            config.AppwriteDatabaseId , 
            config.AppwriteCollectionId , 
            slug
           )
           return true
        } catch (error) {
            throw error 
        }
    }

    async getPosts (queries = [ Query.equal("status" , "active")]) {
            try {
                return await this.databases.listDocuments(
                    config.AppwriteDatabaseId ,
                    config.AppwriteCollectionId ,
                    queries
                )
            } catch (error) {
                throw error  ; 
                return false 
            }
    }

    // file services 
    async uploadFile (file) {
            try {
                return await this.bucket.createFile(
                    config.AppwriteBucketId , 
                    ID.unique() , 
                    file

                )
            } catch (error) {
                throw error ;
                return false ;
            }
    }

    async deleteFile (fileID) {
        try {
            return await this.bucket.deleteFile(
                config.AppwriteBucketId , 
                fileID
            )
            return true
        } catch (error) {
            throw error ; 
            return false ;
        }

    }

    getFilePreviw(fileID) {
      return this.bucket.getFilePreview(
        config.AppwriteBucketId , 
        fileID
      )
    }
}

const service = new Service()

export default service