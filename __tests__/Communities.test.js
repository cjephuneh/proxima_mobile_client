import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Communities from '../screens/Communities';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Communities', () => {
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
                <Communities />
            </NavigationContainer>
        )

        expect(getByText('Find a community')).not.toBeNull()
    })

    it('updates "searchWord" on text change', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <Communities />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Search Communities'), 'Delmonte')
        expect(getByPlaceholderText('Search Communities').props.value).toBe('Delmonte')
    })

    it('filters communities correctly', () => {
        const { getByPlaceholderText, getByText, queryByText } = render(
            <NavigationContainer>
                <Communities />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Search Communities'), 'Delmonte')
        expect(getByText('Delmonte')).not.toBeNull()
        expect(queryByText('Safaricom PLC')).toBeNull()
    })

    it('opens the drawer on profile picture press', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Communities />
            </NavigationContainer>
        )

        fireEvent.press(getByTestId('profile-pic'))
        expect(navigation.openDrawer).toBeCalled()
    })

    it('navigates to company screen on any community press', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <Communities />
            </NavigationContainer>
        )

        const communityBtns = getAllByTestId('community-btn')

        communityBtns.forEach(btn => {
            fireEvent.press(btn)

            expect(navigation.navigate).toBeCalledWith('community')
        })
    })
})