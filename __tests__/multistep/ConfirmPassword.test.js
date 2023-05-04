import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ConfirmPassword } from '../../screens/Multistep';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { setUserPassword } from '../../redux/slice/auth/authSlice';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('ConfirmPassword', () => {
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
                    <ConfirmPassword />
                </NavigationContainer>
            </Provider>
        )
        expect(getByText('Confirm password')).not.toBeNull()
    })

    it('shows the error message when the "Continue" button is clicked without filling out the confirm password', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <ConfirmPassword />
                </NavigationContainer>
            </Provider>
        )
        fireEvent.press(getByTestId('set-password'))
        expect(getByTestId('confirm-password-validation')).toBeTruthy()
        expect(getByTestId('confirm-password-validation').props.children).toBe('Passwords do not match')
    })
    // NOTE: THIS TEST NEEDS TO BE REWORKED.
    // THE ISSUE IS COMING FROM SETTING A DEFAULT VALUE FOR password WWHICH IS THEN COMPARED WITH confirmPassword
    // it('dispatches "setUserConfirmPassword" with payload "1234" and navigates to setProfile', () => {
    //     const mockDispatch = jest.fn()
    //     store.dispatch = mockDispatch
      
    //     // useNavigation.mockReturnValue(navigation)
      
    //     const { getByText, getByTestId } = render(
    //       <Provider store={store}>
    //         <NavigationContainer>
    //           <ConfirmPassword />
    //         </NavigationContainer>
    //       </Provider>
    //     )
      
    //     // Set the password state to a known value
    //     store.dispatch(setUserPassword('1234'));
      
    //     // Set the confirmation password to the same value
    //     fireEvent.changeText(getByTestId('confirm-password-input'), '1234');
      
    //     fireEvent.press(getByText('Continue'))

    //     expect(mockDispatch).toHaveBeenCalledWith({"payload": '1234', "type": "auth/setUserConfirmPassword"})
    //     expect(navigation.navigate).toHaveBeenCalledWith('setProfile')
    //   })
      
})