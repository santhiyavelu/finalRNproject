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
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../feature/userSlice/UserSlice';
import useLocale from '../../helpers/LocalizationHelper';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const MapScreen = ({
  navigation,
  initialLatitude,
  initialLongitude,
  mapRef,
  route,
}) => {
  const {i18n, setLocale} = useLocale();
  const [searchText, setSearchText] = useState('');
  const uid = useSelector(state => state.user?.user?.uid);
  const dispatch = useDispatch();

  const placeCollection = firestore().collection('UserMyPlaces');

  const [mapRegion, setMapRegion] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleSearch = details => {
    if (details && details.geometry && details.geometry.location) {
      console.log(details, 'details');
      // Extract the latitude and longitude from the selected place's details
      const {geometry} = details;
      const {location} = geometry;
      const {lat, lng} = location;

      // Update the mapRegion with the new latitude and longitude
      setMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      if (mapRef.current) {
        // Move the map to the selected place
        mapRef.current.animateToRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } else {
      console.log('Invalid place details');
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logOut());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddPlace = async () => {
    if (mapRegion.latitude && mapRegion.longitude) {
      const {latitude, longitude} = mapRegion;
      const placeName = 'testplace'; //searchText;

      await placeCollection.add({
        latitude: latitude,
        longitude: longitude,
        placeName: searchText,
        userId: uid,
        userName: 'test',
      });

      console.log(placeCollection, 'Place added successfully!');
    } else {
      console.log('Invalid latitude, longitude, or place name');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{i18n.t('hello')}</Text>
      <Text>
        {i18n.t('welcome')} {i18n.t('haveANiceDay')}
      </Text>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(data);
            handleSearch(details);
            setSearchText(data.description); // Set the selected place description as the search text
            // Handle latitude and longitude here if needed
            // Move the map to the selected place
            if (mapRef.current) {
              mapRef.current.animateToRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
          }}
          query={{
            key: 'AIzaSyCoO6U745TXpW0izoMKg3fActvqTFHsu5M', // Replace with your API Key
            language: 'en',
          }}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        showsUserLocation
        // onRegionChange={newRegion => console.log('New Region:', newRegion)}
        ref={mapRef}
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
