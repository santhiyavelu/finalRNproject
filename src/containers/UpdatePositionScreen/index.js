import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {LocationHelper} from '../../helpers';

const UpdatePositionScreen = () => {
  const uid = useSelector(state => state.user?.user?.uid);
  console.log(uid, 'userid');

  const getUnixTimeStamp = () => {
    return Math.round(new Date().getTime() / 1000);
  };

  const updatePosition = useCallback(async () => {
    try {
      // Use LocationHelper to fetch the current location
      LocationHelper.fetchLocation(
        async position => {
          const {latitude, longitude, speed} = position.coords;
          console.log(position, 'updatescreen');

          const author = 'santhiya@test.com';
          const userId = uid;

          // Create a new position document in the 'UsersPosition' collection
          await firestore().collection('UsersPosition').doc(userId).set({
            author,
            currentLatitude: latitude,
            currentLongitude: longitude,
            locationTime: position.timestamp,
            speed: speed,
            userId: uid,
            userName: author,
          });

          console.log('Position updated successfully:', latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
        },
      );
    } catch (error) {
      console.error('Error updating position:', error);
    }
  }, [uid]);

  useEffect(() => {
    //setting interval
    const intervalId = setInterval(updatePosition, 300000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [updatePosition]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Updating Position</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default UpdatePositionScreen;
