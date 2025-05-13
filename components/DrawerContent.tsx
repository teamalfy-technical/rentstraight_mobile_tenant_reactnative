import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useAuth } from '@/context/AuthContext'
import { router } from 'expo-router'

const DrawerContent = ({props}: any) => {
  const { logout } = useAuth()
  return (
    // <SafeAreaView className='flex-1'>
      <DrawerContentScrollView  {...props}>
      <View className='flex-1 space-y-5 px-5'>
      <Pressable onPress={() => router.push('/screens/ProfileUpdate')}>
        <Text>Edit Profile</Text>
      </Pressable>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
      </View>
      </DrawerContentScrollView>
    // </SafeAreaView>
  )
}

export default DrawerContent