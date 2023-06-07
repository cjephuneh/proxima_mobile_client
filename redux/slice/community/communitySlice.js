import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import communityService from "./communityService";

const initialState = {
    communities: null,
    community: null,
    communityIssues: null,
    raiseIssue: null,
    commentOnIssue: null,
    likeIssue: null,
    userLikeIssueComment: null,
    issuethread: null,
    threadcomments: null,
    communitysurveys: null,

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

    // thread
    isIssueThreadLoading: false,
    isIssueThreadSuccess: false,
    isIssueThreadError: false,
    isIssueThreadMessage: '',

    // thread comments
    isThreadCommentsLoading: false,
    isThreadCommentsSuccess: false,
    isThreadCommentsError: false,
    isThreadCommentsMessage: '',

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

    // community surveys
    isCommunitySurveysLoading: false,
    isCommunitySurveysSuccess: false,
    isCommunitySurveysError: false,
    isCommunitySurveysMessage: false,
}

// retrieve all communities
export const getCommunities = createAsyncThunk('community/getCommunities', async (thunkAPI) => {
    try {
        return await communityService.getCommunities()
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
export const raiseIssue = createAsyncThunk('community/raiseIssue', async (issueData, thunkAPI) => {
    try {
        return await communityService.raiseIssue(issueData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve community issues
export const commentOnIssue = createAsyncThunk('community/commentOnIssue', async (commentData, thunkAPI) => {
    try {
        return await communityService.commentOnIssue(commentData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve issue threads
export const getIssueThread = createAsyncThunk('community/thread', async (issueData, thunkAPI) => {
    try {
        return await communityService.getIssueThread(issueData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve thread comments
export const getThreadComments = createAsyncThunk('community/comments', async (threadData, thunkAPI) => {
    try {
        return await communityService.getThreadComments(threadData)
    } catch (error) {
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
export const likeIssueComment = createAsyncThunk('community/likeIssueComment', async (commentData, thunkAPI) => {
    try {
        return await communityService.likeIssueComment(commentData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve community surveys
export const retrieveCommunitySurveys = createAsyncThunk('community/survey', async (communityData, thunkAPI) => {
    try {
        return await communityService.retrieveCommunitySurveys(communityData)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        resetThreadComments: (state) => {
            state.threadcomments = null
        },
        resetIssueStatus: (state) => {
            state.isRaiseIssueSuccess = false;
            state.isRaiseIssueError = false;
        }
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

            .addCase(getIssueThread.pending, (state) => {
                state.isIssueThreadLoading = true
            })
            .addCase(getIssueThread.fulfilled, (state, action) => {
                state.isIssueThreadLoading = false
                state.isIssueThreadSuccess = true
                state.issuethread = action.payload
            })
            .addCase(getIssueThread.rejected, (state, action) => {
                state.isIssueThreadLoading = false
                state.isIssueThreadError = true
                state.isIssueThreadMessage = action.payload
                state.issuethread = null 
            })

            .addCase(getThreadComments.pending, (state) => {
                state.isThreadCommentsLoading = true
            })
            .addCase(getThreadComments.fulfilled, (state, action) => {
                state.isThreadCommentsLoading = false
                state.isThreadCommentsSuccess = true
                state.threadcomments = action.payload
            })
            .addCase(getThreadComments.rejected, (state, action) => {
                state.isThreadCommentsLoading = false
                state.isThreadCommentsError = true
                state.isThreadCommentsMessage = action.payload
                state.threadcomments = null 
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
                state.userLikeIssueComment = action.payload
            })
            .addCase(likeIssueComment.rejected, (state, action) => {
                state.isLikeIssueCommentLoading = false
                state.isLikeIssueCommentError = true
                state.isLikeIssueCommentMessage = action.payload
                state.userLikeIssueComment = null 
            })

            .addCase(retrieveCommunitySurveys.pending, (state) => {
                state.isCommunitySurveysLoading = true
            })
            .addCase(retrieveCommunitySurveys.fulfilled, (state, action) => {
                state.isCommunitySurveysLoading = false,
                state.isCommunitySurveysSuccess = true,
                state.communitysurveys = action.payload
            })
            .addCase(retrieveCommunitySurveys.rejected, (state, action) => {
                state.isCommunitySurveysLoading = false,
                state.isCommunitySurveysError = true,
                state.isCommunitySurveysMessage = action.payload,
                state.communitysurveys = null
            })
})

export const { resetThreadComments, resetIssueStatus } = communitySlice.actions

export default communitySlice.reducer