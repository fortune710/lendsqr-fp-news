import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface PageProps {
    children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 12 }}
            >
                { children }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Page;