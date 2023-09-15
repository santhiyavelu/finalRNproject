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
    marginBottom: 16,
  },
  userText: {
    fontSize: 16,
    color: '#333', // Adjust the color to your preference
  },
  clickableUserId: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: 'blue', // Adjust the color to your preference
  },
});

export default styles;
