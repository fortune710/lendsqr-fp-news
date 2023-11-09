import { NavigationProp, ParamListBase } from "@react-navigation/native";
import useAuth from "./useAuth"

const useRedirect = (navigation: NavigationProp<ParamListBase>) => {
    const { auth } = useAuth();
    if (!auth.currentUser) {
        return navigation.navigate("Login")
    }
}

export default useRedirect;