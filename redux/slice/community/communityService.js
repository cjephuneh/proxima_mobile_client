import axios from '../../../utils/axiosInstance';
import { ApiUrls } from "../../../utils/ApiUrls";
import axiosInstance from "../../../utils/axiosInstance";

const getCommunities = async(communityData) => {
    // const response = await axios.post(ApiUrls.retrieve_communities, communityData)

    // return response.data
    try {
        const { data } = await axiosInstance.get(ApiUrls.retrieve_communities, communityData)

        // const { data } = await axiosInstance.get(`https://core.proximaai.co/api/community/community/?community_id=1`)

        return data
    } catch (error) {
        throw error
    }
}

const getACommunity = async(communityData) => {

    try {
        const { data } = await axiosInstance.get(ApiUrls.retrieve_communities, communityData);

        // const { data } = await axiosInstance.get(`https://core.proximaai.co/api/community/community/?community_id=10`)


        return data
    } catch (error) {
        throw error
    }
}

const getCommunityIssues = async(communityData) => {
    // const response = await axios.post('/', communityData)

    // return response.data
    try {
        const { data } = await axiosInstance.get(ApiUrls.retrieve_community_issues, {
            community_id: communityData
        })

        return data
    } catch (error) {
        throw error
    }
}

const getIssueThread = async(issueData) => {
    // console.log('thread')
    // console.log(issueData)
    try {
        const { data } = await axiosInstance.get(ApiUrls.retrieve_issue_thread, {
            issue_id: issueData
        })

        // console.log('thread fetched', data)

        return data
    } catch (error) {
        console.log('thread error')
        throw error
    }
}

const getThreadComments = async(threadData) => {
    try {
        const { data } = await axiosInstance.get(ApiUrls.retrieve_thread_comments, {
            thread_id: threadData
        })

        // console.log('comments', data)

        return data
    } catch (error) {
        throw error
    }
}

const raiseIssue = async(issueData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.raise_issue, issueData)

        return data
    } catch (error) {
        throw error
    }
}

const commentOnIssue = async(commentData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.retrieve_thread_comments, commentData)

        return data
    } catch (error) {
        throw error
    }
}

const likeIssueComment = async(commentData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.like_issue_comment, commentData)

        // console.log('comments', data)

        return data
    } catch (error) {
        throw error
    }
}

const likeIssue = async(communityData) => {
    const response = await axiosInstance.post('/', communityData)

    return response.data
}

const retrieveCommunitySurveys = async(communityData) => {
    // console.log('Retrieving Community', communityData)
    try {
        const { data } = await axiosInstance.get(`https://core.proximaai.co/api/survey/survey/?tenant_id=${communityData.tenant_id}&community_id=${communityData.community_id}`)
            // const { data } = await axiosInstance.get(`https://core.proximaai.co/api/survey/survey/?tenant_id=10&community_id=26`)
            // 

        // console.log('surveys data', data)

        return data
    } catch (error) {
        throw error
    }
}

const favoriteCommunities = async(communityData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.favorite_communities, communityData)

        return data
    } catch (error) {
        throw error
    }
}

const toggleFavoriteCommunities = async(communityData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.favorite_communities, communityData)

        return data
    } catch (error) {
        throw error
    }
}

const joinCommunity = async(communityData) => {
    console.log("commdata", communityData);

    try {
        // const { data } = await axiosInstance.post(`https://core.proximaai.co/api/community/joincommunity/?client_id=7&community_id=10`);

        const { data } = await axiosInstance.post(ApiUrls.join_community, communityData)

        // can't join community
        if (data.message) {
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

const leaveCommunity = async(communityData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.leave_community, communityData)

        // can't leave community
        if (data.message) {
            return { error: data.message.error }
        } else return data
    } catch (error) {
        throw error
    }
}

const submitSurveyResponse = async(responseData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.survey_response, responseData)

        if (data.message) {
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

const communityService = {
    getCommunities,
    getACommunity,
    getCommunityIssues,
    getIssueThread,
    getThreadComments,
    raiseIssue,
    commentOnIssue,
    likeIssueComment,
    likeIssue,
    retrieveCommunitySurveys,
    favoriteCommunities,
    toggleFavoriteCommunities,
    joinCommunity,
    leaveCommunity,
    submitSurveyResponse
}

export default communityService