import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  chatScreen: {
    flex: 1,
  },
  mapContainer: {
    flex: 2,
    backgroundColor: '#eee',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messageInput: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  senderName: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  messageText: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userButton: {
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 4,
  },
  userButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default styles;
