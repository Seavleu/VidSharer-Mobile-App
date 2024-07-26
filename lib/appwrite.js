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

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = appwriteConfig;

const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client); // Initialize account instance 
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error ('Error', error)
  } 
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    
    if(!currentUser) throw Error;

    return currentUser.documents[0];
     
  } catch (error) {
    console.log(error)
    return null;
  }
}

// Get All Video Post
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest post
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
// Sign Out
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error (error)
  }
}
// Upload file

// Get File Preview

// Create Video Post

// Get Video post created by user