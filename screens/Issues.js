import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityIssues } from '../redux/slice/community/communitySlice';

const Issues = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()

    const { community_id } = route.params

    const { communityIssues, isCommunityIssuesLoading } = useSelector((state) => state.community)

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

                    <ScrollView className='mt-4 space-y-2 flex-1' showsVerticalScrollIndicator={false}>
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
                                            width: '100%',
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
                </>
            )
        }
    </SafeAreaView>
  )
}

export default Issues