import { View, Text, Image } from 'react-native'
import React from 'react'
// @ts-ignore
import logo from "@/assets/images/logo.png"

const TopBar = () => {
  return (
    <View className=''>
      <Image source={logo} className='w-[60px] h-[65px]' resizeMode='contain'/>
    </View>
  )
}

export default TopBar