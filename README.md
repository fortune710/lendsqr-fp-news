## lendsqr-fp-news
This is an assesment for the Mobile Engineer Position at Lendsqr. A simple application to fetch and view news articles.

## Finished Product
To download the app, click here [https://drive.google.com/file/d/1D1EDfdCaon3YjOrPxBfxsEnTJp2mp7Jb/view?usp=drive_link] (https://drive.google.com/file/d/1D1EDfdCaon3YjOrPxBfxsEnTJp2mp7Jb/view?usp=drive_link)


## Implementation Steps
1. Created a new React Native App usign the React Native CLI with the command `npx react-native init lendsqr`

2. Installed React Navigation and set up the different pages

3. Installed and configured Firebase in the project via the `@react-native-firebase/app` package. Configured all required Firebase services: 
- `@react-native-firebase/auth`  
- `@react-native-firebase/messaging`
- `@react-native-firebase/remote-config`
- `@react-native-firebase/crashlytics`
- `@react-native-firebase/analytics`
- `@react-native-firebase/perf`

4. Installed the `@react-native-google-signin/google-signin` for client-side authentication with Google and was used together with the `@react-native-firebase/auth` package

5. Installed `axios` for calling the News API.
- Created an Axios Instance in the `http/index.ts` file and set the base url and params for the API call.

6. Installed the `@reduxjs/toolkit` and `react-redux` package. These were used to manage stage on the client. Stored Fetched News Listing in a Redux Slice.

7. Created Unit Tests with `jest` and `@testing-library/react-native`

8. Configured Code Push for OTA updates with `react-native-code-push`

## Test Cases
1. Login Page
- Checked if the "Sign In with Google" button was rendered

2. Sign Up Page
- Checked if the "Sign In with Google" button was rendered

## Folder Structure

- `Project Root`
  - `__tests__`
  - `android`
  - `ios`
  - `node_modules`
  - `pages`
  - `components`
  - `navigation`
  - `hooks`
  - `store`
  - `assets`
    - `fonts`
  - `http`
    - `index.ts`


    - `index.js`
  - `types.ts`
  - `README.md`


## To Run the Project Locally
```bash
git clone https://github.com/fortune710/lendsqr-fp-news.git
cd lendsqr-fp-news
npm start
```

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
