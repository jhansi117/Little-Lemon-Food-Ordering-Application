import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

function Onboard({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>

      <View style={styles.hero}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>

        <View style={styles.row}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            source={require('../assets/HeroImage.png')}
            style={styles.dishImage}
          />
        </View>
      </View>

      <PagerView 
        style={styles.carousel} 
        initialPage={0} 
        onPageSelected={e => setCurrentPage(e.nativeEvent.position)} 
      >
        <View style={styles.page} key="1">
          <Text style={styles.carouselText}>Are you hungry?</Text>
        </View>
        <View style={styles.page} key="2">
          <Text style={styles.carouselText}>Feel like not cooking?</Text>
        </View>
        <View style={styles.page} key="3">
          <Text style={styles.carouselText}>Craving pasta?</Text>
        </View>
      </PagerView>


      <View style={styles.pagination}>
        {[...Array(3)].map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              currentPage === index ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCD2A',
  },
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
    width: 150, 
    height: 150, 
    borderRadius: 10, 
  },
  carousel: {
    height: 100, 
    marginVertical: 20,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#495E57', 
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20, 
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#495E57', // Active dot color
  },
  inactiveDot: {
    backgroundColor: '#81A263', // Inactive dot color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#495E57', 
    borderRadius: 20, 
    paddingVertical: 15, 
    marginHorizontal: 10, 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#EDEFEE', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
});
