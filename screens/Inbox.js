import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Inbox = () => {
  const navigation = useNavigation()
    let data = [
      {
        name: 'John Doe',
        subject: 'Hi there!',
        message: 'How are you?',
        read: false
      },
      {
        name: 'Jane Doe',
        subject: 'Hi there!',
        message: 'How are you?',
        read: false
      },
      {
        name: 'John Smith',
        subject: 'Hi there!',
        message: 'How are you?',
        read: true
      },
      {
        name: 'John John',
        subject: 'Hi there!',
        message: 'How are you?',
        read: true
      },
      {
        name: 'John Dan',
        subject: 'Hi there!',
        message: 'How are you?',
        read: true
      },
      {
        name: 'John Jade',
        subject: 'Hi there!',
        message: 'How are you?',
        read: true
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
                      className='flex-row space-x-2'
                      testID='open-chat'
                  >
                      <Image source={require('../assets/user.png')} />
                      <View className='flex-1'>
                          <Text>{message.name}</Text>
                          <Text className='font-bold'>{message.subject}</Text>
                          <Text>{message.message}</Text>
                      </View>
                      <Text>9:36 AM</Text>
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
                    className='flex-row space-x-2'
                    testID='open-chat'
                >
                    <Image source={require('../assets/user.png')} />
                    <View className='flex-1'>
                        <Text>{message.name}</Text>
                        <Text className='font-bold'>{message.subject}</Text>
                        <Text>{message.message}</Text>
                    </View>
                    <Text>9:36 AM</Text>
                </TouchableOpacity>
            ))
        }
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Inbox