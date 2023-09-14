import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import MapControl from '../../controls/Mapcontrol';

const UserMapView = () => {
  const [markers, setMarkers] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const parentControlMapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user places from Firestore
        const querySnapshot = await firestore()
          .collection('UsersPosition')
          .get();

        const places = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          places.push(data);
        });

        setUserPlaces(places);

        // Create markers based on user places
        const newMarkers = places.map((place, index) => ({
          id: index.toString(),
          coordinate: {
            latitude: place.latitude,
            longitude: place.longitude,
          },
          title: place.userName,
        }));

        setMarkers(newMarkers);
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchData();
  }, []);

  const animateToRegion = coords => {
    parentControlMapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  return (
    <View style={styles.container}>
      <MapControl
        onMapReady={() => setIsMapReady(true)}
        ref={parentControlMapRef}
        markers={markers}
      />
      {markers.map(marker => {
        return (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => animateToRegion(marker.coordinate)}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>{marker.title}</Text>
            </View>
          </Marker>
        );
      })}
    </View>
  );
};

export default UserMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'blue', // Change marker color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
