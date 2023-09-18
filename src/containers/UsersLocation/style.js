import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  mapContainer: {
    flex: 1,
  },
  markerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  iconContainer: {
    position: 'absolute',
    top: 10, // Adjust the top and left values to position the icon as needed
    left: 10,
  },

  icon: {
    width: 30, // Adjust the width and height for the icon
    height: 30,
  },
});
export default styles;
