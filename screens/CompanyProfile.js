import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const CompanyProfile = () => {
  return (
    <SafeAreaView>
      <View className='relative'>
        <Image source={require('../assets/companyBg.png')} resizeMode='cover' className='h-40 w-full' />
        <View className='justify-center items-center'>
          <View className='absolute -bottom-8 justify-center items-center bg-white rounded-full p-1'>
            <FontAwesome5 name="user-circle" size={100} color="gray" />
          </View>
        </View>
      </View>

      <View className='mt-10 px-3'>
        <View className='space-y-1'>
          <Text className='text-2xl text-center font-bold'>Maziwa Industries Limited</Text>
          <Text className='text-gray-500 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, cumque</Text>
        </View>

        <View className='space-y-4 mt-4 items-center'>
          <View className='flex-row space-x-16'>
            <View>
              <Text className='font-semibold'>Community Rating</Text>
              <View className='flex-row space-x-2 mx-auto'>
                <Ionicons name="star" size={16} color="black" />
                <Text>4.65</Text>
              </View>
            </View>
            <View className=''>
              <Text className='font-semibold'>Issues Resolved</Text>
              <Text className='text-center'>56/100</Text>
            </View>
          </View>

          <View>
            <Text className='font-semibold'>Percentage Resolved</Text>
            <Text className='text-center'>56%</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CompanyProfile