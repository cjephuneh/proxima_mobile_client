import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EvilIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveChats } from '../redux/slice/chat/chatSlice';

const Inbox = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
    let data = [
      {
        companyName: "Company A",
        message: "I'm experiencing some issues with the product I purchased. Can you help?",
        read: true,
        time: '12:08PM'
      },
      {
        companyName: "Company B",
        message: "The product I received is defective. What should I do?",
        read: false,
        time: '05:30AM'
      },
      {
        companyName: "Company C",
        message: "I have some questions about the warranty for the product.",
        read: true,
        time: '11:30PM'
      },
      {
        companyName: "Company D",
        message: "The product is not functioning as expected. Please assist.",
        read: false,
        time: '12:05PM'
      },
      {
        companyName: "Company E",
        message: "There was a mistake in my order. I received the wrong product.",
        read: true,
        time: '09:30AM'
      }
    ]

    const [chats, setChats] = useState(data)
    const [searchChat, setSearchChat] = useState('')

    const searchFilterFunction = (text) => {
      if(!text) setSearchChat(text);
      

      const newData = data.filter(item => {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase()
        const searchData = text.toLowerCase()

        return itemData.indexOf(searchData) > -1
      })

      setChats(newData)
      setSearchChat(text)
    }

    const fetchChats = async () => {
      return dispatch(retrieveChats())
    }

    const fetchedChats = useSelector((state) => state.chat.chats)

    console.log('ffff', fetchedChats)

    useEffect(() => {
      fetchChats()
    }, [])
  return (
    <SafeAreaView className='pt-8 flex-1 bg-white px-3'>
      <View className='flex-row space-x-3'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
              placeholder='Search chats'
              value={searchChat}
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

      <View className='flex-row items-center justify-between mt-6'>
        <Text className='text-2xl font-bold'>Inbox</Text>
        <Text className='text-xl font-bold bg-[#2DABB1] text-white px-6 py-1 text-center rounded-full'>Chat</Text>
      </View>

      <ScrollView className='space-y-3' showsVerticalScrollIndicator={false}>
        <View className='space-y-3'>
          <Text className='mt-4 mb-2 font-bold text-lg'>
            Unread - 
          <Text testID='unread-chats-count'>{data.filter(dt => dt.read === false).length}</Text>
          </Text>
          <View testID='unread-chats' className='space-y-3'>
          {
              chats.filter(chat => chat.read === false).map((message, i) => (
                  <TouchableOpacity
                      onPress={() => navigation.navigate('chat')} 
                      key={i}
                      className='flex-row space-x-2 items-center'
                      testID='open-chat'
                  >
                      {/* <Image source={require('../assets/user.png')} /> */}
                      <Octicons name="organization" size={24} color="black" />
                      <View className='flex-1'>
                          <Text className='font-semibold'>{message.companyName}</Text>
                          {/* <Text className='font-bold'>{message.subject}</Text> */}
                          <Text>{message.message.length > 30 ? message.message.slice(0, 30)+'...' : message.message}</Text>
                      </View>
                      <Text>{message.time}</Text>
                  </TouchableOpacity>
              ))
          }
          </View>
        </View>

        <View  className='space-y-3'>
        <Text className='mt-4 mb-2 font-bold text-lg'>
        Others
      </Text>
      {
            chats.filter(chat => chat.read === true).map((message, i) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('chat')} 
                    key={i}
                    className='flex-row space-x-2 items-center'
                    testID='open-chat'
                >
                    {/* <Image source={require('../assets/user.png')} /> */}
                    <Octicons name="organization" size={24} color="black" />
                    <View className='flex-1'>
                        <Text className='font-semibold'>{message.companyName}</Text>
                        {/* <Text className='font-bold'>{message.subject}</Text> */}
                        <Text>{message.message.length > 30 ? message.message.slice(0, 30)+'...' : message.message}</Text>
                    </View>
                    <Text>{message.time}</Text>
                </TouchableOpacity>
            ))
        }
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Inbox