import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationScreen from './navigationscreen';
import {Provider} from 'react-redux';
import store from './store';
import 'react-native-gesture-handler';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationScreen />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
