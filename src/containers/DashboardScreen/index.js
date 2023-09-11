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
import {useEffect} from 'react';

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [markers, setMarkers] = useState([]);

  const placeCollection = firestore().collection('UserMyPlaces');

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Create a listener that updates markers when data changes in Firestore
    const unsubscribe = placeCollection.onSnapshot(querySnapshot => {
      const updatedMarkers = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        updatedMarkers.push({
          id: doc.id,
          latitude: data.latitude,
          longitude: data.longitude,
          placeName: data.placeName,
        });
      });

      setMarkers(updatedMarkers);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const handleSearch = () => {
    // Parse latitude and longitude from the searchText (assuming searchText is in the format "lat,lng")
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
        const placeName = searchText;

        // Add a new document to the 'UserMyPlaces' collection with the specified data
        await placeCollection.add({
          latitude,
          longitude,
          placeName,
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlace}>
        <Text>Add Place</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashBoardScreen;
