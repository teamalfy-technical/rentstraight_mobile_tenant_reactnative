import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/Topbar";
import { CustomInput } from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
// @ts-ignore
import google from "@/assets/images/google-icon.png";

const Password = ({ change, errors, blur, values, submit, loading }: any) => {
  const [show, setShow] = useState(false);

  if(loading){
    return <Text className="text-center items-center justify-center">Loading...</Text>
  }
  return (
    <SafeAreaView className="flex-1 px-5">
      <TopBar />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1 mb-15"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 space-y-5">
            <View className="my-3">
              <Text className="text-[36px] font-semibold text-[#111111]">
                {values?.full_name}
              </Text>
              <View className="w-11/12">
                <Text className="text-2xl text-[#111111]">
                  Protect Your Account
                </Text>
              </View>
            </View>

            <CustomInput
              ph="Password"
              secureEntry={!show}
              change={change("password")}
              blur={blur("password")}
              iconRight={
                show ? (
                  <Entypo
                    name="eye-with-line"
                    size={30}
                    color="black"
                    role="button"
                    onPress={() => setShow(!show)}
                  />
                ) : (
                  <Entypo
                    name="eye"
                    size={30}
                    color="black"
                    role="button"
                    onPress={() => setShow(!show)}
                  />
                )
              }
            />
            <CustomInput
              ph="Confirm Password"
              secureEntry={!show}
              change={change("password_confirmation")}
              blur={blur("password_confirmation")}
              iconRight={
                show ? (
                  <Entypo
                    name="eye-with-line"
                    size={30}
                    color="black"
                    onPress={() => setShow(!show)}
                  />
                ) : (
                  <Entypo
                    name="eye"
                    size={30}
                    color="black"
                    onPress={() => setShow(!show)}
                  />
                )
              }
            />

            <CustomButton
              lab="Set up Account"
              bg="#F47D7B"
              textColor="#fff"
              onPress={() => {
                submit();
              }}
            />
          </View>
        </ScrollView>

        <View className="space-y-5">
          <Pressable className="flex-row justify-center bg-[#fff] py-4 items-center space-x-3 rounded-[15px]">
            <Image
              source={google}
              className="w-[30px] h-[30px]"
              resizeMode="contain"
            />
            <Text className="text-lg">Sign in with google</Text>
          </Pressable>

          <Pressable className="flex-row justify-center bg-[#111111] py-4 items-center space-x-3 rounded-[15px]">
            <FontAwesome name="apple" size={24} color="#fff" />
            <Text className="text-lg text-[#fff]">Sign in with apple</Text>
          </Pressable>

          <View className="flex-row items-center justify-center mb-4">
            <Text>Don’t have an Account? </Text>
            <Pressable onPress={() => router.push("/(auth)/signup/")}>
              <Text className="text-[#F47D7B]">Sign Up here</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Password;
