import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Search = () => {
  const {query} = useLocalSearchParams();
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-white text-center text-3xl">{query}</Text>
    </SafeAreaView>
  )
}

export default Search