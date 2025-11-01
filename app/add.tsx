import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddScreen() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [charLength, setCharLength] = useState(0);

  const handleAdd = async () => {
    if (text.trim().length === 0) return;
    setLoading(true);
    const sqlite = await SQLite.openDatabaseAsync("todo-db");
    try {
      await sqlite.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, content TEXT NOT NULL, completed BOOLEAN);
            `);
      await sqlite.runAsync(
        "INSERT INTO todos (content, completed) VALUES (?, ?)",
        text,
        false
      );
      ToastAndroid.show("Task add successfully", ToastAndroid.SHORT);
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setText("");
      setCharLength(0);
      setLoading(false);
      router.back();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        padding: 16,
      }}
    >
      <TextInput
        placeholder="Write your task...."
        onChangeText={(t) => {
          setCharLength(t.length);
          setText(t);
        }}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 6,
          minHeight: 100,
          maxHeight: 350,
          paddingHorizontal: 6,
        }}
        value={text}
        multiline
        textAlignVertical="top"
      />
      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: "#7c7272ff",
          }}
        >
          {charLength} Characters
        </Text>
      </View>

      <View>
        <TouchableOpacity
          disabled={text.trim().length === 0}
          onPress={handleAdd}
          style={{
            backgroundColor: text.trim().length === 0 ? "#e2e2e2ff" : "#000",
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <Text style={{ color: "#fff", textAlign: "center" }}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
