import React from 'react';
import {Text, Button, View, TextInput} from 'react-native-elements';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import DrawerNavigation from '../../drawernavigation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    return console.log('handle search');
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      />
      <Button title="Logout" onPress={handleLogout} />
    </>
  );
};

export default DashBoardScreen;
