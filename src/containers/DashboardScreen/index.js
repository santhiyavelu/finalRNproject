// DashboardScreen.js
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapScreen from '../MapScreen/MapScreen';
import MapController from '../MapScreen/MapController';

const DashboardScreen = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const handleLocationChange = (latitude, longitude) => {
    setCurrentLocation({latitude, longitude});
  };

  return (
    <View style={styles.container}>
      <MapController onLocationChange={handleLocationChange} />
      <MapScreen
        initialLatitude={currentLocation.latitude}
        initialLongitude={currentLocation.longitude}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DashboardScreen;
