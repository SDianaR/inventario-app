import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({
  navigation,
}) {

  const logout = async () => {

    await AsyncStorage.removeItem(
      "token"
    );

    navigation.navigate("Login");
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Panel Principal
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(
            "Productos"
          )
        }
      >

        <Text style={styles.cardText}>
          📦 Ver Productos
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(
            "Scanner"
          )
        }
      >

        <Text style={styles.cardText}>
          📷 Escanear QR
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >

        <Text style={styles.logoutText}>
          Cerrar Sesión
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#1e293b",
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },

  logoutButton: {
    marginTop: 30,
    backgroundColor: "#dc2626",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
