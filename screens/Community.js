import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { clientJoinCommunity, clientLeaveCommunity, getACommunity, resetJoinCommunityState, resetLeaveCommunityState } from '../redux/slice/community/communitySlice'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Community = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()

  // track current user
  const [user, setUser] = useState(null)

  // retrieve user info from local storage
  const getInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('user')        
      return value !== null ? JSON.parse(value) : null
    } catch (error) {
      return null
    }
  }

  // update state with the retrieved info
  const setUserInfo = async () => {
    let userInfo = await getInfo()
    setUser(userInfo)
  }

  // run the setUserinfo function once on page load
  useEffect(() => {
    setUserInfo()
  }, [])

  // extract community_id passed from previous screen
  const { community_id } = route.params

  // fetch community data from store
  const { community, isCommunityLoading } = useSelector((state) => state.community)

  // retrieve community details
  useEffect(() => {
    community_id && dispatch(getACommunity({
      community_id: community_id
    }))
  }, [community_id, dispatch])

  // join a community
  const handleJoinCommunity = (userId) => {
    dispatch(clientJoinCommunity({
      client_id: userId,
      community_id
    }))
  }

  // retrieve join community data from store
  const { joincommunity, isJoinCommunityLoading, isJoinCommunitySuccess, isJoinCommunityError, isJoinCommunityMessage } = useSelector((state) => state.community)

  // check join community status
  useEffect(() => {
    if(isJoinCommunityError || isJoinCommunityMessage){
      Alert.alert('Unable to join community', 'Please try again later')
    }

    if(joincommunity && isJoinCommunitySuccess){
      // setIsMember(true)
      dispatch(getACommunity({
        community_id: community_id
      }))
    }

    dispatch(resetJoinCommunityState())
  }, [dispatch, isCommunityLoading, isJoinCommunitySuccess, isJoinCommunityError, isJoinCommunityMessage, joincommunity, community_id])

  // leave a community
  const handleLeaveCommunity = (userId) => {
    dispatch(clientLeaveCommunity({
      client_id: userId,
      community_id
    }))
  }

  // retrieve leave community data from store
  const { leavecommunity, isLeaveCommunityLoading, isLeaveCommunitySuccess, isLeaveCommunityError, isLeaveCommunityMessage } = useSelector((state) => state.community)

  // check leave community status
  useEffect(() => {
    if(isLeaveCommunityError || isLeaveCommunityMessage){
      Alert.alert('Unable to leave community', 'Please try again later')
    }

    if(leavecommunity && isLeaveCommunitySuccess){
      dispatch(getACommunity({
        community_id: community_id
      }))
    }

    dispatch(resetLeaveCommunityState())
  }, [dispatch, isCommunityLoading, isLeaveCommunitySuccess, isLeaveCommunityError, isLeaveCommunityMessage, leavecommunity, community_id])


  return (
    <SafeAreaView className='flex-1'>
      <View className='relative'>
        <Image source={require('../assets/companyBg.png')} resizeMode='cover' className='h-40 w-full' />
        <View className='justify-center items-center'>
        </View>
      </View>

      <View className='mt-4 px-3 flex-1 justify-between mb-2'>
        {
          !community ? 
          
          <Text>Loading...</Text> :

          (
            <>
              <View>
                <View className='space-y-1'>
                  <Text className='text-2xl text-center font-bold'>{community[0].tenant_id.tenant_name}</Text>
                  <Text className='text-gray-500 text-center'>{community[0].description}</Text>
                </View>

                <View className='flex-row space-x-4 items-center mt-4 mx-auto'>
                    <View className='flex-row'>
                        <MaterialCommunityIcons name="account-group" size={24} color="black" />   
                    </View>

                    <TouchableOpacity className='flex-row space-x-2'>
                        <Text className='font-semibold text-[#2DABB1]'>{community[0].members.length} members</Text>
                    </TouchableOpacity>
                </View>
                <View className='mt-4 flex-row justify-around'>
                  <View className='items-center'>
                    <Text className='font-semibold'>Community Rating</Text>
                    <Text>4.65</Text>
                  </View>
                  <View className='items-center'>
                    <Text className='font-semibold'>Issues Resolved</Text>
                    <Text>56/100</Text>
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('surveys', { community_id })} className='mt-8 items-center border border-[#2DABB1] rounded-full w-48 mx-auto py-2'>
                  <Text className='font-semibold text-[#2DABB1]'>Community Surveys</Text>
                </TouchableOpacity>
                
                {
                  user && community[0].members.some(member => member.email === user.email) &&
                  <TouchableOpacity activeOpacity={0.9} disabled={isLeaveCommunityLoading} onPress={() => handleLeaveCommunity(user.id)} className='mt-3 items-center border border-red-500 rounded-full w-48 mx-auto py-2'>
                    <Text className='font-semibold text-red-500'>Leave Community</Text>
                  </TouchableOpacity>
                }
              </View>
              
              {/* check if the user exists in the community and render the appropriate button */}
              {
                user && community[0].members.some(member => member.email === user.email) ? 
                <TouchableOpacity 
                  className='bg-[#2DABB1] px-6 py-2 rounded-full'
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('issues', { community_id })}
                >
                  <Text className='text-white font-semibold text-center'>View Community Issues</Text>
                </TouchableOpacity> :

                <TouchableOpacity 
                  className='bg-[#2DABB1] px-6 py-2 rounded-full'
                  activeOpacity={0.8}
                  disabled={isJoinCommunityLoading}
                  onPress={() => handleJoinCommunity(user.id)}
                  >
                  <Text className='text-white font-semibold text-center'>Join Community</Text>
                </TouchableOpacity>
              }
            </>
          )
        }
      </View>
      
      
    </SafeAreaView>
  )
}

export default Community