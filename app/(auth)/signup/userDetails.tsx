import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import PhoneInput from "react-native-phone-number-input";
import BottomModal from "@/components/BottomModal";
import { useNewAuth } from "@/context/NewAuthContext";

const UserDetails = ({ errors, blur }: any) => {
  const { user, handleChange: change, register, registerStatus } = useNewAuth();
  const disable =
    !user?.name ||
    !user?.contactName ||
    !user?.phone ||
    !user?.password ||
    !user?.password_confirmation;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Move the KeyboardAvoidingView *outside* the ScrollView so it can measure full height */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10} // tweak as needed
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingBottom: 0, // leave extra space so the last field clears the keyboard
          }}
        >
          {/* Header */}
          <View>
            <Text style={{ fontFamily: "montAlt", fontSize: 64 }}>Welcome</Text>
            <Text style={{ fontFamily: "montAlt", fontSize: 24 }}>Let’s get you started</Text>
          </View>

          {/* Form */}
          <View>
            <CustomInput
              ph="Full Name"
              value={user?.name}
              change={(text: string) => change("name", text)}
              blur={blur("name")}
            />
            {errors?.name && (
              <Text style={{ color: "#ef4444" }}>{errors?.name}</Text>
            )}

            <CustomInput
              ph="Email"
              value={user?.email}
              change={(text: string) => change("email", text)}
              blur={blur("email")}
            />
            {errors?.email && (
              <Text style={{ color: "#ef4444" }}>{errors?.email}</Text>
            )}

            <CustomInput
              ph="Contact Name"
              value={user?.contactName}
              change={(text: string) => change("contactName", text)}
              blur={blur("contactName")}
            />
            {errors?.contactName && (
              <Text style={{ color: "#ef4444" }}>{errors?.contactName}</Text>
            )}

            <PhoneInput
              placeholder="Enter phone number"
              defaultValue={user?.phone}
              defaultCode="GH"
              layout="second"
              onChangeFormattedText={(text) => change("phone", text)}
              containerStyle={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#3F3F3F24",
                borderRadius: 15,
                overflow: "hidden",
                margin: 0,
                padding: 0,
                height: 55,
                alignContent: 'center'
              }}
              textContainerStyle= {{
                padding: 0,
                margin: 0
              }}
              flagButtonStyle ={{
                padding: 0,
                margin: 0
              }}
              textInputStyle = {{
                padding: 0,
                margin: 0
              }}
            />

            <CustomInput
              ph="Password"
              secureEntry={!showPassword}
              change={(text: string) => change("password", text)}
              blur={blur("password")}
              iconRight={
                <Entypo
                  name={showPassword ? "eye-with-line" : "eye"}
                  size={24}
                  color="black"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            {errors?.password && (
              <Text style={{ color: "#ef4444" }}>{errors?.password}</Text>
            )}

            <CustomInput
              ph="Confirm Password"
              secureEntry={!showPassword}
              change={(text: string) => change("password_confirmation", text)}
              blur={blur("password_confirmation")}
              iconRight={
                <Entypo
                  name={showPassword ? "eye-with-line" : "eye"}
                  size={24}
                  color="black"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            {errors?.password_confirmation && (
              <Text style={{ color: "#ef4444" }}>{errors?.password_confirmation}</Text>
            )}

            {/* Submit */}
            <View style={{ marginVertical: 16 }}>
              <CustomButton
                lab="Continue"
                bg="#F47D7B"
                textColor="#fff"
                onPress={() => register(user || {})}
                disabled={disable}
              />
            </View>

            {/* Sign‑in link */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              <Text>Already have an Account? </Text>
              <Pressable onPress={() => router.push("/(auth)")}> 
                <Text style={{ color: "#F47D7B" }}>Sign In here</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading modal */}
      <BottomModal
        loading={registerStatus.isPending}
        open={registerStatus.isPending}
        text="Setting up your account, please wait..."
      />
    </SafeAreaView>
  );
};

export default UserDetails;
