import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Page from "../components/Page"
import { ScreenProps } from "../types";
import { Button, Icon, Text } from "@rneui/themed";
import useAuth from "../hooks/useAuth";
import Input from "../components/Input";
import AuthForm from "../components/Form";


const Login: React.FC<ScreenProps> = ({ navigation }) => {
    const { googleSignIn } = useAuth();

    const signUpWithGoogle = async () => {
        await googleSignIn();
        return navigation.navigate("News-Listing")
    }

    return (
        <Page>
            <AuthForm type="login"/>

            <Button 
                buttonStyle={styles.button}
                titleStyle={styles.noAccountText} 
                testID="googleSignInButton" 
                onPress={signUpWithGoogle}
            >
                Sign In with Google
            </Button>


            <View style={styles.noAccount}>
                <Text style={styles.noAccountText}>Don't have an account? </Text>
                <Pressable onPress={() => navigation.navigate("Sign-Up")}>
                    <Text style={styles.noAccountText}>Sign Up</Text>
                </Pressable>
            </View>

        </Page>
    )
}

const styles = StyleSheet.create({
    noAccountText: {
        fontFamily: "EncodeSans-SemiBold",
        fontSize: 14
    },
    button: {
        borderRadius: 12,
        height: 50
    },
    noAccount: { 
        display: "flex", 
        alignItems: "center", 
        flexDirection: "row", 
        justifyContent: "center", 
        marginVertical: 20
    }
})

export default Login;