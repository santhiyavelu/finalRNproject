import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

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
      console.log(props.markers, 'markerssss');
      return props.markers.map((marker, idx) => {
        return (
          <Marker
            draggable
            key={idx}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'red',
              }}>
              <Text>{marker.title}</Text>
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

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});

export default Map;
