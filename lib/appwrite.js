import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  
  export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsh.aora",
  projectId: "669f547e00094ce21d22",
  databaseId: "669f55920002a9326a74",
  userCollectionId: "669f55af000fb61323fd",
  videoCollectionId: "669f55be002330ddad64",
  storageId: "669f582d002c2f79ba43",
};

const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jenny')
    .then(function (response) {
        console.log(response)
    }, function(error){
        console.log(error)
    })
}

// Sign In

// Sign Up

// Get Account

// Get current user

// Sign Out

// Upload file

// Get File Preview

// Create Video Post

// Get All Video Post

// Get Video post created by user

// Get video posts that matches search query

// Get latest created video posts
