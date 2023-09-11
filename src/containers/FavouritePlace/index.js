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
import {logIn} from '../feature/userSlice/UserSlice';

const FavouritePlace = ({navigation}) => {
  const [placeList, setPlaceList] = useState([]);
  const uid = useSelector(state => state.user?.user?.uid);

  console.log(uid, 'useridinplace');

  useEffect(() => {
    const placeCollection = firestore().collection('UserMyPlaces');

    const unsubscribe = placeCollection.onSnapshot(querySnapshot => {
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

  const fetchPlace = async () => {
    try {
      const placeCollection = await firestore()
        .collection('UserMyPlaces')
        .where('uid', '==', uid)
        .get();
      console.log(placeCollection.docs, 'placeCollection.docs');
      setPlaceList(placeCollection.docs);
    } catch (err) {
      console.log(err);
    }
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coordinates: {
    fontSize: 16,
  },
});

export default FavouritePlace;
