import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './style';

const UserPlacesScreen = ({route, navigation}) => {
  const {userId} = route.params;
  const [userPlaces, setUserPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('UserMyPlaces')
          .where('userId', '==', userId)
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
                  hideSearch: true,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  placeName: item.placeName,
                })
              }>
              <View style={styles.placeContent}>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>{item.placeName}</Text>
                </View>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() =>
                    navigation.navigate('Dashboard', {
                      hideSearch: true,
                      latitude: item.latitude,
                      longitude: item.longitude,
                      placeName: item.placeName,
                    })
                  }>
                  <Image
                    source={require('/Users/santhiyavelusamy/Documents/ReactNative/FinalProject/src/assets/images/map.png')}
                    style={styles.mapIcon}
                  />
                </TouchableHighlight>
              </View>
            </TouchableOpacity>
            <Text style={styles.placeDetails}>
              Latitude: {item.latitude} | Longitude: {item.longitude}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default UserPlacesScreen;
