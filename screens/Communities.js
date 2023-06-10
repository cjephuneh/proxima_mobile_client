import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getCommunities } from '../redux/slice/community/communitySlice'
import { useDispatch, useSelector } from 'react-redux'

const Communities = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { communities, isCommunitiesLoading, isCommunitiesSuccess } = useSelector((state) => state.community)

    const [availableCommunities, setCommunities] = useState([])
    const [searchWord, setSearchWord] = useState('')

    // enable user to search through the list of available communities
    const searchFilterFunction = (text) => {
        if (!text) {
            setSearchWord(text);
            setCommunities(communities); // Reset to original communities when the search field is empty
            return;
        }
    
        const newData = availableCommunities.filter((item) => {
            const itemData = item.tenant_id.tenant_name ? item.tenant_id.tenant_name.toLowerCase() : '';
            const searchData = text.toLowerCase();
    
            return itemData.indexOf(searchData) > -1;
        });
    
        setCommunities(newData);
        setSearchWord(text);
    };
    

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

  return (
    <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
        
    <View className='flex-row items-center space-x-3'>
        <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                className='flex-1'
                placeholder='Search Communities'
                value={searchWord}
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
      
        <Text className='text-2xl font-bold mt-2'>Find a community</Text>
            <ScrollView className='mt-4 space-y-3' showsVerticalScrollIndicator={false}>
            {   isCommunitiesLoading ?
                <Text>Loading...</Text> : (
                    availableCommunities.length > 0 ?

                    availableCommunities.map((community,i) => (
                        <TouchableOpacity testID='community-btn' key={i} onPress={() => navigation.navigate('community', {
                            community_id: community.community_id
                        })}>
                            <View
                                className='flex-row space-x-3 items-center'
                            >
                                <MaterialIcons name="groups" size={24} color="black" />
                                <View>
                                    <Text>{community.tenant_id.tenant_name}</Text>
                                    <Text className='text-gray-500 text-sm'>{community.description.length > 40 ? `${community.description.slice(0, 40)}...` : community.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )) :

                    <Text className='text-sm bg-gray-300 p-2 rounded font-semibold italic'>No communities found.</Text>
                )
            }

            </ScrollView>
    </SafeAreaView>
  )
}

export default Communities