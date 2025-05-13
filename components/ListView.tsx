import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

const ListView = ({ active, item }: any) => {
  return (
    <Pressable
      onPress={() => router.push({pathname: "/screens/PropertyDetails", params: item})} className="rounded-2xl bg-white shadow-md my-3">
      <View className="flex-row items-center space-x-5 p-3">
        <View style={{ width: wp(30) }} className="rounded-2xl overflow-hidden">
          <Image
            source={{ uri: item?.thumbnail}}
            className="w-full h-[120px]"
            resizeMode="cover"
          />
        </View>
        <View style={{ width: wp(70) }}>
          <Text style={{fontFamily: 'montAlt'}} className="text-xl font-semibold">
            {item?.name}
          </Text>
          <Text style={{fontFamily: 'montAlt'}} className="text-sm">
          {item?.address?.city}, {item?.address?.line_1} | {item?.address?.line_2}
          </Text>
          <View className="rounded-lg bg-[#10AF2940] w-[40%]">
            <Text className="text-[#10AF29] px-2 py-1 text-center rounded-2xl">
              {item?.status}
            </Text>
          </View>
          <View className="flex-row mt-5 space-x-5">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="bed-outline" size={24} color="black" />
              <Text className="text-black">{item?.stats?.features?.bedrooms}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={24}
                color="black"
              />
              <Text className="text-black">{item?.stats?.features?.kitchens}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <MaterialCommunityIcons name="shower" size={24} color="black" />
              <Text className="text-black">{item?.stats?.features?.bathrooms}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ListView;
