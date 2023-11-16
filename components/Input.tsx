import { Text } from "@rneui/themed"
import { TextInput, View } from "react-native"

interface InputProps extends React.ComponentProps<typeof TextInput> {
    label: string
}


const Input: React.FC<InputProps> = ({ style, label, ...props }) => {
    
    return (
        <View style={{ width: "100%", marginVertical: 7.5 }}>
            <Text style={{ fontFamily: "EncodeSans-SemiBold", fontSize: 14 }}>{label}</Text>
            <TextInput
                style={{ 
                    borderWidth: 1, 
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    height: 50,
                    color: "#000",
                    fontFamily: "EncodeSans-Light",
                    ...style as any 
                }}
                placeholderTextColor="#000"
                {...props}
            />
        </View>

    )
}

export default Input;