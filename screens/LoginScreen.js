import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert("Welcome", "You are logged in!"))
      .catch((error) => Alert.alert("Error", error.message));
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Login</Text>

      <Text>Email:</Text>
      <TextInput
        placeholder="Enter your email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Password:</Text>
      <TextInput
        placeholder="Enter your password"
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />

      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 10 }}>
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}

export default LoginScreen;
