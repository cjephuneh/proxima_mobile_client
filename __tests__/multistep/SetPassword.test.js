import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SetPassword } from '../../screens/Multistep';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('SetPassword', () => {
    const navigation = {
        navigate: jest.fn()
    }

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation)
    })

    it('renders correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <SetPassword />
                </NavigationContainer>
            </Provider>
        )
        expect(getByText('Set a password')).not.toBeNull()
    })

    it('shows the error message when the "Continue" button is clicked without filling out the password', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <SetPassword />
                </NavigationContainer>
            </Provider>
        )
        fireEvent.press(getByText('Continue'))
        expect(getByTestId('password-validation')).toBeTruthy()
        expect(getByTestId('password-validation').props.children).toBe('Password is required')
    })

    it('dispatches "setUserPassword" with payload "1234" and navigates to ConfirmPassword', () => {
        const mockDispatch = jest.fn()
        store.dispatch = mockDispatch

        useNavigation.mockReturnValue(navigation)

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <SetPassword />
                </NavigationContainer>
            </Provider>
        )

        // enter code in input field
        fireEvent.changeText(getByTestId('password-input'), '1234')

        fireEvent.press(getByText('Continue'))
        expect(mockDispatch).toHaveBeenCalledWith({"payload": "1234", "type": "auth/setUserPassword"})
        expect(navigation.navigate).toHaveBeenCalledWith('confirmPassword')
    })
})