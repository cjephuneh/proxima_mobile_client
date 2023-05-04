import axios from "axios";

const getCommunities = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const getACommunity = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const getCommunityIssues = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const raiseIssue = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const commentOnIssue = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const likeIssueComment = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const likeIssue = async (communityData) => {
    const response = await axios.post('/', communityData)

    return response.data
}

const communityService = {
    getCommunities, getACommunity, getCommunityIssues, raiseIssue, commentOnIssue, likeIssueComment, likeIssue
}

export default communityService