import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const useAuth = () => {
    
    const emailAndPasswordSignUp = async (email: string, password: string) => {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        return user;
    }

    const googleSignIn = async () => {
        GoogleSignin.configure({
            webClientId: "394802504165-pdja8oh5th7u8etftvsih9hs2cpksa48.apps.googleusercontent.com",
        })
        await GoogleSignin.signIn()
    }
    return auth()
}