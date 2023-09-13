import React, {useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import MapScreen from '../MapScreen/MapScreen';

const DashboardScreen = ({navigation, route}) => {
  const mapRef = useRef(null); // Define mapRef

  const getInitialLocation = () => {
    if (route.params && route.params.latitude && route.params.longitude) {
      console.log(route.params, 'route');
      return {
        latitude: parseFloat(route.params.latitude), // Parse as float
        longitude: parseFloat(route.params.longitude),
      };
    }
    // If route.params is not available, use default coordinates
    return {
      latitude: 37.78825, // Default latitude
      longitude: -122.4324, // Default longitude
    };
  };

  return (
    <View style={styles.container}>
      {/* Pass mapRef */}
      <MapScreen initialLocation={getInitialLocation()} mapRef={mapRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DashboardScreen;
