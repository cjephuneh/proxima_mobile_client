import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import Home from '../screens/Home';
import Company from '../screens/Company';
import CompanyLocation from '../screens/CompanyLocation';
import Login from '../screens/Login'

const Stack = createNativeStackNavigator();

const AppStackNav = () => {
  return (
    <Stack.Navigator initialRouteName='home' screenOptions={{
        headerShown:  false,
      }}>
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='company' component={Company} />
        <Stack.Screen name='inbox' component={Inbox} />
        <Stack.Screen name='chat' component={Chat} />
        <Stack.Screen name='location' component={CompanyLocation} />
        
        {/* the login route should be the last in the list */}
        <Stack.Screen name='login' component={Login} />
    </Stack.Navigator>
  )
}

export default AppStackNav