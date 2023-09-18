import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import MapControl from '../../controls/Mapcontrol';
import styles from './style';
import {useSelector} from 'react-redux';

const UserLocation = () => {
  const [markers, setMarkers] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const parentControlMapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const messages = useSelector(state => state.message.messages);

  console.log(messages, 'meaasge');

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
          color: place.userColor,
          title: place.author,
          userId: place.userId,
        }));

        setMarkers(markersData);
        console.log(markersData, 'markeresdata');
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
          <View key={marker.title} style={styles.markerContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                animateToRegion(marker.coordinate);
                setSelectedMarker(marker);
              }}>
              <Text style={styles.buttonText}>
                {marker.title}
                {/* {marker.userId} */}
              </Text>
              {messages.some(message => message.sender === marker.userId) && (
                <Image
                  source={require('/Users/santhiyavelusamy/Documents/ReactNative/FinalProject/src/assets/images/msg.png')}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Display received messages */}
      {selectedMarker && (
        <View>
          {messages
            .filter(message => message.sender === selectedMarker.userId)
            .map((message, index) => (
              <Text key={index}>
                {message.sender}: {message.text}
              </Text>
            ))}
        </View>
      )}
    </View>
  );
};

export default UserLocation;
