import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const OnBoarding = () => {
  const navigation = useNavigation()
  const user = useSelector((state) => state.auth.user)
  return (
    <SafeAreaView className='flex-1'>
      <View className='py-8 px-8 flex-1 items-center justify-between bg-white'>
        <View className='pt-4'>
          <Text className='text-3xl font-bold text-center'>Real-time, convenient</Text>
          <Text className='text-3xl font-bold text-center'>messaging</Text>
        </View>
        <View>
          <Image
            source={require('../assets/splash.png')}
          />
        </View>

          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={user ?  () => navigation.navigate('drawer') : () => navigation.navigate('login')} 
            className='bg-[#2DABB1] px-6 py-3 w-full rounded-full'
          >
            <Text className='text-white text-center text-xl font-semibold'>Get started</Text>
          </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default OnBoarding