import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

export default function LoginScreen({
  navigation,
}) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const response = await api.post(
        "/login",
        {
          username,
          password,
        }
      );

      await AsyncStorage.setItem(
        "token",
        response.data.token
      );

      navigation.navigate("Home");

    } catch (error) {

      Alert.alert(
        "Error",
        "Credenciales incorrectas"
      );
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Inventario App
      </Text>

      <Text style={styles.subtitle}>
        Control de productos
      </Text>

      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >

        <Text style={styles.buttonText}>
          Iniciar Sesión
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e293b",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: "#64748b",
    fontSize: 16,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});