import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

function HomeScreen({ navigation }) {
  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch(() => {
        alert("Sign out failed. Try again.");
      });
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png" }}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome to ShopEZ </Text>
      <Text style={styles.subtitle}>
        Your favorite shopping app for great deals!
      </Text>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title=" View All Products"
            color="#4CAF50"
            onPress={() => navigation.navigate("Products")}
          />
        </View>

        <View style={styles.button}>
          <Button
            title=" View My Cart"
            color="#2196F3"
            onPress={() => navigation.navigate("Cart")}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Logout"
            color="#f44336"
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default HomeScreen;
