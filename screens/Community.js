import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getACommunity } from '../redux/slice/community/communitySlice'
import { useDispatch, useSelector } from 'react-redux'

const Community = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()

  let users = [1,2,3]

  // extract community_id passed from previous screen
  const { community_id } = route.params

  // console.log(community_id)

  // fetch community data from store
  const { community, isCommunityLoading } = useSelector((state) => state.community)

  // track community state locally
  // const [currentCommunity, setCurrentCommunity] = useState(community && community[0])

  // retrieve community details
  useEffect(() => {
    community_id && dispatch(getACommunity({
      community_id: community_id
    }))
  }, [community_id, dispatch])
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
                        {/* {
                            users.map((user, i) => (
                                <View key={i} className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}>
                                    <Image 
                                        key={i}
                                        source={require('../assets/user.png')}
                                        
                                    />
                                </View>
                            ))
                        } */}
                        <MaterialCommunityIcons name="account-group" size={24} color="black" />
                        
                    </View>

                    <TouchableOpacity className='flex-row space-x-2'>
                        {/* <AntDesign name="hearto" size={18} color="#2DABB1" /> */}
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
              </View>

              <TouchableOpacity 
                className='bg-[#2DABB1] px-6 py-2 rounded-full'
                activeOpacity={0.8}
                onPress={() => navigation.navigate('issues', { community_id })}
              >
                <Text className='text-white font-semibold text-center'>View Community Issues</Text>
              </TouchableOpacity>
            </>
          )
        }
      </View>
      
      
    </SafeAreaView>
  )
}

export default Community