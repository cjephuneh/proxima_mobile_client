import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Communities = () => {
    const navigation = useNavigation()
    const data = [
        {
            title: 'Delmonte',
            location: 'Thika, Kenya'
        },
        {
            title: 'Safaricom PLC',
            location: 'Nairobi, Kenya'
        },
        {
            title: 'Thika Motor Dealers',
            location: 'Thika, Kenya'
        },
        {
            title: 'Hava Cabs',
            location: 'Westlands, Kenya'
        },
        {
            title: 'JKUAT',
            location: 'Juja, Kenya'
        },
        {
            title: 'KCB Group',
            location: 'Nairobi, Kenya'
        },
        
    ]

    const [communities, setCommunities] = useState(data)
    const [searchWord, setSearchWord] = useState('')

    const searchFilterFunction = (text) => {
        if(!text) setSearchWord(text);

        const newData = data.filter(item => {
           const itemData = item.title ? item.title.toLowerCase() : ''.toLowerCase
           const searchData = text.toLowerCase()

           return itemData.indexOf(searchData) > -1
        })

        setCommunities(newData)
        setSearchWord(text)
    }
  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
        
    <View className='flex-row items-center space-x-3'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                className='flex-1'
                placeholder='Search Communities'
                value={searchWord}
                onChangeText={(text) => searchFilterFunction(text)}
            />
        </View>
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.openDrawer()}
            testID='profile-pic'
        >
            <Image source={require('../assets/user.png')} />
        </TouchableOpacity>
    </View>
      
      <Text className='text-2xl font-bold mt-2'>Find a community</Text>

      <ScrollView className='mt-4 space-y-3'>
        {
            communities.length > 0 ?

            communities.map((community,i) => (
                <TouchableOpacity testID='community-btn' key={i} onPress={() => navigation.navigate('community')}>
                    <View
                        className='flex-row space-x-3 items-center'
                    >
                        <MaterialIcons name="groups" size={24} color="black" />
                        <View>
                            <Text>{community.title}</Text>
                            <Text className='text-gray-500 text-sm'>{community.location}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )) :

            <Text className='text-sm bg-gray-300 p-2 rounded font-semibold italic'>Sorry, this community does not exist in our database.</Text>
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Communities