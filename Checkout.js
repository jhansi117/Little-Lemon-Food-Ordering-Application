import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function Checkout({ route, navigation }) {
  const { cart } = route.params; // Get the cart data passed from Home
  const cartItems = Object.values(cart); // Convert cart object to an array for rendering

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle checkout
  const handleCheckout = () => {
    Alert.alert("Order Confirmation", "Your order is on the way!", [
      {
        text: "OK",
        onPress: () => navigation.navigate('Home'), // Navigate to Home on confirmation
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <Text style={styles.totalAmount}>Total Amount: ${totalAmount.toFixed(2)}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.backButton]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Add More Items</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.checkoutButton]} 
          onPress={handleCheckout}
        >
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
  },
  summaryContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space out buttons
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 25, // Round corners
    marginHorizontal: 5, // Space between buttons
  },
  backButton: {
    backgroundColor: '#495E57', // Button color
  },
  checkoutButton: {
    backgroundColor: '#F4CE14', // Button color
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center', // Center the text
  },
});

export default Checkout;
