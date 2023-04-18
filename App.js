import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { store } from './redux/store'
import { Provider } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native';
import MainStackNav from './navigation/MainStackNav';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor='' />
        <MainStackNav />
      </NavigationContainer>
    </Provider>
  );
}

