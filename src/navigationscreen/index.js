import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DashBoardScreen,
  LoginScreen,
  SignUpScreen,
  UserPlacesScreen,
} from '../containers';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import DrawerNavigation from '../drawernavigation';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../feature/userSlice/UserSlice';
import MessageScreen from '../containers/UsersLocation/Messagescreen';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const isuser = useSelector(state => state.user.isLoggedin);

  console.log(isuser, 'statevalue');

  const dispatch = useDispatch();

  const getMainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen
          name="DashBoard"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Message"
          component={MessageScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
    );
  };

  const getAuthStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="SIGNUP" component={SignUpScreen}></Stack.Screen>
        <Stack.Screen name="LOGIN" component={LoginScreen}></Stack.Screen>
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>
      {isuser ? getMainStack() : getAuthStack()}
    </Stack.Navigator>
  );
};

export default NavigationScreen;
