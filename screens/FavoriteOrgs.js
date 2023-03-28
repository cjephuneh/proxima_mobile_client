import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, EvilIcons, MaterialIcons, Octicons } from '@expo/vector-icons'

const FavoriteOrgs = ({navigation}) => {
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
                placeholder='Search your favorite organization'
                value={searchWord}
                onChangeText={(text) => searchFilterFunction(text)}
            />
        </View>
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.openDrawer()}
    >
    </TouchableOpacity>
    </View>
      
      <Text className='text-2xl font-bold mt-2'>Find a chat</Text>
      <Text>Select who you want to chat with</Text>

      <ScrollView className='mt-4 space-y-3'>
        {
            companies.length > 0 ?

            companies.map((chat,i) => (
                <TouchableOpacity key={i} onPress={() => navigation.navigate('companyProfile')}>
                    <View
                        className='flex-row justify-between'
                    >
                        <View className='flex-row space-x-3 items-center'>
                            <Octicons name="organization" size={24} color="black" />
                            <View>
                                <Text>{chat.title}</Text>
                                <Text className='text-gray-500 text-sm'>{chat.location}</Text>
                            </View>
                        </View>
                        <AntDesign name="star" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )) :

            <Text className='text-sm bg-gray-300 p-2 rounded font-semibold italic'>Sorry, this company does not exist in your favorites list.</Text>
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default FavoriteOrgs