import { StyleSheet, View } from "react-native"
import Input from "./Input"
import { useState } from "react"
import useAuth from "../hooks/useAuth"

interface AuthFormProps {
    type: "sign-up"|"login"
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const { auth } = useAuth();

    const signInWithEmail = async () => {
        await auth.signInWithEmailAndPassword(email, password)
    }

    const signUpWithEmail = async () => {
        await auth.createUserWithEmailAndPassword(email, password)
    }

    if (type === "sign-up") {
        return (
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
        )
    }

    return (
        <View style={styles.form}>
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
    )
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 20
    }
})

export default AuthForm;