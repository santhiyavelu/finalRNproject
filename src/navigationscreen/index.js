import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DashBoardScreen, LoginScreen, SignUpScreen} from '../containers';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import DrawerNavigation from '../drawernavigation';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const [isuser, isSetuser] = useState(false);

  const getMainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen
          name="DASHBOARD"
          component={DashBoardScreen}></Stack.Screen>
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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userObject => {
      console.log(userObject, 'userobject');
      isSetuser(userObject);
    });

    return subscriber;
  }, []);

  return (
    <Stack.Navigator>
      {isuser ? getMainStack() : getAuthStack()}
    </Stack.Navigator>
  );
};

export default NavigationScreen;
