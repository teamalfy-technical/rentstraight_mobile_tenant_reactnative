import { useAuth } from "@/context/AuthContext";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Tabs } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabsLayout() {
    const { user } = useAuth()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 30 : 10,
          elevation: 5,
          width: "90%",
          paddingHorizontal: 0,
          paddingVertical: Platform.OS === "ios" ? 50 : 10,
          left: "5%",
          right: "5%",
          borderRadius: 100,
          backgroundColor: "#412234",
          height: 80,
          zIndex: 1000,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center", // Changed to 'center'
          width: "100%",
          height: "100%", // Ensure full height usage
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.homeIconContainer}>
              <LinearGradient
                colors={
                  focused ? ["#F47D7B", "#F47D7B"] : ["#F5E2C8B0", "#8FBFE078"]
                }
                style={[styles.iconGradient, styles.homeIconGradient]}
              >
                <Entypo name="home" size={30} color="white" />
              </LinearGradient>
            </View>
          ),
          tabBarShowLabel: false,
          headerLeft: () => {
            return (
              <Pressable>
                <Image
                  source={require("@/assets/images/menu.png")}
                  resizeMode="cover"
                  style={{ width: 60, height: 60, marginLeft: 20 }}
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => router.push("/screens/ProfileUpdate")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  alignItems: "center",
                  marginRight: 20,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: user?.avatar }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            );
          },
          headerTitle: () => {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="location-pin" size={30} color="#F47D7B" />
                <Text style={{ fontSize: 18 }}>Location</Text>
              </View>
            );
          },
          headerBackground: () => (
            <View style={{ backgroundColor: "transparent" }} />
          ),
          headerStyle: {
            height: 100,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.homeIconContainer}>
              <LinearGradient
                colors={
                  focused ? ["#F47D7B", "#F47D7B"] : ["#F5E2C8B0", "#8FBFE078"]
                }
                style={[styles.iconGradient, styles.homeIconGradient]}
              >
                <Ionicons name="settings" size={24} color="white" />
              </LinearGradient>
            </View>
          ),
          tabBarShowLabel: false,
          headerLeft: () => {
            return (
              <Pressable>
                <Image
                  source={require("@/assets/images/menu.png")}
                  resizeMode="cover"
                  style={{ width: 60, height: 60, marginLeft: 20 }}
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => router.push("/screens/ProfileUpdate")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  alignItems: "center",
                  marginRight: 20,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: user?.avatar }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            );
          },
          headerTitle: () => {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="location-pin" size={30} color="#F47D7B" />
                <Text style={{ fontSize: 18 }}>Location</Text>
              </View>
            );
          },
          headerBackground: () => (
            <View style={{ backgroundColor: "transparent" }} />
          ),
          headerStyle: {
            height: 100,
          },
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.homeIconContainer}>
              <LinearGradient
                colors={
                  focused ? ["#F47D7B", "#F47D7B"] : ["#F5E2C8B0", "#8FBFE078"]
                }
                style={[styles.iconGradient, styles.homeIconGradient]}
              >
                <MaterialIcons name="favorite" size={24} color="white" />
              </LinearGradient>
            </View>
          ),
          tabBarShowLabel: false,
          headerLeft: () => {
            return (
              <Pressable>
                <Image
                  source={require("@/assets/images/menu.png")}
                  resizeMode="cover"
                  style={{ width: 60, height: 60, marginLeft: 20 }}
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => router.push("/screens/ProfileUpdate")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  alignItems: "center",
                  marginRight: 20,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: user?.avatar }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            );
          },
          headerTitle: () => {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="location-pin" size={30} color="#F47D7B" />
                <Text style={{ fontSize: 18 }}>Location</Text>
              </View>
            );
          },
          headerBackground: () => (
            <View style={{ backgroundColor: "transparent" }} />
          ),
          headerStyle: {
            height: 100,
          },
        }}
      />
      <Tabs.Screen
        name="cal"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.homeIconContainer}>
              <LinearGradient
                colors={
                  focused ? ["#F47D7B", "#F47D7B"] : ["#F5E2C8B0", "#8FBFE078"]
                }
                style={[styles.iconGradient, styles.homeIconGradient]}
              >
                <FontAwesome5 name="calendar-day" size={24} color="white" />
              </LinearGradient>
            </View>
          ),
          tabBarShowLabel: false,
          headerLeft: () => {
            return (
              <Pressable>
                <Image
                  source={require("@/assets/images/menu.png")}
                  resizeMode="cover"
                  style={{ width: 60, height: 60, marginLeft: 20 }}
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => router.push("/screens/ProfileUpdate")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  alignItems: "center",
                  marginRight: 20,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: user?.avatar }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            );
          },
          headerTitle: () => {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="location-pin" size={30} color="#F47D7B" />
                <Text style={{ fontSize: 18 }}>Location</Text>
              </View>
            );
          },
          headerBackground: () => (
            <View style={{ backgroundColor: "transparent" }} />
          ),
          headerStyle: {
            height: 100,
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    width: 60,
    height: 60,
    elevation: 5,
    marginBottom: Platform.OS === "ios" ? 20 : 10,
  },
  homeIconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
  },
  homeIconGradient: {
    // marginBottom: 0,
    marginLeft: 15, // Half of the icon's width to make it touch the left edge
    width: 60,
    height: 60,
  },
  calendar: {
    marginRight: -45,
    width: 60,
    height: 60,
    marginBottom: 13,
  },
});
