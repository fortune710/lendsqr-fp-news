import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import useCrashlytics from "./useCrashlytics";
//import useAnalytics from "./useAnalytics";
import { Alert } from "react-native";

const useAuth = () => {
    const crashlytics = useCrashlytics();
    //const { analytics } = useAnalytics();

    const emailAndPasswordSignUp = async (email: string, password: string) => {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        crashlytics.log(`User with ID ${user.uid} signed up`);
        return user;
    }

    const googleSignIn = async () => {

        try {
            GoogleSignin.configure({
                webClientId: "394802504165-pdja8oh5th7u8etftvsih9hs2cpksa48.apps.googleusercontent.com",
            })
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
    
            const credential = auth.GoogleAuthProvider.credential(idToken);
            const { user } = await auth().signInWithCredential(credential);
            crashlytics.log(`User with Email ${user.email} signed in with Google`);
            return user
        } catch {
            Alert.alert(
                "Error Occured",
                "Error while trying to sign in with Google",
                [
                    { text: "OK" }
                ]
            )
        }
    }

    const signOut = async () => {
        await auth().signOut()
    }
    
  
    return {
        auth: auth(),
        googleSignIn,
        emailAndPasswordSignUp,
        signOut
    }
}

export default useAuth;