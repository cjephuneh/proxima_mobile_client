import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import Multistep from '../screens/Multistep';

const Stack = createNativeStackNavigator();

import { useSelector } from 'react-redux';
import DrawerNav from './DrawerNav';


const MainStackNav = () => {

const user = useSelector((state) => state.auth.user);
  
  return (
    <Stack.Navigator initialRouteName='onBoarding' screenOptions={{
        headerShown:  false,
      }}>
        <Stack.Screen name='onBoarding' component={OnBoarding} />

      {
        user ?
        
          <Stack.Screen name='drawer' component={DrawerNav} /> :

        <>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='multistep' component={Multistep} />
          <Stack.Screen name='drawer' component={DrawerNav} />
        </>
      }        
    </Stack.Navigator>
  )
}

export default MainStackNav