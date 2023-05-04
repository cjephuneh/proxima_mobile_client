import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Goal } from '../../screens/Multistep';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { setGoal } from '../../redux/slice/auth/authSlice';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('Goal', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    useNavigation.mockReturnValue(navigation);
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Goal />
        </NavigationContainer>
      </Provider>
    );
    expect(getByText('Tell us your goal')).not.toBeNull();
    expect(getByText('What would you like to do with proxima?')).not.toBeNull();
  });

  it('dispatches "setGoal" action with "Chat with in-house organizations" when the first button is pressed and navigates to "email" screen', () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Goal />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByTestId('chat-goal-btn'));
    expect(mockDispatch).toHaveBeenCalledWith(setGoal('Chat with in-house organizations'));
    expect(navigation.navigate).toHaveBeenCalledWith('email')
  });

  it('dispatches "setGoal" action with "Join Organization community" when the second button is pressed  and navigates to "email" screen', () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Goal />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByTestId('join-goal-btn'));
    expect(mockDispatch).toHaveBeenCalledWith(setGoal('Join Organization community'));
    expect(navigation.navigate).toHaveBeenCalledWith('email')
  });

  it('dispatches "setGoal" action with "Explore other organizations" when the second button is pressed  and navigates to "email" screen', () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Goal />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByTestId('explore-goal-btn'));
    expect(mockDispatch).toHaveBeenCalledWith(setGoal('Explore other organizations'));
    expect(navigation.navigate).toHaveBeenCalledWith('email')
  });
});
