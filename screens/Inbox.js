import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';

// const chatRow = () => {
//     return (
//         <View>
//         <Image source={require('../assets/user.png')} />
//         <View>
//             <Text>John Doe</Text>
//             <Text>Hi there!</Text>
//             <Text>How are you?</Text>
//         </View>
//         <Text>9:36 AM</Text>
//     </View>
//     )
// }

const Inbox = ({ navigation }) => {
    let unread = [1,2]
    let read = [1,2,3,4,5,6,7,8]
  return (
    <SafeAreaView className='pt-8 flex-1 bg-white px-3'>
      <View className='flex-row space-x-3'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <Text>Search chats</Text>
        </View>
        <Image source={require('../assets/user.png')} />
      </View>

      <View className='flex-row items-center justify-between mt-6'>
        <Text className='text-2xl font-bold'>Inbox</Text>
        <Text className='text-xl font-bold bg-[#2DABB1] text-white px-6 py-1 text-center rounded-full'>Chat</Text>
      </View>

      <ScrollView className='space-y-3'>
        <View className='space-y-3'>
        <Text className='mt-4 mb-2 font-bold text-lg'>
        Unread - 2
      </Text>
        {
            unread.map(ur => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('chat')} 
                    key={unread.indexOf(ur)}
                    className='flex-row space-x-2'
                >
                    <Image source={require('../assets/user.png')} />
                    <View className='flex-1'>
                        <Text>John Doe</Text>
                        <Text className='font-bold'>Hi there!</Text>
                        <Text>How are you?</Text>
                    </View>
                    <Text>9:36 AM</Text>
                </TouchableOpacity>
            ))
        }
        </View>

        <View  className='space-y-3'>
        <Text className='mt-4 mb-2 font-bold text-lg'>
        Others
      </Text>
        {
            read.map(ur => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('chat')} 
                    key={read.indexOf(ur)}
                    className='flex-row space-x-2'
                >
                    <Image source={require('../assets/user.png')} />
                    <View className='flex-1'>
                        <Text>John Doe</Text>
                        <Text className='font-bold'>Hi there!</Text>
                        <Text>How are you?</Text>
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