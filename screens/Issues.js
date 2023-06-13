import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityIssues } from '../redux/slice/community/communitySlice';

const Issues = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()

    const { community_id } = route.params

    const { communityIssues, isCommunityIssuesLoading } = useSelector((state) => state.community)

    // console.log(communityIssues)

    let users = [1,2,3]
    let issues = [1,2,3]
    let tags = [1,2,3]

    useEffect(() => {
        community_id && dispatch(getCommunityIssues(community_id))
    }, [])
  return (
    <SafeAreaView className='pt-8 px-3 flex-1 '>
        { isCommunityIssuesLoading ? 

            <Text>Loading...</Text> :

            communityIssues &&
            (
                communityIssues.length === 0 ?

                <View className='flex-1 items-center justify-center space-y-12'>
                    <MaterialCommunityIcons name="clipboard-text-search-outline" size={60} color="black" />
                    <Text className='text-sm bg-gray-300 p-2 rounded font-semibold italic'>No issues raised for this community</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('createIssue', { community_id })} className='bg-[#2DABB1] px-4 py-2 rounded'>
                        <Text className='text-white font-semibold'>Raise the first issue</Text>
                    </TouchableOpacity>
                </View> :
                <>
                    <Text className='font-semibold text-lg'>{communityIssues.length>0 && communityIssues[0].community_id.community_name}</Text>

                    {/* <View className='flex-row space-x-4 items-center mt-4'>
                        <View className='flex-row'>
                            {
                                users.map((user, i) => (
                                    <View className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}>
                                        <Image 
                                            key={i}
                                            source={require('../assets/user.png')}
                                            testID='top-3-user-images'
                                            
                                        />
                                    </View>
                                ))
                            }
                            
                        </View>
                        <TouchableOpacity className='flex-row space-x-2'>
                            <AntDesign name="hearto" size={18} color="#2DABB1" />
                            <Text className='font-semibold text-[#2DABB1]'>Join 15 people in this community</Text>
                        </TouchableOpacity>
                    </View> */}

                    <ScrollView className='mt-4 space-y-2 flex-1' showsVerticalScrollIndicator={false}>
                            {/* {
                                communityIssues.map(issue => (
                                    <TouchableOpacity testID='issue-btn' activeOpacity={0.9} onPress={() => navigation.navigate('issue', { issue_id: issue.issue_id })} key={issue.issue_id}>
                                        <Text className="text-xl font-bold">{issue.issue}</Text>
                                        <View testID='issue-owner'>
                                            <Text className="text-gray-500 text-xs">Raised by {issue.client_id.first_name} {issue.client_id.last_name} • Nov 25, 2020</Text>
                                            <Image 
                                                className='mt-2 w-full rounded'
                                                resizeMode='cover'
                                                source={require('../assets/company.png')}
                                                
                                            />
                                        </View> */}
                                        {/* <View className='flex-row space-x-3 mt-3'>
                                            {
                                                tags.map((tag) => (
                                                    <Text testID='issue-tags' key={tags.indexOf(tag)} className='bg-gray-300 px-3 py-1 rounded-full'>bad milk</Text>
                                                ))
                                            }
                                        </View> */}

                                        {/* <View className='mt-4'>
                                            <View className='flex-row items-center space-x-2'> */}
                                                {/* <Image
                                                    source={require('../assets/user.png')}
                                                /> */}
                                                {/* <FontAwesome name="user" size={24} color="black" />

                                                <Text className='font-bold'>{issue.client_id.first_name} {issue.client_id.last_name}</Text>
                                            </View>
                                            <Text className='mt-2'>{issue.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            } */}
                            {
                                [...communityIssues].sort((a, b) => b.issue_id - a.issue_id).map(issue => (
                                    <TouchableOpacity 
                                        testID='issue-btn' 
                                        activeOpacity={0.9} 
                                        onPress={() => navigation.navigate('issue', { issue_id: issue.issue_id })} 
                                        key={issue.issue_id}
                                        className='p-2 rounded'
                                        style={{
                                            backgroundColor: 'white',
                                            // borderRadius: 8,
                                            width: '100%',
                                            // marginVertical: 10,
                                            elevation: 60,
                                            shadowColor: 'white',
                                        }}
                                    >
                                        <View className='flex-row items-center gap-3'>
                                            <Ionicons name="documents" size={24} color="#2DABB1" />
                                            <View>
                                                <Text className='font-semibold'>{issue.issue}</Text>
                                                <Text className='text-xs'>{issue.description.length > 50 ? issue.description.slice(0, 50)+'...' : issue.description}</Text>
                                                <Text className='text-xs text-gray-500'>Raised by: {issue.client_id.first_name} {issue.client_id.last_name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                    </ScrollView>

                    {/* <View className='my-3 flex-row justify-between'>
                        <TouchableOpacity className='p-2'>
                            <AntDesign name="hearto" size={24} color="#2DABB1" />
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-[#2DABB1] px-8 py-2 rounded-full'>
                            <Text className='font-bold text-white'>Apply Your Thoughts</Text>
                        </TouchableOpacity>
                    </View> */}
                </>
            )
        }
    </SafeAreaView>
  )
}

export default Issues