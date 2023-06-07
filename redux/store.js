import { configureStore } from '@reduxjs/toolkit'
import authReducer, { initializeUser } from './slice/auth/authSlice'
import chatReducer from './slice/chat/chatSlice'
import communityReducer from './slice/community/communitySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        community: communityReducer
    },
})

// retrieve the user info from local storage
store.dispatch(initializeUser());