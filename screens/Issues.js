import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
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
    <SafeAreaView className='mt-8 px-3 flex-1'>
        { isCommunityIssuesLoading ? 

            <Text>Loading...</Text> :

            communityIssues &&
            (
                communityIssues.length === 0 ?

                <View className='flex-1 items-center justify-center space-y-12'>
                    <MaterialCommunityIcons name="clipboard-text-search-outline" size={60} color="black" />
                    <Text className='text-sm bg-gray-300 p-2 rounded font-semibold italic'>No issues raised for this community</Text>
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

                    <ScrollView className='mt-4 space-y-4 flex-1' showsVerticalScrollIndicator={false}>
                            {
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
                                        </View>
                                        {/* <View className='flex-row space-x-3 mt-3'>
                                            {
                                                tags.map((tag) => (
                                                    <Text testID='issue-tags' key={tags.indexOf(tag)} className='bg-gray-300 px-3 py-1 rounded-full'>bad milk</Text>
                                                ))
                                            }
                                        </View> */}

                                        <View className='mt-4'>
                                            <View className='flex-row items-center space-x-2'>
                                                {/* <Image
                                                    source={require('../assets/user.png')}
                                                /> */}
                                                <FontAwesome name="user" size={24} color="black" />

                                                <Text className='font-bold'>{issue.client_id.first_name} {issue.client_id.last_name}</Text>
                                            </View>
                                            <Text className='mt-2'>{issue.description}</Text>
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