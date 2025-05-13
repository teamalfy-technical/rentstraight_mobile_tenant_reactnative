import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

const VertHorView = ({ active, item }: any) => {
  console.log(item, "item")

  return (
    <Pressable
      onPress={() => router.push({pathname: "/screens/PropertyDetails", params: item})} // Pass item correctly
      className="rounded-[20px] mr-4 overflow-hidden my-3"
      style={{
        height: hp(43),
        width: active === "horizontal" ? wp(80) : wp(90),
      }}
    >
      <ImageBackground
        className="flex-1 justify-between"
        resizeMode="cover"
        source={{uri: item?.thumbnail}}
      >
        <View className="absolute top-5 right-5">
          <MaterialIcons name="favorite" size={24} color="white" />
        </View>

        <View className="p-4 absolute bottom-5">
          <View className="flex-row w-full justify-between items-center">
            <Text style={{fontFamily: 'montAlt'}} className="font-semibold text-2xl text-white">
              {item?.name}
            </Text>
            <Text className="bg-[#10AF2940] text-[#10AF29] px-2 py-1 rounded-2xl">
              {item?.status}
            </Text>
          </View>

          <Text style={{fontFamily: 'montAlt'}} className="text-lg text-white">
            {item?.address?.city}, {item?.address?.line_1} | {item?.address?.line_2}
          </Text>

          <View className="flex-row mt-2 space-x-5">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="bed-outline" size={24} color="white" />
              <Text className="text-white">{item?.stats?.features?.bedrooms}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={24}
                color="white"
              />
              <Text className="text-white">{item?.stats?.features?.kitchens}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <MaterialCommunityIcons name="shower" size={24} color="white" />
              <Text className="text-white">{item?.stats?.features?.bathrooms}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default VertHorView;