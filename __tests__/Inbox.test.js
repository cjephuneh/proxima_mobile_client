import React from "react";
import { render, fireEvent } from '@testing-library/react-native'
import Inbox from "../screens/Inbox";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Inbox', () => {
    const navigation = {
        navigate: jest.fn(),
        openDrawer: jest.fn()
    }

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation)
    })

    it('renders correctly', () => {
        const { getByText } = render(
            <NavigationContainer>
                <Inbox />
            </NavigationContainer>
        )

        expect(getByText('Inbox')).not.toBeNull()
    })

    it('opens drawer on profile picture click', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Inbox />
            </NavigationContainer>
        )

        fireEvent.press(getByTestId('profile-pic'))
        expect(navigation.openDrawer).toBeCalled()
    })

    it('updates "searchChat" on input change', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <Inbox />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Search chats'), 'John Smith')
        expect(getByPlaceholderText('Search chats').props.value).toBe('John Smith')
    })

    it('filters chats correctly', () => {
        const { getByPlaceholderText, queryAllByText } = render(
            <NavigationContainer>
                <Inbox />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Search chats'), 'John Smith')
        expect(queryAllByText('John Smith')).not.toBeNull()
        expect(queryAllByText('Jane Doe').length).toBe(0)
    })

    it('counts the number of unread chats correctly', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Inbox />
            </NavigationContainer>
        ) 

        const noOfUnreadChats = getByTestId('unread-chats-count').props.children
        expect(getByTestId('unread-chats').props.children.length).toBe(noOfUnreadChats)
    })

    it('navigates to the Chat screen when any chat is pressed', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <Inbox />
            </NavigationContainer>
        )
        
        const openChatBtns = getAllByTestId('open-chat')

        openChatBtns.forEach(btn => {
            fireEvent.press(btn)

            expect(navigation.navigate).toHaveBeenCalledWith('chat')
        })

    })
})