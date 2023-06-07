import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveMessages, sendMessage } from '../redux/slice/chat/chatSlice';

const Chat = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    // retrieve chat_id from route
    const { chat_id } = route.params

    // retrieve messages
    useEffect(() => {
      dispatch(retrieveMessages({chat_id}))
    }, [])

    // retrieve data from store
    const { chatMessages, isChatMessagesLoading, isChatMessagesSuccess } = useSelector((state) => state.chat)

    console.log(chatMessages)

    const [message, setMessage] = useState(null)
    const [recording, setRecording] = useState();
    // const [sound, setSound] = useState()
    const [recordingPaused, setRecordingPaused] = useState(false)

    const scrollViewRef = useRef();
    const msgs = [
        {
          message: "Hello, I recently purchased one of your products, and unfortunately, it's defective.",
          sender: "Me"
        },
        {
          message: "I apologize for the inconvenience. Could you please provide more details about the issue?",
          sender: "Other"
        },
        {
          message: "The product doesn't power on at all, even after trying different power sources.",
          sender: "Me"
        },
        {
          message: "I'm sorry to hear that. We will assist you with a replacement. Please provide your order details.",
          sender: "Other"
        },
        {
          message: "Thank you for your quick response. My order number is 123456789.",
          sender: "Me"
        },
        {
          message: "Noted. We will arrange for a replacement to be shipped to you within the next two business days.",
          sender: "Other"
        },
        {
          message: "That sounds great. I appreciate your help in resolving this issue.",
          sender: "Me"
        },
        {
          message: "You're welcome! If you have any further questions, feel free to ask. We're here to assist you.",
          sender: "Other"
        }
    ]

    const [messages, setMessages] = useState(msgs)

    // send a message
    const sendClientMessage = () => {
      let trimmedMessage = message.trim()
      // setMessages([...messages, {
      //     message: trimmedMessage,
      //     sender: 'Me',
      //     typing: false
      // }])
      // setMessage(null)
      if(trimmedMessage.length === 0) return

      dispatch(sendMessage({
        chat_id,
        text_content: trimmedMessage,
        voice_content: "",
        message_sender: 'client',
        escalated: "",
        channel: "Mobile",
        topic: ""
      }))

      setMessage(null)
    }

    async function startRecording(){
        try {
            console.log('Requesting permissions...')
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
            })
            console.log('starting recording')
            const recording = new Audio.Recording()
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
            await recording.startAsync(); 
            setRecording(recording);
            console.log('Recording started');
        } catch (error) {
            console.error('Failed to start recording', err);
        }
    }

    async function playSound(uri) {
        console.log('Loading Sound');
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync({ uri });
          await soundObject.playAsync();
          setRecordingPaused(false)
          console.log('Playing Sound');
          console.log('Playing complete')
        } catch (error) {
          console.error('Failed to play sound', error);
        }
      }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        setRecordingPaused(false)
        console.log('Recording stopped and stored at', uri);
        playSound(uri)
    }

    async function pauseAudio() {
        if (recording && recording.getStatusAsync) {
          try {
            const status = await recording.getStatusAsync();
            if (status.isRecording) {
              await recording.pauseAsync();
              setRecordingPaused(true)
              console.log('Recording paused');
            } else {
              console.log('No active recording to pause');
            }
          } catch (error) {
            console.error('Failed to pause recording', error);
          }
        } else {
          console.log('No active recording to pause');
        }
      }

      async function resumeAudio() {
        if (recording && recording.getStatusAsync) {
          try {
            const status = await recording.getStatusAsync();
            console.log(status)
            console.log(recording)
            if (status.canRecord) {
              await recording.startAsync();
              setRecordingPaused(false)
              console.log('Recording resumed');
            } else {
              console.log('Recording is not paused');
            }
          } catch (error) {
            console.error('Failed to resume recording', error);
          }
        } else {
          console.log('No active recording to resume');
        }
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

    // useEffect(() => {
    //     return sound
    //       ? () => {
    //           console.log('Unloading Sound');
    //           sound.unloadAsync();
    //         }
    //       : undefined;
    //   }, [sound]);

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
              isChatMessagesLoading ? <Text>Loading messages...</Text> :
              
              (
                isChatMessagesSuccess && chatMessages &&

                // reversed messages array to sort the messages
                [...chatMessages].reverse().map((message, index) => (
                    <Text key={index} 
                        className={message.message_sender === 'client' ? 'bg-[#2DABB1] px-4 py-2 rounded text-white w-fit self-end' : 'bg-gray-300 px-4 py-2 rounded text-black w-fit self-start'}
                    >
                        {message.text_content}
                    </Text>
                ))
              )
            }
        
        </ScrollView>
        { !recording ?
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
                <TouchableOpacity activeOpacity={0.9}  onPress={recording ? stopRecording : startRecording} className={message ? 'hidden' : 'pl-2'}>
                    <FontAwesome name="microphone" size={24} color="#2DABB1" />
                </TouchableOpacity>
           </View>
           <TouchableOpacity testID='send-btn' activeOpacity={0.9} disabled={!message} onPress={() => sendClientMessage()} className='px-2 py-1 mb-2'>
                <FontAwesome name="send" size={24} color="#2DABB1" />
           </TouchableOpacity>
        </View> :
        <View className='my-4 flex-row justify-between'>
            <TouchableOpacity onPress={() => stopRecording()} activeOpacity={0.9} className='px-2 py-1 mb-2'>
                <MaterialCommunityIcons name="delete" size={24} color="gray" />
            </TouchableOpacity>            
            {
              recordingPaused ?

              <TouchableOpacity onPress={() => resumeAudio()} activeOpacity={0.9} className='px-2 py-1 mb-2'>
                <FontAwesome name="play" size={24} color="black" />
              </TouchableOpacity> : 

              <TouchableOpacity onPress={() => pauseAudio()} activeOpacity={0.9} className='px-2 py-1 mb-2'>
                <Ionicons name="ios-pause" size={24} color="black" />
              </TouchableOpacity>
            }

            <TouchableOpacity activeOpacity={0.9} className='px-2 py-1 mb-2'>
                <FontAwesome name="send" size={24} color="#2DABB1" />
           </TouchableOpacity>
        </View>
}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Chat