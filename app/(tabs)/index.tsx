import { View, Text, Image, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Input } from "native-base";
import VertHorView from "@/components/VertHorView";
import ListView from "@/components/ListView";
import { baseurl } from "../api/baseurl";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import BottomModal from "@/components/BottomModal";
import { router } from "expo-router";

type UserResponse = {
  full_name: string;
  token: string;
  account_type: string;
  phone_number: string;
};

const Home = () => {
  const { token, user } = useAuth();
  console.log(user, "user")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ userdata, setUserdata ] = useState({})

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${baseurl}/me`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user?.token}`,
          "x-user-account-type": 'tenant',
        },
      });
      console.log(res.data.data, "response");
      setUserdata(res.data.data);
    } catch (err) {
      console.log(err, "error fetching user profile");
    }
  }

  // Resend email function to send verification token
const resendEmail = async () => {
  try {
    const res = await axios.post(
      `${baseurl}/email/resend-verification-token/`,
      {},  // Empty object for the POST body
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-user-account-type": 'tenant',
        },
      }
    );
    if(res.status === 200){
    console.log("Verification email resent successfully.");
    }
  } catch (error) {
    console.error("Failed to resend verification email.", error);
  }
};

  const fetchData = async () => {
    await axios
      .get(`${baseurl}/properties/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-user-account-type": "tenant"
        },
      })
      .then((res) => {
        console.log(res.data.data.data, "response from props");
        setData(res.data.data.data);
      })
      .catch((err) => {
        console.error(err, "err");

    // Check if error response exists and handle email verification case
    if (err.response && err.response.data?.message === "Your email address is not verified.") {
      console.log("Email not verified, resending verification email...");
      resendEmail(); // Resend verification email

      // Redirect user to OTP screen
      const res = user; // Use `user` for token and account type
      router.replace({
        pathname: '/(auth)/signup/otp',
        params: {
          res: JSON.stringify({
            full_name: res?.full_name || "", 
            token: res?.token || "", 
            account_type: "tenant" || ""
          }),
          user: JSON.stringify({
            phone_number: userdata?.phone_number || "", 
            username: res?.username || ""
          })
        }
      });
    }
        // Alert.alert('Error', err.response?.data?.message || 'Something went wrong')
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [active, setActive] = useState("horizontal");

  return (
    <SafeAreaView className="flex-1 px-5 my-5" edges={['bottom']}>
      <View>
        <Text style={{fontFamily: 'montAlt'}} className="text-lg text-[#3F3F3F]">Welcome</Text>
        <View className="flex-row flex-wrap">
          <Text style={{fontFamily: 'montAlt'}} className="text-lg flex-shrink flex-grow font-semibold">
            {user?.username}, Find the best
          </Text>
          <Text style={{fontFamily: 'montAlt'}} className="text-lg text-[#F47D7B] flex-shrink flex-grow font-semibold">
            Rental Home Here
          </Text>
        </View>
      </View>

      <View className="mt-4 bg-white rounded-[15px]">
        <Input
          type="text"
          placeholder="Search House"
          // variant="filled"
          // py="0"
          borderRadius="15px"
          style={{fontFamily: 'montAlt'}}
          className="bg-white text-lg"
          InputRightElement={
            <Image
              source={require("@/assets/images/setting.png")}
              resizeMode="contain"
              // className="w-6 h-6 mr-3"
            />
          }
        />
      </View>

      <View className="flex-row items-center justify-between my-5">
        <MaterialCommunityIcons
          style={{
            backgroundColor: active === "horizontal" ? "#F47D7B" : "white",
            padding: 10,
            borderRadius: 15,
            overflow: "hidden",
            color: active === "horizontal" ? "#fff" : "black",
          }}
          name="cards-outline"
          size={35}
          onPress={() => setActive("horizontal")}
        />
        <MaterialCommunityIcons
          name="cards-variant"
          size={35}
          style={{
            backgroundColor: active === "vertical" ? "#F47D7B" : "white",
            padding: 10,
            borderRadius: 15,
            overflow: "hidden",
            color: active === "vertical" ? "#fff" : "black",
          }}
          onPress={() => setActive("vertical")}
        />
        <FontAwesome
          name="list-ul"
          size={35}
          style={{
            backgroundColor: active === "list" ? "#F47D7B" : "white",
            padding: 10,
            borderRadius: 15,
            overflow: "hidden",
            color: active === "list" ? "#fff" : "black",
          }}
          onPress={() => setActive("list")}
        />
      </View>

      <View className="flex-1 mb-[75px]">
        {data.length > 0 ? (
        <FlatList
          data={data}
          horizontal={active === "horizontal"}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            active === "horizontal" || active === "vertical" ? (
              <VertHorView item={item} active={active} />
            ) : (
              <ListView item={item} active={active} />
            )
          }
          keyExtractor={(item) => item?.id.toString()}
        />
      ): (
        <View className="items-center justify-center mt-[50%]">
          <Text className="text-center text-2xl" style={{ fontFamily: 'montAlt' }}>No Property Uploaded</Text>
        </View>
      )}
      </View>
      {loading && (
        <BottomModal
          text={"is fetching properties, please wait..."}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
