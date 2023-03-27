import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import Multistep from '../screens/Multistep';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import Home from '../screens/Home';
import Company from '../screens/Company';
import CompanyLocation from '../screens/CompanyLocation';

const Stack = createNativeStackNavigator();

import { useSelector } from 'react-redux';
import DrawerNav from './DrawerNav';


const MainStackNav = () => {

const user = useSelector((state) => state.auth.user);
  
  console.log(user)
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