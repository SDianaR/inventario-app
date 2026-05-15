import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";

import HomeScreen from "./screens/HomeScreen";

import ProductosScreen from "./screens/ProductosScreen";

import ScannerScreen from "./screens/ScannerScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator

        screenOptions={{
          headerStyle: {
            backgroundColor: "#2563eb",
          },

          headerTintColor: "white",

          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Productos"
          component={ProductosScreen}
        />

        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}