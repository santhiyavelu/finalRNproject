import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const MARKERS = [
  {
    coordinates: {latitude: 0, longitude: 0},
    title: 'middle',
    description: 'middle of earth',
  },
  {
    coordinates: {latitude: 0.5, longitude: 0.5},
    title: 'middle',
    description: 'middle of earth',
  },
];

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
      return props.markers.map((marker, idx) => {
        return (
          <Marker
            draggable
            key={idx}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
          />
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
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {renderMarkers()}
    </MapView>
  );
});

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});

export default Map;
