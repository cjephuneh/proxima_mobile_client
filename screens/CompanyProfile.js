import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const CompanyProfile = ({navigation}) => {
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
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('issues')} className=''>
              <Text className='font-semibold'>Issues Resolved</Text>
              <Text className='text-center'>56/100</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className='font-semibold'>Percentage Resolved</Text>
            <Text className='text-center'>56%</Text>
          </View>
        </View>

        <View className='border border-gray-300 my-4' />

        <View className=' space-y-3'>
          <View className='flex-row justify-between'>
            <Text>Support Email</Text>
            <Text>maziwa@domain.com</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Location</Text>
            <Text>Nairobi</Text>
          </View>
        </View>

        <View className='border border-gray-300 my-4' />

        <View>
          <Text className='bg-gray-200 px-4 py-2'>LANGUAGE PREFERENCES</Text>

          <View className='flex-row mt-2 items-center justify-between'>
            <View>
              <Text className='font-semibold'>Language</Text>
              <Text className='text-sm text-gray-500'>English</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CompanyProfile