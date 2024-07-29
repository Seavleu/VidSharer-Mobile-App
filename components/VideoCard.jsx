import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Image, Alert } from "react-native";

import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  const closeMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={closeMenu}>
        <View className="pt-2">
          <TouchableOpacity onPress={openMenu}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {menuVisible && (
            <View className="border bg-secondary rounded-xl p-5">
              <Text
                className="text-primary font-psemibold"
                onPress={() => Alert.alert("Edit", "Press 'Ok' to Edit")}
              >
                Edit
              </Text>
              <Text
                className="text-primary font-psemibold"
                onPress={() => Alert.alert("Delete", "You are about to delete")}
              >
                Delete
              </Text>
              <Text
                className="text-primary font-psemibold"
                onPress={() =>
                  Alert.alert("Save", "Press 'Ok' to add to your favorite")
                }
              >
                Save
              </Text>
            </View>
          )}
        </View>
        </TouchableWithoutFeedback>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
