import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../containers';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="signup" component={SignUpScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default NavigationScreen;
