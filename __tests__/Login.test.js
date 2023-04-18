import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import Login from '../screens/Login';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Login', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  it('renders the component', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('screen-title')).toBeTruthy();
  });

  it('navigates to the onBoarding screen when back button is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(<Login navigation={navigation} />);
    fireEvent.press(getByTestId('back-button'));
    expect(navigation.navigate).toHaveBeenCalledWith('onBoarding');
  });

  it('sets the email validation text when no email is entered', () => {
    const { getByTestId } = render(<Login />);
    fireEvent.press(getByTestId('login-button'));
    expect(getByTestId('email-validation-text')).toBeTruthy();
    expect(getByTestId('email-validation-text').props.children).toBe('Email is required');
  });

  it('sets the password validation text when no password is entered', () => {
    const { getByTestId } = render(<Login />);
    fireEvent.press(getByTestId('login-button'));
    expect(getByTestId('password-validation-text')).toBeTruthy();
    expect(getByTestId('password-validation-text').props.children).toBe('Password is required');
  });

  it('navigates to the multistep screen when sign up button is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(<Login navigation={navigation} />);
    fireEvent.press(getByTestId('signup-button'));
    expect(navigation.navigate).toHaveBeenCalledWith('multistep');
  });
});
