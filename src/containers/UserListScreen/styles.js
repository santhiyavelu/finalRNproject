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
  userItem: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row', // Arrange text horizontally
  },
  clickableUserId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue', // Make the user ID text appear as a link
    textDecorationLine: 'underline', // Underline the user ID text
    marginLeft: 4, // Add a little spacing between user name and user ID
  },
});

export default styles;
