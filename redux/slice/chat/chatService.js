import axios from "axios";
import { ApiUrls } from "../../../utils/ApiUrls";

const sendMessage = async () => {
    const response = await axios.post('/', messageData)

    return response.data
}

const retrieveMessages = async () => {
    const { data } = await axios.post('/', messagesData)

    if(data){
        return data
    } else {
        return Promise.reject(data.errors)
    }
}

const retrieveChats = async (userData) => {
    const response = await axios.get(`${ApiUrls.retrieve_chats}?chat_owner=${userData.client_id}`)

    return response.data
}

const chatService = {
    sendMessage, retrieveChats, retrieveMessages
}

export default chatService;