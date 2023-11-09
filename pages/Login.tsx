import { Pressable, TextInput, View } from "react-native"
import Page from "../components/Page"
import { ScreenProps } from "../types";
import { Button, Icon, Text } from "@rneui/themed";
import useAuth from "../hooks/useAuth";
import Input from "../components/Input";


const Login: React.FC<ScreenProps> = ({ navigation }) => {
    const { googleSignIn } = useAuth();

    const signUpWithGoogle = async () => {
        await googleSignIn();
        return navigation.navigate("News-Listing")
    }

    return (
        <Page>

            <View>
                <Input
                    label="Email"
                    placeholder="Enter you email"
                />

                <Input
                    label="Password"
                    placeholder="Enter you password"
                    secureTextEntry={true}
                />
            
            </View>

            <Button onPress={signUpWithGoogle}>
                Sign In with Google
            </Button>

            <Button onPress={() => navigation.navigate("News-Listing")}>
                Go to feed
            </Button>


            <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <Text>Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Sign-Up")}>
                    <Text>Sign Up</Text>
                </Pressable>
            </View>

        </Page>
    )
}

export default Login