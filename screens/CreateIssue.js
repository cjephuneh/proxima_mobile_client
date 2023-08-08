import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo, EvilIcons, FontAwesome, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCommunities, raiseIssue, resetIssueStatus } from '../redux/slice/community/communitySlice'
import { useRoute } from '@react-navigation/native'

const CreateIssue = () => {
  const dispatch = useDispatch()
  const route = useRoute()

  const community_id = route?.params?.community_id

  const { user } = useSelector((state) => state.auth)

    // fetch all communities on initial page load
    useEffect(() => {
      dispatch(getCommunities())
    }, [])

    // retrieve communities data from store
    const { communities, isCommunitiesLoading, isCommunitiesSuccess, isRaiseIssueLoading, isRaiseIssueSuccess, isRaiseIssueError } = useSelector((state) => state.community)

    const [selectedOrg, setSelectedOrg] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [issueTitle, setIssueTitle] = useState(null)
    const [issueDescription, setIssueDescription] = useState(null)
    
    const filteredOrgs = Array.isArray(communities) && communities.filter(org =>
      org.tenant_id.tenant_name.toLowerCase().includes(searchText.toLowerCase())
    ) || [];
   
    
    
    const createIssue = () => {
      if(!selectedOrg || !issueTitle.trim().length === 0 || issueDescription.trim().length === 0){
        Alert.alert('Missing details','Please fill out the required details')
        return;
      }

      dispatch(raiseIssue({
        client_id: user.id,
        community_id: selectedOrg.community_id,
        issue: issueTitle,
        description: issueDescription,
        solved: false
      }))
    }

    // Alert user if issue was raised
    useEffect(() => {
      if(isRaiseIssueSuccess){
        Alert.alert('Success',
      'Issue raised successfully')

      // reset issue status
      dispatch(resetIssueStatus())

      setSelectedOrg(null)
      setSearchText('')
      setIssueTitle(null)
      setIssueDescription(null)
      }

      if(isRaiseIssueError){
        Alert.alert('Failed',
      'Failed to raise issue. Please try again later')
      // reset issue status
      dispatch(resetIssueStatus())

      setSelectedOrg(null)
      setSearchText('')
      setIssueTitle(null)
      setIssueDescription(null)
      }
    }, [isRaiseIssueSuccess, isRaiseIssueError])
  return (
    <SafeAreaView className='px-3 pt-8'>
      <Text className='text-2xl font-bold text-center'>Create an issue</Text>

      <View className='flex-row items-center mt-3 space-x-3'>
        {/* <Image source={require('../assets/user.png')} /> */}
        <View className='h-9 w-9 rounded-full items-center justify-center bg-[#2DABB1]'>
        <FontAwesome name="user" size={24} color="white" />
        </View>
        <Text className='text-lg font-semibold'>{user.first_name} {user.last_name}</Text>
      </View>

      {
        isCommunitiesLoading ? <Text>Loading available communities...</Text> :

        (
          isCommunitiesSuccess && communities && 

          <KeyboardAvoidingView className='space-y-3' behavior='height'>
            <View className='flex-row items-center px-2 py-1 mt-3 space-x-3 bg-gray-200 rounded'>
                <EvilIcons name="search" size={24} color="black" />
                <TextInput
                    className='flex-1'
                    placeholder='Search Community'
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                filteredOrgs.map(org => (
                  <TouchableOpacity key={org.community_id} onPress={() => {
                      setSelectedOrg(org)
                      setSearchText(org.tenant_id.tenant_name)
                    }} activeOpacity={0.9} className='px-2 py-1 mx-1 bg-gray-200 rounded'>
                      <Text>{org.tenant_id.tenant_name}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
            {
              selectedOrg ?
              <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedOrg(null)} className='relative bg-[#2DABB1] px-4 py-2 font-semibold text-white self-start rounded'>
                <Text className='font-semibold text-white'>{selectedOrg?.tenant_id.tenant_name}</Text>
                <TouchableOpacity className='absolute top-0 right-0' activeOpacity={0.9} onPress={() => setSelectedOrg(null)}>
                  <Entypo name="cross" size={18} color="red" />
                </TouchableOpacity>
              </TouchableOpacity> :

              <View className='flex-row items-center self-start gap-2 pb-2 pr-2 ml-1 bg-blue-200 rounded w-fit'>
                <Octicons name="info" size={16} color="black" />
                <Text className=''>Please select a community</Text>
              </View>
            }


            <TextInput
                className='px-4 py-2 bg-gray-200 rounded'
                placeholder={selectedOrg === null ? 'Please select a community' : 'Add a title for your issue'}
                value={issueTitle}
                onChangeText={text => setIssueTitle(text)}
                editable={selectedOrg === null ? false : true}
            />

            <TextInput
                multiline={true}
                numberOfLines={3}
                className='px-4 py-2 bg-gray-200 rounded'
                placeholder={selectedOrg === null ? 'Please select a community' : 'Add a description for your issue'}
                style={{
                  maxHeight: 90,
                  height: 'auto',
                }}
                textAlignVertical='top'
                value={issueDescription}
                onChangeText={text => setIssueDescription(text)}
                editable={selectedOrg === null ? false : true}
            />            

            <TouchableOpacity activeOpacity={0.9} disabled={isRaiseIssueLoading} onPress={() => createIssue()} className='flex-row space-x-2 items-center bg-[#2DABB1] self-start px-4 py-2 rounded-full mt-2'>
                <Text className='font-semibold text-white'>{isRaiseIssueLoading ? 'Please wait...' : 'Raise Issue'}</Text>
                <Ionicons name="send" size={16} color="white" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )
      }
    </SafeAreaView>
  )
}

export default CreateIssue