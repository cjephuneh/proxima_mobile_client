import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EvilIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
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

    const [availableChats, setChats] = useState([])
    const [searchChat, setSearchChat] = useState('')

    // const searchFilterFunction = (text) => {
    //   // setSearchChat(text);
    //   console.log(text)
    //   // if(!text) {
    //   //   setSearchChat(text);
    //   //   setChats(chats) // Reset to original communities when the search field is empty
    //   //   return
    //   // }
      

    //   const newData = availableChats.filter(item => {
    //     const tenantName = item.tenant_id.tenant_name ? item.tenant_id.tenant_name.toLowerCase() : ''
    //     const searchData = text.toLowerCase()

    //     console.log(tenantName)

    //     return tenantName.indexOf(searchData) > -1
    //   })
    //   console.log(newData)

    //   setChats(newData)
    //   setSearchChat(text)
    // }
    const filteredChats = availableChats.filter(item =>
      item.tenant_id.tenant_name.toLowerCase().includes(searchChat.toLowerCase())
    )

    useEffect(() => {
      dispatch(retrieveChats({chat_owner: 1}))
    }, [dispatch, navigation])

    // update chats state
    useEffect(() => {
      if(isChatsSuccess && chats !== null){
          setChats(chats)
      }
  }, [isChatsSuccess, chats])

  return (
    <SafeAreaView className='pt-8 flex-1 bg-white px-3 relative'>
      <ChatCreateModal showModal={showModal} setShowModal={setShowModal} />
      <View className='flex-row space-x-3'>
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
        >
            <Image source={require('../assets/user.png')} />
        </TouchableOpacity>
      </View>

      <View className='flex-row items-center justify-between mt-6'>
        <Text className='text-2xl font-bold'>Inbox</Text>
        <Text className='text-xl font-bold bg-[#2DABB1] text-white px-6 py-1 text-center rounded-full'>Chat</Text>
      </View>

      <ScrollView className='space-y-3 flex-1' showsVerticalScrollIndicator={false}>
        <View className='space-y-3'>
          {/* <Text className='mt-4 mb-2 font-bold text-lg'>
            Unread - 
          <Text testID='unread-chats-count'>{data.filter(dt => dt.read === false).length}</Text>
          </Text> */}
          <View testID='unread-chats' className='space-y-3 mt-3'>
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
                    {/* <Image source={require('../assets/user.png')} /> */}
                    <Octicons name="organization" size={24} color="black" />
                    <View className='flex-1'>
                        <Text className='font-semibold'>{chat.tenant_id.tenant_name}</Text>
                        {/* <Text className='font-bold'>{message.subject}</Text> */}
                        {/* <Text>{message.message.length > 30 ? message.message.slice(0, 30)+'...' : message.message}</Text> */}
                    </View>
                    {/* <Text>{message.time}</Text> */}
                </TouchableOpacity>
            )) :
            <Text>No chats available</Text>
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