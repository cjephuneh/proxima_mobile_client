import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // to hold all the user details
    user: null,

    // to hold registration data
    goal: null,
    email: null,
    authCode: null,
    password: null,
    confirmPassword: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.user = {
                name: 'kim'
            }
        },
        logout: (state) => {
            state.user = null
        },
        setGoal: (state, action) => {
            state.goal = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setAuthCode: (state, action) => {
            state.authCode = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        }
    }
})

export const { login, logout } = authSlice.actions 

export default authSlice.reducer
