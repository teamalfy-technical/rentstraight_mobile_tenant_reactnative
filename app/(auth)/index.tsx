import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/Topbar";
import { CustomInput } from "@/components/CustomInput";
// @ts-ignore
import bg from "@/assets/images/bg2.png";
// @ts-ignore
import google from "@/assets/images/google-icon.png";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Formik, FormikValues } from "formik";
import BottomModal from "@/components/BottomModal";

const SignIn = () => {
  const { login, loading } = useAuth();

  const handleLogin = async (values: FormikValues) => {
    await login(values.email, values.password);
    // router.push('/(tabs)')
  };
  return (
    <SafeAreaView className="flex-1">
        <ImageBackground
          source={bg}
          className="flex-1 w-full absolute right-[-30%] top-14 h-[90%]"
          resizeMode="contain"
          blurRadius={2}
        />
        <View className="flex-1 bg-opacity-30 px-5 mt-5">
          <TopBar />
          <KeyboardAvoidingView
            className="flex-1 h-screen"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              {/* <View className="flex-1"> */}
              <View className="flex-1 h-[75vh]">
                <View>
                  <Text
                    style={{ fontFamily: "montAlt" }}
                    className="text-[60px]"
                  >
                    Elevate Your
                  </Text>
                  <Text
                    style={{ fontFamily: "montAlt" }}
                    className="text-[#F47D7B] text-[60px]"
                  >
                    Experience
                  </Text>
                </View>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={handleLogin}
                >
                  {({ handleChange, handleSubmit, values, handleBlur }) => (
                    <View className="space-y-5">
                      <CustomInput
                        ph="Email"
                        textColor="#fff"
                        bg="#3F3F3F24"
                        change={handleChange("email")}
                        value={values.email}
                        blur={() => handleBlur("email")}
                        bs={1}
                        bc="#FFFFFF40"
                        phc="#fff"
                      />
                      <CustomInput
                        ph="Password"
                        textColor="#fff"
                        bg="#3F3F3F25"
                        change={handleChange("password")}
                        value={values.password}
                        blur={() => handleBlur("password")}
                        bs={1}
                        bc="#FFFFFF40"
                        phc="#fff"
                      />

                      <Pressable
                        className="rounded-[15px] bg-[#F47D7B] py-4 items-center mb-5"
                        onPress={() => handleSubmit()}
                      >
                        <Text
                          style={{ fontFamily: "montAlt" }}
                          className="text-[#fff] text-lg"
                        >
                          Sign In
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </Formik>

                <View className="flex-row items-center justify-center">
                  <Text style={{ fontFamily: "montAlt" }} className="text-sm">
                    Forgot password?{" "}
                  </Text>
                  <Pressable>
                    <Text
                      style={{ fontFamily: "montAlt" }}
                      className="text-[#F47D7B]"
                    >
                      Click here to recover
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* <View className="space-y-3"> */}
              {/* <View className="flex-row items-center justify-between">
                <View className="border-2 border-[#3F3F3F24] w-[40%]" />
                <Text className="text-[#F47D7B]">Or</Text>
                <View className="border-2 border-[#3F3F3F24] w-[40%]" />
              </View> */}

              {/* <View className="space-y-5"> */}
              {/* <Pressable className="flex-row justify-center bg-[#fff] py-4 items-center space-x-3 rounded-[15px]">
                  <Image
                    source={google}
                    className="w-[30px] h-[30px]"
                    resizeMode="contain"
                  />
                  <Text style={{fontFamily: 'montAlt'}} className="text-lg">Sign in with google</Text>
                </Pressable>

                <Pressable className="flex-row justify-center bg-[#111111] py-4 items-center space-x-3 rounded-[15px]">
                  <FontAwesome name="apple" size={24} color="#fff" />
                  <Text style={{fontFamily: 'montAlt'}} className="text-lg text-[#fff]">
                    Sign in with apple
                  </Text>
                </Pressable> */}

              {/* </View> */}
              {/* </View> */}
              {/* </View> */}
              <View className="flex-row items-center justify-center mb-10">
                <Text>Don’t have an Account? </Text>
                <Pressable onPress={() => router.push("/(auth)/signup")}>
                  <Text
                    style={{ fontFamily: "montAlt" }}
                    className="text-[#F47D7B]"
                  >
                    Sign Up here
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      {loading && (
        <BottomModal
          text={"is logging you in, please wait..."}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
};

export default SignIn;
