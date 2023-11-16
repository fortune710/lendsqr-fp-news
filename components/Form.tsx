import { StyleSheet, View } from "react-native"
import Input from "./Input"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { Button } from "@rneui/themed"
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native"

interface AuthFormProps {
    type: "sign-up"|"login"
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const { auth } = useAuth();
    const navigation = useNavigation() as NavigationProp<ParamListBase>;

    const signInWithEmail = async () => {
        await auth.signInWithEmailAndPassword(email, password);
        return navigation.navigate("News-Listing")
    }

    const signUpWithEmail = async () => {
        await auth.createUserWithEmailAndPassword(email, password);
        await auth.currentUser?.updateProfile({
            displayName: name,
            photoURL: `https://api.dicebear.com/7.x/adventurer-neutral/pngg?seed=${name}`
        })
        return navigation.navigate("News-Listing")
    }

    if (type === "sign-up") {
        return (
            <View style={styles.form}>
                <Input
                    label="Full Name"
                    placeholder="Enter you full name"
                    onChangeText={(text) => setName(text)}
                />

                <Input
                    label="Email"
                    placeholder="Enter you email"
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    label="Password"
                    placeholder="Enter you password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button 
                    buttonStyle={styles.button}
                    titleStyle={styles.noAccountText} 
                    onPress={signUpWithEmail}
                >
                    Sign Up
                </Button>

            
            </View>
        )
    }

    return (
        <View style={styles.form}>
            <Input
                label="Email"
                placeholder="Enter you email"
                onChangeText={(text) => setEmail(text)}
            />

            <Input
                label="Password"
                placeholder="Enter you password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />

            <Button 
                buttonStyle={styles.button}
                titleStyle={styles.noAccountText} 
                onPress={signInWithEmail}
                disabled={email.trim().length === 0 || password.trim().length === 0}
            >
                Login
            </Button>

        
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 20
    },
    noAccountText: {
        fontFamily: "EncodeSans-SemiBold",
        fontSize: 14
    },
    button: {
        borderRadius: 12,
        height: 50,
        marginTop: 12,
        backgroundColor: "#121212"
    },
    noAccount: { 
        display: "flex", 
        alignItems: "center", 
        flexDirection: "row", 
        justifyContent: "center", 
        marginVertical: 20
    }
})

export default AuthForm;