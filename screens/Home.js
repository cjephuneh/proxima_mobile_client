import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons, Octicons } from '@expo/vector-icons'

const Home = ({navigation}) => {
    const chats = [
        {
            title: '18th Street Brewery',
            location: 'Dakley Avenue, Hammond, IN'
        },
        {
            title: '18th Street',
            location: 'Brooklyn, NY'
        }
    ]
  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.openDrawer()}
            className='flex-row space-x-3'
        >
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <Text>Search chats</Text>
        </View>
        <Image source={require('../assets/user.png')} />
      </TouchableOpacity>
      
      <Text className='text-2xl font-bold mt-2'>Find a chat</Text>
      <Text>Select who you want to chat with</Text>

      <ScrollView className='mt-4 space-y-3'>
        {
            chats.map((chat,i) => (
                <TouchableOpacity key={i} onPress={() => navigation.navigate('inbox')}>
                    <View
                        className='flex-row space-x-3 items-center'
                    >
                        <Octicons name="organization" size={24} color="black" />
                        <View>
                            <Text>{chat.title}</Text>
                            <Text className='text-gray-500 text-sm'>{chat.location}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))
        }

<TouchableOpacity className='mt-4 bg-blue-300 px-4 py-2' onPress={() => navigation.navigate('company')}>
        <Text>Companies</Text>
      </TouchableOpacity>
      </ScrollView>

      
    </SafeAreaView>
  )
}

export default Home