import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStackNav from './AppStackNav';
import DrawerContent from '../components/drawer/DrawerContent';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
    <Drawer.Navigator 
      screenOptions={{
        headerShown: false
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="app"
        component={AppStackNav}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav