import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DashBoardScreen, LocaleScreen, FavouritePlace} from '../containers';
import useLocale from '../helpers/LocalizationHelper';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const {i18n} = useLocale(); // Use the custom hook to get the i18n object

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={i18n.t('maps')} // Translate the screen name
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
        name={i18n.t('favouritePlaces')} // Translate the screen name
        component={FavouritePlace}
        options={{
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
