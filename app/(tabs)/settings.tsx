import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Avatar } from "native-base";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

const settings = () => {
    const { user, logout } = useAuth()
    console.log(user, 'user')
  return (
    <View className="flex-1 px-5 my-5">
      <Text className="capitalize text-[32px]" style={{ fontFamily:"montAlt"}}>My Settings</Text>

    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center space-x-5 mb-10 mt-5">
        {/* <Avatar source={{ uri: user?.avatar}} size={"xl"} /> */}
        <Image source = {{ uri: user?.avatar}} className="rounded-full h-[100px] w-[100px]" resizeMode="cover"/>
        <View>
          <Text className="text-[20px]" style={{ fontFamily:"montAlt"}}>{user?.full_name}</Text>
          <Text className="text-lg" style={{ fontFamily:"montAlt"}}>{user?.email}</Text>
        </View>
      </View>

      <View className="space-y-5 mb-10">
        <TouchableOpacity onPress={() => router.push('/screens/ProfileUpdate')} className="border-b-2 border-black py-3 flex-row space-x-5 items-center">
          <FontAwesome name="user-circle" size={30} color="black" />
          <Text className="text-lg" style={{ fontFamily:"montAlt"}}>Account</Text>
        </TouchableOpacity>
        <View className="border-b-2 border-black py-3 flex-row space-x-5 items-center">
        <FontAwesome name="lock" size={30} color="black" />
          <Text className="text-lg" style={{ fontFamily:"montAlt"}}>Privacy</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/screens/FaqScreen')} className="border-b-2 border-black py-3 flex-row space-x-5 items-center">
          <Image source = {require('@/assets/images/help.png')} />
          <Text className="text-lg" style={{ fontFamily:"montAlt"}}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/screens/Invites')} className="border-b-2 border-black py-3 flex-row space-x-5 items-center">
        <Ionicons name="person-add-sharp" size={30} color="black" />
          <Text className="text-lg" style={{ fontFamily:"montAlt"}}>Invite your friend</Text>
        </TouchableOpacity>
      </View>
    
        <CustomButton lab="Logout" textColor="#fff" bg="#F47D7B" onPress={logout}/>
        </ScrollView>
    </View>
  );
};

export default settings;
