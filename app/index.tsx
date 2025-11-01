import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

export interface Todo {
    id: number
    content: string
    completed: boolean
}

export default function IndexScreen() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const getTasks = async () => {
        setRefreshing(true)
        const db = await SQLite.openDatabaseAsync('todo-db');
        try {
            const res: Todo[] = await db.getAllAsync(`SELECT * FROM todos`);
            setTodos(res)
        } catch (error: any) {
            console.log(error)
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        } finally {
            setRefreshing(false)
        }
    }
    const handleDelete = async (id: number) => {
        setRefreshing(true)
        const db = await SQLite.openDatabaseAsync('todo-db');
        try {
            await db.runAsync('DELETE FROM todos WHERE id = $id', { $id: id })
            ToastAndroid.show("Delete successfully", ToastAndroid.SHORT)
        } catch (error: any) {
            console.log(error)
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        } finally {
            getTasks()
            setRefreshing(false)
        }
    }
    const handleUpdate = async (id: number, completed: boolean) => {
        setRefreshing(true)
        try {
            const db = await SQLite.openDatabaseAsync('todo-db');
            await db.runAsync('UPDATE todos SET completed = ? WHERE id = ?', id, completed);
        } catch (error) {
            console.log(error)
        } finally {
            getTasks()
            setRefreshing(false)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#FFF"
            }}
        >

            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    gap: 12
                }}
                showsVerticalScrollIndicator={false}
                data={todos}
                ListEmptyComponent={() => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 48,
                    }}>
                        <Text style={{ fontSize: 19 }}>No task found!</Text>
                        <Text style={{ fontSize: 11 }}>Pull to refresh to get latest task</Text>
                    </View>
                )}
                refreshing={refreshing}
                onRefresh={getTasks}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 6,
                        backgroundColor: '#eeecec56',
                        paddingVertical: 12,
                        paddingHorizontal: 6,
                        borderRadius: 6
                    }}>
                        <TouchableOpacity style={{
                            paddingHorizontal: 3,
                            height: "100%",
                        }}
                            onPress={() => handleUpdate(item.id, true)}
                        >
                            <Feather name={item.completed ? "check-circle" : "circle"} size={16} />
                        </TouchableOpacity>
                        <View style={{
                            flex: 1
                        }}>
                            <Text>{item.content}</Text>
                        </View>
                        <TouchableOpacity style={{
                            paddingHorizontal: 3,
                            height: "100%",
                        }}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Feather name="trash-2" size={18} />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity
                onPress={() => router.push('/add')}
                activeOpacity={.6}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: "#000",
                    padding: 16,
                    borderRadius: 100
                }}>
                <Feather name="plus" color={'#fff'} size={18} />
            </TouchableOpacity>
        </View>
    )
}