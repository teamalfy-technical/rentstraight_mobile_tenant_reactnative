import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Select } from "native-base";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import EmergencyContact from "@/components/EmergencyContact";
import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import { baseurl } from "../api/baseurl";
import { useAuth } from "@/context/AuthContext";

const DocumentUpload = () => {
  const [doc, setDoc] = useState("");
  const [open, setOpen] = useState(false);
  const refRBSheet = useRef<BottomSheet>(null);
  const snaps = useMemo(() => ["40%", "50%", "100%"], []);
  const [prop, setProp] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const item = useLocalSearchParams();
  console.log(item, "item");

  const fetchProp = async () => {
    await axios
      .get(`${baseurl}/properties/${item?.uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-user-account-type": "tenant",
        },
      })
      .then((res) => {
        console.log(res.data.data, "response for single item");
        if (res.status === 200 || res.status === 201) {
          setProp(res.data.data);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Error",
          `Error fetching property details, please try again later, ${err}`
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProp();
  }, []);

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
          source={{ uri: prop?.thumbnail }}
        >
          <Pressable
            className="absolute top-12 left-5 rounded-2xl bg-white p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={45} color="#F47D7B" />
          </Pressable>
          <View className="p-4 absolute bottom-5">
            <View className="flex-row w-full justify-between items-center">
              <Text
                style={{ fontFamily: "montAlt" }}
                className="font-semibold text-2xl text-white"
              >
                {item?.name}
              </Text>
              <Text className="bg-[#10AF2940] text-[#10AF29] px-2 py-1 rounded-2xl">
              {item?.status}
              </Text>
            </View>

            <Text
              style={{ fontFamily: "montAlt" }}
              className="text-lg text-white"
            >
              {prop?.address?.city}, {item?.address?.line_1} | {prop?.address?.line_2}
            </Text>

            <View className="flex-row mt-2 space-x-5">
              <View className="flex-row items-center space-x-1">
                <Ionicons name="bed-outline" size={24} color="white" />
                <Text className="text-white">{prop?.stats?.features?.bedrooms}</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={24}
                  color="white"
                />
                <Text className="text-white">{prop?.stats?.features?.kitchens}</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MaterialCommunityIcons name="shower" size={24} color="white" />
                <Text className="text-white">{prop?.stats?.features?.bathrooms}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <ScrollView className="px-5">
        <Text className="text-lg my-4">
          Upload documents relevant to your application
        </Text>

        <View className="flex-row justify-between">
          <View className="w-[40%] space-y-4">
            <View className="rounded-[25px] bg-[#10AF2940] w-full p-5 space-y-4">
              <Text>Duration</Text>
              <View className="flex-row w-full items-center justify-between">
                <FontAwesome6 name="calendar-week" size={24} color="#10AF29" />
                <Select placeholder="Year">
                  <Select.Item label="Year" value="year" />
                </Select>
              </View>
              <View className="flex-row items-center justify-between">
                <Octicons name="diff-added" size={24} color="black" />
                <Text>5</Text>
                <AntDesign name="minussquareo" size={24} color="black" />
              </View>
            </View>
            <Pressable
              onPress={() => {
                setOpen(true);
                refRBSheet?.current?.expand();
              }}
              className="rounded-[25px] bg-[#8FBFE0] w-full items-center justify-center p-5"
            >
              <Image
                source={require("@/assets/images/prof.png")}
                resizeMode="contain"
              />
              <Text className="text-[#fff]">Add Emergency Contact</Text>
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

      <View className="flex-row justify-between items-center px-5 bottom-5">
        <View>
          <Text className="font-bold text-[30px]">Ghc300</Text>
          <Text>Per Month</Text>
        </View>

        <View className="w-[50%]">
          <CustomButton
            lab="Apply"
            textColor="#fff"
            bg={doc.trim() === "" ? "#3F3F3F24" : "#F47D7B"}
            onPress={() => {
              if (doc.trim() !== "") {
                router.push("/screens/DocumentUpload");
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DocumentUpload;
