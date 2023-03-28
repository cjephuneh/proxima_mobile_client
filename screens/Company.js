import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import MapView from 'react-native-maps';

const Company = ({navigation}) => {
    const products = [
        {
            quantity: '500ml',
            name: 'Our largest package'
        },
        {
            quantity: '250ml',
            name: 'Our second largest package'
        },
        {
            quantity: '100ml',
            name: 'Our smallest package'
        }
    ]
  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
      <Text className="text-2xl font-bold">
        Maziwa Industries LTD
      </Text>
      <Text className='text-gray-500 text-sm'>Joined Monday, January 25, 2021</Text>

        <View className='mt-2 flex-row justify-between'>
            <TouchableOpacity 
                className='bg-[#2DABB1] px-8 py-2 rounded-full'
                activeOpacity={0.9}
                onPress={() => navigation.navigate('issue')}
            >
                <Text className='font-semibold text-white'>Raise an issue</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                className='px-8 py-2 flex-row items-center justify-center space-x-2 border border-gray-300 rounded-full'
                activeOpacity={0.9}
                onPress={() => navigation.navigate('chat')}
            >
                <Text className='text-[#2DABB1] font-semibold'>Chat</Text>
                <Ionicons name="send" size={14} color="#2DABB1" className='rotate-90' />
            </TouchableOpacity>
        </View>

      <View className='mt-4'>
        <Text className="text-lg font-bold">Our popular products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
            className='space-x-4'
        >
            {
                products.map((product, index) => (
                    <View key={index} className='w-32 mt-2'>
                        <View className='h-32 w-32 rounded bg-black' />
                        <Text className='font-bold'>{product.quantity}</Text>
                        <Text className='text-sm text-gray-700'>{product.name}</Text>
                    </View>
                ))
            }
        </ScrollView>

        <View className='mt-4'>
            <View className=''>
                <MapView className='w-full h-52' />
            </View>

            <Text className="font-bold text-xl mt-2">Nairobi, Kenya</Text>
            <Text className="text-sm text-gray-500">View the location of this company</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Company