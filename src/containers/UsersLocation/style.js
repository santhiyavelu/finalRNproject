import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative', // Position relative for layering
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  chatContainer: {
    position: 'absolute', // Position absolute to layer it on top
    zIndex: 1, // Higher zIndex to stack on top of the map
    top: 0, // Align at the top of the screen
    left: 0, // Align at the left of the screen
    right: 0, // Align at the right of the screen
    // alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  markerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 2,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  senderName: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  messageText: {
    flex: 1, // Takes remaining space
  },
  closeButtonContainer: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
export default styles;
