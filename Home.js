
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput, FlatList } from 'react-native';
import Hero from '../components/Hero';
import { Ionicons } from '@expo/vector-icons';


const MenuItem = ({ item, addToCart, removeFromCart, quantity }) => {
  return (
    <View style={styles.menuItemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Image 
        source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} 
        style={styles.image} 
      />
      <View style={styles.quantityContainer}>
        <Pressable style={styles.quantityButton} onPress={() => removeFromCart(item)}>
          <Text style={styles.quantityText}>-</Text>
        </Pressable>
        <Text style={styles.quantityText}>{quantity}</Text>
        <Pressable style={styles.quantityButton} onPress={() => addToCart(item)}>
          <Text style={styles.quantityText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

function Home({ navigation }) {
  const [dishName, setDishName] = useState('');
  const [menuData, setMenuData] = useState([]); 
  const [cart, setCart] = useState({}); 

  const fetchMenuData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
      const data = await response.json();
      setMenuData(data.menu); 
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

 
  useEffect(() => {
    fetchMenuData();
  }, []);

  
  const addToCart = (item) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[item.name]?.quantity || 0) + 1;
      return {
        ...prevCart,
        [item.name]: { ...item, quantity: newQuantity },
      };
    });
  };

  
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[item.name]?.quantity || 0) - 1;
      if (newQuantity <= 0) {
        const { [item.name]: _, ...remainingItems } = prevCart; 
        return remainingItems;
      }
      return {
        ...prevCart,
        [item.name]: { ...item, quantity: newQuantity },
      };
    });
  };

 
  const goToCheckout = () => {
    navigation.navigate('Checkout', { cart });
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.avatarContainer} 
        onPress={() => navigation.navigate('Profile')}
      >
        <Image
          source={require('../assets/avatar.png')}
          style={styles.avatar}
        />
      </Pressable>


      <Hero/>



      <FlatList
        data={menuData}
        keyExtractor={(item) => item.name} 
        renderItem={({ item }) => (
          <MenuItem 
            item={item} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
            quantity={cart[item.name]?.quantity || 0} 
          />
        )}
        contentContainerStyle={styles.flatListContainer}
      />


      <Pressable style={styles.cartContainer} onPress={goToCheckout}>
        <Ionicons name="cart" size={30} color="black" />
        <Text style={styles.cartCount}>{Object.keys(cart).length}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
  },
  avatarContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1, 
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make it round
    backgroundColor: '#ccc', // Optional: placeholder background color
  },
  flatListContainer: {
    paddingTop: 20, // Add some padding above the FlatList
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Space between items
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    paddingHorizontal:10
  },
  textContainer: {
    flex: 1, // Allow text container to take remaining space
    marginRight: 10, // Space between text and image
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Space between image and quantity controls
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
  },
  cartContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5, // Shadow effect
  },
  cartCount: {
    marginLeft: 5,
    fontSize: 16,
    color: '#000',
  },
});

export default Home;
