import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Keyboard, ProgressBarAndroidBase, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveMessages, sendMessage } from '../redux/slice/chat/chatSlice';
import { Slider } from '@miblanchard/react-native-slider'
import { ApiUrls } from '../utils/ApiUrls';
import axios from 'axios';

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

    const [message, setMessage] = useState(null)
    const [recording, setRecording] = useState();
    const [recordingPaused, setRecordingPaused] = useState(false)

    const [soundURI, setSoundURI] = useState(null)

    const [recordingDuration, setRecordingDuration] = useState(0);
    const [timerIntervalId, setTimerIntervalId] = useState(null);

    function formatDuration(duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    

    const scrollViewRef = useRef();

    // send a message
    const sendClientMessage = () => {
      let trimmedMessage = message.trim()

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

    const submitVoiceContent = async () => {
      let uri = await stopRecording();
      const filename = uri.split('/').pop();
      const filetype = uri.split('.').pop();
      
      const formData = new FormData();
      const file = {
        uri,
        type: `audio/${filetype}`,
        name: filename,
      };
      formData.append('audio', file);
      
      console.log(formData._parts);
      
      
      fetch('https://app.proximaai.co/api/chat/voice', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; boundary=---------------------------1234567890123456789012345678',
          "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImV4cCI6MTY5NjE0NjM4OX0.b6l8MnB6hfY5p-ibr3z35h-iovjiJNmwrK1ImjSfrXE"
        },
        body: formData,
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    };
    

    // async function startRecording(){
    //     try {
    //         console.log('Requesting permissions...')
    //         await Audio.requestPermissionsAsync()
    //         await Audio.setAudioModeAsync({
    //             allowsRecordingIOS: true,
    //             playsInSilentModeIOS: true
    //         })
    //         console.log('starting recording')
    //         const recording = new Audio.Recording()
    //         await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
    //         await recording.startAsync(); 
    //         setRecording(recording);
    //         console.log('Recording started');
    //     } catch (error) {
    //         console.error('Failed to start recording', error);
    //     }
    // }
    async function startRecording() {
      try {
        console.log('Requesting permissions...');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
    
        console.log('Starting recording');
        // const recording = new Audio.Recording();
        // await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        // await recording.startAsync();
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
        setRecording(recording);
        setRecordingDuration(0); // Reset recording duration
        setTimerIntervalId(setInterval(() => {
          setRecordingDuration(prevDuration => prevDuration + 1);
        }, 1000)); // Update every second
    
        console.log('Recording started');
      } catch (error) {
        console.error('Failed to start recording', error);
      }
    }
    

    // async function playSound(uri) {
    //     console.log('Loading Sound');
    //     const soundObject = new Audio.Sound();
    //     try {
    //       await soundObject.loadAsync({ uri });
    //       await soundObject.playAsync();
    //       setRecordingPaused(false)
    //       console.log('Playing Sound');
    //       console.log('Playing complete')
    //     } catch (error) {
    //       console.error('Failed to play sound', error);
    //     }
    //   }
    async function playSound(uri) {
      console.log('Loading Sound');
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync({ uri });
        const status = await soundObject.getStatusAsync();
        if (status.isLoaded) {
          // setDuration(status.durationMillis);
          // soundObject.setOnPlaybackStatusUpdate((status) => {
          //   if (status.isLoaded && status.isPlaying) {
          //     setPosition(status.positionMillis);
          //   }
          // });
          await soundObject.playAsync();
          setRecordingPaused(false);
          console.log('Playing Sound');
          console.log('Playing complete');
        } else {
          console.log('Sound is not loaded');
        }
      } catch (error) {
        console.error('Failed to play sound', error);
      }
    }
    
    
    

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        setSoundURI(uri)
        setRecordingPaused(false)
        clearInterval(timerIntervalId)
        setRecordingDuration(0)
        console.log('Recording stopped and stored at', uri);
        // playSound(uri)
        return uri
    }

    // const cancelRecording = async () => {
    //   if (recording) {
    //     try {
    //       console.log('Cancelling recording...');
    //       await recording.stopAndUnloadAsync();
    //       setRecording(undefined);
    //       setRecordingPaused(false)
    //       console.log('Recording cancelled');
    //     } catch (error) {
    //       console.error('Failed to cancel recording', error);
    //     }
    //   } else {
    //     console.log('No active recording to cancel');
    //   }
    // };
    const cancelRecording = async () => {
      if (recording) {
        try {
          console.log('Cancelling recording...');
          await recording.stopAndUnloadAsync();
          setRecording(undefined);
          setRecordingPaused(false);
          clearInterval(timerIntervalId); // Clear the timer interval
          setTimerIntervalId(null); // Reset the timer interval ID
          console.log('Recording cancelled');
        } catch (error) {
          console.error('Failed to cancel recording', error);
        }
      } else {
        console.log('No active recording to cancel');
      }
    };
    
    useEffect(() => {
      console.log(recordingDuration)
    }, [recordingDuration])

    async function pauseAudio() {
        if (recording) {
          try {
            const status = await recording.getStatusAsync();
            if (status.isRecording) {
              await recording.pauseAsync();
              setRecordingPaused(true)
              clearInterval(timerIntervalId); // Clear the timer interval
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
            // console.log(status)
            // console.log('recording', recording)
            if (status.canRecord) {
              await recording.startAsync();
              setRecordingPaused(false)
              setTimerIntervalId(setInterval(() => {
                setRecordingDuration(prevDuration => prevDuration + 1);
              }, 1000)); // Update every second
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

  return (
    <SafeAreaView className='relative flex-1 px-3 pt-8 bg-white'>
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
            className='relative flex-1 mt-3 mb-2 space-y-2'
            showsVerticalScrollIndicator={false}
        >

            {
              isChatMessagesLoading ? <Text>Loading messages...</Text> :
              
              (
                isChatMessagesSuccess && Array.isArray(chatMessages) &&

                // sort the messages
                [...chatMessages].sort((a, b) => a.message_id - b.message_id).map((message, index) => (
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
          <View className='flex-row items-end my-4'>
            <View className='flex-row items-center flex-1 px-4 py-2 border border-gray-300 rounded-md'>
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
                  <TouchableOpacity activeOpacity={0.9}  onPress={startRecording} className={message ? 'hidden' : 'pl-2'}>
                      <FontAwesome name="microphone" size={24} color="#2DABB1" />
                  </TouchableOpacity>
            </View>
            <TouchableOpacity testID='send-btn' activeOpacity={0.9} disabled={!message} onPress={() => sendClientMessage()} className='px-2 py-1 mb-2'>
                  <FontAwesome name="send" size={24} color="#2DABB1" />
            </TouchableOpacity>
          </View> :
          <View className='p-2 border border-gray-100 rounded'>
                {
                  recordingPaused ? (
                    <View className='flex-row items-center'>
                      <Text className='text-sm text-center text-red-500'>
                        {`${String(Math.floor(recordingDuration / 60)).padStart(2, '0')}:${String(recordingDuration % 60).padStart(2, '0')}`}  
                      </Text>
                      <Text className='text-sm text-[#2DABB1] text-center flex-1 -ml-8'>Paused</Text>
                    </View>
                  ) : (
                    <View className='flex-row items-center '>
                      <Text className='text-sm text-center text-red-500'>
                      {`${String(Math.floor(recordingDuration / 60)).padStart(2, '0')}:${String(recordingDuration % 60).padStart(2, '0')}`}  
                      </Text>
                      <Text className='text-sm text-[#2DABB1] text-center flex-1 -ml-8 animate-pulse'>Recording...</Text>
                    </View>
                  )
                }

                <View className='flex-row justify-between my-4'>
                  <TouchableOpacity onPress={() => cancelRecording()} activeOpacity={0.9} className='px-2 py-1 mb-2'>
                      <MaterialCommunityIcons name="delete" size={24} color="red" />
                  </TouchableOpacity>            
                  {
                    recordingPaused ?

                    <TouchableOpacity onPress={() => resumeAudio()} activeOpacity={0.9} className='px-2 py-1 mb-2'>
                      <FontAwesome name="microphone" size={24} color="#2DABB1" />
                    </TouchableOpacity> : 

                    <TouchableOpacity onPress={() => pauseAudio()} activeOpacity={0.9} className='px-2 py-1 mb-2'>
                      <Ionicons name="ios-pause" size={24} color="black" />
                    </TouchableOpacity>
                  }

                  <TouchableOpacity activeOpacity={0.9} onPress={() => submitVoiceContent()} className='px-2 py-1 mb-2'>
                      <FontAwesome name="send" size={24} color="#2DABB1" />
                  </TouchableOpacity>
                </View>
            </View>
}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Chat