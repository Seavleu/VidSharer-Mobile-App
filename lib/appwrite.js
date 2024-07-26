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
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
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

// Get File Preview
export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (!type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId)
    } else if (type==='image'){
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
    } else {
      throw new Error('Invalid file type')
    }
    if(!fileUrl) throw Error;

    return fileUrl;
  } catch(error) {
    throw new Error (error)
  }
}
// Upload file
export const uploadFile = async (file, type) => {
  if(!file) return;

  const { mimeType, ...rest} = file;
  const asset = {type: mimeType, ...type} 

  try {
    const uploadFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    )

    const fileUrl = await getFilePreview(uploadFile.$id, type)

    return fileUrl;
  } catch (error) {
    throw new Error(error)
  }
}
// Create Video Post, both thumbnail and video are not depend on each other they are call at the same time
export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video')
    ])

    const newPost = await databases.createDocument(
      databaseId, videoCollectionId, ID.unique(), {
        title: form.title,
        thumbnail: thumbnail,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId
      }
    )

    return newPost;
  } catch (error) {
    throw new Error(error)
  }
}

// Get Video post created by user