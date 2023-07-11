import axios from "axios";
import { ApiUrls } from "../../../utils/ApiUrls";

const getCommunities = async (communityData) => {
    // const response = await axios.post(ApiUrls.retrieve_communities, communityData)

    // return response.data
    try {
        const { data } = await axios.post(ApiUrls.retrieve_communities, {
            communityData
        })

        return data
    } catch (error) {
        throw error
    }
}

const getACommunity = async (communityData) => {
    try {
        const { data } = await axios.post(ApiUrls.retrieve_communities, communityData)

        return data
    } catch (error) {
        throw error
    }
}

const getCommunityIssues = async (communityData) => {
    // const response = await axios.post('/', communityData)

    // return response.data
    try {
        const { data } = await axios.post(ApiUrls.retrieve_community_issues, {
            community_id: communityData
        })

        return data
    } catch (error) {
        throw error
    }
}

const getIssueThread = async (issueData) => {
    // console.log('thread')
    // console.log(issueData)
    try {
        const { data } = await axios.post(ApiUrls.retrieve_issue_thread, {
            issue_id: issueData
        })

        // console.log('thread fetched', data)

        return data
    } catch (error) {
        console.log('thread error')
        throw error
    }
}

const getThreadComments = async (threadData) => {
    try {
        const { data } = await axios.post(ApiUrls.retrieve_thread_comments, {
            thread_id: threadData
        })

        // console.log('comments', data)

        return data
    } catch (error) {
        throw error
    }
}

const raiseIssue = async (issueData) => {
    try {
        const { data } = await axios.post(ApiUrls.raise_issue, issueData)

        return data
    } catch (error) {
        throw error
    }
}

const commentOnIssue = async (commentData) => {
    try{
        const { data } = await axios.post(ApiUrls.retrieve_thread_comments, commentData)

        return data
    } catch(error) {
        throw error
    }
}

const likeIssueComment = async (commentData) => {
    try {
        const { data } = await axios.post(ApiUrls.like_issue_comment, commentData)

        // console.log('comments', data)

        return data
    } catch (error) {
        throw error
    }
}

const likeIssue = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const retrieveCommunitySurveys = async (communityData) => {
    try {
        const { data } = await axios.post(ApiUrls.retrieve_surveys, communityData)

        // console.log('surveys data', data)

        return data
    } catch (error) {
        throw error
    }
}

const favoriteCommunities = async (communityData) => {
    try {
        const { data } = await axios.post(ApiUrls.favorite_communities, communityData)

        return data
    } catch (error) {
        throw error
    }
}

const toggleFavoriteCommunities = async (communityData) => {
    try {
        const { data } = await axios.post(ApiUrls.favorite_communities, communityData)

        return data
    } catch (error) {
        throw error
    }
}

const joinCommunity = async (communityData) => {
    try {
        const { data } = await axios.post(ApiUrls.join_community, communityData)

        // can't join community
        if(data.message){
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

const leaveCommunity = async (communityData) => {
    try {
        const { data } = await axios.post(ApiUrls.leave_community, communityData)

        // can't leave community
        if(data.message){
            return { error: data.message.error }
        }

        else return data
    } catch (error) {
        throw error
    }
}

const submitSurveyResponse = async (responseData) => {
    try {
        const { data } = await axios.post(ApiUrls.survey_response, responseData)

        if(data.message){
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

const communityService = {
    getCommunities, getACommunity, getCommunityIssues, getIssueThread, getThreadComments, raiseIssue, commentOnIssue, likeIssueComment, likeIssue, retrieveCommunitySurveys, favoriteCommunities, toggleFavoriteCommunities, joinCommunity, leaveCommunity, submitSurveyResponse
}

export default communityService