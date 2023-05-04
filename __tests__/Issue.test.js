import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Issue from '../screens/Issue';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Issue', () => {
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
                <Issue />
            </NavigationContainer>
        )

        expect(getByText("Issue with last week's milk")).not.toBeNull()
    })

    it('displays 3 community members images', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <Issue />
            </NavigationContainer>
        )

        expect(getAllByTestId('top-3-member-images').length).toBe(3)
    })

    it('reply section scrollview scrollbar is not displayed', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Issue />
            </NavigationContainer>
        )
        

        expect(getByTestId('reply-section').props.showsVerticalScrollIndicator).toBeFalsy()
    })

    it('comment input is editable', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Issue />
            </NavigationContainer>
        )
        
        fireEvent.changeText(getByTestId('comment-input'), 'This is my comment')
        expect(getByTestId('comment-input').props.value).toBe('This is my comment')
    })

    it('send button is disabled when input is empty', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Issue />
            </NavigationContainer>
        )
        
        fireEvent.changeText(getByTestId('comment-input'), '')
        expect(getByTestId('send-btn').props.accessibilityState.disabled).toBe(true)
    })
})