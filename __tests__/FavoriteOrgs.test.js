import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import FavoriteOrgs from "../screens/FavoriteOrgs";

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('FavoriteOrgs', () => {
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
                <FavoriteOrgs />
            </NavigationContainer>
        )

        expect(getByText('Find a chat')).not.toBeNull()
    })

    it('it updates "searchWord" on input change', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <FavoriteOrgs />
            </NavigationContainer>
        )
        const searchInput = getByPlaceholderText('Search your favorite organization')
        fireEvent.changeText(searchInput, '16th Street')
        expect(searchInput.props.value).toBe('16th Street')
    })

    it('filters organizations correctly', () => {
        const { getByPlaceholderText, queryAllByText } = render(
            <NavigationContainer>
                <FavoriteOrgs />
            </NavigationContainer>
        )

        const searchInput = getByPlaceholderText('Search your favorite organization')
        fireEvent.changeText(searchInput, '16')

        expect(queryAllByText('16th Street')).not.toBeNull()

        fireEvent.changeText(searchInput, '16th')

        expect(queryAllByText('169th Street').length).toEqual(0)
    })

    it('navigates to org screen on any org press', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <FavoriteOrgs />
            </NavigationContainer>
        )

        const orgBtns = getAllByTestId('org-btn')

        orgBtns.forEach(btn => {
            fireEvent.press(btn)

            expect(navigation.navigate).toBeCalledWith('companyProfile')
        })
    })
})