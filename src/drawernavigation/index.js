import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  LocaleScreen,
  FavouritePlace,
  userListScreen,
  UserPlacesScreen,
  MapScreen,
  UpdatePositionScreen,
  UserLocation,
  UserProfile,
  NewPlaceScreen,
} from '../containers';
import useLocale from '../helpers/LocalizationHelper';
import {ScrollView} from 'react-native';
import useLogout from '../hooks/uselogout';

const Drawer = createDrawerNavigator();

const DrawerContent = ({navigation}) => (
  <ScrollView contentContainerStyle={styles.drawerContent}>
    <View style={styles.drawerHeader}>
      <Image
        source={require('../assets/images/draw.png')}
        style={styles.drawerLogo}
      />
      <Text style={styles.drawerHeaderText}>My App</Text>
    </View>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('Newplace')}>
      <Text style={styles.drawerItemText}>NewPlace</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('FavouritePlaces')}>
      <Text style={styles.drawerItemText}>Favourite Places</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('UserList')}>
      <Text style={styles.drawerItemText}>User List</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('userlocation')}>
      <Text style={styles.drawerItemText}>User Locations</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('UserProfile')}>
      <Text style={styles.drawerItemText}>UserProfile</Text>
    </TouchableOpacity>

    {/* Add the Locale Screen button */}
    <TouchableOpacity
      style={styles.localeButton}
      onPress={() => navigation.navigate('LocaleScreen')}>
      <Text style={styles.localeButtonText}>Lang</Text>
    </TouchableOpacity>
  </ScrollView>
);

const DrawerNavigation = () => {
  const {i18n} = useLocale();
  const handleLogout = useLogout();

  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      contentContainerStyle={styles.contentContainer}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="LocaleScreen" component={LocaleScreen} />
      <Drawer.Screen name="FavouritePlaces" component={FavouritePlace} />
      <Drawer.Screen name="Newplace" component={NewPlaceScreen} />
      <Drawer.Screen name="UserList" component={userListScreen} />
      <Drawer.Screen name="userlocation" component={UserLocation} />
      <Drawer.Screen name="UserProfile" component={UserProfile} />

      <Drawer.Screen name="userplaces" component={UserPlacesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawer: {
    width: 250,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerItemText: {
    fontSize: 18,
    color: '#333',
  },
  localeButton: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom position as needed
    left: 20, // Adjust the left position as needed
    paddingVertical: 12,
    backgroundColor: '#007AFF', // Adjust the color as needed
    alignItems: 'center',
    borderRadius: 50, // Make it a circle
    width: 50, // Adjust the width and height for a circle
    height: 50,
  },
  localeButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
