import remoteConfig from "@react-native-firebase/remote-config";
import useCrashlytics from "./useCrashlytics";

const useRemoteConfig = () => {

    const crashlytics = useCrashlytics();

    const setDefaults = async () => {
        try {
            await remoteConfig().setDefaults({
                show_runtime_error_button: true
            })
            await remoteConfig().fetchAndActivate()
        } catch (e: any) {
            console.error(e.message)
            crashlytics.recordError(e)
        }
    }

    const getValueFromConfig = (keyName: string, valueType: "string"|"number"|"boolean") => {
        const configProperty = remoteConfig().getValue(keyName)

        if(valueType === "string") {
            return configProperty.asString()
        }

        if(valueType === "number") {
            return configProperty.asNumber()
        }

        if(valueType === "boolean") {
            return configProperty.asBoolean()
        }
    }

    return {
        getValueFromConfig,
        setDefaults
    }

    
}

export default useRemoteConfig