import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  DashBoardScreen,
  LocaleScreen,
  FavouritePlace,
  userListScreen,
  UserPlacesScreen,
  MapScreen,
  UpdatePositionScreen,
  UserMapView,
  UserProfile,
} from '../containers';
import useLocale from '../helpers/LocalizationHelper';
import NewPlaceScreen from '../containers/NewPlace';

const Drawer = createDrawerNavigator();

const DrawerContent = ({navigation}) => (
  <View style={styles.drawerContent}>
    <View style={styles.drawerHeader}>
      <Image
        source={require('../assets/images/draw.png')}
        style={styles.drawerLogo}
      />
      <Text style={styles.drawerHeaderText}>My App</Text>
    </View>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('Dashboard')}>
      <Text style={styles.drawerItemText}>Dashboard</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('Newplace')}>
      <Text style={styles.drawerItemText}>NewPlace</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('LocaleScreen')}>
      <Text style={styles.drawerItemText}>Locale Screen</Text>
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
      onPress={() => navigation.navigate('UserMapView')}>
      <Text style={styles.drawerItemText}>User Map View</Text>
    </TouchableOpacity>
    {/* <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('userplaces')}>
      <Text style={styles.drawerItemText}>Place</Text>
    </TouchableOpacity> */}
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => navigation.navigate('UserProfile')}>
      <Text style={styles.drawerItemText}>UserProfile</Text>
    </TouchableOpacity>
  </View>
);

const DrawerNavigation = () => {
  const {i18n} = useLocale(); // Use the custom hook to get the i18n object

  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      contentContainerStyle={styles.contentContainer}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashBoardScreen} />
      <Drawer.Screen name="LocaleScreen" component={LocaleScreen} />
      <Drawer.Screen name="FavouritePlaces" component={FavouritePlace} />
      <Drawer.Screen name="Newplace" component={NewPlaceScreen} />
      <Drawer.Screen name="UserList" component={userListScreen} />
      <Drawer.Screen name="UserMapView" component={UserMapView} />
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
});
