import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'

const Community = ({navigation}) => {
  let users = [1,2,3]

  return (
    <SafeAreaView className='flex-1'>
      <View className='relative'>
        <Image source={require('../assets/companyBg.png')} resizeMode='cover' className='h-40 w-full' />
        <View className='justify-center items-center'>
        </View>
      </View>

      <View className='mt-4 px-3 flex-1 justify-between mb-2'>
        <View>
        <View className='space-y-1'>
          <Text className='text-2xl text-center font-bold'>Maziwa Industries Limited</Text>
          <Text className='text-gray-500 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, cumque</Text>
        </View>

        <View className='flex-row space-x-4 items-center mt-4'>
            <View className='flex-row'>
                {
                    users.map((user, i) => (
                        <View key={i} className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}>
                            <Image 
                                key={i}
                                source={require('../assets/user.png')}
                                
                            />
                        </View>
                    ))
                }
                
            </View>

            <TouchableOpacity className='flex-row space-x-2'>
                <AntDesign name="hearto" size={18} color="#2DABB1" />
                <Text className='font-semibold text-[#2DABB1]'>115 members</Text>
            </TouchableOpacity>
        </View>
        <View className='mt-4 flex-row justify-around'>
          <View className='items-center'>
            <Text className='font-semibold'>Community Rating</Text>
            <Text>4.65</Text>
          </View>
          <View className='items-center'>
            <Text className='font-semibold'>Issues Resolved</Text>
            <Text>56/100</Text>
          </View>
        </View>
        </View>

        <TouchableOpacity 
          className='bg-[#2DABB1] px-6 py-2 rounded-full'
          activeOpacity={0.8}
          onPress={() => navigation.navigate('issues')}
        >
          <Text className='text-white font-semibold text-center'>View Community Issues</Text>
        </TouchableOpacity>
      </View>
      
      
    </SafeAreaView>
  )
}

export default Community