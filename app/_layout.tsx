import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from "react";
import { NativeBaseProvider, Box } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync(); // Ensure splash screen doesn't hide

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'montAlt': require('@/assets/fonts/MontserratAlternates-Regular.ttf'),
    'mont': require('@/assets/fonts/Montserrat-Regular.ttf')
  });

  // Hide splash screen when fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NativeBaseProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </AuthProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
