import { Text } from "@rneui/themed"
import { TextInput, View } from "react-native"

interface InputProps extends React.ComponentProps<typeof TextInput> {
    label: string
}


const Input: React.FC<InputProps> = ({ style, label, ...props }) => {
    
    return (
        <View style={{ width: "100%" }}>
            <Text>{label}</Text>
            <TextInput
                style={{ 
                    borderWidth: 1, 
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    color: "#000",
                    ...style as any 
                }}
                placeholderTextColor="#000"
                {...props}
            />
        </View>

    )
}

export default Input;