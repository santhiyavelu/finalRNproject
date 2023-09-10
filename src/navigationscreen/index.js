import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignUpScreen} from '../containers';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SIGNUP" component={SignUpScreen}></Stack.Screen>
      <Stack.Screen name="LOGIN" component={LoginScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default NavigationScreen;
