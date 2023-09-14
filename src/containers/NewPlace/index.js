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
  }, [coords]);

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
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            predefinedPlacesDescription: styles.predefinedPlacesDescription,
            listView: styles.listView,
          }}
        />
      </View>

      <MapControl
        onMapReady={() => setIsMapReady(true)}
        ref={parentControlMapRef}
        style={styles.map}
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
    backgroundColor: '#F8F8F8',
  },
  searchContainer: {
    zIndex: 2, // Set a higher zIndex for the search container
    elevation: 3,
    // backgroundColor: 'white',
    // padding: 16,
    borderRadius: 8,
    // marginBottom: 16,
    // marginHorizontal: 16,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 48,
    color: '#5d5d5d',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  listView: {
    zIndex: 3, // Set a higher zIndex for the drop-down list
    maxHeight: 200, // Limit the drop-down list height
  },
  map: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    // margin: 16,
  },
  addPlaceButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  addPlaceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NewPlaceScreen;
