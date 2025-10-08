import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";

function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + productId)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert("Error", "Could not load product details");
        setLoading(false);
      });
  }, []);

  function addToCart() {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "You must be logged in to add to cart");
      return;
    }

    const cartRef = ref(db, "carts/" + user.uid);
    const newItem = {
      title: product.title,
      price: product.price,
      image: product.image,
    };

    push(cartRef, newItem)
      .then(() => {
        console.log("Item added successfully!");
        Alert.alert("Success", "Item added to your cart!");
      })
      .catch((error) => {
        console.log("Error adding item:", error);
        Alert.alert("Error", error.message);
      });
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>No product found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>R{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 200, height: 200, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  price: { fontSize: 16, marginBottom: 10 },
  description: { fontSize: 14, marginBottom: 20, textAlign: "center" },
});

export default ProductDetailScreen;
