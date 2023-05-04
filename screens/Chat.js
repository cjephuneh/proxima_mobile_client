import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
    const navigation = useNavigation()

    const [message, setMessage] = useState(null)

    const scrollViewRef = useRef();
    const msgs = [
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

    const [messages, setMessages] = useState(msgs)

    const sendMessage = () => {
        let trimmedMessage = message.trim()
        setMessages([...messages, {
            message: trimmedMessage,
            sender: 'Me',
            typing: false
        }])
        setMessage(null)
    }

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
        <TouchableOpacity testID='close-button' onPress={() => navigation.navigate('inbox')}>
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
                        className={message.sender === 'Me' ? 'bg-[#2DABB1] px-4 py-2 rounded text-white w-fit self-end' : 'bg-gray-300 px-4 py-2 rounded text-black w-fit self-start'}
                    >
                        {message.message ? message.message : 'Typing...'}
                    </Text>
                ))
            }
        
        </ScrollView>
        <View className='my-4 flex-row items-end'>
           <View className='flex-row flex-1 items-center border border-gray-300 px-4 py-2 rounded-md'>
            <TextInput
                    placeholder='Type your message'
                    className='flex-1'
                    multiline
                    value={message}
                    onChangeText={text => setMessage(text)}
                    style={{
                        maxHeight: 90,
                        height: 'auto'
                    }}
                    testID='message-input'
                />
                <TouchableOpacity activeOpacity={0.9} className={message ? 'hidden' : 'pl-2'}>
                    <FontAwesome name="microphone" size={24} color="#2DABB1" />
                </TouchableOpacity>
           </View>
           <TouchableOpacity testID='send-btn' activeOpacity={0.9} disabled={!message} onPress={() => sendMessage()} className='px-2 py-1 mb-2'>
                <FontAwesome name="send" size={24} color="#2DABB1" />
           </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Chat