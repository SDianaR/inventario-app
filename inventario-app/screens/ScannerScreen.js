import { useEffect, useState } from "react";

import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

export default function ScannerScreen() {

  const [permission, requestPermission] =
    useCameraPermissions();

  const [scanned, setScanned] =
    useState(false);

  useEffect(() => {

    if (!permission) {
      return;
    }

  }, [permission]);

  if (!permission) {

    return <View />;
  }

  if (!permission.granted) {

    return (

      <View style={styles.permissionContainer}>

        <Text style={styles.permissionText}>
          Necesitamos permiso para usar la cámara
        </Text>

        <Button
          onPress={requestPermission}
          title="Dar Permiso"
        />

      </View>
    );
  }

  const actualizarStock = async (
    productId
  ) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const response = await api.put(
        `/productos/${productId}`,
        {
          cantidad: 1,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        "Éxito",
        `Nuevo stock: ${response.data.producto.stock}`
      );

    } catch (error) {

      Alert.alert(
        "Error",
        "No se pudo actualizar stock"
      );
    }
  };

  const handleBarcodeScanned = ({
    data,
  }) => {

    setScanned(true);

    Alert.alert(
      "QR Detectado",
      `Producto ID: ${data}`,
      [
        {
          text: "Actualizar Stock",
          onPress: () =>
            actualizarStock(data),
        },
        {
          text: "Cancelar",
        },
      ]
    );
  };

  return (

    <View style={{ flex: 1 }}>

      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={
          scanned
            ? undefined
            : handleBarcodeScanned
        }
      />

      {scanned && (

        <View style={styles.buttonContainer}>

          <Button
            title="Escanear otra vez"
            onPress={() =>
              setScanned(false)
            }
          />

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  permissionText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
});