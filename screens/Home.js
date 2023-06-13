import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, EvilIcons, Feather, FontAwesome5, MaterialIcons, Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveChats } from '../redux/slice/chat/chatSlice'

const Home = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const data = [
        // {
        //     title: '18th Street Brewery',
        //     location: 'Dakley Avenue, Hammond, IN'
        // },
        // {
        //     title: '16th Street',
        //     location: 'Brooklyn, NY'
        // },
        // {
        //     title: '169th Street',
        //     location: 'Brooklyn, NY'
        // },
        // {
        //     title: '18th Street Brewery',
        //     location: 'Dakley Avenue, Hammond, IN'
        // },
        // {
        //     title: '16th Street',
        //     location: 'Brooklyn, NY'
        // },
        // {
        //     title: '169th Street',
        //     location: 'Brooklyn, NY'
        // },
        
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

    const { chats, isChatsLoading, isChatsSuccess } = useSelector((state) => state.chat)

    const { user } = useSelector((state) => state.auth)

    const [availableChats, setChats] = useState([])
    const [searchChat, setSearchChat] = useState('')

    const filteredChats = availableChats.filter(item =>
        item.tenant_id.tenant_name.toLowerCase().includes(searchChat.toLowerCase())
      )
  
      useEffect(() => {
        dispatch(retrieveChats({chat_owner: user.id}))
      }, [dispatch, navigation, user])
  
      // update chats state
      useEffect(() => {
        if(isChatsSuccess && chats !== null){
            setChats(chats)
        }
    }, [isChatsSuccess, chats])
  return (
    <SafeAreaView className='flex-1 bg-[#2DABB1]'>      
        <View className='flex-row justify-between items-center bg-[#2DABB1] pt-8 px-3 pb-1'>
            <Text className='text-2xl font-bold mt-2 text-white'>Proxima</Text>

            <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.openDrawer()}
                    testID='profile-pic'
                >

                <FontAwesome5 name="user-alt" size={24} color="white" />
            </TouchableOpacity>
        </View>

        <View className='bg-white flex-1 px-3'>
            <View className="my-6 flex-row justify-between">
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
                onPress={() => navigation.navigate('communities')}
                >
                    <View className='bg-[#B2E0E3] p-4 rounded-full'>
                        <MaterialIcons name="groups" size={24} color="#2DABB1" />
                    </View>
                    <Text className='font-semibold'>Communities</Text>
                </TouchableOpacity>
                <TouchableOpacity
                activeOpacity={0.9} 
                className='items-center justify-center'
                onPress={() => navigation.navigate('favorite')}
                >
                    <View className='bg-[#B2E0E3] p-4 rounded-full'>
                        <AntDesign name="star" size={24} color="#2DABB1" />
                    </View>
                    <Text className='font-semibold'>Favorites</Text>
                </TouchableOpacity>
            </View>

            <View className='mt-4 flex-1 justify-between'>
                <View>
                    <Text className='font-semibold text-lg text-gray-600'>Recent Chats</Text>
                    <ScrollView>
                        <View className='space-y-3'>
                            <View testID='unread-chats' className='space-y-2 mt-3'>
                                {
                                    isChatsLoading ? <Text>Recent chats loading...</Text> :

                                    ( isChatsSuccess && chats &&
                                    filteredChats.length > 0 ?
                                    filteredChats.slice(0, 6).map((chat) => (
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('chat', { chat_id: chat.chat_id })} 
                                            key={chat.chat_id}
                                            className='flex-row space-x-2 items-center border rounded border-gray-100 px-3 py-3'
                                            testID='open-chat'
                                            style={{elevation: 2, shadowColor: 'white'}}
                                        >
                                            {/* <Image source={require('../assets/user.png')} /> */}
                                            <AntDesign name="message1" size={20} color="#2DABB1" />
                                            <View className='flex-1'>
                                                <Text className='font-semibold text-md'>{chat.tenant_id.tenant_name}</Text>
                                                {/* <Text className='font-bold'>{message.subject}</Text> */}
                                                {/* <Text>{message.message.length > 30 ? message.message.slice(0, 30)+'...' : message.message}</Text> */}
                                            </View>
                                            {/* <Text>{message.time}</Text> */}
                                        </TouchableOpacity>
                                    )) :
                                    <Text className='text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>No recent chats available</Text>
                                    )
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <TouchableOpacity activeOpacity={0.9} className='mb-12 rounded-full bg-[#2DABB1] px-4 py-3' onPress={() => navigation.navigate('createIssue')}>
                    <Text className='text-center font-semibold text-white'>Add an Instant Issue</Text>
                </TouchableOpacity>
                </View>
        </View>
    </SafeAreaView>
  )
}

export default Home