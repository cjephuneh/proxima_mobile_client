import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Issues from '../screens/Issues';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }));

describe('Issues', () => {
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
                <Issues />
            </NavigationContainer>
        )

        expect(getByText('Maziwa Industries LTD')).not.toBeNull()
    })

    it('displays 3 community members images', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <Issues />
            </NavigationContainer>
        )

        expect(getAllByTestId('top-3-user-images').length).toBe(3)
    })

    it('displays the person who displayed the issue', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <Issues />
            </NavigationContainer>
        )

        expect(getAllByTestId('issue-owner').length).not.toBeNull()
    })

    it('displays issue tags', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <Issues />
            </NavigationContainer>
        )

        expect(getAllByTestId('issue-tags').length).toBeGreaterThan(0)
    })

    it('navigates to Issue screen on any issue press', () => {
        const { getAllByTestId } = render(
            <NavigationContainer>
                <Issues />
            </NavigationContainer>
        )

        const issueBtns = getAllByTestId('issue-btn')

        issueBtns.forEach(btn => {
            fireEvent.press(btn)

            expect(navigation.navigate).toBeCalledWith('issue')
        })
    })
})