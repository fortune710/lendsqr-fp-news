jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-google-signin/google-signin', () => {
    return () => ({
        GoogleSignin: jest.fn()
    })
}); 

jest.mock('@react-native-firebase/messaging', () => {
    return () => ({
      hasPermission: jest.fn(() => Promise.resolve(true)),
      subscribeToTopic: jest.fn(),
      unsubscribeFromTopic: jest.fn(),
      requestPermission: jest.fn(() => Promise.resolve(true)),
      getToken: jest.fn(() => Promise.resolve('myMockToken')),
      onMessage: jest.fn(),
      onNotificationOpenedApp: jest.fn(),
      getInitialNotification: jest.fn(() => Promise.resolve(false))
    })
})
  
jest.mock('@react-native-firebase/app', () => {
    return () => ({
        onNotification: jest.fn(),
        onNotificationDisplayed: jest.fn()
    })
})

jest.mock('@react-native-firebase/crashlytics', () => {
    return () => ({
        log: jest.fn(),
        setUserId: jest.fn(),
        recordError: jest.fn()
    })
})

jest.mock('@react-native-firebase/auth', () => {
    return () => ({
        signInWithCredentials: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
    })
})

jest.mock('@react-native-firebase/analytics', () => {
    return () => ({
        logScreenView: jest.fn(),
        setUserId: jest.fn(),
        logEvent: jest.fn(),
    })
})

jest.mock('@react-native-firebase/remote-config', () => {
    return () => ({
        setDefaults: jest.fn(),
        fetchAndActivate: jest.fn(),
        getValue: jest.fn(),
    })
})


jest.mock('@react-navigation/native', () => {})
  