import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { router } from "expo-router";

import { icons } from "../constants";
import { usePathname } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState('')

  return (
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
        <TextInput
          className="mt-0.5 text-base text-white flex-1 font-pregular"
          value={query}
          placeholder="Search for a video "
          placeholderTextColor="#cdcde0"
          onChangeText={(e) => setQuery(e)}
        />
        <TouchableOpacity
          onPress={() => {
            if(!query) {
              return Alert.alert('Missing query', "Please input something to search results across database")
            }
            if (pathname.startsWith('/search')) router.useParams({query})
              else router.push(`/search/${query}`)
          }}
        >
            <Image 
            source={icons.search}
            className="w-5 h-5"
            resizeMethod="contain"
            />
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput