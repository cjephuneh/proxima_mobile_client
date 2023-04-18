import axios from "axios";

const sendMessage = async () => {
    const response = await axios.post('/', messageData)

    return response.data
}

const retrieveMessages = async () => {
    const response = await axios.post('/', messagesData)

    return response.data
}

const retrieveChats = async () => {
    const response = await axios.post('/', chatsData)

    return response.data
}

const chatService = {
    sendMessage, retrieveChats, retrieveMessages
}

export default chatService;