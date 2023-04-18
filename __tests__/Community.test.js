import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Community from '../screens/Community';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Community', () => {
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
                <Community />
            </NavigationContainer>
        )

        expect(getByText('Community Rating')).not.toBeNull()
    })

    it('navigates to community issues screen on "View Community Issues" press', () => {
        const { getByText } = render(
            <NavigationContainer>
                <Community />
            </NavigationContainer>
        )
        fireEvent.press(getByText('View Community Issues'))
        expect(navigation.navigate).toHaveBeenCalledWith('issues')
    })
})