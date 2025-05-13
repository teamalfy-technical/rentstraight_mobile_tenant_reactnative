import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/Topbar";
import { Formik, FormikValues } from "formik";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import BottomModal from "@/components/BottomModal";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { baseurl } from "@/app/api/baseurl";
import axios from "axios";
import { router } from "expo-router";
import { CustomInput } from "@/components/CustomInput";
import PhoneInput from "react-native-phone-number-input";
// @ts-ignore
import google from "@/assets/images/google-icon.png";
import TopBack from "@/components/TopBack";
import * as yup from "yup";

const ProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { user, logout, updateUser } = useAuth(); // Add updateUser here
  console.log(user, "user");

  const initialValues = {
    photo: user?.avatar,
    full_name: user?.name,
    phone_number: "",
    username: user?.username,
    email: user?.email, // Add this line
  };

  const valSschema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is Required"),
    username: yup.string().required("Username is Required"),
    full_name: yup.string().required("Full Name is Required"),
    phone_number: yup.string().required("Phone Number is Required"),
  });

  const pickImage = async () => {
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
        [{ resize: { width: 1000 } }],
        {
          compress: 0.5,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setImage(manipResult.uri);
    }
  };

  const handleProfileUpload = async (values: FormikValues) => {
    if (!image) {
      Alert.alert("Error", "Please select an image");
      return; // Early return when no image is selected
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("photo", {
      uri: image,
      name: "image.jpg",
      type: "image/jpg",
    } as any);
    formData.append("full_name", values.full_name);
    formData.append("phone_number", values.phone_number);
    formData.append("username", values.username);

    try {
      const res = await axios.post(`${baseurl}/profile/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${user?.token}`,
          "x-user-account-type": "tenant",
        },
      });

      if (res.status === 200) {
        console.log(res.data.data, "response from profile upload");

        // Update the user data in AsyncStorage and context
        await updateUser({
          name: values.name,
          phone_number: values.phone_number,
          username: values.username,
          avatar: res.data.data.avatar, // Assuming the API returns the new photo URL
        });

        // Log the updated user data
        console.log("Updated user in context:", user);

        router.push({
          pathname: "/(tabs)",
          params: { res: JSON.stringify(res) },
        });
      }
    } catch (err) {
      console.log(err, "error from profile upload");
      Alert.alert("Error", "Something went wrong while updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TopBack />
        {/* <View className="mb-6">
              <Text className="text-[64px] font-montAlt">Welcome</Text>
              <Text className="text-2xl font-montAlt">Let's get you started</Text>
            </View> */}

        <Formik
          onSubmit={handleProfileUpload}
          initialValues={initialValues}
          validationSchema={valSschema}
          validateOnBlur={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            const isDisabled =
              !values?.full_name ||
              !values?.phone_number ||
              !values?.username ||
              !values?.email;

            return (
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                <View className="flex-1">
                  <View className="items-center w-full">
                    <View className="justify-center items-center rounded-full w-[200px] h-[200px] border-2 relative">
                      <Image
                        source={
                          image
                            ? { uri: image }
                            : user?.avatar
                            ? { uri: user?.avatar }
                            : require("@/assets/images/logo.png")
                        }
                        className="rounded-full w-full h-full"
                      />
                      <View className=" w-full items-center justify-center absolute">
                        <MaterialCommunityIcons
                          name="camera-plus"
                          size={50}
                          color="black"
                          role="button"
                          onPress={pickImage}
                          className="items-center justify-center absolute"
                        />
                      </View>
                    </View>
                  </View>
                  <CustomInput
                    ph="Full Name"
                    value={values?.full_name}
                    change={handleChange("full_name")}
                    blur={handleBlur("full_name")}
                  />
                  {errors?.full_name && (
                    <Text className="text-red-500">{errors?.full_name}</Text>
                  )}
                  <CustomInput
                    ph="Email"
                    change={handleChange("email")}
                    blur={handleBlur("email")}
                    value={values?.email}
                  />
                  {errors?.email && (
                    <Text className="text-red-500">{errors?.email}</Text>
                  )}
                  <CustomInput
                    ph="Username"
                    change={handleChange("username")}
                    blur={handleBlur("username")}
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
                    onChangeFormattedText={handleChange("phone_number")}
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
                </View>

                <View className="my-4">
                  <CustomButton
                    lab="Save"
                    bg={isDisabled ? "#c5c6c7" : "#F47D7B"}
                    textColor={isDisabled ? "#000" : "#fff"}
                    onPress={handleSubmit}
                    disabled={isDisabled}
                  />
                </View>
              </ScrollView>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
      <BottomModal
        text={"is updating your profile, please wait"}
        loading={loading}
        open={loading}
      />
    </SafeAreaView>
  );
};

export default ProfileUpdate;
