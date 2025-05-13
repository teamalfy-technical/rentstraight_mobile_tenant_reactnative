import { View, Text, Image, FlatList, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Input } from 'native-base'
import { useAuth } from '@/context/AuthContext'

const Appointments = () => {
    const { user } = useAuth()
  return (
    <SafeAreaView className="flex-1 px-5 my-5" edges={['bottom']}>
      <View>
        <Text style={{fontFamily: 'montAlt'}} className="text-[32px] text-[#3F3F3F]">My Scheduled Appointments</Text>
      </View>

      <View className="mt-4">
        <Input
          type="text"
          placeholder="Search House"
          variant="filled"
          py="0"
          borderRadius="15px"
          style={{fontFamily: 'montAlt'}}
          className="bg-white text-lg"
          InputRightElement={
            <Image
              source={require("@/assets/images/setting.png")}
              resizeMode="cover"
              // className="w-6 h-6 mr-3"
            />
          }
        />
      </View>

      <View className='flex-1'>
        <FlatList 
            data={[1,2,3]}
            renderItem={({ item }) => (
                <Pressable className='py-3 flex-row items-center space-x-5'>
                    <Avatar source = {require('@/assets/images/user.jpeg')} size={'lg'}/>
                    <View className='w-[75%]'>
                        <Text className='text-lg font-semibold' style = {{ fontFamily: 'montAlt' }}>Mr. Kirk Wolf</Text>
                        <Text className='text-base'>Appointment Scheduled for 2nd May,2024 at 1am</Text>
                    </View>
                </Pressable>
            )}
            // contentContainerStyle={}
            style={{
                flex: 1
            }}
        />
      </View>
      </SafeAreaView>
  )
}

export default Appointments