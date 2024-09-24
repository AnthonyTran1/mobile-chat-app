// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet, Text, View, LogBox, Alert } from "react-native";

import Start from "./components/Start";
import Chat from "./components/Chat";
// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

import { useNetInfo } from "@react-native-community/netinfo";

export default function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCfVwJkTJAO44nAv_bEd6J4iUetqgJe8eo",
    authDomain: "mobilechatapp-d2adb.firebaseapp.com",
    projectId: "mobilechatapp-d2adb",
    storageBucket: "mobilechatapp-d2adb.appspot.com",
    messagingSenderId: "784737605264",
    appId: "1:784737605264:web:1328303488e69d8ec62a15",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
