import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, Alert, Switch, ScrollView, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({ navigation }) {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [notifications, setNotifications] = useState({
    orderStatus: false,
    specialOffers: false,
    newsletter: false,
    birthdayOffers: false,
  });

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userProfile');
      const userNotifications = await AsyncStorage.getItem('userNotifications');
      const userImage = await AsyncStorage.getItem('userImage');

      if (userData) {
        const parsedData = JSON.parse(userData);
        setFirstName(parsedData.firstName);
        setLastName(parsedData.lastName);
        setEmail(parsedData.email);
        setPhoneNumber(parsedData.phoneNumber);
        setAddress(parsedData.address);
        setDob(parsedData.dob);
      }

      if (userNotifications) {
        setNotifications(JSON.parse(userNotifications));
      }

      if (userImage) {
        setImage(userImage);
      }
    };

    loadUserData();
  }, []);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setImage(null); 
  };

  const handleSaveChanges = async () => {
    const userProfile = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      dob,
    };

    await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
    await AsyncStorage.setItem('userImage', image || '');
    await AsyncStorage.setItem('userNotifications', JSON.stringify(notifications));

    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleDiscardChanges = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setAddress('');
    setDob('');
  };

  const handleLogout = async () => {
    await AsyncStorage.clear(); 
    navigation.navigate('Onboard');
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>

        <View style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <Image source={require('../assets/avatar.png')} style={styles.avatar} />
          )}




          <View style={styles.buttonContainer}>
            <View style={{width:80}}>
              <Pressable 
              onPress={handleImagePick} 
              style={{backgroundColor:'#F4CE14', paddingHorizontal:2, paddingVertical:10, borderRadius:3}} >
                <Text style={{fontWeight:600, padding:5, textAlign:'center'}}>Change</Text>
              </Pressable>
            </View>

            <View style={{width:70, marginLeft:20}}>
              <Pressable 
                onPress={handleRemoveImage}
                style={{backgroundColor:'#F4CE14', paddingHorizontal:2, paddingVertical:10, borderRadius:3}}
                >
                <Text style={{fontWeight:600, padding:5, textAlign:'center'}}>Remove</Text>
              </Pressable>
            </View>
          </View>



        </View>





        <View style={styles.form}>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={[styles.input, styles.addressInput]}
          />
          <TextInput
            placeholder="DOB (YYYY-MM-DD)"
            value={dob}
            onChangeText={setDob}
            style={styles.input}
          />
        </View>

        <Text style={styles.subTitle}>Email Notifications</Text>
        <View style={styles.checkboxContainer}>
          {Object.keys(notifications).map((key) => (
            <View key={key} style={styles.checkboxRow}>
              <Text style={{color:'white'}}>{key.replace(/([A-Z])/g, ' $1')}</Text>
              <Switch
                value={notifications[key]}
                onValueChange={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                thumbColor="#F4CE14"
              />
            </View>
          ))}
        </View>

        <Button title="Log Out" onPress={handleLogout} color="#333333" />

        <View style={styles.actionButtons}>
          <Button title="Discard Changes" onPress={handleDiscardChanges} color="#333333" />
          <Button title="Save Changes" onPress={handleSaveChanges} color="#333333" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#495E57',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4CE14',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F4CE14',
    marginHorizontal:30
  },
  

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  
  form: {
    marginBottom: 20,
  },
  input: {
    height: 35,
    borderColor: '#F4CE14',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#F5F5F7',
  },
  addressInput: {
    height: 70,
    textAlignVertical: 'top',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical:10
  },
});

export default Profile;
