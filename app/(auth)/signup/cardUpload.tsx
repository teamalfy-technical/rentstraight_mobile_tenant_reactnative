import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/Topbar";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator'
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { Select } from "native-base";
// @ts-ignore
import google from "@/assets/images/google-icon.png";
import { Formik, FormikValues } from "formik";
import axios from "axios";
import { baseurl } from "@/app/api/baseurl";

const CardUpload = () => {
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();

  const initialValues = {
    front: "",
    back: "",
  };

  const res = JSON.parse(params?.res);
  console.log(res, "response from profileUpload");
  const name = res?.full_name;

  const pickImage = async (setFieldValue, fieldName) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1000 } }], // Resize the image width (adjust based on your requirements)
        {
          compress: 0.5, // Adjust the compression quality (1 is max quality, 0 is lowest)
          format: ImageManipulator.SaveFormat.JPEG, // Save as JPEG
        }
      );

      // The resized image URI
      const resizedImageUri = manipResult.uri;
      setFieldValue(fieldName, resizedImageUri);
      // setFieldValue(fieldName, result.assets[0].uri);
    }
  };

  const submitId = async (values: FormikValues) => {
    setLoading(true);
    const formData = new FormData();
    if (values.front) {
      formData.append("id_card[front]", {
        uri: values.front,
        name: "front.jpg",
        type: "image/jpg",
      });
    }
    if (values.back) {
      formData.append("id_card[back]", {
        uri: values.back,
        name: "back.jpg",
        type: "image/jpg",
      });
    }

    try {
      const response = await axios.post(
        `${baseurl}/identification-card`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${res?.token}`,
            "x-user-account-type": "tenant",
          },
        }
      );

      console.log(response, "response from card upload");
      if (response.status === 201) {
        router.push("/(auth)");
      }
    } catch (err) {
      console.log(err, "error from profile upload");
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
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
         onSubmit={submitId}
         validateOnBlur
       >
         {({ handleSubmit, setFieldValue, values }) => (
           <>
        <ScrollView
                className="flex-1 mb-15"
                showsVerticalScrollIndicator={false}
              >
                <View className="flex-1 space-y-5">
                  <View className="my-3">
                    <Text className="text-[36px] font-bold text-[#111111]">
                      {name},
                    </Text>
                    <View className="w-11/12">
                      <Text className="text-2xl text-[#111111]">
                        Prove your existence
                      </Text>
                    </View>
                  </View>

                  <View className="w-full border rounded-lg border-[#3F3F3F24] px-3 py-2">
                    {/* <Select
                      placeholder="Choose Card"
                      borderColor={"#3F3F3F24"}
                      borderRadius={"10px"}
                      className="py-5 px-3"
                    >
                      <Select.Item
                        label="Select your card type"
                        value=""
                        key="0"
                      />
                      <Select.Item label="Visa" value="Visa" key="1" />
                      <Select.Item
                        label="MasterCard"
                        value="MasterCard"
                        key="2"
                      />
                      <Select.Item
                        label="American Express"
                        value="American Express"
                        key="3"
                      />
                      <Select.Item label="Discover" value="Discover" key="4" />
                    </Select> */}
                    <Text className="capitalize">Please upload your ghana card</Text>
                  </View>

                  <View className="h-[200px] rounded-[15px] w-full items-center justify-center border-2 border-dashed border-[#3F3F3F24] mb-8 relative">
                    {values.front && (
                      <Image
                        source={{ uri: values.front }}
                        className="w-full h-full"
                      />
                    )}
                    <View className="absolute inset-0 items-center justify-center">
                      <MaterialCommunityIcons
                        name="camera-plus"
                        size={90}
                        color="black"
                        onPress={() => pickImage(setFieldValue, "front")}
                      />
                      <Text className="underline">
                        Tap to upload the front of your card
                      </Text>
                    </View>
                  </View>

                  <View className="h-[200px] rounded-[15px] w-full items-center justify-center border-2 border-dashed border-[#3F3F3F24] mb-8 relative">
                    {values.back && (
                      <Image
                        source={{ uri: values.back }}
                        className="w-full h-full"
                      />
                    )}
                    <View className="absolute items-center justify-center">
                      <MaterialCommunityIcons
                        name="camera-plus"
                        size={90}
                        color="black"
                        onPress={() => pickImage(setFieldValue, "back")}
                      />
                      <Text className="underline">
                        Tap to upload the back of your card
                      </Text>
                    </View>
                  </View>

                  <CustomButton
                    bg="#F47D7B"
                    textColor="#fff"
                    lab="Continue"
                    onPress={handleSubmit}
                  />
                </View>
              </ScrollView>


        {/* <View className="space-y-5">
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
        </View> */}
        </>
         )}
         </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CardUpload;
