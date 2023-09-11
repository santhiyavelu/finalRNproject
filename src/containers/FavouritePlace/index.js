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
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const FavouritePlace = ({navigation}) => {
  const [placeList, setPlaceList] = useState([]);
  const uid = useSelector(state => state.user?.user?.uid);

  console.log(uid, 'useridinplace');

  useEffect(() => {
    const placeCollection = firestore().collection('UserMyPlaces');

    const unsubscribe = placeCollection
      .where('uid', '==', uid)
      .onSnapshot(querySnapshot => {
        const updatedPlaceList = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          updatedPlaceList.push({
            id: doc.id,
            latitude: data.latitude,
            longitude: data.longitude,
            placeName: data.placeName,
          });
        });
        setPlaceList(updatedPlaceList);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
      />
    </View>
  );
};

export default FavouritePlace;
