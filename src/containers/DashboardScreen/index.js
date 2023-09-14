import React, {useCallback, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapScreen from '../NewPlace';
import {useDispatch} from 'react-redux';
import {logOut} from '../../feature/userSlice/UserSlice';

const DashboardScreen = ({navigation, route}) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
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
    justifyContent: 'space-between',
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
