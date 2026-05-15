import { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

export default function ProductosScreen() {

  const [productos, setProductos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const obtenerProductos = async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const response = await api.get(
        "/productos",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setProductos(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    obtenerProductos();

  }, []);

  if (loading) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ActivityIndicator size="large" />

      </View>
    );
  }

  return (

    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <FlatList
        data={productos}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <View
            style={{
              borderWidth: 1,
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >

            <Text>
              ID: {item.id}
            </Text>

            <Text>
              Producto: {item.nombre}
            </Text>

            <Text>
              Stock: {item.stock}
            </Text>

          </View>
        )}
      />

    </View>
  );
}