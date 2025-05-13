import React, { useState } from "react";
import { View, Text, Pressable, Image, Dimensions } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { useAuth } from "@/context/AuthContext";

const height = Dimensions.get('window').height; // Get full screen height

const DrawerNav = () => {
  const [open, setOpen] = useState<boolean>(false); // State to manage drawer open/close
  const { logout, user } = useAuth(); // Access user and logout functionality

  return (
    <Drawer
      open={open} // Controls drawer open state
      onOpen={() => setOpen(true)} // Trigger when drawer opens
      onClose={() => setOpen(false)} // Trigger when drawer closes
      drawerType="front" // Drawer style (can be 'front', 'back', or 'slide')
      drawerPosition="left" // Position the drawer on the left side
      swipeEnabled={true} // Enable swipe to open/close
      drawerStyle={{
        height: '100%', // Take full height of the screen
        width: 300, // Set a fixed width for the drawer
        position: 'absolute', // Fix drawer position
        backgroundColor: '#fff', // Set a background color for the drawer
      }}
      renderDrawerContent={() => (
        <View style={{ padding: 16, height: '100%', justifyContent: 'center' }}>
          <Pressable onPress={() => setOpen(false)}>
            <Text style={{ fontSize: 18 }}>Close Drawer</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setOpen(false); /* Navigate to Edit Profile */
            }}
            style={{ marginTop: 20 }}
          >
            <Text style={{ fontSize: 18 }}>Edit Profile</Text>
          </Pressable>
          <Pressable onPress={logout} style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>Logout</Text>
          </Pressable>
        </View>
      )}
    >
      {/* Main content of the screen */}
      <Pressable
        onPress={() => setOpen(true)} // Open the drawer on press
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={
            user?.avatar
              ? { uri: user.avatar }
              : require("@/assets/images/user.jpeg")
          } // Show user's avatar or fallback image
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </Pressable>
    </Drawer>
  );
};

export default DrawerNav;
