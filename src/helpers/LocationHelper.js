import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import GeoLocation from 'react-native-geolocation-service';
import {Platform} from 'react-native';

class LocationHelper {
  fetchLocation = (success, failure) => {
    GeoLocation.getCurrentPosition(
      position => {
        if (success) {
          success(position);
        }
      },
      error => {
        if (failure) {
          failure(error);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000,
      },
    );
  };

  trackUserLocation = (success, failure) => {
    GeoLocation.watchPosition(
      locationObject => {
        if (success) {
          success(locationObject);
        }
      },
      error => {
        if (failure) {
          failure(error);
        }
      },
      {
        enableHighAccuracy: true,
        forceRequestLocation: true,
        showLocationDialog: true,
        distanceFilter: 0.05,
        useSignificantChanges: true,
        showsBackgroundLocationIndicator: true,
        interval: 5000,
      },
    );
  };

  stopLocationTracking = () => {
    GeoLocation.stopObserving();
  };

  checkLocationPermission = (successCallback, failureCallback) => {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.requestPermission(successCallback, failureCallback);
            break;
          case RESULTS.DENIED:
            this.requestPermission(successCallback, failureCallback);
            break;
          case RESULTS.GRANTED:
            successCallback();
            break;
          case RESULTS.BLOCKED:
            this.requestPermission(successCallback, failureCallback);
            break;
        }
      })
      .catch(error => {
        failureCallback(error);
      });
  };

  requestPermission = (successCallback, failureCallback) => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        if (successCallback) successCallback();
      })
      .catch(error => {
        if (failureCallback) failureCallback();
      });
  };
}

export default new LocationHelper();
