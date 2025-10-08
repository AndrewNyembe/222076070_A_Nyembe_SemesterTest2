// CartScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, Alert, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const cartRef = ref(db, 'carts/' + user.uid);

    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCartItems(loadedItems);
      } else {
        setCartItems([]);
      }
      setLoading(false);
    });
  }, [user]);

  function removeItem(id) {
    const itemRef = ref(db, 'carts/' + user.uid + '/' + id);
    remove(itemRef)
      .then(() => Alert.alert('Removed', 'Item removed from cart'))
      .catch((error) => Alert.alert('Error', error.message));
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Your cart is empty 😢</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>R{item.price}</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  itemBox: { marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0' },
  text: { fontSize: 16 },
});

export default CartScreen;
