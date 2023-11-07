import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import useCrashlytics from "./useCrashlytics";

const useAuth = () => {
    const crashlytics = useCrashlytics();

    const emailAndPasswordSignUp = async (email: string, password: string) => {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        crashlytics.log(`User with ID ${user.uid} signed up`);
        return user;
    }

    const googleSignIn = async () => {
        GoogleSignin.configure({
            webClientId: "394802504165-pdja8oh5th7u8etftvsih9hs2cpksa48.apps.googleusercontent.com",
        })
        const user = await GoogleSignin.signIn();
        crashlytics.log(`User with ID ${user.user.email} signed in with Google`);
    }
    return {
        auth: auth(),
        googleSignIn,
        emailAndPasswordSignUp
    }
}