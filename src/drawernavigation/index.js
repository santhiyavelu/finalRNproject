import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DashBoardScreen,
  LocaleScreen,
  FavouritePlace,
  userListScreen,
  UserPlacesScreen,
  MapScreen,
  UpdatePositionScreen,
} from '../containers';
import useLocale from '../helpers/LocalizationHelper';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const {i18n} = useLocale(); // Use the custom hook to get the i18n object

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard" // Translate the screen name
        component={DashBoardScreen}
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="LocaleScreen"
        component={LocaleScreen}
        options={{
          headerShown: true,
          headerTitle: i18n.t('dashboard'), // Translate the header title
        }}
      />
      <Drawer.Screen
        name="FavouritePlaces"
        component={FavouritePlace}
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="UpdatePositionScreen"
        component={UpdatePositionScreen}
        options={{
          headerShown: true,
        }}
      />

      <Drawer.Screen
        name="UserList"
        component={userListScreen}
        options={{
          headerShown: true,
        }}
      />
      {/* <Drawer.Screen
        name="userplaces"
        component={UserPlacesScreen}
        options={{
          headerShown: true,
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
