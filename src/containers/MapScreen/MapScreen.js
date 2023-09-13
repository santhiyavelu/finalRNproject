import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const MapScreen = ({initialLocation, mapRef, routeParams}) => {
  const [searchText, setSearchText] = useState('');
  const [markerLocation, setMarkerLocation] = useState(null);
  const placeCollection = firestore().collection('UserMyPlaces');
  const uid = useSelector(state => state.user?.user?.uid);
  const hideSearch = routeParams?.hideSearch;

  useEffect(() => {
    const lat = initialLocation.latitude;
    const lng = initialLocation.longitude;

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...initialLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }

    setMarkerLocation({latitude: lat, longitude: lng});
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

      setMarkerLocation({latitude: lat, longitude: lng});
    }
  };

  const handleAddPlace = async () => {
    if (markerLocation && searchText) {
      const {latitude, longitude} = markerLocation;

      const placeDetails = {
        latitude: latitude,
        longitude: longitude,
        placeName: searchText,
        userName: 'santhiya',
        userId: uid,
      };

      // Use 'add' to automatically generate a unique ID for the document
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

  return (
    <View style={styles.container}>
      {/* Conditionally render the GooglePlacesAutocomplete based on hideSearch */}
      {!hideSearch && (
        <View style={styles.searchContainer}>
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
      )}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...initialLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        ref={mapRef}>
        {markerLocation && (
          <Marker
            coordinate={markerLocation}
            title="Selected Location"
            pinColor="red"
          />
        )}
      </MapView>
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
