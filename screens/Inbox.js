import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EvilIcons, FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveChats } from '../redux/slice/chat/chatSlice';
import ChatCreateModal from '../components/ChatCreateModal';

const Inbox = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  
  // manage chat create modal
  const [showModal, setShowModal] = useState(false)

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
    <SafeAreaView className='pt-8 flex-1 bg-white px-3 relative'>
      <ChatCreateModal showModal={showModal} setShowModal={setShowModal} />
      <View className='flex-row space-x-3 items-center'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
              placeholder='Search chats'
              value={searchChat}
              onChangeText={(text) => setSearchChat(text)}
             />
        </View>
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.openDrawer()}
            testID='profile-pic'
            className='h-10 w-10 border-2 border-gray-200 rounded-full justify-center items-center'
        >
            <FontAwesome5 name="user-alt" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View className='flex-row items-center justify-between mt-3'>
        <Text className='text-2xl font-bold'>Inbox</Text>
      </View>

      <ScrollView className='space-y-3 flex-1' showsVerticalScrollIndicator={false}>
        <View className='space-y-3'>
          <View testID='unread-chats' className='space-y-4 mt-3'>
          {
            isChatsLoading ? <Text>Chats loading...</Text> :

            ( isChatsSuccess && chats &&
              filteredChats.length > 0 ?
              filteredChats.map((chat) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('chat', { chat_id: chat.chat_id })} 
                    key={chat.chat_id}
                    className='flex-row space-x-2 items-center'
                    testID='open-chat'
                >
                    <Octicons name="organization" size={24} color="#2DABB1" />
                    <View className='flex-1'>
                        <Text className='font-semibold'>{chat.tenant_id.tenant_name}</Text>
                    </View>
                </TouchableOpacity>
            )) :
            <Text className='text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>No chats available</Text>
            )
          }
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => setShowModal(!showModal)} className='absolute bottom-6 right-6 bg-[#2DABB1] w-12 h-12 rounded-full p-2 items-center justify-center'>
        <MaterialCommunityIcons name="message-reply-text" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Inbox