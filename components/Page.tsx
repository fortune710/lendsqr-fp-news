import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import useCrashlytics from "../hooks/useCrashlytics"
import ErrorBoundary from "react-native-error-boundary"
import ErrorPage from "./Error"

interface PageProps {
    children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }) => {

  const crashlytics = useCrashlytics();
  
  const reportError = (error: Error, stackTrace: string) => {
    crashlytics.log("An error occured")
    crashlytics.recordError(error, stackTrace)
  }


    return (
        <ErrorBoundary FallbackComponent={ErrorPage} onError={reportError}>
            <SafeAreaView>
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                >
                    { children }
                </ScrollView>
            </SafeAreaView>        
        </ErrorBoundary>

    )
}

export default Page;