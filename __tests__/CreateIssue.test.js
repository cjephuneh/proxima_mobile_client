import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import CreateIssue from "../screens/CreateIssue";

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
                <CreateIssue />
            </NavigationContainer>
        )

        expect(getByText('Create an issue')).not.toBeNull()
    })

    it('updates searchText', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <CreateIssue />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Search Organization'), '18th')

        expect(getByPlaceholderText('Search Organization').props.value).toBe('18th')
    })

    it('filters organizations', () => {
        const { getByPlaceholderText, queryAllByText } = render(
            <NavigationContainer>
                <CreateIssue />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Search Organization'), '18th')

        expect(queryAllByText('16th Street').length).toBe(0)
    })

    it('issue title is editable', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <CreateIssue />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Add a title for your issue'), 'My issue title')

        expect(getByPlaceholderText('Add a title for your issue').props.value).toBe('My issue title')
    })

    it('issue description is editable', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <CreateIssue />
            </NavigationContainer>
        )

        fireEvent.changeText(getByPlaceholderText('Add a description for your issue'), 'My issue description')

        expect(getByPlaceholderText('Add a description for your issue').props.value).toBe('My issue description')
    })

    // it('cannot send issue without filling all required fields', () => {
    //     const { getByText } = render(
    //         <NavigationContainer>
    //             <CreateIssue />
    //         </NavigationContainer>
    //     )

        
    // })

    it('adds and removes tags', () => {
        const { getByText } = render(
            <NavigationContainer>
                <CreateIssue />
            </NavigationContainer>
        )
        const tagButton = getByText('milk')
        expect(tagButton.props.style[0].backgroundColor).toBe('#e5e7eb')
        
        fireEvent.press(tagButton)        
        expect(tagButton.props.style[0].backgroundColor).toBe('#2DABB1')       
      })
})