import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar, TouchableOpacity } from "react-native";

export default function RootLayout() {
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Stack>
                <Stack.Screen name="index" options={{
                    headerShadowVisible: false,
                    headerTitleAlign: 'left',
                    title: "DuS"
                }} />
            </Stack>
        </>

    )
} 