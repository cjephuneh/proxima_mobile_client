import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Get the Bearer token from Redux state or localStorage
// const getBearerToken = () => {
//     const user = JSON.parse(AsyncStorage.getItem('user'));
//     if (user && user.token) {

//         console.log(user)
//         return user.token;
//     }
//     return null;
// };
const getBearerToken = async() => {
    try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            const userObject = JSON.parse(user);
            if (userObject.token) {
                console.log(userObject);
                return userObject.token;
            }
        }
        return null;
    } catch (error) {
        console.error('Error retrieving user token:', error);
        return null;
    }
};

// Create a new Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: 'https://core.proximaai.co/api',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZXhwIjoxNjk2NTk2OTc1fQ.FmhrbnX6mmQj1IvI5gXY6h4e2ROMaE6q0P4NY-dFfG4'
    },
});

// Add an interceptor to modify the request before it is sent
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = getBearerToken();
//         if (token) {
//             config.headers['Authorization'] = `Token ${token}`;
//             console.log(token)
//         }
//         console.log('Request Headers:', config.headers); // Add this line for debugging
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;