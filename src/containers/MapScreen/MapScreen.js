import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const MapScreen = ({initialLocation, mapRef}) => {
  const [searchText, setSearchText] = useState('');
  const placeCollection = firestore().collection('UserMyPlaces');
  const uid = useSelector(state => state.user?.user?.uid);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...initialLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [initialLocation, mapRef]);

  const handleSearch = details => {
    if (details && details.geometry && details.geometry.location) {
      const {geometry} = details;
      const {location} = geometry;
      const {lat, lng} = location;

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    }
  };

  function generateUniqueId() {
    // Create a unique ID based on the current timestamp
    return new Date().getTime().toString();
  }

  const handleAddPlace = async () => {
    if (initialLocation.latitude && initialLocation.longitude) {
      const {latitude, longitude} = initialLocation;

      // Generate a unique ID for the new place
      const newPlaceId = generateUniqueId(); // You should implement this function

      await placeCollection.doc(newPlaceId).set({
        latitude: latitude,
        longitude: longitude,
        placeName: searchText,
        userId: uid,
        userName: 'santhiya',
      });

      console.log('Place added successfully with ID:', newPlaceId);
    } else {
      console.log('Invalid latitude, longitude, or place name');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(data);
            handleSearch(details);
            setSearchText(data.description);
          }}
          query={{
            key: 'AIzaSyCoO6U745TXpW0izoMKg3fActvqTFHsu5M',
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...initialLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        ref={mapRef}
      />
      <TouchableOpacity style={styles.addPlaceButton} onPress={handleAddPlace}>
        <Text style={styles.addPlaceButtonText}>Add Place</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  addPlaceButton: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: '#1faadb',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addPlaceButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
