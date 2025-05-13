import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/Topbar";
import OtpInput from "react-native-input-otp";
import CustomButton from "@/components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
// @ts-ignore
import google from "@/assets/images/google-icon.png";
import { Formik, FormikValues } from "formik";
import axios from "axios";
import { baseurl } from "@/app/api/baseurl";
import BottomModal from "@/components/BottomModal";

const otp = () => {
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();

  const res = JSON.parse(params?.res);
  const user = JSON.parse(params?.user);
  const name = res?.full_name;
  console.log(res, "res");

  const initialValues = {
    token: "",
  };

  const verify = async (values: FormikValues) => {
    setLoading(true);
    console.log(values, "values");
    await axios
      .post(`${baseurl}/email/verify-token/`, values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${res?.token}`,
          "x-user-account-type": "tenant"
        },
      })
      .then((response) => {
        console.log(response, "res");
        router.push({
          pathname: "/(auth)/signup/profileUpload",
          params: { res: JSON.stringify(res), user: JSON.stringify(user) },
        });
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resendEmail = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${baseurl}/email/resend-verification-token/`,
        {},  // Empty object for the POST body
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${res?.token}`,
            "x-user-account-type": 'tenant',
          },
        }
      );
      if(response.status === 200){
      console.log("Verification email resent successfully.");
      }
    } catch (error) {
      console.error("Failed to resend verification email.", error);
      Alert.alert("Error", "Error sending verification code, please try again...")
    } finally{
      setLoading(false)
    }
  };

  return (
    <SafeAreaView
      className="flex-1 px-5"
      // style={{ backgroundColor: Colors.dark.background }}
    >
      <TopBar />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={verify}
          validateOnBlur={true}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <ScrollView
                className="flex-1 mb-15"
                showsVerticalScrollIndicator={false}
              >
                <View className="flex-1">
                  <View className="my-3">
                    <Text className="text-[36px] font-semibold text-[#111111]">
                      {name}
                    </Text>
                    <View className="w-11/12">
                      <Text className="text-2xl text-[#111111]">
                        Verify your account
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1 mt-10">
                    <Text className="text-[12px] text-[#F47D7B] my-2">
                      Change Mobile Number
                    </Text>
                    <OtpInput
                      onChange={handleChange("token")}
                      value={values?.token}
                      numInputs={4}
                      inputStyle={{
                        borderColor: "#FFFFFF5E",
                        borderWidth: 2,
                        borderRadius: 15,
                        width: 80,
                        height: 80,
                        color: "#000",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                      autoFocus
                      keyboardType="email-address"
                    />
                    <TouchableOpacity onPress={resendEmail}>
                      <Text className="text-lg text-[#111111] my-2">
                        Resend email verification
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <CustomButton
                    bg="#F47D7B"
                    lab="Verify"
                    textColor="#fff"
                    onPress={() => handleSubmit()}
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
                  <Text className="text-lg text-[#fff]">
                    Sign in with apple
                  </Text>
                </Pressable>

                <View className="flex-row items-center justify-center mb-4">
                  <Text>Don’t have an Account? </Text>
                  <Pressable onPress={() => router.push("/(auth)/signup/")}>
                    <Text className="text-[#F47D7B]">Sign Up here</Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
      {loading && (
      <BottomModal
        text={"is confirming your verification code"}
        loading={loading}
        open = {loading}
      />
    )}
    </SafeAreaView>
  );
};

export default otp;
