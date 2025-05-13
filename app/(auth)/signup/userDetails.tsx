import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import PhoneInput from "react-native-phone-number-input";
//@ts-ignore
import google from "@/assets/images/google-icon.png";
import BottomModal from "@/components/BottomModal";

const UserDetails = ({ change, errors, blur, values, next, submit, loading }: any) => {
  console.log(values, "values");
  const disable =
    !values.full_name ||
    !values.email ||
    !values.username ||
    !values.phone_number ||
    !values.password ||
    !values.password_confirmation;
  const [show, setShow] = useState(false);
  return (
    <SafeAreaView className="flex-1 px-5">
      <View className="mb-6">
        <Text style={{fontFamily: 'montAlt'}} className="text-[64px]">Welcome</Text>
        <Text style={{fontFamily: 'montAlt'}} className="text-2xl">Lets get you started</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1">
          <CustomInput
            ph="Full Name"
            value={values?.full_name}
            change={change("full_name")}
            blur={blur("full_name")}
          />
          {errors?.full_name && (
            <Text className="text-red-500">{errors?.full_name}</Text>
          )}
          <CustomInput
            ph="Email"
            change={change("email")}
            blur={blur("email")}
            value={values?.email}
          />
          {errors?.email && (
            <Text className="text-red-500">{errors?.email}</Text>
          )}
          <CustomInput
            ph="Username"
            change={change("username")}
            blur={blur("username")}
            value={values?.username}
          />
          {errors?.username && (
            <Text className="text-red-500">{errors?.username}</Text>
          )}
          <PhoneInput
            placeholder="Enter phone number"
            defaultValue={values?.phone_number}
            defaultCode="GH"
            layout="first"
            onChangeFormattedText={change("phone_number")}
            autoFocus
            containerStyle={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#3F3F3F24",
              borderRadius: 15,
              overflow: "hidden",
              marginBottom: 15,
            }}
          />

          <CustomInput
            ph="Password"
            secureEntry={!show}
            change={change("password")}
            blur={blur("password")}
            iconRight={
              <Entypo
                name={show ? "eye-with-line" : "eye"}
                size={30}
                color="black"
                role="button"
                onPress={() => setShow(!show)}
              />
            }
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password}</Text>
          )}

          <CustomInput
            ph="Confirm Password"
            secureEntry={!show}
            change={change("password_confirmation")}
            blur={blur("password_confirmation")}
            iconRight={
              <Entypo
                name={show ? "eye-with-line" : "eye"}
                size={30}
                color="black"
                onPress={() => setShow(!show)}
              />
            }
          />
          {errors.password_confirmation && (
            <Text className="text-red-500">{errors.password_confirmation}</Text>
          )}

          <View className="my-4">
            <CustomButton
              lab="Continue"
              bg="#F47D7B"
              textColor="#fff"
              onPress={() => submit()}
              disabled={disable}
            />
          </View>

          <View className="flex-row items-center justify-center mb-4">
            <Text>Already have an Account? </Text>
            <Pressable onPress={() => router.push("/(auth)")}>
              <Text className="text-[#F47D7B]">Sign In here</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BottomModal
        loading={loading}
        open={loading}
        text="Is setting up your account, please wait..."
      />
    </SafeAreaView>
  );
};

export default UserDetails;
