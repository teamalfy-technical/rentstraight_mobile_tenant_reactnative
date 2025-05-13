import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/Topbar";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import BottomModal from "@/components/BottomModal";
import axios from "axios";
import { baseurl } from "@/app/api/baseurl";
import * as ImageManipulator from "expo-image-manipulator";
import { Formik, FormikValues } from "formik";

const ProfileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<String | null>();
  const params = useLocalSearchParams();

  const res = JSON.parse(params?.res);
  const user = JSON.parse(params?.user);
  console.log(res, "response in profileUpload");
  const name = res?.full_name;
  const initialValues = {
    photo: "",
    full_name: res?.full_name,
    phone_number: user?.phone_number,
    username: user?.username,
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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

      // You can now set this image in your state or use it in your app
      setImage(resizedImageUri);
    }
  };

  const uploadImage = async (values: FormikValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", {
      uri: image,
      name: "image.jpg",
      type: "image/jpg",
    });
    formData.append("full_name", values.full_name);
    formData.append("phone_number", values.phone_number);
    formData.append("username", values.username);

    if (!image) {
      Alert.alert("Error", "Please select an image");
    }

    try {
      const response = await axios.post(`${baseurl}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${res?.token}`,
          "x-user-account-type": "tenant",
        },
      });
      if (response.status === 200) {
        console.log(response, "response in profileUpload");
        router.push({
          pathname: "/(auth)/signup/cardUpload",
          params: { res: JSON.stringify(res), user: JSON.stringify(user) },
        });
      }
    } catch (error) {
      console.log(error);
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
       onSubmit={uploadImage}
       validateOnBlur
     >
       {({ handleChange, handleSubmit }) => (
         <>
        <ScrollView
          className="flex-1 mb-15"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 space-y-5">
            <View className="my-3">
              <Text className="text-[36px] font-bold text-[#111111]">
                {res?.name},
              </Text>
              <View className="w-11/12">
                <Text className="text-2xl text-[#111111]">
                  Verify your account
                </Text>
              </View>
            </View>

            <View className="h-[350px] rounded-[15px] w-full items-center justify-center border-2 border-dashed border-[#3F3F3F24] mb-8 space-y-3 overflow-hidden">
              {image && (
              <Image source={{ uri: String(image) }} className="w-full h-full"/>
            )}
             <View className="absolute inset-0 items-center justify-center">
              <MaterialCommunityIcons
                name="camera-plus"
                size={90}
                color="black"
                role="button"
                onPress={pickImage}
              />
              <Text className="underline">
                Tap to upload your preferred profile picture
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
        </>
       )}
        </Formik>
      </KeyboardAvoidingView>
      <BottomModal
        text={"is confirming your verification code"}
        loading={loading}
        open = {loading}
      />
    </SafeAreaView>
  );
};

export default ProfileUpload;
