import React from 'react';
import { fireEvent, render } from "@testing-library/react-native";
import { describe, it, expect } from "@jest/globals"
import LoginPage from "../pages/Login";
import { NavigationProp, ParamListBase } from '@react-navigation/native';

//mock('react-native/libraries/eventemitter/nativeeventemitter');

describe('Login', () => {
    it('renders the "Sign In with Google" button', async () => {
        
        const mockNavigation = {
            navigation: {
                navigate: () => {}
            } as NavigationProp<ParamListBase>,
            route: {}
        }
        
        const loginPage = render(
            <LoginPage 
                navigation={mockNavigation.navigation} 
                route={mockNavigation.route}
            />
        );
        const loginPageQuery = await loginPage.findByTestId("googleSignInButton")
        const googleSignInButton = loginPage.getByTestId("googleSignInButton")
        
        expect(googleSignInButton).toBeTruthy()
    });

    it('google sign in button moves to news listing', () => {
        const mockNavigation = {
            navigation: {
                navigate: () => {}
            } as NavigationProp<ParamListBase>,
            route: {}
        }
        
        const loginPage = render(
            <LoginPage 
                navigation={mockNavigation.navigation} 
                route={mockNavigation.route}
            />
        );
        
        const googleSignInButton = loginPage.getByTestId("googleSignInButton")
        fireEvent.press(googleSignInButton)

        expect(mockNavigation.navigation.navigate).toHaveBeenCalledWith("News-Listing")
    })
});