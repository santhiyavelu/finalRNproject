import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import MapControl from '../../controls/Mapcontrol';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

const placeCollection = firestore().collection('UserMyPlaces');

const NewPlaceScreen = ({navigation, route}) => {
  const params = route.params;
  const parentControlMapRef = useRef(null);
  const uid = useSelector(state => state.user?.user?.uid);
  const [searchText, setSearchText] = useState('');
  const [coords, setCoords] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (coords) {
      parentControlMapRef.current?.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [isMapReady, coords]);

  useEffect(() => {
    if (isMapReady && params?.latitude && params?.longitude) {
      parentControlMapRef.current?.animateToRegion({
        latitude: params?.latitude,
        longitude: params?.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [isMapReady, params]);

  const handleAddPlace = async () => {
    if (coords && searchText) {
      const {latitude, longitude} = coords;

      const placeDetails = {
        latitude: latitude,
        longitude: longitude,
        placeName: searchText,
        userName: 'santhiya',
        userId: uid,
      };

      placeCollection
        .add(placeDetails)
        .then(docRef => {
          console.log('Place added successfully with ID:', docRef.id);
          console.log(placeDetails);
        })
        .catch(error => {
          console.error('Error adding place:', error);
        });
    } else {
      console.log('Invalid latitude, longitude, or place name');
    }
  };

  const handleSearch = async details => {
    try {
      if (details) {
        const {geometry} = details;
        if (geometry && geometry.location) {
          const {lat, lng} = geometry.location;
          setCoords({latitude: lat, longitude: lng});
        }
      }
    } catch (error) {
      console.error('Error handling search:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Box */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          handleSearch(details);
          setSearchText(data.description);
        }}
        query={{
          key: 'AIzaSyCoO6U745TXpW0izoMKg3fActvqTFHsu5M', // Replace with your Google Maps API key
          language: 'en',
        }}
        styles={searchBoxStyles}
      />

      {/* Map View */}
      <MapControl
        onMapReady={() => setIsMapReady(true)}
        ref={parentControlMapRef}
        style={styles.map}
      />

      {/* Add Place Button */}
      <TouchableOpacity style={styles.addPlaceButton} onPress={handleAddPlace}>
        <Text style={styles.addPlaceButtonText}>Add Place</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPlaceScreen;
const searchBoxStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  // Add styles for the search box as needed
});
