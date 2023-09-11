import {createDrawerNavigator} from '@react-navigation/drawer';
import {DashBoardScreen, LocaleScreen} from '../containers';
// import {} from '../containers';

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
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
