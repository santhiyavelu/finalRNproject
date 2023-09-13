import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {LocationHelper} from '../../helpers';

const MapController = ({mapRef}) => {
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    if (!locationFetched) {
      // Request and check location permissions
      LocationHelper.checkLocationPermission(
        () => {
          // Permission granted, fetch user's current location
          LocationHelper.fetchLocation(
            location => {
              console.log(mapRef, 'mapRef');
              console.log(location, 'location');
              // Pass the location to the parent component
              onLocationChange(
                location.coords.latitude,
                location.coords.longitude,
              );
              // Set locationFetched to true to prevent re-fetching
              setLocationFetched(true);
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
    }
  }, [locationFetched]);

  return null;
};

export default MapController;
