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

const waitForLocalStorage = () =>
    new Promise((resolve) => {
        const checkLocalStorage = () => {
            if (typeof localStorage !== 'undefined') {
                resolve();
            } else {
                setTimeout(checkLocalStorage, 100);
            }
        };
        checkLocalStorage();
    });

// Dispatch the initializeUser action after creating the store and localStorage is available
waitForLocalStorage().then(() => {
    store.dispatch(initializeUser());
});