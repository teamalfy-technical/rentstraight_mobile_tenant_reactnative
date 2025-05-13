import { View, Text, Pressable } from 'react-native'
import React from 'react'

type ButtonProps = {
    lab?:string;
    bg?: string;
    onPress?: () => void;
    textColor?: string;
    disabled?: boolean;
}
const CustomButton = ({lab, bg, onPress, textColor, disabled}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} className={`rounded-[15px] bg-[${bg}] py-4 items-center`} disabled={disabled}>
        <Text className={`text-[${textColor}] text-lg`}>{lab}</Text>
  </Pressable>
  )
}

export default CustomButton