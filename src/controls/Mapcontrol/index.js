import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './style';

const Map = forwardRef((props, ref) => {
  const mapViewRef = useRef(null);
  const [coords, setCoords] = useState(null);

  useImperativeHandle(ref, () => ({
    animateToRegion: (region, duration) => {
      mapViewRef.current?.animateToRegion(region, duration);
      setCoords({latitude: region.latitude, longitude: region.longitude});
    },
  }));

  const renderMarkers = () => {
    if (props.markers?.length) {
      // console.log(props.markers, 'markerfromuserlocation');
      return props.markers.map((marker, idx) => {
        return (
          <Marker
            draggable
            key={idx}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}>
            {/* Custom marker view */}
            <View style={styles.markerContainer}>
              {/* Set the borderRadius to make it a circle */}
              <View
                style={[
                  styles.circle,
                  {backgroundColor: marker.color}, // Set the background color based on marker.color
                ]}>
                <Text style={styles.markerText}>{marker.title}</Text>
              </View>
            </View>
          </Marker>
        );
      });
    } else {
      if (coords) {
        return (
          <Marker draggable coordinate={coords} title={''} description={''} />
        );
      }
    }
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={mapViewRef}
      style={styles.mapView}
      onMapReady={props.onMapReady}
      showsMyLocationButton
      showsUserLocation
      initialRegion={{
        latitude: 37.54940083,
        longitude: -122.37414932,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {renderMarkers()}
    </MapView>
  );
});

export default Map;
