import React, {useEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {LocationHelper} from '../../helpers';

const UpdatePositionScreen = () => {
  const uid = useSelector(state => state.user?.user?.uid);
  console.log(uid, 'userid');

  const getUnixTimeStamp = () => {
    return Math.round(new Date().getTime() / 1000);
  };

  // Define the updatePosition function
  const updatePosition = useCallback(async () => {
    try {
      // Use LocationHelper to fetch the current location
      LocationHelper.fetchLocation(
        async position => {
          const {latitude, longitude} = position.coords;

          // Replace with your user-specific data
          const author = 'santhiya@test.com';
          const userId = uid;

          // Create a new position document in the 'UsersPosition' collection
          await firestore().collection('UsersPosition').doc(userId).set({
            author,
            currentLatitude: latitude,
            currentLongitude: longitude,
            locationTime: getUnixTimeStamp(),
            speed: 1,
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
    // Set up an interval to update position every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(updatePosition, 300000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [updatePosition]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Updating Position</Text>
      <Button title="Update Now" onPress={updatePosition} />
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
