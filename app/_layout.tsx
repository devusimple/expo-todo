import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar, TouchableOpacity } from "react-native";

export default function RootLayout() {
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Stack>
                <Stack.Screen name="index" options={{
                    headerShadowVisible: false,
                    headerTitleAlign: 'left',
                    title: "TODO",
                    headerRight(props) {
                        return (
                            <TouchableOpacity
                                onPress={() => router.push('/info')}
                                activeOpacity={.6}
                            >
                                <Feather name="info" size={24} color={props.tintColor} />
                            </TouchableOpacity>
                        )
                    },
                }} />
                <Stack.Screen name="add"
                    options={{
                        headerShadowVisible: false,
                        headerTitleAlign: 'center',
                        title: "Add New",
                    }}
                />
                <Stack.Screen name="info"
                    options={{
                        headerShadowVisible: false,
                        headerTitleAlign: 'center',
                        title: "About",
                    }}
                />
            </Stack>
        </>

    )
} 