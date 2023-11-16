/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './navigation/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store';
import CodePush from 'react-native-code-push';
import useRemoteConfig from './hooks/useRemoteConfig';
//import useAnalytics from './hooks/useAnalytics';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { setDefaults } = useRemoteConfig();

  useEffect(() => {
    setDefaults()

  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StackNavigator/>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </Provider>
    </QueryClientProvider>
  );
}

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
export default CodePush(codePushOptions)(App);

//export default App;
