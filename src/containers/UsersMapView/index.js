import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const UserMapView = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const markerColors = ['red', 'blue', 'green', 'orange', 'purple']; // Define marker colors

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
      } catch (error) {
        console.error('Error fetching user places:', error);
      }
    };

    fetchData();
  }, []);

  console.log(userPlaces, 'userplaces');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.60842489,
          longitude: -122.42770088,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {userPlaces.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.currentLatitude,
              longitude: place.currentLongitude,
            }}
            pinColor={markerColors[index % markerColors.length]} // Use a color from the array
          >
            <View style={styles.markerContainer}>
              <View
                style={[
                  styles.marker,
                  {backgroundColor: markerColors[index % markerColors.length]},
                ]}>
                <Text style={styles.markerText}>{place.author}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
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
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
