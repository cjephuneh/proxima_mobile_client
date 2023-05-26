const BASE_URI = 'http://192.168.1.6:3000/api'

// auth
const REGISTER_ENDPOINT = BASE_URI + '/auth/client'
const LOGIN_ENDPOINT = BASE_URI + '/auth/signin'
const CHAT_ENDPOINT = BASE_URI + '/chat'

export const ApiUrls =  {
    REGISTER_ENDPOINT,
    LOGIN_ENDPOINT,
    retrieve_chats: CHAT_ENDPOINT + '/chat/'
}