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
      headerShown: false,
      tabBarStyle: {
        bottom: 35,
        alignSelf: "center",
        elevation: 5,
        width: "90%",
        borderRadius: 100,
        backgroundColor: "#412234",
        paddingVertical: 10,
        alignItems: "center",
        height: 80,
      },
      tabBarItemStyle: {
        alignItems: "center",
        justifyContent: "center",
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
                style={styles.iconGradient}
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
                style={styles.iconGradient}
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
                style={styles.iconGradient}
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
                style={styles.iconGradient}
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
    marginVertical: 'auto'
  },
  homeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    marginVertical: 'auto',
    alignSelf: "center",
    paddingTop: 5
  },
  // homeIconGradient: {
  //   // marginBottom: 0,
  //   marginLeft: 15, // Half of the icon's width to make it touch the left edge
  //   width: 60,
  //   height: 60,
  // },
  calendar: {
    marginRight: -45,
    width: 60,
    height: 60,
    marginBottom: 13,
  },
});
