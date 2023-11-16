import { Pressable, StyleSheet, View } from "react-native"
import Page from "../components/Page";
import { Button, Icon, Input, Text } from "@rneui/themed";
import useAuth from "../hooks/useAuth";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import AuthForm from "../components/Form";

interface SignUpProps {
    navigation: NavigationProp<ParamListBase>;
};
  

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {

    const { googleSignIn } = useAuth();

    const signUpWithGoogle = async () => {
        await googleSignIn();
        return navigation.navigate("News-Listing")
    }

    return (
        <Page>
            <View>
                <AuthForm type="sign-up"/>

                <Button 
                    titleStyle={styles.noAccountText}
                    buttonStyle={styles.button}
                    onPress={signUpWithGoogle}
                >
                    Sign Up with Google
                </Button>

                <Pressable onPress={() => navigation.navigate("Login")} style={styles.haveAccount}>
                    <Text style={styles.noAccountText}>Already have an account? Login</Text>
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
    haveAccount: { 
        display: "flex", 
        width: "100%",
        alignItems: "center", 
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20
    }
})

export default SignUp;