import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBack from "@/components/TopBack";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Select } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Accept = () => {
  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      {/* <EmergencyContact
          open={open}
          setOpen={setOpen}
          refRBSheet={refRBSheet}
          change={handleSheetChanges}
          snaps={snaps}
        /> */}
      <View
        className="relative rounded-bl-2xl rounded-br-2xl overflow-hidden"
        style={{ height: hp(40), width: wp(100) }}
      >
        <ImageBackground
          className="flex-1"
          resizeMode="cover"
          source={require("@/assets/images/bg3.jpeg")}
        >
          <Pressable
            className="absolute top-12 left-5 rounded-2xl bg-white p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={45} color="#F47D7B" />
          </Pressable>
          <View className="p-4 absolute bottom-5">
            <View className="flex-row w-full justify-between items-center">
              <Text style={{fontFamily: 'montAlt'}} className="font-semibold text-2xl text-white">
                House Name
              </Text>
              <Text className="bg-[#10AF2940] text-[#10AF29] px-2 py-1 rounded-2xl">
                Status
              </Text>
            </View>

            <Text style={{fontFamily: 'montAlt'}} className="text-lg text-white">
              Ritz, Adenta | 3.5Km away
            </Text>

            <View className="flex-row w-full justify-between items-center">
              <View className="flex-row mt-2 space-x-5">
                <View className="flex-row items-center space-x-1">
                  <Ionicons name="bed-outline" size={24} color="white" />
                  <Text className="text-white">1</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <MaterialCommunityIcons
                    name="silverware-fork-knife"
                    size={24}
                    color="white"
                  />
                  <Text className="text-white">2</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <MaterialCommunityIcons
                    name="shower"
                    size={24}
                    color="white"
                  />
                  <Text className="text-white">5</Text>
                </View>
              </View>
              <Link href="/">
                <Text className="text-[#FC4444] underline text-base">
                  Decline Offer
                </Text>
              </Link>
            </View>
          </View>
        </ImageBackground>
      </View>

      <ScrollView className="px-5">
        <View className="border-2 border-[#10AF29] rounded-2xl p-4 bg-[#10AF2940] my-3">
          <Text className="text-lg my-1 text-[#10AF29]">Accepted</Text>
          <Text className="text-base text-justify my-1">
            Your application to this house, has been accepted by Kirk Wolf, tap
            accept to accept the terms and condition, make payment and claim
            your property
          </Text>
        </View>

        <View className="flex-row justify-between">
          <View className="w-[40%] space-y-4">
            <View className="rounded-[25px] bg-[#10AF2940] w-full p-5 space-y-4">
              <View className="flex-row w-full items-center justify-between">
                <View className="rounded-full bg-[#FFFFFF80] p-2">
                  <View className="rounded-full border-[6px] border-[#10AF29] p-2">
                    <FontAwesome6
                      name="calendar-week"
                      size={18}
                      color="#10AF29"
                    />
                  </View>
                </View>
                {/* <Select placeholder="Year">
                  <Select.Item label="Year" value="year" />
                </Select> */}
              </View>
              <View className="flex-row items-center justify-between">
                <Text style={{fontFamily: 'montAlt'}} className="text-[#111111] font-bold text-2xl">
                  3 Years
                </Text>
              </View>
            </View>
            <Pressable
              //   onPress={() => {
              //     setOpen(true);
              //     refRBSheet?.current?.expand();
              //   }}
              className="rounded-[25px] bg-[#8FBFE0] w-full p-3"
            >
              <Image
                source={require("@/assets/images/user.jpeg")}
                resizeMode="contain"
                className="w-[40px] h-[40px] rounded-[15px]"
              />
              <View className="flex-row items-center justify-between w-full">
                <View>
                  <Text className="text-[#fff] text-base">Mr. Hindolo</Text>
                  <Text className="text-[#fff] text-base">Father</Text>
                </View>

                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 5,
                    borderRadius: 5,
                    elevation: 5,
                  }}
                >
                  <Ionicons
                    name="call"
                    size={24}
                    color="#F47D7B"
                    className="shadow-sm p4"
                  />
                </View>
              </View>
            </Pressable>
          </View>

          <View className="w-[55%]">
            <View className="rounded-[25px] bg-[#F5E2C8] w-full py-5 px-2 space-y-5">
              <Text className="text-lg font-bold px-2">Documents</Text>

              <View className="w-full space-y-3">
                <Text className="text-base px-2">Referral</Text>
                <View className="flex-row w-full items-center justify-between">
                  <View className="w-[70%] space-x-2 items-center flex-row">
                    <Image
                      source={require("@/assets/images/pdf.png")}
                      resizeMode="contain"
                      style={{ width: 50, height: 50 }}
                    />
                    <Text className="text-sm">Referee</Text>
                  </View>
                  <View className="w-[22%]">
                    <MaterialIcons name="add-circle" size={35} color="black" />
                  </View>
                </View>
              </View>

              <View className="w-full space-y-3">
                <Text className="text-base px-2">Bank Statement</Text>
                <View className="flex-row w-full items-center justify-between">
                  <View className="w-[70%] space-x-1 items-center flex-row">
                    <Image
                      source={require("@/assets/images/pdf.png")}
                      resizeMode="contain"
                      style={{ width: 50, height: 50 }}
                    />
                    <Text className="text-sm">Statement</Text>
                  </View>
                  <View className="w-[20%]">
                    <MaterialIcons name="add-circle" size={35} color="black" />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row justify-between items-center px-5 bottom-1 bg-white py-3">
        <View>
          <Text className="font-bold text-[30px]">Ghc300</Text>
          <Text>Per Month</Text>
        </View>

        <View className="w-[50%]">
          <CustomButton
            lab="Accept"
            textColor="#fff"
            bg="#F47D7B"
            onPress={() => {
              router.push("/screens/DocumentUpload");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Accept;
