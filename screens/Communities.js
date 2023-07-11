import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, EvilIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { addOrRemoveFromFavs, getCommunities, resetAddOrRemoveFromFavs, retrieveFavoriteCommunities } from '../redux/slice/community/communitySlice'
import { useDispatch, useSelector } from 'react-redux'

const Communities = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { communities, isCommunitiesLoading, isCommunitiesSuccess } = useSelector((state) => state.community)

    const { user } = useSelector((state) => state.auth)

    const [availableCommunities, setCommunities] = useState([])
    const [searchWord, setSearchWord] = useState('')

    const filteredOrgs = availableCommunities?.filter(item =>
        item.tenant_id.tenant_name.toLowerCase().includes(searchWord.toLowerCase())
      )
    

    useEffect(() => {
        // fetch Communities
        dispatch(getCommunities())
    }, [])

    // update communities state
    useEffect(() => {
        if(isCommunitiesSuccess && communities !== null){
            setCommunities(communities)
        }
    }, [isCommunitiesSuccess, communities])

    // fetch a client's favorite communities
    useEffect(() => {
        // fetch Communities
        dispatch(retrieveFavoriteCommunities({
            client_id: user.id
        }))
    }, [])

    // fetch favorite communities from store
    const { favoritecommunities, isFavoriteCommunitiesLoading, isFavoriteCommunitiesSuccess } = useSelector((state) => state.community)

    const isFavoriteCommunity = (community) => {
        return favoritecommunities.some(favoriteCommunity => favoriteCommunity.community_id === community.community_id);
    };

    // handle add and remove from favs
    const handleFavoriteCommunities = (communityId) => {
        dispatch(addOrRemoveFromFavs({
            client_id: user.id,
            community_id: communityId
        }))
    }

    //  fetch add or remove from favs data from store
    const { addtofavorites, isAddToFavsLoading, isAddToFavsSuccess, isAddToFavsError, isAddToFavsMessage } = useSelector((state) => state.community)

    // take action based on data return from adding or removing a community to favorites
    useEffect(() => {
        if(isAddToFavsError && isAddToFavsMessage){
            Alert.alert('Unable to complete the action', 'Please try again later')
        }

        if(isAddToFavsSuccess && addtofavorites){
            // fetch updated client's favorite communities
            dispatch(retrieveFavoriteCommunities({
                client_id: user.id
            }))
        }

    }, [isAddToFavsLoading, addtofavorites, isAddToFavsSuccess, isAddToFavsError, isAddToFavsMessage, dispatch])

  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
        
    <View className='flex-row items-center space-x-3'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                className='flex-1'
                placeholder='Search Communities'
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
      
        <Text className='text-2xl font-bold mt-2'>Find a community</Text>
            <ScrollView className='mt-4 space-y-3' showsVerticalScrollIndicator={false}>
            {   isCommunitiesLoading ?
                <Text>Loading...</Text> : (
                    filteredOrgs.length > 0 ?

                    filteredOrgs.map((community,i) => (
                        <View key={i} className='flex-row items-center'>
                            <TouchableOpacity testID='community-btn' className='flex-1' onPress={() => navigation.navigate('community', {
                                community_id: community.community_id,
                                tenant_id: community.tenant_id.tenant_id
                            })}>
                                <View
                                    className='flex-row space-x-3 items-center'
                                >
                                    <MaterialIcons name="groups" size={24} color="#2DABB1" />
                                    <View>
                                        <Text>{community.tenant_id.tenant_name}</Text>
                                        <Text className='text-gray-500 text-xs'>{community.description.length > 40 ? `${community.description.slice(0, 40)}...` : community.description}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {
                                favoritecommunities && (
                                    isFavoriteCommunity(community) ?

                                    <TouchableOpacity onPress={() => handleFavoriteCommunities(community.community_id)}>
                                        <AntDesign name="star" size={24} color="#2DABB1" />
                                    </TouchableOpacity> :

                                    <TouchableOpacity onPress={() => handleFavoriteCommunities(community.community_id)}>
                                        <AntDesign name="staro" size={24} color="#2DABB1" />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    )) :

                    <Text className='text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>No communities found.</Text>
                )
            }

            </ScrollView>
    </SafeAreaView>
  )
}

export default Communities