import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from './screens/Onboard';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Home from './screens/Home';
import CustomHeader from './components/CustomHeader';
import Checkout from './screens/Checkout';

const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer>
       <Stack.Navigator   screenOptions={{ 
         headerStyle: {backgroundColor: '#F9F9F9'  },
         headerTitleAlign:'center',
         headerTitle:()=><CustomHeader/>,
         }}>
         
         <Stack.Screen name="Onboard" component={Onboard} />
         <Stack.Screen name="Signup" component={Signup} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Profile" component={Profile} />
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

