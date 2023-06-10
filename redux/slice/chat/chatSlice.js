import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
    chats: null,
    chatMessage: null,
    chatMessages: null,
    chat: null,

    // chats
    isChatsLoading: false,
    isChatsSuccess: false,
    isChatsError: false,
    isChatsMessage: '',

    // chat
    isChatLoading: false,
    isChatSuccess: false,
    isChatError: false,
    isChatMessage: '',

    // chat message
    isChatMessageLoading: false,
    isChatMessageSuccess: false,
    isChatMessageError: false,
    isChatMessage: '',

    // chat messages
    isChatMessagesLoading: false,
    isChatMessagesSuccess: false,
    isChatMessagesError: false,
    isChatMessagesMessage: '',
}

// retrieveChats
export const retrieveChats = createAsyncThunk('chat/retrieveChats', async (chatData, thunkAPI) => {
    try {
        const response = await chatService.retrieveChats(chatData)

        if(response.error){
            thunkAPI.rejectWithValue(response.error)
            return
        }

        return response
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// create chat
export const createChat = createAsyncThunk('chat/createChat', async (chatData, thunkAPI) => {
    try {
        const response = await chatService.createChat(chatData)

        if(response.error){
            thunkAPI.rejectWithValue(response.error)
            return
        }

        return response
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// retrieve messages
export const retrieveMessages = createAsyncThunk('chat/retrieveMessages', async (messagesData, thunkAPI) => {
    try {
        return await chatService.retrieveMessages(messagesData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// send a message
export const sendMessage = createAsyncThunk('chat/sendMessage', async (messageData, thunkAPI) => {
    try {
        return await chatService.sendMessage(messageData)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        resetChatState: (state) => {
            state.isChatLoading = false
            state.isChatMessage = ''
            state.isChatError = false
            state.isChatSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(retrieveChats.pending, (state) => {
                state.isChatsLoading = true
            })
            .addCase(retrieveChats.fulfilled, (state, action) => {
                state.isChatsLoading = false
                state.isChatsSuccess = true
                state.chats = action.payload
            })
            .addCase(retrieveChats.rejected, (state, action) => {
                state.isChatsLoading = false
                state.isChatsError = true
                state.isChatsMessage = action.payload
                state.chats = null 
            })

            .addCase(createChat.pending, (state) => {
                state.isChatLoading = true
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.isChatLoading = false
                state.isChatSuccess = true
                state.chat = action.payload
            })
            .addCase(createChat.rejected, (state, action) => {
                state.isChatLoading = false
                state.isChatError = true
                state.isChatMessage = action.payload
                state.chat = null 
            })

            .addCase(retrieveMessages.pending, (state) => {
                state.isChatMessagesLoading = true
            })
            .addCase(retrieveMessages.fulfilled, (state, action) => {
                state.isChatMessagesLoading = false
                state.isChatMessagesSuccess = true
                state.chatMessages = action.payload
            })
            .addCase(retrieveMessages.rejected, (state, action) => {
                state.isChatMessagesLoading = false
                state.isChatMessagesError = true
                state.isChatMessagesMessage = action.payload
                state.chatMessages = null 
            })

            .addCase(sendMessage.pending, (state) => {
                state.isChatMessageLoading = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isChatMessageLoading = false
                state.isChatMessageSuccess = true
                state.chatMessage = action.payload
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isChatMessageLoading = false
                state.isChatMessageError = true
                state.isChatMessageMessage = action.payload
                state.chatMessage = null 
            })
    }
})

export const { resetChatState } = chatSlice.actions

export default chatSlice.reducer
