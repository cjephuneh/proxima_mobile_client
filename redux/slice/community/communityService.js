import axios from "axios";
import { ApiUrls } from "../../../utils/ApiUrls";

const getCommunities = async (communityData) => {
    // const response = await axios.post(ApiUrls.retrieve_communities, communityData)

    // return response.data
    try {
        const { data } = await axios.get(ApiUrls.retrieve_communities)

        // console.log('comm ', data)

        return data
    } catch (error) {
        throw error
    }
}

const getACommunity = async (communityData) => {
    // const response = await axios.post('/', communityData)

    // return response.data
    try {
        const { data } = await axios.get(`${ApiUrls.retrieve_communities}?community_id=${communityData}`)

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

        // console.log('issues ', data)

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

const raiseIssue = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
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

const communityService = {
    getCommunities, getACommunity, getCommunityIssues, getIssueThread, getThreadComments, raiseIssue, commentOnIssue, likeIssueComment, likeIssue, retrieveCommunitySurveys
}

export default communityService