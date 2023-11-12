import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewsFeed from "../pages/NewsFeed";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NewsDetails from "../pages/NewsDetails";
import useAuth from "../hooks/useAuth";
import useAnalytics from "../hooks/useAnalytics";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef<any>();
    const { auth: { currentUser } } = useAuth();
    const { analytics } = useAnalytics();

    useEffect(() => {
        analytics.setUserId(currentUser?.uid!)
    }, [])

    const getRouteName = () => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    }

    const checkScreenChange = async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics.logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={getRouteName}
            onStateChange={checkScreenChange}
        >
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={!currentUser ? "Login" : "News-Listing"}
            >
                <Stack.Screen name="News-Listing" component={NewsFeed} />
                <Stack.Screen name="News-Details" component={NewsDetails} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign-Up" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;