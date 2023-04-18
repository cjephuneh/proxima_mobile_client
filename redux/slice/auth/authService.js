import axios from "axios";

const signinUser = async (userData) => {
    const response = await axios.post('/', userData)

    return response.data
}

const registerUser = async (userData) => {
    const response = await axios.post('/', userData)

    return response.data
}

const sendAuthCode = async (userEmail) => {
    const response = await axios.post('/', userEmail)

    return response.data
}

const verifyAuthCode = async (userEmail) => {
    const response = await axios.post('/', userEmail)

    return response.data
}

const authService = {
    signinUser, 
    registerUser,
    sendAuthCode,
    verifyAuthCode
}

export default authService