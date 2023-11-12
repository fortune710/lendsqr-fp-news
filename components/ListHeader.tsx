import { Avatar, Dialog, Button, Text } from "@rneui/themed";
import { useState } from "react";
import { Alert, View, Dimensions, StyleSheet } from "react-native";
import useAuth from "../hooks/useAuth";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const ListHeader: React.FC = () => {
    const { auth, signOut } = useAuth();
    const navigation = useNavigation() as NavigationProp<ParamListBase>;
    const [dialogOpen, setDialogOpen] = useState(false);

    const toggleDialog = () => setDialogOpen((preVal) => !preVal);

    
    const openSignOutAlert = () => {
        toggleDialog()
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out of your account?",
            [
                { text: "No", },
                {
                    text: "Yes",
                    onPress: async () => {
                        await signOut()
                        return navigation.navigate("Login")
                    }
                }
            ]
        )
    }

    
    
    return (
        <View style={styles.header}>
            <Text testID="userGreeting" style={styles.title}>
                Hello {auth.currentUser?.displayName}
            </Text>
            
            <Avatar 
                avatarStyle={{ borderRadius: 999, width: 50, height: 50 }}
                containerStyle={{ width: 50, height: 50 }}
                source={{ uri: auth.currentUser?.photoURL! }}
                onPress={toggleDialog}
            />

            <Dialog 
                isVisible={dialogOpen} 
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title 
                    titleStyle={{ color: "#000" }} 
                    title="Your Profile"
                />
                <View style={styles.profile}>
                    <Avatar 
                        avatarStyle={{ borderRadius: 999, width: 40, height: 40 }}
                        containerStyle={{ width: 40, height: 40 }}
                        source={{ uri: auth.currentUser?.photoURL! }}
                    />
                    <View style={{ marginLeft: 7 }}>
                        <Text>
                            {auth.currentUser?.displayName}
                        </Text>
                        <Text>
                            {auth.currentUser?.email}
                        </Text>
                    </View>
                </View>

                <Button 
                    color="error"
                    buttonStyle={{ borderRadius: 20, marginTop: 12 }}
                    onPress={openSignOutAlert}
                >
                    Sign Out
                </Button>

            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: "EncodeSans-SemiBold"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    profile: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    }
})


export default ListHeader;