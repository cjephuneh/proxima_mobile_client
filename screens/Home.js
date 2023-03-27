import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { EvilIcons, Octicons } from '@expo/vector-icons'

const Home = ({navigation}) => {
    const data = [
        {
            title: '18th Street Brewery',
            location: 'Dakley Avenue, Hammond, IN'
        },
        {
            title: '16th Street',
            location: 'Brooklyn, NY'
        }
    ]

    const [chats, setChats] = useState(data)
    const [searchWord, setSearchWord] = useState('')

    const searchFilterFunction = (text) => {
        if(!text) setSearchWord(text);

        const newData = data.filter(item => {
           const itemData = item.title ? item.title.toLowerCase() : ''.toLowerCase
           const searchData = text.toLowerCase()

           return itemData.indexOf(searchData) > -1
        })

        setChats(newData)
        setSearchWord(text)
    }
  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
        
    <View className='flex-row items-center space-x-3'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                className='flex-1'
                placeholder='Search chats'
                value={searchWord}
                onChangeText={(text) => searchFilterFunction(text)}
            />
        </View>
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.openDrawer()}
    >
        <Image source={require('../assets/user.png')} />
    </TouchableOpacity>
    </View>
      
      <Text className='text-2xl font-bold mt-2'>Find a chat</Text>
      <Text>Select who you want to chat with</Text>

      <ScrollView className='mt-4 space-y-3'>
        {
            chats.length > 0 ?

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
            )) :

            <Text className='text-sm bg-gray-300 p-2 rounded font-semibold italic'>Sorry, this company does not exist in our database.</Text>
        }

    <TouchableOpacity className='mt-4 bg-blue-300 px-4 py-2' onPress={() => navigation.navigate('company')}>
        <Text>Companies</Text>
    </TouchableOpacity>
      </ScrollView>

      
    </SafeAreaView>
  )
}

export default Home