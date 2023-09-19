import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationScreen from './navigationscreen';
import {Provider} from 'react-redux';
import store from './store';
import 'react-native-gesture-handler';
import {PubNubProvider} from 'pubnub-react';
import pubnub from './helpers/pubnubhelper';

function App() {
  return (
    <Provider store={store}>
      <PubNubProvider client={pubnub}>
        <NavigationContainer>
          <NavigationScreen />
        </NavigationContainer>
      </PubNubProvider>
    </Provider>
  );
}

export default App;
