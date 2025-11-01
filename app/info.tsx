import { Text, View } from "react-native";

export default function InfoScreen() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text
            >
                Application name: TODO
            </Text>
            <Text>
                Developer name: Mehedi Hasan
            </Text>
            <Text>
                Version: beta-1.0.1
            </Text>
        </View>
    )
}