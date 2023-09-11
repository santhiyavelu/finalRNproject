// MapScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';

const MapScreen = ({initialLatitude, initialLongitude}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [markers, setMarkers] = useState([]);

  const placeCollection = firestore().collection('UserMyPlaces');

  const [mapRegion, setMapRegion] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleSearch = () => {
    // Parse latitude and longitude)
    const [latitude, longitude] = searchText.split(',').map(parseFloat);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      // Update the mapRegion with the new latitude and longitude
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      console.warn('Invalid latitude or longitude');
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddPlace = async () => {
    try {
      // Ensure that you have a valid latitude, longitude, and place name
      if (
        !isNaN(mapRegion.latitude) &&
        !isNaN(mapRegion.longitude) &&
        searchText
      ) {
        const {latitude, longitude} = mapRegion;
        const placeName = searchText; // Use the entered searchText as placeName

        // Add a new document to the 'UserMyPlaces' collection with the specified data
        await placeCollection.add({
          latitude,
          longitude,
          placeName, // Use searchText as placeName
          userId: auth().currentUser.uid, // Assuming you want to associate the place with the currently logged-in user
        });

        // Optionally, provide user feedback that the place has been added.
        console.log('Place added successfully!');
      } else {
        console.warn('Invalid latitude, longitude, or place name');
      }
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={newText => setSearchText(newText)}
          value={searchText}
          placeholder="Enter your search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion} // Use the updated mapRegion here
        showsUserLocation
      />
      <TouchableOpacity style={styles.addPlaceButton} onPress={handleAddPlace}>
        <Text style={styles.addPlaceButtonText}>Add Place</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
