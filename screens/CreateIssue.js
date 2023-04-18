import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons'

const CreateIssue = () => {
    const tagsData = [
        'milk',
        'food',
        'general'
    ]

    const organizations = [
      {
        title: '18th Street Brewery',
        location: 'Dakley Avenue, Hammond, IN'
      },
      {
          title: '16th Street',
          location: 'Brooklyn, NY'
      },
      {
          title: '169th Street',
          location: 'Brooklyn, NY'
      },
      {
          title: '18th Street Brewery',
          location: 'Dakley Avenue, Hammond, IN'
      },
      {
          title: '16th Street',
          location: 'Brooklyn, NY'
      },
      {
          title: '169th Street',
          location: 'Brooklyn, NY'
      },
    ]

    const [selectedOrg, setSelectedOrg] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [issueTitle, setIssueTitle] = useState(null)
    const [issueDescription, setIssueDescription] = useState(null)
    const [tags, setTags] = useState([])

    const filteredOrgs = organizations.filter(org => org.title.toLowerCase().includes(searchText.toLowerCase()))

    const createIssue = () => {
      if(!selectedOrg || !issueTitle || issueDescription){
        Alert.alert('Missing details','Please fill out the required details')
        return;
      }
    }
  return (
    <SafeAreaView className='pt-8 px-3'>
      <Text className='text-2xl font-bold text-center'>Create an issue</Text>

      <View className='mt-3 flex-row space-x-3 items-center'>
        <Image source={require('../assets/user.png')} />
        <Text className='font-semibold text-lg'>Kevin Kimani</Text>
      </View>

      <KeyboardAvoidingView className='space-y-3'>
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
              <TouchableOpacity key={filteredOrgs.indexOf(org)} onPress={() => {
                  setSelectedOrg(org.title)
                  setSearchText(org.title)
                }} activeOpacity={0.9} className='px-2 py-1 bg-gray-200 mx-1 rounded'>
                  <Text>{org.title}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        {
          selectedOrg &&

          <TouchableOpacity activeOpacity={0.9} className='relative bg-[#2DABB1] px-4 py-2 font-semibold text-white self-start rounded'>
            <Text className='font-semibold text-white'>{selectedOrg}</Text>
            <TouchableOpacity className='absolute right-0 top-0' activeOpacity={0.9} onPress={() => setSelectedOrg(null)}>
              <Entypo name="cross" size={18} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        }

        <TextInput
            className='bg-gray-200 px-4 py-2 rounded'
            placeholder='Add a title for your issue'
            value={issueTitle}
            onChangeText={text => setIssueTitle(text)}
        />

        <TextInput
            multiline={true}
            numberOfLines={3}
            className='bg-gray-200 px-4 py-2 rounded'
            placeholder='Add a description for your issue'
            style={{
              maxHeight: 90,
              height: 'auto',
            }}
            textAlignVertical='top'
            value={issueDescription}
            onChangeText={text => setIssueDescription(text)}
        />

        <Text>Add tags for your issue to make it easy to find</Text>

        <View className='flex-row space-x-2'>
            {
                tagsData.map((tag, i) => (
                    <TouchableOpacity key={i} activeOpacity={0.9} onPress={() => {
                      tags.includes(tag) ? setTags(tags.filter(tg => tg !== tag)) : setTags([...tags, tag])
                    }}>
                      <Text className={tags.includes(tag) ? 'bg-[#2DABB1] px-4 py-2 rounded font-semibold text-white' : 'bg-gray-200 px-4 py-2 rounded'}>{tag}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={() => createIssue()} className='flex-row space-x-2 items-center bg-[#2DABB1] self-start px-4 py-2 rounded-full mt-2'>
            <Text className='text-white font-semibold'>Send</Text>
            <Ionicons name="send" size={16} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default CreateIssue