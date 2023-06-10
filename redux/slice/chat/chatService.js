import axios from "axios";
import { ApiUrls } from "../../../utils/ApiUrls";

const sendMessage = async (messageData) => {
    try {
        const { data } = await axios.post(ApiUrls.retrieve_messages, messageData)

        return data
    } catch (error) {
        throw error
    }
}

const retrieveMessages = async (messagesData) => {
    try {
        const { data } = await axios.post(ApiUrls.retrieve_messages, messagesData)
        return data
    } catch (error) {
        throw error
    }
}

const retrieveChats = async (chatData) => {
    try {
        const { data } = await axios.post(ApiUrls.retrieve_chats, chatData)

        if(data.message){
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

const createChat = async (chatData) => {
    try {
        const { data } = await axios.post(ApiUrls.retrieve_chats, chatData)

        if(data.message){
            return { error: data.message.error }
        }
        
        return data
    } catch (error) {
        throw error
    }
}

const chatService = {
    sendMessage, retrieveChats, retrieveMessages, createChat
}

export default chatService;