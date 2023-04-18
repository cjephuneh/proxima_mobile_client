import React from "react";
import { render, fireEvent } from '@testing-library/react-native'
import { Email } from "../../screens/Multistep";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from "react-redux";
import { store } from "../../redux/store";

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Email', () => {
    const navigation = {
        navigate: jest.fn()
    }

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation);
    });

    it('renders correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <Email />
                </NavigationContainer>
            </Provider>
          );
        expect(getByText('What is your email address?')).not.toBeNull()
    })

    it('sets the email validation text when no email is entered', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <Email />
                </NavigationContainer>
            </Provider>
        );
        fireEvent.press(getByTestId('submit-email-btn'));
        expect(getByTestId('email-validation-text')).toBeTruthy();
        expect(getByTestId('email-validation-text').props.children).toBe('Email is required');
      });

      it('dispatches "setUserEmail" with payload "example@example.com" and navigates to the Code screen when continue button is pressed', () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        useNavigation.mockReturnValue(navigation);
        
        const { getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <Email />
                </NavigationContainer>
            </Provider>
        );

        // enter email address in input field
        fireEvent.changeText(getByTestId('email-input'), 'example@example.com');

        fireEvent.press(getByTestId('submit-email-btn'));
        expect(mockDispatch).toHaveBeenCalledWith({
            "payload": "example@example.com", "type": "auth/setUserEmail"
        })
        expect(navigation.navigate).toHaveBeenCalledWith('code');
      });
})