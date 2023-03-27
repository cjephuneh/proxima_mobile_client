import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const CompanyLocation = ({navigation}) => {
  return (
    <SafeAreaView className='flex-1 pt-8 px-3 relative'>
        <TouchableOpacity onPress={() => navigation.navigate('company')} className='absolute top-12 left-6 z-10'>
            <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <View className='h-2/3 bg-gray-300 rounded-t-xl' />
        <View className='-mt-8 ml-4 shadow-lg bg-white w-[150px] rounded'>
            <Image source={require('../assets/company.png')} className='w-[150px] h-[100px]' resizeMode='contain' />
            <View className='p-1'>
            <Text className='font-bold'>Maziwa Industries LTD</Text>
            <Text className='text-sm text-gray-500'>Nairobi, Kenya</Text>
            <View className='flex-row space-x-2'>
                <AntDesign name="star" size={18} color="yellow" />
                <Text className="font-bold">4.65</Text>
            </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default CompanyLocation