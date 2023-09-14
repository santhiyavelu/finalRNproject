import React, {useCallback, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapScreen from '../MapScreen';
import {useDispatch} from 'react-redux';
import {logOut} from '../../feature/userSlice/UserSlice';

const DashboardScreen = ({navigation, route}) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const getInitialLocation = () => {
    if (route.params && route.params.latitude && route.params.longitude) {
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
      {/* MapScreen */}
      <MapScreen
        initialLocation={getInitialLocation()}
        mapRef={mapRef}
        routeParams={route.params}
        style={styles.map}
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(logOut()); // Dispatch the logOut action
        }}
        style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Arrange items vertically with space in-between
  },
  map: {
    flex: 1, // Make the MapScreen take up all available space
  },
  logoutButton: {
    position: 'absolute',
    bottom: -2, // Adjust the bottom position as needed
    alignSelf: 'center', // Center horizontally
    backgroundColor: 'red', // Customize the button's background color
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  logoutButtonText: {
    color: 'white', // Customize the button's text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
