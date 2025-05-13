import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const TopBack = () => {
  const { user } = useAuth()
  return (
    <View className="flex-row items-center justify-between">
      <Ionicons
        name="arrow-back"
        size={35}
        color={"#F47D7B"}
        className="bg-white rounded-2xl shadow-sm"
        role="button"
        onPress={() => router.back()}
      />
      <Image
        source={{ uri: user?.avatar }}
        className="w-[60px] h-[60px] rounded-2xl"
        resizeMode="contain"
      />
    </View>
  );
};

export default TopBack;
