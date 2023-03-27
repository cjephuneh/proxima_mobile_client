import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const Company = () => {
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
            <View className='w-full h-52 rounded-2xl bg-gray-400' />
            <Text className="font-bold text-xl mt-2">Nairobi, Kenya</Text>
            <Text className="text-sm text-gray-500">View the location of this company</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Company