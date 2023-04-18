import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth/authSlice'
import chatReducer from './slice/chat/chatSlice'
import communityReducer from './slice/community/communitySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        community: communityReducer
    },
})