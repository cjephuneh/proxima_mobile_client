// import axios from "axios";
import { ApiUrls } from "../../../utils/ApiUrls";
import axiosInstance from "../../../utils/axiosInstance";

const sendMessage = async(messageData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.retrieve_messages, messageData)

        return data
    } catch (error) {
        throw error
    }
}

const retrieveMessages = async(messagesData) => {
    try {
        // const { data } = await axiosInstance.get(ApiUrls.retrieve_messages, messagesData)
        const { data } = await axiosInstance.get(`https://core.proximaai.co/api/chat/message/?chat_id=${messagesData.chat_id}`)
        return data
    } catch (error) {
        throw error
    }
}

const retrieveChats = async(chatData) => {
    try {
        const { data } = await axiosInstance.get(`https://core.proximaai.co/api/chat/chat/?client_id=${chatData.client_id}`)

        if (data.message) {
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

const createChat = async(chatData) => {
    try {
        const { data } = await axiosInstance.post(ApiUrls.retrieve_chats, chatData)

        if (data.message) {
            return { error: data.message.error }
        }

        return data
    } catch (error) {
        throw error
    }
}

const chatService = {
    sendMessage,
    retrieveChats,
    retrieveMessages,
    createChat
}

export default chatService;