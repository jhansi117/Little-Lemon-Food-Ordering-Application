// CustomHeader.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/headerImage.png')} // Ensure the path is correct
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60, // Adjust height as necessary
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // Match your background color
  },
  logo: {
    width: 150, // Adjust width as necessary
    height: 40, // Adjust height as necessary
    resizeMode: 'contain', // Maintain aspect ratio
  },
});

export default CustomHeader; // Ensure this is a default export if used as such
