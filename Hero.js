import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function Hero() {

  return (
    <View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>

        {/* Flex Direction Row */}
        <View style={styles.row}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            source={require('../assets/HeroImage.png')} // Path to your dish image
            style={styles.dishImage}
          />
        </View>
      </View>
    </View>
  );
}

export default Hero;

const styles = StyleSheet.create({
  hero: {
    alignItems: 'left',
    marginBottom: 20,
    backgroundColor: '#495E57',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#F4CE14'
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '600',
    color:'#EDEFEE'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  descriptionContainer: {
    flex: 1,
    paddingRight: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'left',
    fontWeight: '600',
    color:'#EDEFEE'
  },
  dishImage: {
    width: 150, // Adjust width as necessary
    height: 150, // Adjust height as necessary
    borderRadius: 10, // Optional: Add rounded corners
  },
});
