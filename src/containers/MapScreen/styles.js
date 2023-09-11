import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: 'white',
  },
  map: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 16,
    alignItems: 'center',
  },
});

export default styles;
