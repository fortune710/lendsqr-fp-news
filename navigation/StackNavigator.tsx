import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

import NewsFeed from "../pages/NewsFeed";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NewsDetails from "../pages/NewsDetails";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="News-Listing" component={NewsFeed} />
                <Stack.Screen name="News-Details" component={NewsDetails} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign-Up" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;