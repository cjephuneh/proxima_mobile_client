import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    // to hold all the user details
    user: null,
    authCode: null,
    verifyAuthCode: null,

    // user
    isUserLoading: false,
    isUserSuccess: false,
    isUserError: false,
    isUserMessage: '', 
    
    // auth code
    isAuthCodeLoading: false,
    isAuthCodeSuccess: false,
    isAuthCodeError: false,
    isAuthCodeMessage: '',
    
    // verify auth code
    isVerifyCodeLoading: false,
    isVerifyCodeSuccess: false,
    isVerifyCodeError: false,
    isVerifyCodeMessage: '',

    // to hold registration data
    goal: null,
    email: null,
    authCode: null,
    password: null,
    confirmPassword: null,
    username: null,
    firstName: null,
    lastName: null,
    gender: null,
    dateOfBirth: null,
    phoneNumber: null
}

// allow all users to sign in
export const signin = createAsyncThunk('auth/signin', async (loginData, thunkAPI) => {
    try {
        return await authService.signinUser(loginData)
        // console.log(user)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// generate auth code
export const generateAuthCode = createAsyncThunk('auth/code', async (userEmail, thunkAPI) => {
    try {
        return await authService.genarateAuthCode(userEmail)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// generate auth code
export const verifyAuthCode = createAsyncThunk('auth/verifycode', async (userEmail, thunkAPI) => {
    try {
        return await authService.verifyAuthCode(userEmail)
    } catch(error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// allow users to register
export const register = createAsyncThunk('auth/register', async (registerData, thunkAPI) => {
    try {
                console.log(registerData)

        return await authService.registerUser(registerData)
    } catch(error) {
        console.error(error)
        const message = error
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // NOTE: FOR TESTING PURPOSES ONLY. TO BE REMOVED!!!!!!!!
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
        setUserEmail: (state, action) => {
            state.email = action.payload
        },
        setAuthCode: (state, action) => {
            state.authCode = action.payload
        },
        setUserPassword: (state, action) => {
            state.password = action.payload
        },
        setUserConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },
        setUserProfile: (state, action) => {
            state.name = action.payload.name
            state.username = action.payload.username,
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName,
            state.gender = action.payload.gender,
            state.dateOfBirth = action.payload.dateOfBirth,
            state.phoneNumber = action.payload.phoneNumber
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(signin.pending, (state) => {
                state.isUserLoading = true
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isUserLoading = false
                state.isUserSuccess = true
                state.user = action.payload
            })
            .addCase(signin.rejected, (state, action) => {
                state.isUserLoading = false
                state.isUserError = true
                state.isUserMessage = action.payload
                state.user = null 
            })

            .addCase(register.pending, (state) => {
                state.isUserLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isUserLoading = false
                state.isUserSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isUserLoading = false
                state.isUserError = true
                state.isUserMessage = action.payload
                state.user = null 
            })

            .addCase(generateAuthCode.pending, (state) => {
                state.isAuthCodeLoading = true
            })
            .addCase(generateAuthCode.fulfilled, (state, action) => {
                state.isAuthCodeLoading = false
                state.isAuthCodeSuccess = true
                state.authCode = action.payload
            })
            .addCase(generateAuthCode.rejected, (state, action) => {
                state.isAuthCodeLoading = false
                state.isAuthCodeError = true
                state.isAuthCodeMessage = action.payload
                state.authCode = null 
            })

            .addCase(verifyAuthCode.pending, (state) => {
                state.isVerifyCodeLoading = true
            })
            .addCase(verifyAuthCode.fulfilled, (state, action) => {
                state.isVerifyCodeLoading = false
                state.isVerifyCodeSuccess = true
                state.user = action.payload
            })
            .addCase(verifyAuthCode.rejected, (state, action) => {
                state.isVerifyCodeLoading = false
                state.isVerifyCodeError = true
                state.isVerifyCodeMessage = action.payload
                state.verifyAuthCode = null 
            })
})

export const { login, logout, setGoal, setUserEmail, setAuthCode, setUserPassword, setUserConfirmPassword, setUserProfile } = authSlice.actions 

export default authSlice.reducer
