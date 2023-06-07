import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import DrawerNav from './DrawerNav';
import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import Multistep from '../screens/Multistep';

const Stack = createNativeStackNavigator();

const MainStackNav = () => {
  const user = useSelector((state) => state.auth.user);

  console.log('user main stack nav: ', user);
  console.log('main stack nav: ', typeof(user))
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='multistep' component={Multistep} />
          {/* <Stack.Screen name='drawer' component={DrawerNav} /> */}
        </>
      ) : (
         <Stack.Screen name='drawer' component={DrawerNav} />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNav;
