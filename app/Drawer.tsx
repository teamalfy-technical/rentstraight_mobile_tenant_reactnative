import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./(tabs)";
import DrawerContent from "@/components/DrawerContent";
import { Image, Pressable, Text, TouchableOpacity } from "react-native";
import { View } from "native-base";
import { useAuth } from "@/context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import TabsLayout from "./(tabs)/_layout";
import { Drawer } from 'expo-router/drawer'
// import { useNavigation } from "@react-navigation/native";  // Ensure this is imported

// const Drawer = createDrawerNavigator();

export default function DrawerTabs() {
  const { user } = useAuth();

  return (
    <Drawer drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen
        name="/(tabs)"
        // component={TabsLayout}
        // options={({ navigation }) => ({
        //   headerLeft: () => {
        //     return (
        //       <Pressable onPress={() => navigation.openDrawer()}>
        //         <Image
        //           source={require("@/assets/images/menu.png")}
        //           resizeMode="cover"
        //           style={{ width: 60, height: 60, marginLeft: 20 }}
        //         />
        //       </Pressable>
        //     );
        //   },
        //   headerRight: () => {
        //     return (
        //       <TouchableOpacity onPress={() => router.push('/screens/ProfileUpdate')} style={{ width: 60, height: 60, borderRadius: 8, alignItems: 'center', marginRight: 20, overflow: 'hidden' }}>
        //         <Image
        //           source={require("@/assets/images/user.jpeg")}
        //           resizeMode="cover"
        //           style={{ width: '100%', height: '100%' }}
        //         />
        //       </TouchableOpacity>
        //     );
        //   },
        //   headerTitle: () => {
        //     return (
        //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //         <Entypo name="location-pin" size={30} color="#F47D7B" />
        //         <Text style={{ fontSize: 18 }}>Location</Text>
        //       </View>
        //     );
        //   },
        //   headerBackground: () => (
        //     <View style={{ backgroundColor: "transparent" }} />
        //   ),
        //   headerStyle: {
        //     height: 100
        //   }
        // })}
      />
    </Drawer>
  );
}
