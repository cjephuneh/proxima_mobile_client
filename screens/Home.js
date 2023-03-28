import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, EvilIcons, MaterialIcons, Octicons } from '@expo/vector-icons'

const Home = ({navigation}) => {
    const data = [
        {
            title: '18th Street Brewery',
            location: 'Dakley Avenue, Hammond, IN'
        },
        {
            title: '16th Street',
            location: 'Brooklyn, NY'
        },
        {
            title: '169th Street',
            location: 'Brooklyn, NY'
        },
        {
            title: '18th Street Brewery',
            location: 'Dakley Avenue, Hammond, IN'
        },
        {
            title: '16th Street',
            location: 'Brooklyn, NY'
        },
        {
            title: '169th Street',
            location: 'Brooklyn, NY'
        },
        
    ]

    const [companies, setCompanies] = useState(data)
    const [searchWord, setSearchWord] = useState('')

    const searchFilterFunction = (text) => {
        if(!text) setSearchWord(text);

        const newData = data.filter(item => {
           const itemData = item.title ? item.title.toLowerCase() : ''.toLowerCase
           const searchData = text.toLowerCase()

           return itemData.indexOf(searchData) > -1
        })

        setCompanies(newData)
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

        {/* hide this view when searching */}
      <View className={searchWord.length === 0 ? "my-3 flex-row justify-between" : 'hidden'}>
        <TouchableOpacity
         activeOpacity={0.9} 
         className='items-center justify-center'
         onPress={() => navigation.navigate('inbox')}
        >
            <View className='bg-[#B2E0E3] p-4 rounded-full'>
                <AntDesign name="message1" size={24} color="#2DABB1" />
            </View>
            <Text className='font-semibold'>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity
         activeOpacity={0.9} 
         className='items-center justify-center'
        >
            <View className='bg-[#B2E0E3] p-4 rounded-full'>
                <MaterialIcons name="groups" size={24} color="#2DABB1" />
            </View>
            <Text className='font-semibold'>Communities</Text>
        </TouchableOpacity>
        <TouchableOpacity
         activeOpacity={0.9} 
         className='items-center justify-center'
        >
            <View className='bg-[#B2E0E3] p-4 rounded-full'>
                <AntDesign name="star" size={24} color="#2DABB1" />
            </View>
            <Text className='font-semibold'>Favorites</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className='mt-4 space-y-3'>
        {
            companies.length > 0 ?

            companies.map((chat,i) => (
                <TouchableOpacity key={i} onPress={() => navigation.navigate('companyProfile')}>
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

      </ScrollView>

      <TouchableOpacity activeOpacity={0.9} className='mb-2 mt-3 rounded-full bg-[#2DABB1] px-4 py-3' onPress={() => navigation.navigate('createIssue')}>
        <Text className='text-center font-semibold text-white'>Add an Instant Issue</Text>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home