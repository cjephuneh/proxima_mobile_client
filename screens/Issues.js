import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Issues = ({navigation}) => {
    let users = [1,2,3]
    let issues = [1,2,3]
    let tags = [1,2,3]
  return (
    <SafeAreaView className='mt-8 px-3 flex-1'>
      <Text className='font-semibold text-lg'>Maziwa Industries LTD</Text>

      <View className='flex-row space-x-4 items-center mt-4'>
        <View className='flex-row'>
            {
                users.map((user, i) => (
                    <View className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}>
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
            <Text className='font-semibold text-[#2DABB1]'>Join 15 people in this community</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className='mt-4 space-y-4 flex-1'>
            {
                issues.map((issue, i) => (
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('issue')} key={i}>
                        <Text className="text-xl font-bold">Issue with last week's milk</Text>
                        <Text className="text-gray-500 text-xs">Raised by John Doe • Nov 25, 2020</Text>
                        <Image 
                            className='mt-2 w-full rounded'
                            resizeMode='cover'
                            source={require('../assets/company.png')}
                        />
                        <View className='flex-row space-x-3 mt-3'>
                            {
                                tags.map((tag, i) => (
                                    <Text key={i} className='bg-gray-300 px-3 py-1 rounded-full'>bad milk</Text>
                                ))
                            }
                        </View>

                        <View className='mt-4'>
                            <View className='flex-row items-center space-x-2'>
                                <Image
                                    source={require('../assets/user.png')}
                                 />

                                 <Text className='font-bold'>John Doe</Text>
                            </View>
                            <Text className='mt-2'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, aperiam iusto. Quod maiores rerum atque quos incidunt, hic sint neque.
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
      </ScrollView>

      {/* <View className='my-3 flex-row justify-between'>
        <TouchableOpacity className='p-2'>
            <AntDesign name="hearto" size={24} color="#2DABB1" />
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#2DABB1] px-8 py-2 rounded-full'>
            <Text className='font-bold text-white'>Apply Your Thoughts</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  )
}

export default Issues