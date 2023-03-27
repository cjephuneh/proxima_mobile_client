import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

const Chat = ({navigation}) => {
    const scrollViewRef = useRef();
    const messages = [
       
        {
            message: 'Really?',
            sender: 'Other',
            typing: false
        },
        {
            message: 'Yes, amazing product!',
            sender: 'Me',
            typing: false
        },
        {
            sender: 'Other',
            typing: true
        },
        {
            message: 'Hi Mandy',
            sender: 'Me',
            typing: false
        },
        {
            message: 'I have tried the app',
            sender: 'Me',
            typing: false
        },
        {
            message: 'Really?',
            sender: 'Other',
            typing: false
        },
        {
            message: 'Yes, amazing product!',
            sender: 'Me',
            typing: false
        },
        {
            sender: 'Other',
            typing: true
        },
        {
            message: 'Really?',
            sender: 'Other',
            typing: false
        },
        {
            message: 'Yes, amazing product!',
            sender: 'Me',
            typing: false
        },
        {
            sender: 'Other',
            typing: true
        },
        {
            message: 'Hi Mandy',
            sender: 'Me',
            typing: false
        },
        {
            message: 'I have tried the app',
            sender: 'Me',
            typing: false
        },
        {
            message: 'Really?',
            sender: 'Other',
            typing: false
        },
        {
            message: 'Yes, amazing product!',
            sender: 'Me',
            typing: false
        },
        {
            sender: 'Other',
            typing: true
        },
        {
            message: 'Really?',
            sender: 'Other',
            typing: false
        },
        {
            message: 'Yes, amazing product!',
            sender: 'Me',
            typing: false
        },
        {
            sender: 'Other',
            typing: true
        },
        {
            message: 'Hi Mandy',
            sender: 'Me',
            typing: false
        },
        {
            message: 'I have tried the app',
            sender: 'Me',
            typing: false
        },
        {
            message: 'Really?',
            sender: 'Other',
            typing: false
        },
        {
            message: 'Yes, amazing product!',
            sender: 'Me',
            typing: false
        },
        {
            sender: 'Other',
            typing: true
        }
    ]

    // autoscroll when the keyboard is activated 
    useEffect(() => {
        const listenToKeyboard = Keyboard.addListener('keyboardDidShow',
            () => scrollViewRef.current.scrollToEnd({ animated: true })
        )

        return () => {
            listenToKeyboard.remove();
          };

    }, [scrollViewRef])

  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3 relative'>
      <View className='flex-row items-center justify-between'>
        <TouchableOpacity onPress={() => navigation.navigate('inbox')}>
        <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Ionicons name="person-add-outline" size={24} color="black" />
      </View>

      <KeyboardAvoidingView behavior='height' className='flex-1 w-full'>
        <ScrollView 
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            className='mt-3 space-y-2 relative mb-2 flex-1'
            showsVerticalScrollIndicator={false}
        >

            {
                messages.map((message, index) => (
                    <Text key={index} 
                        className={message.sender === 'Me' ? 'bg-[#2DABB1] px-4 py-2 rounded-full text-white w-fit self-end' : 'bg-gray-300 px-4 py-2 rounded-full text-black w-fit self-start'}
                    >
                        {message.message ? message.message : 'Typing...'}
                    </Text>
                ))
            }
        
        </ScrollView>
        <View className='my-4 flex-row items-center border border-gray-300 px-4 py-2 rounded-full'>
            <TextInput
                placeholder='Type your message'
                className='flex-1'
             />
             <FontAwesome name="microphone" size={24} color="#2DABB1" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Chat