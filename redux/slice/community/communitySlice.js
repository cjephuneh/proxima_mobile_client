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
    favoritecommunities: null,
    joincommunity: null,
    leavecommunity: null,
    addtofavorites: null,
    surveyresponse: null,

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

    // favorite communities
    isFavoriteCommunitiesLoading: false,
    isFavoriteCommunitiesSuccess: false,
    isFavoriteCommunitiesError: false,
    isFavoriteCommunitiesMessage: '',

    // join community
    isJoinCommunityLoading: false,
    isJoinCommunitySuccess: false,
    isJoinCommunityError: false,
    isJoinCommunityMessage: '',

    // leave community
    isLeaveCommunityLoading: false,
    isLeaveCommunitySuccess: false,
    isLeaveCommunityError: false,
    isLeaveCommunityMessage: '',

    // add or remove from favs
    isAddToFavsLoading: false,
    isAddToFavsSuccess: false,
    isAddToFavsError: true,
    isAddToFavsMessage: '',

    // survy response
    isSurveyResponseLoading: false,
    isSurveyResponseSuccess: false,
    isSurveyResponseError: false,
    isSurveyResponseMessage: '',


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

// favorite communities
export const retrieveFavoriteCommunities = createAsyncThunk('community/favorites', async (communityData, thunkAPI) => {
    try {
        return await communityService.favoriteCommunities(communityData)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// join community
export const clientJoinCommunity = createAsyncThunk('/community/joincommunity', async (communityData, thunkAPI) => {
    try {
        const response = await communityService.joinCommunity(communityData)

        if(response.error){
            return thunkAPI.rejectWithValue(response.error)
        }

        return response
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// leave community
export const clientLeaveCommunity = createAsyncThunk('/community/leavecommunity', async (communityData, thunkAPI) => {
    try {
        const response = await communityService.leaveCommunity(communityData)

        if(response.error){
            return thunkAPI.rejectWithValue(response.error)
        }

        return response
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// add or remove from favs
export const addOrRemoveFromFavs = createAsyncThunk('community/favs', async (communityData, thunkAPI) => {
    try {
        return await communityService.toggleFavoriteCommunities(communityData)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// save survey response
export const saveSurveyResponse = createAsyncThunk('community/response', async (responseData, thunkAPI) => {
    try {
        const response = await communityService.submitSurveyResponse(responseData)

        if(response.error){
            return thunkAPI.rejectWithValue(response.error)
        }

        return response
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
        resetThreadState: (state) => {
            // state.isIssueThreadLoading = false
            state.isIssueThreadSuccess = false
            state.isIssueThreadError = false
            state.isIssueThreadMessage = ''
        },
        resetThreadCommentsState: (state) => {
            state.isThreadCommentsError = false
            // state.isThreadCommentsLoading = false
            state.isThreadCommentsSuccess = false 
            state.isThreadCommentsMessage = ''
        },
        resetIssueStatus: (state) => {
            state.isRaiseIssueSuccess = false;
            state.isRaiseIssueError = false;
        },
        resetJoinCommunityState: (state) => {
            state.isJoinCommunityLoading = false,
            state.isJoinCommunityError = false,
            state.isJoinCommunityMessage = ''
            state.isJoinCommunitySuccess = false
        },
        resetLeaveCommunityState: (state) => {
            state.isLeaveCommunityLoading = false,
            state.isLeaveCommunityError = false,
            state.isLeaveCommunityMessage = ''
            state.isLeaveCommunitySuccess = false
        },
        resetAddOrRemoveFromFavs: (state) => {
            state.isAddToFavsLoading = false,
            state.isAddToFavsError = false,
            state.isAddToFavsMessage = ''
            state.isAddToFavsSuccess = false
        },
        resetSurveyResponseState: (state) => {
            state.isSurveyResponseError = false,
            state.isSurveyResponseSuccess = false,
            state.isSurveyResponseMessage = ''
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

            .addCase(retrieveFavoriteCommunities.pending, (state) => {
                state.isFavoriteCommunitiesLoading = true
            })
            .addCase(retrieveFavoriteCommunities.fulfilled, (state, action) => {
                state.isFavoriteCommunitiesLoading = false,
                state.isFavoriteCommunitiesSuccess = true,
                state.favoritecommunities = action.payload
            })
            .addCase(retrieveFavoriteCommunities.rejected, (state, action) => {
                state.isFavoriteCommunitiesLoading = false,
                state.isFavoriteCommunitiesError = true,
                state.isFavoriteCommunitiesMessage = action.payload,
                state.favoritecommunities = null
            })

            .addCase(clientJoinCommunity.pending, (state) => {
                state.isJoinCommunityLoading = true
            })
            .addCase(clientJoinCommunity.fulfilled, (state, action) => {
                state.isJoinCommunityLoading = false,
                state.isJoinCommunitySuccess = true,
                state.joincommunity = action.payload
            })
            .addCase(clientJoinCommunity.rejected, (state, action) => {
                state.isJoinCommunityLoading = false,
                state.isJoinCommunityError = true,
                state.isJoinCommunityMessage = action.payload,
                state.joincommunity = null
            })

            .addCase(clientLeaveCommunity.pending, (state) => {
                state.isLeaveCommunityLoading = true
            })
            .addCase(clientLeaveCommunity.fulfilled, (state, action) => {
                state.isLeaveCommunityLoading = false,
                state.isLeaveCommunitySuccess = true,
                state.leavecommunity = action.payload
            })
            .addCase(clientLeaveCommunity.rejected, (state, action) => {
                state.isLeaveCommunityLoading = false,
                state.isLeaveCommunityError = true,
                state.isLeaveCommunityMessage = action.payload,
                state.leavecommunity = null
            })

            .addCase(addOrRemoveFromFavs.pending, (state) => {
                state.isAddToFavsLoading = true
            })
            .addCase(addOrRemoveFromFavs.fulfilled, (state, action) => {
                state.isAddToFavsLoading = false,
                state.isAddToFavsSuccess = true,
                state.addtofavorites = action.payload
            })
            .addCase(addOrRemoveFromFavs.rejected, (state, action) => {
                state.isAddToFavsLoading = false,
                state.isAddToFavsError = true,
                state.isAddToFavsMessage = action.payload,
                state.addtofavorites = null
            })

            .addCase(saveSurveyResponse.pending, (state) => {
                state.isSurveyResponseLoading = true
            })
            .addCase(saveSurveyResponse.fulfilled, (state, action) => {
                state.isSurveyResponseLoading = false,
                state.isSurveyResponseSuccess = true,
                state.surveyresponse = action.payload
            })
            .addCase(saveSurveyResponse.rejected, (state, action) => {
                state.isSurveyResponseLoading = false,
                state.isSurveyResponseError = true,
                state.isSurveyResponseMessage = action.payload,
                state.surveyresponse = null
            })
})

export const { resetThreadState, resetThreadCommentsState, resetIssueStatus, resetJoinCommunityState, resetLeaveCommunityState, resetAddOrRemoveFromFavs, resetSurveyResponseState } = communitySlice.actions

export default communitySlice.reducer