// import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { ApiUrls } from "../../../utils/ApiUrls";


const signinUser = async(userData) => {
    // console.log(userData)
    try {
        const { data } = await axiosInstance.post(ApiUrls.LOGIN_ENDPOINT, userData)


        if (data.token) {
            const storeUserInfo = async() => {
                try {
                    localStorage.setItem('user', JSON.stringify(data));
                    const storedData = JSON.parse(localStorage.getItem('user'));
                    // console.log('Stored User Info:', storedData);
                } catch (error) {
                    // console.log('Error storing the value');
                }
            };


            await storeUserInfo()

            return data

        } else return { error: 'Incorrect credentials' }

    } catch (error) {
        throw error
    }
}


const registerUser = async(userData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.REGISTER_ENDPOINT, userData);

        if (data.token) {
            const storeUserInfo = async() => {
                try {
                    localStorage.setItem('user', JSON.stringify(data));
                } catch (error) {
                    // console.log('Error storing the value');
                }
            };

            await storeUserInfo();

            return data;
        } else {
            if (data.errors.username) {
                return { error: 'Username already taken' }
            }

            if (data.errors.email && !data.errors.username) {
                return { error: 'Email already registered' }
            } else return { error: 'An error occurred. Please try again later' }
        }
    } catch (error) {
        throw error;
    }
};


// Enable any user to change password
const changepassword = async(userData) => {
    const res = await axiosInstance.post('/api/auth/changepassword', userData)

    return res.data
}

// Enable user to say they forgot their password
const forgotpassword = async(userData) => {
    // const res = await axios.post('/api/auth/forgotpassword', userData)

    // return res.data
    try {
        const { data } = await axiosInstance.post(ApiUrls.FORGOTPASS_ENDPOINT, userData)

        if (data.message) {
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

// Activate a user after they have signed up
const activate_user = async(userData) => {
    const res = await axiosInstance.post('/api/auth/activate_user', userData)

    return res.data
}

// Resend invitation link to user incase they did not get one
const resendactivationlink = async(userData) => {
    const res = await axiosInstance.post('/api/auth/resendactivationlink', userData)

    return res.data
}

// Enable a useer to reset their password
const reset_password = async(userData) => {
    const res = await axiosInstance.post('/api/auth/reset_password', userData)

    return res.data
}



const sendAuthCode = async(userEmail) => {
    const response = await axiosInstance.post('/', userEmail)

    return response.data
}

const verifyAuthCode = async(userEmail) => {
    const response = await axiosInstance.post('/', userEmail)

    return response.data
}

const authService = {
    signinUser,
    registerUser,
    sendAuthCode,
    verifyAuthCode,
    changepassword,
    forgotpassword,
    activate_user,
    resendactivationlink,
    reset_password
}

export default authService