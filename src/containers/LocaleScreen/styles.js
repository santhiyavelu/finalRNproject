import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue', // Change to your selected color
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  selectedButtonText: {
    fontSize: 18,
    color: 'white', // Change to your selected text color
  },
});

export default styles;
