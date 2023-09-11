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
import {Provider} from 'react-redux';
import store from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationScreen />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
