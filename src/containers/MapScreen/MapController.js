// LocationHandler.js
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {LocationHelper} from '../../helpers';

const MapController = ({onLocationChange}) => {
  useEffect(() => {
    // Request and check location permissions
    LocationHelper.checkLocationPermission(
      () => {
        // Permission granted, fetch user's current location
        LocationHelper.fetchLocation(
          location => {
            // Pass the location to the parent component
            onLocationChange(
              location.coords.latitude,
              location.coords.longitude,
            );
          },
          error => {
            console.error('Error fetching location:', error);
          },
        );
      },
      error => {
        console.error('Location permission denied:', error);
      },
    );
  }, [onLocationChange]);

  return null;
};

export default MapController;