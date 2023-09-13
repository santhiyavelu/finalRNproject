import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './style';

const UserPlacesScreen = ({route, navigation}) => {
  console.log(route, 'route details');
  const {userId} = route.params;
  console.log(userId);
  const [userPlaces, setUserPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('UserMyPlaces')
          .where('userId', '==', userId) // Filter places by userId
          .get();

        const places = querySnapshot.docs.map(doc => doc.data());
        setUserPlaces(places);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User's Places</Text>
      <FlatList
        data={userPlaces}
        renderItem={({item}) => (
          <View style={styles.placeItem}>
            <TouchableOpacity
              style={styles.placeButton}
              onPress={() =>
                navigation.navigate('Dashboard', {
                  latitude: item.latitude,
                  longitude: item.longitude,
                  placeName: item.placeName,
                })
              }>
              <Text style={styles.placeButtonText}>{item.placeName}</Text>
            </TouchableOpacity>
            <Text style={styles.placeDetails}>
              Latitude: {item.latitude} | Longitude: {item.longitude}
            </Text>
            {/* Add more details as needed */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
      />
    </View>
  );
};

export default UserPlacesScreen;
