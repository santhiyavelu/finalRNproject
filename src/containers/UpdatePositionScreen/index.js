import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import LocationHelper from '../../helpers/LocationHelper'; // Import LocationHelper correctly

const UpdatePositionScreen = () => {
  const uid = useSelector(state => state.user?.user?.uid);
  console.log(uid, 'userid');

  const updatePosition = useCallback(
    async locationObject => {
      try {
        const {latitude, longitude, speed} = locationObject.coords;
        console.log(locationObject, 'updatescreen');

        const author = 'santhiya@test.com';
        const userId = uid;

        // Create a new position document in the 'UsersPosition' collection
        await firestore().collection('UsersPosition').doc(userId).set({
          author,
          currentLatitude: latitude,
          currentLongitude: longitude,
          locationTime: locationObject.timestamp,
          speed: speed,
          userId: uid,
          userName: author,
        });

        console.log('Position updated successfully:', latitude, longitude);
      } catch (error) {
        console.error('Error updating position:', error);
      }
    },
    [uid],
  );

  useEffect(() => {
    LocationHelper.checkLocationPermission(
      () => {
        LocationHelper.trackUserLocation(
          locationObject => {
            updatePosition(locationObject);
          },
          error => {
            console.error('Error tracking location:', error);
          },
        );
      },
      error => {
        console.error('Error checking location permission:', error);
      },
    );

    // Clean up location tracking when the component unmounts
    return () => {
      LocationHelper.stopLocationTracking();
    };
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
