import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SetProfile } from '../../screens/Multistep';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('SetProfile', () => {
    const navigation = {
        navigate: jest.fn(),
        replace: jest.fn()
    }

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation)
    })

    it('renders correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <SetProfile />
                </NavigationContainer>
            </Provider>
        )

        expect(getByText('Finish setting up your profile')).not.toBeNull()
    })

    it('shows an error message when Continue is clicked without provideing the name', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <SetProfile />
                </NavigationContainer>
            </Provider>
        )

        fireEvent.press(getByText('Continue'))
        expect(getByTestId('name-val-text')).toBeTruthy()
        expect(getByTestId('name-val-text').props.children).toBe('Your name is required')
    })

    it('dispatches "setUserProfile" with payload "{name: "Kim", bio: null}" when the name is filled out and bio left blank and navigates to Home', () => {
        const mockDispatch = jest.fn()
        store.dispatch = mockDispatch

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <SetProfile />
                </NavigationContainer>
            </Provider>
        )

        // enter name in input field
        fireEvent.changeText(getByTestId('name-input'), 'Kim')

        fireEvent.press(getByText('Continue'))

        expect(mockDispatch).toHaveBeenCalledWith({
            "payload": {
                "bio": null,
                "name": "Kim",
            },
            "type": "auth/setUserProfile"
        })
        expect(navigation.replace).toHaveBeenCalledWith('drawer')
    })

    it('dispatches "setUserProfile" with payload "{name: "Kim", bio: "My Bio"}" when the all the fields are filled out and navigates to Home', () => {
        const mockDispatch = jest.fn()
        store.dispatch = mockDispatch

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <SetProfile />
                </NavigationContainer>
            </Provider>
        )

        // enter name in input field
        fireEvent.changeText(getByTestId('name-input'), 'Kim')

        // enter bio in input field
        fireEvent.changeText(getByTestId('bio-input'), 'My bio')

        fireEvent.press(getByText('Continue'))

        expect(mockDispatch).toHaveBeenCalledWith({
            "payload": {
                "bio": "My bio",
                "name": "Kim",
            },
            "type": "auth/setUserProfile"
        })
        expect(navigation.replace).toHaveBeenCalledWith('drawer')
    })
})