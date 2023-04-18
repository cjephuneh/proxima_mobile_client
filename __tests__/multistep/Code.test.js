import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Code } from '../../screens/Multistep';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Code', () => {
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
                    <Code />
                </NavigationContainer>
            </Provider>
        )
        expect(getByText('Enter authentication code')).not.toBeNull()
    })

    it('shows the error message when the "Continue" button is clicked without filling out the code', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <Code />
                </NavigationContainer>
            </Provider>
        )
        fireEvent.press(getByText('Continue'))
        expect(getByTestId('code-validation')).toBeTruthy()
        expect(getByTestId('code-validation').props.children).toBe('Authentication code is required')
    })

    it('dispatches "setAuthCode" with payload "1234" and navigates to SetPassword', () => {
        const mockDispatch = jest.fn()
        store.dispatch = mockDispatch

        useNavigation.mockReturnValue(navigation)

        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <Code />
                </NavigationContainer>
            </Provider>
        )

        // enter code in input field
        fireEvent.changeText(getByTestId('code-input'), '1234')

        fireEvent.press(getByText('Continue'))
        expect(mockDispatch).toHaveBeenCalledWith({"payload": "1234", "type": "auth/setAuthCode"})
        expect(navigation.navigate).toHaveBeenCalledWith('setPassword')
    })
})