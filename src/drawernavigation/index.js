import {createDrawerNavigator} from '@react-navigation/drawer';
import {DashBoardScreen, LocaleScreen, FavouritePlace} from '../containers';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="MAPS"
        component={DashBoardScreen}
        options={{
          headerShown: true,
        }}></Drawer.Screen>
      <Drawer.Screen
        name="LocaleScreen"
        component={LocaleScreen}
        options={{
          headerShown: true,
          headerTitle: 'Locale',
        }}
      />
      <Drawer.Screen
        name="FavouritePlaces"
        component={FavouritePlace}
        options={{
          headerShown: true,
        }}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
