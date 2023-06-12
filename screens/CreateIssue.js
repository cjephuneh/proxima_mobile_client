import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo, EvilIcons, FontAwesome, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCommunities, raiseIssue, resetIssueStatus } from '../redux/slice/community/communitySlice'

const CreateIssue = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
    // const tagsData = [
    //     'milk',
    //     'food',
    //     'general'
    // ]

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
    // const [tags, setTags] = useState([])
    // const [tag, setTag] = useState('')

    // console.log('selected', selectedOrg)

    // const filteredOrgs = communities && communities.filter(org => org.tenant_id.tenant_id.tenant_name.toLowerCase().includes(searchText.toLowerCase()))
    const filteredOrgs = communities && communities.filter(org =>
      org.tenant_id.tenant_name.toLowerCase().includes(searchText.toLowerCase())
    );
    
    const createIssue = () => {
      if(!selectedOrg || !issueTitle.trim().length === 0 || issueDescription.trim().length === 0){
        Alert.alert('Missing details','Please fill out the required details')
        return;
      }

      // TODO: Replace fixed values with dynamic data
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
    <SafeAreaView className='pt-8 px-3'>
      <Text className='text-2xl font-bold text-center'>Create an issue</Text>

      <View className='mt-3 flex-row space-x-3 items-center'>
        {/* <Image source={require('../assets/user.png')} /> */}
        <View className='h-9 w-9 rounded-full items-center justify-center bg-[#2DABB1]'>
        <FontAwesome name="user" size={24} color="white" />
        </View>
        <Text className='font-semibold text-lg'>{user.first_name} {user.last_name}</Text>
      </View>

      {
        isCommunitiesLoading ? <Text>Loading available communities...</Text> :

        (
          isCommunitiesSuccess && communities && 

          <KeyboardAvoidingView className='space-y-3' behavior='height'>
            <View className='flex-row items-center mt-3 space-x-3 bg-gray-200 px-2 py-1 rounded'>
                <EvilIcons name="search" size={24} color="black" />
                <TextInput
                    className='flex-1'
                    placeholder='Search Organization'
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
                    }} activeOpacity={0.9} className='px-2 py-1 bg-gray-200 mx-1 rounded'>
                      <Text>{org.tenant_id.tenant_name}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>

            {/* {
              selectedOrg &&

              <TouchableOpacity activeOpacity={0.9} className='relative bg-[#2DABB1] px-4 py-2 font-semibold text-white self-start rounded'>
                <Text className='font-semibold text-white'>{selectedOrg}</Text>
                <TouchableOpacity className='absolute right-0 top-0' activeOpacity={0.9} onPress={() => setSelectedOrg(null)}>
                  <Entypo name="cross" size={18} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
            } */}
            {
              selectedOrg ?
              <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedOrg(null)} className='relative bg-[#2DABB1] px-4 py-2 font-semibold text-white self-start rounded'>
                <Text className='font-semibold text-white'>{selectedOrg.tenant_id.tenant_name}</Text>
                <TouchableOpacity className='absolute right-0 top-0' activeOpacity={0.9} onPress={() => setSelectedOrg(null)}>
                  <Entypo name="cross" size={18} color="red" />
                </TouchableOpacity>
              </TouchableOpacity> :

              <View className='flex-row items-center gap-2 bg-blue-200 pr-2 pb-2 rounded w-fit self-start ml-1'>
                <Octicons name="info" size={16} color="black" />
                <Text className=''>Please select a community</Text>
              </View>
            }


            <TextInput
                className='bg-gray-200 px-4 py-2 rounded'
                placeholder={selectedOrg === null ? 'Please select a community' : 'Add a title for your issue'}
                value={issueTitle}
                onChangeText={text => setIssueTitle(text)}
                editable={selectedOrg === null ? false : true}
            />

            <TextInput
                multiline={true}
                numberOfLines={3}
                className='bg-gray-200 px-4 py-2 rounded'
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

            {/* <Text>Add tags for your issue to make it easy to find</Text> */}

            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row gap-2 flex-wrap'>
                {
                    tags.map((tag, i) => (
                      <View key={i} className='bg-gray-200 flex-row items-center rounded'>
                          <Text className= 'px-2 py-1 rounded font-semibold'>{tag}</Text>
                          <TouchableOpacity activeOpacity={0.9} className='p-1' onPress={() => setTags(tags.filter(tg => tg !== tag))}>
                            <MaterialCommunityIcons name="delete" size={16} color="red" />
                          </TouchableOpacity>
                      </View>
                    ))
                }
            </ScrollView> */}

            {/* <View className='space-y-3'>
              <View className='flex-row items-center gap-3'>
                <TextInput
                    className='flex-1 bg-gray-200 px-4 py-2 rounded'
                    placeholder='Add your issue tag here'
                    value={tag}
                    onChangeText={text => setTag(text)}
                />
                <TouchableOpacity disabled={tag === ''} activeOpacity={0.9} onPress={() => setTags([...tags, tag])} className='p-2 bg-[#2DABB1] rounded'>
                  <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View> */}

            

            <TouchableOpacity activeOpacity={0.9} disabled={isRaiseIssueLoading} onPress={() => createIssue()} className='flex-row space-x-2 items-center bg-[#2DABB1] self-start px-4 py-2 rounded-full mt-2'>
                <Text className='text-white font-semibold'>{isRaiseIssueLoading ? 'Please wait...' : 'Raise Issue'}</Text>
                <Ionicons name="send" size={16} color="white" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )
      }
    </SafeAreaView>
  )
}

export default CreateIssue