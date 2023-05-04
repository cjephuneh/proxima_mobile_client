import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from "../screens/Home";

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Home', () => {
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
                <Home />
            </NavigationContainer>
        )

        expect(getByText('Find a chat')).not.toBeNull()
    })

    it('it updates "searchWord" on input change', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <Home />
            </NavigationContainer>
        )
        const searchInput = getByPlaceholderText('Search Organizations')
        fireEvent.changeText(searchInput, '16th Street')
        expect(searchInput.props.value).toBe('16th Street')
    })

    it('filters organizations correctly', () => {
        const { getByPlaceholderText, queryAllByText } = render(
            <NavigationContainer>
                <Home />
            </NavigationContainer>
        )

        const searchInput = getByPlaceholderText('Search Organizations')
        fireEvent.changeText(searchInput, '16')

        expect(queryAllByText('16th Street')).not.toBeNull()

        fireEvent.changeText(searchInput, '16th')

        expect(queryAllByText('169th Street').length).toEqual(0)
    })

    it('navigates to correct screen on button press', () => {
        const { getByText } = render(
            <NavigationContainer>
                <Home />
            </NavigationContainer>
        )

        const chatsBtn = getByText('Chats')
        const communitiesBtn = getByText('Communities')
        const favoritesBtn = getByText('Favorites')

        fireEvent.press(chatsBtn)
        expect(navigation.navigate).toHaveBeenCalledWith('inbox')

        fireEvent.press(communitiesBtn)
        expect(navigation.navigate).toHaveBeenCalledWith('communities')

        fireEvent.press(favoritesBtn)
        expect(navigation.navigate).toHaveBeenCalledWith('favorite')
    })

    it('navigates to Create Issue screen on "Add an Instant Issue" btn click', () => {
        const { getByText } = render(
            <NavigationContainer>
                <Home />
            </NavigationContainer>
        )

        fireEvent.press(getByText('Add an Instant Issue'))
        expect(navigation.navigate).toHaveBeenCalledWith('createIssue')
    })

    it('opens drawer on profile picture click', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Home />
            </NavigationContainer>
        )

        fireEvent.press(getByTestId('profile-pic'))
        expect(navigation.openDrawer).toBeCalled()
    })
})