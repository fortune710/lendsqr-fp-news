import { Button, Text } from "@rneui/themed"
import Page from "./Page"
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";


const ErrorPage: React.FC = () => {

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 12 }}
            >
                <Text>
                    There was an error
                </Text>

                <Button>
                    Go to News Listing
                </Button>
            </ScrollView>
        </SafeAreaView>        

    )
}

export default ErrorPage;