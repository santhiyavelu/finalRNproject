import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
