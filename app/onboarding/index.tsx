import TopBar from "@/components/Topbar";
import { Dimensions, ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// @ts-ignore
import bg from "@/assets/images/bg1.png";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

export default function Index() {
  const screenHeight = Dimensions.get("window").height;

  // Reanimated shared values
  const bgHeight = useSharedValue(0);
  const gradientOpacity = useSharedValue(0);

  // Animated styles
  const bgAnimatedStyle = useAnimatedStyle(() => ({
    height: bgHeight.value,
  }));

  const gradientAnimatedStyle = useAnimatedStyle(() => ({
    opacity: gradientOpacity.value,
  }));

  useEffect(() => {
    // Animate the background "fading down" (increasing height from 0 to full)
    bgHeight.value = withTiming(screenHeight, { duration: 2000 }, (finished) => {
      if (finished) {
        gradientOpacity.value = withTiming(1, { duration: 1500 });
      }
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#8FBFE0]" edges={["top"]}>
      <View className="px-5">
        <TopBar />
      </View>

          <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
          },
          bgAnimatedStyle,
        ]}
      >

      <ImageBackground
        source={bg}
        className="flex-1 w-full h-full bg-left-bottom"
        resizeMode="cover"
      >
        <View className="flex-[0.8]" />
        
      </ImageBackground>
         <Animated.View
        style={[
          {
            position: "absolute",
            top: '50%',
            bottom: 0,
            left: 0,
            right: 0,
          },
          gradientAnimatedStyle,
        ]}
      >
          <LinearGradient
            colors={["#FFFFFF98", "#FFFFFF", "#FFFFFF"]}
            style={{ flex: 1 }}
          >
            <View className="flex-1 px-5 space-y-5">
              <Text
                className="text-[55px] text-[#412234] pt-4"
                style={{ fontFamily: "montAlt" }}
              >
                Elevate Your Experience
              </Text>
              <Text
                className="text-xl text-[#111111]"
                style={{ fontFamily: "montAlt" }}
              >
                Where Convenience Meets Comfort.
              </Text>
            </View>
            <View className="px-5 pb-5">
              <Pressable
                className="rounded-[30px] bg-[#F47D7B] py-4 items-center bottom-3"
                onPress={() => router.replace("/(auth)")}
              >
                <Text className="text-[#fff] text-lg">Get Started</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}
