import {createDrawerNavigator} from '@react-navigation/drawer';
import {LocaleScreen} from '../containers';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="LocaleScreen" component={LocaleScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
