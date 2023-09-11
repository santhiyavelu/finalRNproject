import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DashBoardScreen, LoginScreen, SignUpScreen} from '../containers';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import DrawerNavigation from '../drawernavigation';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../feature/userSlice/UserSlice';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const [isuser, isSetuser] = useState(false);
  const dispatch = useDispatch();

  const getMainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="Home" component={DrawerNavigation} />
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
      console.log(userObject.email, 'uid');
      const {uid, email} = userObject;
      const userData = {uid, email}; // Create an object with uid and email
      dispatch(logIn(userData));
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
