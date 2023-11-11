/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './navigation/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from 'react-native-error-boundary';
import useCrashlytics from './hooks/useCrashlytics';


const queryClient = new QueryClient();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const crashlytics = useCrashlytics()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const reportError = (error: Error, stackTrace: string) => {
    crashlytics.log("An error occured")
    crashlytics.recordError(error, stackTrace)
  }

  return (
    <ErrorBoundary onError={reportError}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <StackNavigator/>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}


export default App;
