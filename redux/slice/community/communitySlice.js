import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import communityService from "./communityService";

const initialState = {
    communities: null,
    community: null,
    communityIssues: null,
    raiseIssue: null,
    commentOnIssue: null,
    likeIssue: null,
    likeIssueComment: null,

    // communities
    isCommunitiesLoading: false,
    isCommunitiesSuccess: false,
    isCommunitiesError: false,
    isCommunitiesMessage: '',

    // community
    isCommunityLoading: false,
    isCommunitySuccess: false,
    isCommunityError: false,
    isCommunityMessage: '',

    // community issues
    isCommunityIssuesLoading: false,
    isCommunityIssuesSuccess: false,
    isCommunityIssuesError: false,
    isCommunityIssuesMessage: '',

    // raise issue
    isRaiseIssueLoading: false,
    isRaiseIssueSuccess: false,
    isRaiseIssueError: false,
    isRaiseIssueMessage: '',

    // comment on an issue
    isCommentOnIssueLoading: false,
    isCommentOnIssueSuccess: false,
    isCommentOnIssueError: false,
    isCommentOnIssueMessage: '',

    // like issue
    isLikeIssueLoading: false,
    isLikeIssueSuccess: false,
    isLikeIssueError: false,
    isLikeIssueMessage: '',

    // like issue comment
    isLikeIssueCommentLoading: false,
    isLikeIssueCommentSuccess: false,
    isLikeIssueCommentError: false,
    isLikeIssueCommentMessage: '',
}

// retrieve all communities
export const getCommunities = createAsyncThunk('community/getCommunities', async (communityData, thunkAPI) => {
    try {
        return await communityService.getCommunities(communityData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve a community
export const getACommunity = createAsyncThunk('community/getACommunity', async (communityData, thunkAPI) => {
    try {
        return await communityService.getACommunity(communityData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve community issues
export const getCommunityIssues = createAsyncThunk('community/getCommunityIssues', async (communityData, thunkAPI) => {
    try {
        return await communityService.getCommunityIssues(communityData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve community issues
export const raiseIssue = createAsyncThunk('community/raiseIssue', async (communityData, thunkAPI) => {
    try {
        return await communityService.raiseIssue(communityData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve community issues
export const commentOnIssue = createAsyncThunk('community/commentOnIssue', async (communityData, thunkAPI) => {
    try {
        return await communityService.commentOnIssue(communityData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// like community issues
export const likeIssue = createAsyncThunk('community/likeIssue', async (communityData, thunkAPI) => {
    try {
        return await communityService.likeIssue(communityData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// like community issues
export const likeIssueComment = createAsyncThunk('community/likeIssueComment', async (communityData, thunkAPI) => {
    try {
        return await communityService.likeIssueComment(communityData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {

    }, 
    extraReducers: (builder) => 
        builder
            .addCase(getCommunities.pending, (state) => {
                state.isCommunitiesLoading = true
            })
            .addCase(getCommunities.fulfilled, (state, action) => {
                state.isCommunitiesLoading = false
                state.isCommunitiesSuccess = true
                state.communities = action.payload
            })
            .addCase(getCommunities.rejected, (state, action) => {
                state.isCommunitiesLoading = false
                state.isCommunitiesError = true
                state.isUserMessage = action.payload
                state.communities = null 
            })

            .addCase(getACommunity.pending, (state) => {
                state.isCommunityLoading = true
            })
            .addCase(getACommunity.fulfilled, (state, action) => {
                state.isCommunityLoading = false
                state.isCommunitySuccess = true
                state.community = action.payload
            })
            .addCase(getACommunity.rejected, (state, action) => {
                state.isCommunityLoading = false
                state.isCommunitiesError = true
                state.isCommunitiesMessage = action.payload
                state.community = null 
            })

            .addCase(getCommunityIssues.pending, (state) => {
                state.isCommunityIssuesLoading = true
            })
            .addCase(getCommunityIssues.fulfilled, (state, action) => {
                state.isCommunityIssuesLoading = false
                state.isCommunityIssuesSuccess = true
                state.communityIssues = action.payload
            })
            .addCase(getCommunityIssues.rejected, (state, action) => {
                state.isCommunityIssuesLoading = false
                state.isCommunityIssuesError = true
                state.isCommunityIssuesMessage = action.payload
                state.community = null 
            })

            .addCase(raiseIssue.pending, (state) => {
                state.isRaiseIssueLoading = true
            })
            .addCase(raiseIssue.fulfilled, (state, action) => {
                state.isRaiseIssueLoading = false
                state.isRaiseIssueSuccess = true
                state.raiseIssue = action.payload
            })
            .addCase(raiseIssue.rejected, (state, action) => {
                state.isRaiseIssueLoading = false
                state.isRaiseIssueError = true
                state.isRaiseIssueMessage = action.payload
                state.raiseIssue = null 
            })

            .addCase(commentOnIssue.pending, (state) => {
                state.isCommentOnIssueLoading = true
            })
            .addCase(commentOnIssue.fulfilled, (state, action) => {
                state.isCommentOnIssueLoading = false
                state.isCommentOnIssueSuccess = true
                state.commentOnIssue = action.payload
            })
            .addCase(commentOnIssue.rejected, (state, action) => {
                state.isCommentOnIssueLoading = false
                state.isCommentOnIssueError = true
                state.isCommentOnIssueMessage = action.payload
                state.commentOnIssue = null 
            })

            .addCase(likeIssue.pending, (state) => {
                state.isLikeIssueLoading = true
            })
            .addCase(likeIssue.fulfilled, (state, action) => {
                state.isLikeIssueLoading = false
                state.isLikeIssueSuccess = true
                state.likeIssue = action.payload
            })
            .addCase(likeIssue.rejected, (state, action) => {
                state.isLikeIssueLoading = false
                state.isLikeIssueError = true
                state.isLikeIssueMessage = action.payload
                state.likeIssue = null 
            })

            .addCase(likeIssueComment.pending, (state) => {
                state.isLikeIssueCommentLoading = true
            })
            .addCase(likeIssueComment.fulfilled, (state, action) => {
                state.isLikeIssueCommentLoading = false
                state.isLikeIssueCommentSuccess = true
                state.likeIssueComment = action.payload
            })
            .addCase(likeIssueComment.rejected, (state, action) => {
                state.isLikeIssueCommentLoading = false
                state.isLikeIssueCommentError = true
                state.isLikeIssueCommentMessage = action.payload
                state.likeIssueComment = null 
            })
})

export default communitySlice.reducer