// DashboardScreen.js
import React, {useCallback, useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import MapScreen from '../MapScreen/MapScreen';
import MapController from '../MapScreen/MapController';

const DashboardScreen = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const handleLocationChange = useCallback((latitude, longitude) => {
    setCurrentLocation({latitude, longitude});
  }, []);

  const mapRef = useRef(null); // Define mapRef

  return (
    <View style={styles.container}>
      <MapController onLocationChange={handleLocationChange} mapRef={mapRef} />
      {/* Pass mapRef */}
      <MapScreen
        initialLatitude={currentLocation.latitude}
        initialLongitude={currentLocation.longitude}
        mapRef={mapRef} // Pass mapRef
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
