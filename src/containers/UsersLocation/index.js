import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import MapControl from '../../controls/Mapcontrol';
import styles from './style';

const UserLocation = () => {
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
        const markersData = places.map(place => ({
          coordinate: {
            latitude: place.currentLatitude,
            longitude: place.currentLongitude,
          },
          title: place.author,
        }));

        setMarkers(markersData);
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
      <View style={styles.mapContainer}>
        <MapControl
          onMapReady={() => setIsMapReady(true)}
          ref={parentControlMapRef}
          markers={markers}
        />
      </View>
      <View style={styles.markerContainer}>
        {markers.map(marker => (
          <TouchableOpacity
            key={marker.title}
            style={styles.button}
            onPress={() => animateToRegion(marker.coordinate)}>
            <Text style={styles.buttonText}>{marker.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default UserLocation;
