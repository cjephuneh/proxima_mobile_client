import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { commentOnIssue, getIssueThread, getThreadComments, likeIssueComment, resetThreadCommentsState, resetThreadState } from '../redux/slice/community/communitySlice'

// TODO
// Update comment likes locally

// const LikesBox = ({ comment, likeComment, userLikeIssueComment }) => {
//     useEffect(() => {
//         console.log('changed')
//     }, [userLikeIssueComment])

//     return (
//         <TouchableOpacity testID='upvote-btn' activeOpacity={0.2} onPress={() => likeComment(comment.comment_id)} className='flex-row space-x-1'>
//             <AntDesign name="hearto" size={18} color="#2DABB1" />
//             <Text className='font-semibold text-[#2DABB1]'>{comment.likes.length}</Text>
//         </TouchableOpacity>
//     )
// }

const Issue = () => {
    const scrollViewRef = useRef()
    const dispatch = useDispatch()
    const route = useRoute()

    const { issue_id } = route.params

    const { user } = useSelector((state) => state.auth)

    // retrieve issue thread
    useEffect(() => {
        issue_id && dispatch(getIssueThread(issue_id))
    }, [issue_id, dispatch])

    // retrieve fetched thread from store
    const { issuethread, isIssueThreadSuccess, isIssueThreadLoading, isIssueThreadError, isIssueThreadMessage } = useSelector((state) => state.community)

    // check if issue thread was fetched
    useEffect(() => {
        if(isIssueThreadError || isIssueThreadMessage){
            Alert.alert('An error occured', 'Please try again later.')
        }

        // retrieve thread comments
        if(issuethread && isIssueThreadSuccess){
            dispatch(getThreadComments(issuethread[0].thread_id))
        }

        // reset state
        dispatch(resetThreadState())
    }, [dispatch, issuethread, isIssueThreadError, isIssueThreadMessage, isIssueThreadSuccess])

    // retrieve thread comments
    // useEffect(() => {
    //     issuethread && issuethread.length > 0 && dispatch(getThreadComments(issuethread[0].thread_id))

    //     dispatch(resetThreadCommentsState())
    // }, [issuethread, dispatch])

    // retrieve fetched thread comments from store
    const { threadcomments, isThreadCommentsLoading, isThreadCommentsSuccess, isThreadCommentsError, isThreadCommentsMessage,
        userLikeIssueComment 
    } = useSelector((state) => state.community)

    // check if thread comments were fetched
    useEffect(() => {
        if(isThreadCommentsError || isThreadCommentsMessage){
            Alert.alert('Unable to fetch thread comments', 'Please refresh or try again later')
        }

        dispatch(resetThreadCommentsState())
    }, [dispatch, isThreadCommentsError, isThreadCommentsMessage])
    // console.log(threadcomments)

    let users = [1,2,3]
    let replies = [1,2,3]

    const [comment, setComment] = useState(null)

    // like comment
    const likeComment = (comment_id) => dispatch(likeIssueComment({comment_id, client_id: user.id}))

    // reset thread comments on initial page load
    // useEffect(() => {
    //     dispatch(resetThreadComments())
    // }, [issue_id, issuethread])

    // add a comment to a thread
    const addCommentToAThread = (thread_id) => {
        if(comment.trim().length === 0) return
        
        dispatch(commentOnIssue({thread_id, comment_description: comment, client_id: user.id}))

        // clear the comment box
        setComment(null)
    }

  return (
    <SafeAreaView className='flex-1 px-3 pt-8'>
      <Text className='text-xl font-bold'>
        {/* {issuethread && issuethread.length>0 && issuethread[0].issue.issue} */}
        {
            isIssueThreadLoading ? <Text>Loading...</Text> :
            (
                issuethread?.length > 0 &&
                issuethread[0].issue.issue 
            )
        }
    </Text>
      <Text className='mt-2'>
        {/* {issuethread && issuethread.length>0 && issuethread[0].issue.description} */}
        {
            isIssueThreadLoading ? <Text>Loading...</Text> :
            (
                issuethread?.length > 0 &&
                issuethread[0].issue.description 
            )
        }
    </Text>
    
        {/* Issue */}
      {/* <View className='flex-row items-center mt-4 space-x-4'>
            <View className='flex-row'>
                {
                    users.map((user, i) => (
                        <View key={i} className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}>
                            <Image 
                                key={i}
                                source={require('../assets/user.png')}
                                testID='top-3-member-images'
                            />
                        </View>
                    ))
                }
                
            </View>
            <TouchableOpacity className='flex-row space-x-2'>
                <AntDesign name="hearto" size={18} color="#2DABB1" />
                <Text className='font-semibold text-[#2DABB1]'>Join 15 people in upvoting this</Text>
            </TouchableOpacity>
      </View> */}

        {/* Replies */}
        <ScrollView 
            className='flex-1 pl-2 my-2 space-y-4' 
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            testID='reply-section'
        >
            {
                isThreadCommentsLoading ? <Text>Loading comments...</Text> :
                threadcomments && [...threadcomments].sort((a, b) => a.comment_id - b.comment_id).map((comment, i) => (
                    <View key={comment.comment_id} className='p-2 border border-gray-200 rounded '>
                        <View className='flex-row items-center space-x-2'>
                            {/* <Image
                                source={require('../assets/user.png')}
                             /> */}
                             <FontAwesome name="user" size={24} color="black" />
                             <Text className='font-bold'>{comment.client.first_name} {comment.client.last_name}</Text>
                        </View>

                        <Text className="mt-3">{comment.comment_description}</Text>

                        <View className='flex-row items-center mt-4 space-x-4'>

                            {/* <View className='flex-row'>
                                {
                                    users.map((user, i) => (
                                        <View key={i} className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}>
                                            <Image 
                                                key={i}
                                                source={require('../assets/user.png')}
                                     
                                            />
                                        </View>
                                    ))
                                }
                    
                            </View> */}

                            {/* <LikesBox comment={comment} likeComment={likeComment} userLikeIssueComment={userLikeIssueComment} /> */}
                            <TouchableOpacity testID='upvote-btn' activeOpacity={0.2} onPress={() => likeComment(comment.comment_id)} className='flex-row space-x-1'>
                                <AntDesign name="hearto" size={18} color="#2DABB1" />
                                <Text className='font-semibold text-[#2DABB1]'>{comment.likes.length}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }
            <KeyboardAvoidingView behavior='height' className='flex-row items-center space-x-2'>
                <TextInput
                    testID='comment-input'
                    placeholder='Add your own thoughts'
                    multiline={true}
                    className='flex-1 p-2 mt-2 border border-gray-300 rounded-xl'
                    value={comment}
                    onChangeText={text => setComment(text)}
                />
                <TouchableOpacity testID='send-btn' disabled={!comment} activeOpacity={0.2} onPress={() => addCommentToAThread(issuethread[0].thread_id)}>
                    <Ionicons name="send" size={24} color="#2DABB1" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>

        <View className='flex-row justify-between my-3'>
        <TouchableOpacity activeOpacity={0.9} className='p-2'>
            <AntDesign name="hearto" size={24} color="#2DABB1" />
        </TouchableOpacity>
        <TouchableOpacity 
            className='bg-[#2DABB1] px-8 py-2 rounded-full'
            onPress={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
            <Text className='font-bold text-white'>Apply Your Thoughts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Issue