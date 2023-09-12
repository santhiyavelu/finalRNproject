import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import styles from './styles';

const FavouritePlace = ({navigation}) => {
  const [placeList, setPlaceList] = useState([]);
  const uid = useSelector(state => state.user?.user?.uid);
  const placeCollection = firestore().collection('UserMyPlaces');

  console.log(uid, 'useridinplace');

  useEffect(() => {
    const subscribe = placeCollection
      .where('userId', '==', uid) // Filter by userId
      .onSnapshot(querySnapshot => {
        const updatedPlaceList = querySnapshot.docs.map(doc => {
          const place = doc.data();
          return {
            latitude: place.latitude,
            longitude: place.longitude,
            placeName: place.placeName,
            userName: place.userName,
            userId: place.userId,
          };
        });
        setPlaceList(updatedPlaceList); // Update state with the retrieved data
      });

    return () => {
      if (subscribe) {
        subscribe();
      }
    };
  }, [uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Places</Text>
      <FlatList
        data={placeList}
        renderItem={({item}) => (
          <View style={styles.placeContainer}>
            <Text style={styles.placeName}>{item.placeName}</Text>
            <Text style={styles.coordinates}>
              Latitude: {item.latitude}, Longitude: {item.longitude}
            </Text>
          </View>
        )}
        keyExtractor={item => item.userId} // Provide a unique key for each item
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MAPS');
        }}>
        <Text>Add Place</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavouritePlace;
