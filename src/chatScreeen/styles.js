import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dropdownContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 25,
    width: 180,

    borderWidth: 1,
    borderColor: '#cccccc',
  },
  dropdownContainerStyle: {
    height: 20,
    width: 180,
  },
  dropdownTextStyle: {
    fontSize: 13,
  },
  messageContainer: {
    flex: 1,
    marginBottom: 16,
    padding: 16,
    // backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default styles;
