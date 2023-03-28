import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'

const Issue = () => {
    let users = [1,2,3]
    let replies = [1,2,3]

  return (
    <SafeAreaView className='pt-8 px-3 flex-1'>
      <Text className='text-xl font-bold'>Issue with last week's milk</Text>
      <Text className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum temporibus aliquid, maxime omnis laudantium numquam quae eos assumenda totam cum?</Text>
    
        {/* Issue */}
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
                <Text className='font-semibold text-[#2DABB1]'>Join 15 people in upvoting this</Text>
            </TouchableOpacity>
      </View>

        {/* Replies */}
        <ScrollView className='flex-1 my-2 pl-4 space-y-4'>
            {
                replies.map((reply, i) => (
                    <View>
                        <View className='flex-row space-x-2 items-center'>
                            <Image
                                source={require('../assets/user.png')}
                             />
                             <Text className='font-bold'>John Doe</Text>
                        </View>

                        <Text className="mt-3">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet vero unde accusantium iure est nisi doloremque nulla reprehenderit inventore molestias.
                        </Text>

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

                            <TouchableOpacity className='flex-row space-x-1'>
                                <AntDesign name="hearto" size={18} color="#2DABB1" />
                                <Text className='font-semibold text-[#2DABB1]'>154</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }
            <KeyboardAvoidingView className='flex-row items-center space-x-2'>
                <TextInput
                    placeholder='Add your own thoughts'
                    multiline={true}
                    className='border border-gray-300 rounded-xl p-2 mt-2 flex-1'
                />
                <Ionicons name="send" size={24} color="#2DABB1" />
            </KeyboardAvoidingView>
        </ScrollView>

        <View className='my-3 flex-row justify-between'>
        <TouchableOpacity className='p-2'>
            <AntDesign name="hearto" size={24} color="#2DABB1" />
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#2DABB1] px-8 py-2 rounded-full'>
            <Text className='font-bold text-white'>Apply Your Thoughts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Issue