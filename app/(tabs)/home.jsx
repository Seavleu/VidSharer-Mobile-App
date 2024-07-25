import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppWrite from "../../lib/useAppWrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { SearchInput, Trending, EmptyState, VideoCard } from "../../components";

const Home = () => {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-pmedium text-2xl text-white">Jenny</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput/>

            <View className="flex-1 pt-5 pb-8 w-full">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Trending Video
              </Text>

              <Trending posts={latestPosts ?? []}/>
            </View>
          </View>
  )}
        ListEmptyComponent={() => {
         <EmptyState 
          title="No vid yet"
          subtitle= "Be the first baby"
         />
        }}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  );
};

export default Home;
