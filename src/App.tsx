/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationScreen from './navigationscreen';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NavigationScreen />
    </NavigationContainer>
  );
}

export default App;
