import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F2F2F2', // Background color for the entire ActionSheet
  },
  messageContainer: {
    flexDirection: 'column', // Display messages vertically
    alignItems: 'flex-start', // Align messages to the left
    marginBottom: 16,
  },
  receivedMessageContainer: {
    backgroundColor: '#E5E5EA', // Background color for received messages
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start', // Align received messages to the left
    marginBottom: 14,
  },
  receivedMessageText: {
    fontSize: 16,
    color: 'black', // Text color for received messages
  },
  sendingMessageContainer: {
    backgroundColor: '#007AFF', // Background color for sending messages
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-end', // Align sending messages to the right
    marginBottom: 4,
  },
  sendingMessageText: {
    fontSize: 16,
    color: 'white', // Text color for sending messages
  },
  closeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center', // Corrected
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
