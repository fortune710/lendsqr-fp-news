import { Pressable, View } from "react-native"
import Page from "../components/Page";
import { Button, Icon, Input, Text } from "@rneui/themed";
import useAuth from "../hooks/useAuth";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

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
                <Input label="Email"/>

                <Button onPress={signUpWithGoogle}>
                    <Icon 
                        type="ionicons"
                        name="logo-google" 
                        color={"white"}
                    />
                    Sign Up with Google
                </Button>

                <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <Text>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text>Login</Text>
                    </Pressable>
                </View>


            </View>
        </Page>
    )
}

export default SignUp;