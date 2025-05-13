import TopBar from "@/components/Topbar";
import { Redirect } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <Redirect href={"/onboarding/"} />
  )
}
