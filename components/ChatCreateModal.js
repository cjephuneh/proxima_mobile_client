import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { getCommunities } from '../redux/slice/community/communitySlice'
import { useDispatch, useSelector } from 'react-redux'
import { createChat, resetChatState, retrieveChats } from '../redux/slice/chat/chatSlice'
import { useNavigation } from '@react-navigation/native'

const ChatCreateModal = ({ showModal, setShowModal}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const { user } = useSelector((state) => state.auth)

    // show search bar
    const [showSearch, setShowSearch] = useState(false)

    // fetch data from store
    const { communities, isCommunitiesLoading, isCommunitiesSuccess } = useSelector((state) => state.community)
    const { chats } = useSelector((state) => state.chat)

    // filter communities to make sure the ones with created chats are not displayed
    const communitiesToDisplay = communities?.filter(community => (
        !chats?.some(cht => 
            cht.tenant_id.tenant_id === community.tenant_id.tenant_id
        )
    ))

    // 
    useEffect(() => {
        // fetch Communities
        dispatch(getCommunities())
    }, [dispatch])

    // create chat
    const createClientChat = (tenantId) => {
        dispatch(createChat({
            tenant_id: tenantId,
            chat_owner: user.id,
            client_satisfaction: true,
        }))
    }

    // fetch data to track chat creation
    const { chat, isChatLoading, isChatSuccess, isChatError, isChatMessage } = useSelector((state) => state.chat)

    // check if chat was created and navigate
    useEffect(() => {
        console.log(chat)
        if(isChatError || isChatMessage){
            Alert.alert('Failed', 'Unable to create chat. Please try again later')
        }

        if(isChatSuccess && chat){
            // fetch new chats
            dispatch(retrieveChats({chat_owner: user.id}))
            // navigate to chat
            navigation.navigate('chat', { chat_id: chat.chat_id })
        }

        // reset state values
        dispatch(resetChatState())
    }, [dispatch, isChatSuccess, chat, navigation, isChatError, isChatMessage])

    // handle search 
    const [searchText, setSearchText] = useState('')

    const filteredOrgs = communitiesToDisplay?.filter(item =>
        item.tenant_id.tenant_name.toLowerCase().includes(searchText.toLowerCase())
      )
  return (
    <Modal visible={showModal} animationType='slide' onRequestClose={() => setShowModal(!showModal)}>
        <View className='flex-1 bg-white'>
            {/* Nav */}
            <View className='flex-row items-center border-b border-gray-200 p-2'>
                <View className='flex-1 flex-row gap-4 items-center'>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    <View className='flex-1'>
                        {
                            showSearch ?

                            <TextInput
                                placeholder='Search organizations'
                                className='py-[5px]  border-gray-100'
                                value={searchText}
                                onChangeText={(text) => setSearchText(text)}
                            /> :

                            <>
                                <Text className='font-semibold'>Select organization</Text>
                                <Text className='text-sm text-gray-500'>{communitiesToDisplay && communitiesToDisplay.length} Organizations</Text>
                            </>
                        }
                    </View>
                </View>

                <TouchableOpacity onPress={() => setShowSearch(!showSearch)} className='ml-2'>
                    <FontAwesome name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* communities */}
            <ScrollView  className='px-3 mt-4 space-y-3' showsVerticalScrollIndicator={false}>
                {   isCommunitiesLoading ?
                    <Text>Loading...</Text> : (
                        filteredOrgs?.length > 0 ?

                        filteredOrgs.map((community,i) => (
                            <TouchableOpacity disabled={isChatLoading} testID='community-btn' key={i} onPress={() => createClientChat(community.tenant_id.tenant_id)}>
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
                        )) :

                        <Text className='text-sm bg-[#2DABB1] text-white text-center p-2 rounded font-semibold italic'>No organizations found.</Text>
                    )
                }
            </ScrollView>
        </View>
    </Modal>
  )
}

export default ChatCreateModal