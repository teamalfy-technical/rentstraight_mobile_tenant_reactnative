import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBack from '@/components/TopBack'
import { CustomInput } from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const Invites = () => {
  return (
    <SafeAreaView className='flex-1 px-5'>
        <TopBack />
        <Text style={{fontFamily: 'montAlt'}} className="text-[32px]">Invite a friend</Text>
        <View className='flex-1 items-center justify-center'>
            <View className='w-full'>
                <CustomInput ph='Email' textColor='#111111'/>
                <CustomButton lab='Verify' bg='#F47D7B' textColor='#fff'/>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Invites