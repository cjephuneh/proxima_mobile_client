import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Chat from '../screens/Chat';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Chat', () => {
    const navigation = {
        navigate: jest.fn()
    }

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation)
    })

    it('displays messages', () => {
        const { getByText } = render(
            <NavigationContainer>
                <Chat />
            </NavigationContainer>
        )

        expect(getByText('Hi Mandy')).not.toBeNull()
        expect(getByText('I have tried the app')).not.toBeNull()
    })

    it('goes back to Inbox on press of close button', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Chat />
            </NavigationContainer>
        )

        fireEvent.press(getByTestId('close-button'))
        expect(navigation.navigate).toHaveBeenCalledWith('inbox')
    })

    it('adds a new message', () => {
        const { getByText, getByTestId } = render(
            <NavigationContainer>
                <Chat />
            </NavigationContainer>
        )

        fireEvent.changeText(getByTestId('message-input'), 'New message')
        fireEvent.press(getByTestId('send-btn'))
        
        expect(getByText('New message')).not.toBeNull()
    })

    it('send button should be disabled when input is empty', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Chat />
            </NavigationContainer>
        )

        fireEvent.changeText(getByTestId('message-input'), '')
                
        expect(getByTestId('send-btn').props.accessibilityState.disabled).toBe(true)
        
    })

    it('send button should not be disabled when input is not empty', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Chat />
            </NavigationContainer>
        )

        fireEvent.changeText(getByTestId('message-input'), 'New message')
                
        expect(getByTestId('send-btn').props.accessibilityState.disabled).toBe(false)
        
    })
})