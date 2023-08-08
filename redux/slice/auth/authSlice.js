import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


// Async thunk for initializing the user value
export const initializeUser = createAsyncThunk('auth/initializeUser', async() => {
    try {
        const value = localStorage.getItem('user');
        return value !== null ? JSON.parse(value) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
});



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

    // change password
    isChangePasswordError: false,
    isChangePasswordSuccess: false,
    isChangePasswordLoading: false,
    isChangePasswordMessage: '',

    // forgot password
    isForgotPasswordError: false,
    isForgotPasswordSuccess: false,
    isForgotPasswordLoading: false,
    isForgotPasswordMessage: '',

    // activate user
    isActivateUserError: false,
    isActivateUserSuccess: false,
    isActivateUserLoading: false,
    isActivateUserMessage: '',

    // resend activation link
    isResendActivationLinkError: false,
    isResendActivationLinkSuccess: false,
    isResendActivationLinkLoading: false,
    isResendActivationLinkMessage: '',

    // reset password
    isResetPasswordError: false,
    isResetPasswordSuccess: false,
    isResetPasswordLoading: false,
    isResetPasswordMessage: '',

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
export const signin = createAsyncThunk('auth/signin', async(loginData, thunkAPI) => {
    try {
        const response = await authService.signinUser(loginData);
        console.log('Signin Success:', response);

        if (response.error) {
            console.log('Signin Error:', response.error);
            return thunkAPI.rejectWithValue(response.error);
        }

        return response;
    } catch (error) {
        console.log('Signin Error:', error);
        const message = error.message;
        // Handle other errors as needed
        // ...
        return thunkAPI.rejectWithValue(message);
    }
});


// generate auth code
export const generateAuthCode = createAsyncThunk('auth/code', async(userEmail, thunkAPI) => {
    try {
        return await authService.genarateAuthCode(userEmail)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// generate auth code
export const verifyAuthCode = createAsyncThunk('auth/verifycode', async(userEmail, thunkAPI) => {
    try {
        return await authService.verifyAuthCode(userEmail)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// allow users to register
export const register = createAsyncThunk('auth/register', async(registerData, thunkAPI) => {
    try {
        const response = await authService.registerUser(registerData)

        if (response.error) {
            return thunkAPI.rejectWithValue(response.error)
        }

        return response
    } catch (error) {
        console.error(error);
        const message = error.message;
        // Handle other errors as needed
        // ...
        return thunkAPI.rejectWithValue(message);
    }
})


// Enable any user to change password
export const changepassword = createAsyncThunk('auth/changepassword', async(user, thunkAPI) => {
    try {
        return await authService.changepassword(user)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Enable any user to change password
export const user_forgotpassword = createAsyncThunk('auth/forgotpassword', async(user, thunkAPI) => {
    try {
        const response = await authService.forgotpassword(user)

        if (response.error) {
            return thunkAPI.rejectWithValue(response.error)
        }

        return response
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Activate a user after they have signed up
export const activate_user = createAsyncThunk('auth/activate_user', async(user, thunkAPI) => {
    try {
        return await authService.activate_user(user)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Resend invitation link to user incase they did not get one
export const resendactivationlink = createAsyncThunk('auth/resendactivationlink', async(user, thunkAPI) => {
    try {
        return await authService.resendactivationlink(user)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Resend invitation link to user incase they did not get one
export const reset_password = createAsyncThunk('auth/reset_password', async(user, thunkAPI) => {
    try {
        return await authService.reset_password(user)
    } catch (error) {
        console.error(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
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
        },
        // reset the state of error value
        reset: (state) => {
            state.isUserMessage = ''
        }
    },
    extraReducers: (builder) =>
        builder
        // handle user retrieval
        .addCase(initializeUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })

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

        .addCase(changepassword.pending, (state) => {
            state.isChangePasswordLoading = true
        })
        .addCase(changepassword.fulfilled, (state, action) => {
            state.isChangePasswordLoading = false
            state.isChangePasswordSuccess = true
            state.changepassword = action.payload
        })
        .addCase(changepassword.rejected, (state, action) => {
            state.isChangePasswordLoading = false
            state.isChangePasswordError = true
            state.isChangePasswordMessage = action.payload
            state.changepassword = null
        })

        .addCase(user_forgotpassword.pending, (state) => {
            state.isForgotPasswordLoading = true
        })
        .addCase(user_forgotpassword.fulfilled, (state, action) => {
            state.isForgotPasswordLoading = false
            state.isForgotPasswordSuccess = true
            state.forgotpassword = action.payload
        })
        .addCase(user_forgotpassword.rejected, (state, action) => {
            state.isForgotPasswordLoading = false
            state.isForgotPasswordError = true
            state.isForgotPasswordMessage = action.payload
            state.forgotpassword = null
        })

        .addCase(activate_user.pending, (state) => {
            state.isActivateUserLoading = true
        })
        .addCase(activate_user.fulfilled, (state, action) => {
            state.isActivateUserLoading = false
            state.isActivateUserSuccess = true
            state.activate_user = action.payload
        })
        .addCase(activate_user.rejected, (state, action) => {
            state.isActivateUserLoading = false
            state.isActivateUserError = true
            state.isActivateUserMessage = action.payload
            state.activate_user = null
        })

        .addCase(resendactivationlink.pending, (state) => {
            state.isResendActivationLinkLoading = true
        })
        .addCase(resendactivationlink.fulfilled, (state, action) => {
            state.isResendActivationLinkLoading = false
            state.isResendActivationLinkSuccess = true
            state.resendactivationlink = action.payload
        })
        .addCase(resendactivationlink.rejected, (state, action) => {
            state.isResendActivationLinkLoading = false
            state.isResendActivationLinkError = true
            state.isResendActivationLinkMessage = action.payload
            state.resendactivationlink = null
        })

        .addCase(reset_password.pending, (state) => {
            state.isResendActivationLinkLoading = true
        })
        .addCase(reset_password.fulfilled, (state, action) => {
            state.isResendActivationLinkLoading = false
            state.isResendActivationLinkSuccess = true
            state.resendactivationlink = action.payload
        })
        .addCase(reset_password.rejected, (state, action) => {
            state.isResendActivationLinkLoading = false
            state.isResendActivationLinkError = true
            state.isResendActivationLinkMessage = action.payload
            state.resendactivationlink = null
        })
})

export const { login, logout, setGoal, setUserEmail, setAuthCode, setUserPassword, setUserConfirmPassword, setUserProfile, reset } = authSlice.actions

export default authSlice.reducer