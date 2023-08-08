import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveChats } from '../redux/slice/chat/chatSlice'

const Home = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

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
            <Text className='mt-2 text-2xl font-bold text-white'>Proxima</Text>

            <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.openDrawer()}
                    testID='profile-pic'
                >

                <FontAwesome5 name="user-alt" size={24} color="white" />
            </TouchableOpacity>
        </View>

        <View className='flex-1 bg-gray-50'>
            <View className="flex-row justify-between mx-3 my-6">
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

            <View className='justify-between flex-1 mt-4'>
                    <Text className='mx-3 text-lg font-semibold text-gray-600'>Recent Chats</Text>
                    <ScrollView className='mt-3'>
                                {
                                    isChatsLoading ? <Text className='mx-3'>Recent chats loading...</Text> :

                                    ( isChatsSuccess && chats &&
                                    filteredChats.length > 0 ?
                                    filteredChats.slice(0, 6).map((chat) => (
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('chat', { chat_id: chat.chat_id })} 
                                            key={chat.chat_id}
                                            className='flex-row items-center px-3 py-3 mx-3 mb-1 space-x-2 bg-white rounded'
                                            testID='open-chat'
                                            style={{elevation: 2, shadowColor: '#52006A'}}
                                        >
                                            <AntDesign name="message1" size={20} color="#2DABB1" />
                                            <View className='flex-1'>
                                                <Text className='font-semibold text-md'>{chat.tenant_id.tenant_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )) :
                                    <Text className='mx-3 text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>No recent chats available</Text>
                                    )
                                }
                    </ScrollView>
                <TouchableOpacity activeOpacity={0.9} className='mx-3 mb-12 rounded-full bg-[#2DABB1] px-4 py-3' onPress={() => navigation.navigate('createIssue')}>
                    <Text className='font-semibold text-center text-white'>Add an Instant Issue</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Home