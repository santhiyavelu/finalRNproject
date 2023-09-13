import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserPlacesScreen = ({route, navigation}) => {
  console.log(route, 'route details');
  const {userId} = route.params;
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
    <View>
      <Text>User's Places</Text>
      <FlatList
        data={userPlaces}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Dashboard', {
                  latitude: item.latitude,
                  longitude: item.longitude,
                  placeName: item.placeName,
                })
              }>
              <Text>{item.placeName}</Text>
            </TouchableOpacity>
            <Text>Latitude: {item.latitude}</Text>
            <Text>Longitude: {item.longitude}</Text>
            {/* Add more details as needed */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
      />
    </View>
  );
};

export default UserPlacesScreen;
