import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, EvilIcons, FontAwesome5, MaterialIcons, Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveFavoriteCommunities } from '../redux/slice/community/communitySlice'

const FavoriteOrgs = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    // fetch data from store
    const { favoritecommunities, isFavoriteCommunitiesLoading, isFavoriteCommunitiesSuccess } = useSelector((state) => state.community)

    const [availableCommunities, setCommunities] = useState([])
    const [searchWord, setSearchWord] = useState('')

    const filteredOrgs = availableCommunities?.filter(item =>
        item.tenant_id.tenant_name.toLowerCase().includes(searchWord.toLowerCase())
      )

    useEffect(() => {
        // fetch Communities
        dispatch(retrieveFavoriteCommunities({
            client_id: user.id
        }))
    }, [])

    // update communities state
    useEffect(() => {
        if(isFavoriteCommunitiesSuccess && favoritecommunities !== null){
            setCommunities(favoritecommunities)
        }
    }, [isFavoriteCommunitiesSuccess, favoritecommunities])
  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
        
    <View className='flex-row items-center space-x-3'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                className='flex-1'
                placeholder='Search your favorite community'
                value={searchWord}
                onChangeText={(text) => setSearchWord(text)}
            />
        </View>
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.openDrawer()}
            testID='profile-pic'
            className='h-10 w-10 border-2 border-[#2DABB1] rounded-full justify-center items-center'
        >
            <FontAwesome5 name="user-alt" size={20} color="#2DABB1" />
        </TouchableOpacity>
    </View>
      
      <Text className='text-2xl font-bold mt-2'>Favorite Communities</Text>
      <Text>Explore your favorite communities</Text>

      <ScrollView className='mt-4 space-y-3'>
            {   isFavoriteCommunitiesLoading ?
                <Text>Loading...</Text> : (
                    filteredOrgs.length > 0 ?

                    filteredOrgs.map((community,i) => (
                        <TouchableOpacity testID='community-btn' key={i} onPress={() => navigation.navigate('community', {
                            community_id: community.community_id
                        })}>
                            <View
                                className='flex-row space-x-3 items-center'
                            >
                                <MaterialIcons name="groups" size={24} color="#2DABB1" />
                                <View>
                                    <Text>{community.tenant_id.tenant_name}</Text>
                                    <Text className='text-gray-500 text-sm'>{community.description.length > 40 ? `${community.description.slice(0, 40)}...` : community.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )) :

                    <Text className='text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>No favorite communities found</Text>
                )
            }
      </ScrollView>
    </SafeAreaView>
  )
}

export default FavoriteOrgs