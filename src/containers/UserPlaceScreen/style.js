import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeItem: {
    marginBottom: 16,
  },
  placeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 3,
  },
  placeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Adjust the color to your preference
  },
  mapIcon: {
    width: 34,
    height: 34,
    marginLeft: 8,
  },
  placeDetails: {
    marginTop: 8,
    fontSize: 14,
    color: 'gray',
  },
});

export default styles;
