import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons, Ionicons } from '@expo/vector-icons'

const CreateIssue = () => {
    const tags = [
        'milk',
        'food',
        'general'
    ]
  return (
    <SafeAreaView className='pt-8 px-3'>
      <Text className='text-2xl font-bold text-center'>Create an issue</Text>

      <View className='mt-3 flex-row space-x-3 items-center'>
        <Image source={require('../assets/user.png')} />
        <Text className='font-semibold text-lg'>Kevin Kimani</Text>
      </View>

      <KeyboardAvoidingView className='space-y-3'>
        <View className='flex-row items-center mt-3 space-x-3 bg-gray-200 px-2 py-1 rounded'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                className='flex-1'
                placeholder='Search Organization'
            />
        </View>

        <TextInput
            className='bg-gray-200 px-4 py-2 rounded'
            placeholder='Add a title for your issue'
        />

        <TextInput
            multiline={true}
            numberOfLines={3}
            className='bg-gray-200 px-4 py-2 rounded'
            placeholder='Add a description for your issue'
        />

        <Text>Add tags for your issue to make it easy to find</Text>

        <View className='flex-row space-x-2'>
            {
                tags.map((tag, i) => (
                    <Text key={i} className='bg-gray-200 px-4 py-2 rounded-2xl'>{tag}</Text>
                ))
            }
        </View>

        <TouchableOpacity className='flex-row space-x-2 items-center bg-[#2DABB1] self-start px-4 py-2 rounded-full mt-2'>
            <Text className='text-white font-semibold'>Send</Text>
            <Ionicons name="send" size={16} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default CreateIssue